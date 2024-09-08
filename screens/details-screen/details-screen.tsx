import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
  Dimensions,
  AppState,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './details-screen.styles';
import {MediaStream, RTCView} from 'react-native-webrtc';
import VideoStreamManager from '@hive/utils/stream-util';
import ReactiveTextInput from 'rn-reactive-text-input';

import {useDispatch, useSelector} from 'react-redux';
import {GlobalColors} from '@hive/styles/colors';
import Spacer from '@hive/components/spacer/spacer';
import Icon from 'react-native-vector-icons/AntDesign';
import CountryCodePicker from 'rn-country-code-picker-modal';
import {
  deleteImagePath,
  dounloadImageFromStorage,
  uploadImageToCloude,
} from '@hive/utils/image-util';

import DeviceInfo from 'react-native-device-info';
import ButtonSwitch from 'rn-switch-button';
import MultiSlider from 'react-native-range-bar';
import PopupPicture from './popup-picture/popup-picture';
import useStream from '@hive/hooks/useStream';
import {
  setMyAge,
  setMyCountry,
  setMyLimitedCountry,
  setMyImage,
  setMyName,
  setIsMyLimitedCountry,
  setIsMyLimitedAges,
  setMyLimitedAges,
} from '@hive/store/reducers/user';
const DetailsScreen = props => {
  const dispatch = useDispatch();
  const {
    myName,
    myImage,
    myAge,
    myCountry,
    isMyLimitedCountry,
    myLimitedCountry,
    isMyLimitedAges,
    myLimitedAges,
  } = useSelector(state => state.user);
  const [name, setName] = useState(myName);
  const [image, setImage] = useState<string | null>(myImage ? myImage : null);
  const [age, setAge] = useState(myAge ? myAge : 0);
  const [showPopupChoose, setshowPopupChoose] = useState(false);
  const [isNeedToUpdateCloude, setisNeedToUpdateCloude] = useState(false);
  const [isErrorAge, setisErrorAge] = useState(false);
  const [country, setCountry] = useState(myCountry ?? '');
  const [limitedCountry, setLImitedCountry] = useState(
    myLimitedCountry ?? myCountry,
  );
  const [isLimitCountry, setisLimitCountry] = useState(isMyLimitedCountry);

  const [limitedAges, setLImitedAges] = useState(myLimitedAges);
  const [isLimitAges, setisLimitAges] = useState(isMyLimitedAges);

  const {localStream} = useStream({});

  const updateImageUri = useCallback((imageUri: string | null) => {
    setImage(imageUri);
    setisNeedToUpdateCloude(true);
  }, []);

  const updateImageToCloude = useCallback(async () => {
    if (image) {
      await uploadImageToCloude(DeviceInfo.getDeviceId(), name, image);
      const imageUri = await dounloadImageFromStorage(
        DeviceInfo.getDeviceId(),
        name,
      );
      dispatch(setMyImage(imageUri));
    } else {
      await deleteImagePath(DeviceInfo.getDeviceId(), name);
      dispatch(setMyImage(null));
    }
    setisNeedToUpdateCloude(false);
  }, [name, image]);

  const onStart = useCallback(async () => {
    dispatch(setMyName(name));
    dispatch(setMyAge(age));
    dispatch(setMyCountry(country));
    dispatch(setIsMyLimitedCountry(isLimitCountry));
    dispatch(setMyLimitedCountry(limitedCountry));
    dispatch(setIsMyLimitedAges(isLimitAges));

    dispatch(setMyLimitedAges(limitedAges));

    if (isNeedToUpdateCloude) {
      updateImageToCloude();
    }

    props.navigation.navigate('Home');
  }, [
    isNeedToUpdateCloude,
    name,
    age,
    country,
    isLimitAges,
    isLimitCountry,
    limitedAges,
    limitedCountry,
    dispatch,
  ]);

  const popup = () => {
    return (
      <PopupPicture
        onPressClose={() => {
          setshowPopupChoose(false);
        }}
        onPressTakePicture={uri => {
          if (uri?.length > 0) {
            updateImageUri(uri);
            setshowPopupChoose(false);
          }
        }}
        onPressUploadFromGalery={uri => {
          if (uri?.length > 0) {
            updateImageUri(uri);
            setshowPopupChoose(false);
          }
        }}
        onError={e => {
          setshowPopupChoose(false);
          console.log(e);
        }}
        isVisible={showPopupChoose}
        setVisible={setshowPopupChoose}
      />
    );
  };
  return (
    <View style={styles.container}>
      {showPopupChoose && popup()}
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          objectFit="cover"
          style={styles.video}
        />
      )}
      <View style={styles.shade} />
      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <Spacer size={30} />
          <Text style={styles.title}>Tell us about you..</Text>
          <Spacer size={30} />
          <Text style={styles.subTitle}>
            We would like to know you better and increase your calls
          </Text>
          <Spacer size={8} />
          <ReactiveTextInput
            textAlignVertical={'bottom'}
            placeholder="Enter your name.."
            placeHolderColor="#FFFF"
            defaultValue={name}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.textInputText}
            textContentType="givenName"
            onDebounce={text => {
              setName(text);
            }}
            keyboardType="url"
            keyboardAppearance="default"
            blurOnSubmit={false}
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            cursorColor={GlobalColors.TextColors.white}
          />
          <Spacer size={20} />
          <TouchableOpacity
            style={styles.imageBtn}
            onPress={() => setshowPopupChoose(true)}>
            <Text style={styles.text}>Upload a picture</Text>
          </TouchableOpacity>
          <Spacer size={30} />
          {image && (
            <>
              <View style={styles.image}>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={() => {
                    updateImageUri(null);
                  }}>
                  <Icon name="close" size={24} color={'#FFFF'} />
                </TouchableOpacity>
                <Image style={styles.imageContainer} source={{uri: image}} />
              </View>

              <Spacer size={50} />
            </>
          )}
          <Text style={styles.subTitle}>What's your age?</Text>

          <ReactiveTextInput
            textAlignVertical={'bottom'}
            placeholder={age !== 0 ? '' : 'Enter your age'}
            placeHolderColor="#FFFF"
            defaultValue={age !== 0 ? age + '' : ''}
            containerStyle={styles.numberInputContainer}
            errorInputStyle={styles.errorStyle}
            textInputStyle={styles.textInputNumber}
            textContentType="birthdateMonth"
            onDebounce={text => {
              console.log(Number(text));

              if ((Number(text) >= 16 && Number(text) <= 100) || text === '') {
                setisErrorAge(false);
                if (Number(text) !== 0 || text.length > 0) {
                  setAge(Number(text));
                }
              } else {
                setisErrorAge(true);
              }
            }}
            keyboardType="number-pad"
            keyboardAppearance="default"
            blurOnSubmit={false}
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            cursorColor={GlobalColors.TextColors.white}
            isError={isErrorAge}
            message={'Error, your age must be between 16 - 99'}
          />
          <Spacer size={32} />
          <View style={styles.horizontal}>
            <Text style={styles.subTitle}>Your country</Text>
            <CountryCodePicker
              onPickedCode={(code, name) => {
                setCountry(name);
              }}
              defaultCountryName={country}
            />
          </View>
          <Spacer size={22} />
          <View style={styles.horizontal}>
            <Text style={styles.subTitle}>limit for country?</Text>
            <ButtonSwitch
              outerViewStyle={{width: 120, height: 50}}
              textSelectedStyle={{fontSize: 12}}
              textUnSelectedStyle={{fontSize: 12}}
              innerViewStyle={{width: 120}}
              buttonsStyle={{width: 120}}
              deafultSelectedIndex={isLimitCountry ? 1 : 0}
              leftText="No"
              rightText="Yes"
              onClickLeft={() => {
                setisLimitCountry(false);
              }}
              onClickRight={() => {
                setisLimitCountry(true);
              }}
            />
          </View>
          {isLimitCountry && (
            <CountryCodePicker
              onPickedCode={(code, name) => {
                setLImitedCountry(name);
              }}
              defaultCountryName={limitedCountry}
            />
          )}

          <Spacer size={22} />
          <View style={styles.horizontal}>
            <Text style={styles.subTitle}>limit for ages?</Text>
            <ButtonSwitch
              outerViewStyle={{width: 120, height: 50}}
              textSelectedStyle={{fontSize: 12}}
              textUnSelectedStyle={{fontSize: 12}}
              innerViewStyle={{width: 120}}
              buttonsStyle={{width: 120}}
              deafultSelectedIndex={isLimitAges ? 1 : 0}
              leftText="No"
              rightText="Yes"
              onClickLeft={() => {
                setisLimitAges(false);
                setLImitedAges([0, 100]);
              }}
              onClickRight={() => {
                setisLimitAges(true);
              }}
            />
          </View>
          <Spacer size={28} />
          {isLimitAges && (
            <>
              <MultiSlider
                initialMaxValue={limitedAges[1]}
                initialMinValue={limitedAges[0]}
                sliderWidth={Dimensions.get('window').width - 100}
                min={0}
                max={100}
                step={1}
                onValueChange={range => {
                  setLImitedAges([range.min, range.max]);
                }}
              />
              <Spacer size={12} />
            </>
          )}

          <TouchableOpacity
            disabled={
              name?.length === 0 ||
              age === 0 ||
              isErrorAge ||
              country?.length === 0
            }
            style={[
              styles.startBtn,
              (name?.length === 0 ||
                age === 0 ||
                isErrorAge ||
                country?.length === 0) &&
                styles.disabledBtn,
            ]}
            onPress={() => {
              onStart();
            }}>
            <Text
              style={[
                styles.btnText,
                (name?.length === 0 || age === 0 || isErrorAge) &&
                  styles.disabledText,
              ]}>
              Start
            </Text>
          </TouchableOpacity>
          <Spacer size={30} />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
