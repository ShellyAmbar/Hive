import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
  Dimensions,
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

const DetailsScreen = props => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();
  const dispatch = useDispatch();
  const {
    name: useName,
    image: myImage,
    myAge,
    myCountry,
    isLimitedCountry,
    limitedCountry: myLimitedCountry,
    isLimitedAges,
    limitedAges: myLimitedAges,
  } = useSelector(state => state.user);
  const [name, setName] = useState(useName);
  const [image, setImage] = useState<string | null>(myImage ? myImage : null);
  const [age, setAge] = useState(myAge ? myAge : -1);
  const [showPopupChoose, setshowPopupChoose] = useState(false);
  const [isNeedToUpdateCloude, setisNeedToUpdateCloude] = useState(false);
  const [isErrorAge, setisErrorAge] = useState(false);
  const [country, setCountry] = useState(myCountry ?? '');
  const [limitedCountry, setLImitedCountry] = useState(
    myLimitedCountry ?? myCountry,
  );
  const [isLimitCountry, setisLimitCountry] = useState(isLimitedCountry);

  const [limitedAges, setLImitedAges] = useState(myLimitedAges);
  const [isLimitAges, setisLimitAges] = useState(isLimitedAges);
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

      dispatch({type: 'SET_IMAGE', payload: imageUri});
    } else {
      await deleteImagePath(DeviceInfo.getDeviceId(), name);
      dispatch({type: 'SET_IMAGE', payload: null});
    }
    setisNeedToUpdateCloude(false);
  }, [name, image]);

  const onStart = useCallback(async () => {
    dispatch({type: 'SET_NAME', payload: name});
    dispatch({type: 'SET_MY_AGE', payload: age});
    dispatch({type: 'SET_MY_COUNTRY', payload: country});
    dispatch({type: 'SET_IS_LIMITED_COUNTRY', payload: isLimitCountry});
    dispatch({type: 'SET_LIMITED_COUNTRY', payload: limitedCountry});
    dispatch({type: 'SET_IS_LIMITED_AGES', payload: isLimitAges});

    dispatch({type: 'SET_LIMITED_AGES', payload: limitedAges});
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

  useEffect(() => {
    (async () => {
      const videoStreamManager = VideoStreamManager.getInstance();
      try {
        const videoStream = await videoStreamManager.getStream(false, true);

        setLocalStream(videoStream);
      } catch (error) {
        console.error('Failed to get stream:', error);
      }
    })();

    return () => {};
  }, []);

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
            focusable
            autoFocus={true}
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
            placeholder={'Enter your age'}
            placeHolderColor="#FFFF"
            defaultValue={age}
            containerStyle={styles.numberInputContainer}
            errorInputStyle={styles.errorStyle}
            textInputStyle={styles.textInputNumber}
            textContentType="birthdateMonth"
            onDebounce={text => {
              if (
                (Number(text) >= 16 && Number(text) <= 100) ||
                Number(text) === -1
              ) {
                setisErrorAge(false);
                setAge(Number(text));
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
