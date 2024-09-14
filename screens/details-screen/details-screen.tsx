import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import styles from './details-screen.styles';
import {RTCView} from 'react-native-webrtc';

import ReactiveTextInput from 'rn-reactive-text-input';
import {GlobalColors} from '@hive/styles/colors';
import Spacer from '@hive/components/spacer/spacer';

import CountryCodePicker from 'rn-country-code-picker-modal';

import ButtonSwitch from 'rn-switch-button';
import MultiSlider from 'react-native-range-bar';
// import PopupPicture from './popup-picture/popup-picture';

// import Picker from './picker/picker';
import Picker from 'react-native-picker-dropdown-select';
import useDetailsScreen from './hooks/useDetailsScreen';
const DetailsScreen = props => {
  const {
    // setshowPopupChoose,
    // updateImageUri,
    // showPopupChoose,
    localStream,
    name,
    setName,
    age,
    setAge,
    setisErrorAge,
    isErrorAge,
    defaultSelectedMyGenderIndex,
    defaultSelectedOtherGenderIndex,
    myGenderitemList,
    otherGenderItemList,
    country,
    setCountry,
    setisLimitCountry,
    isLimitCountry,
    setLImitedCountry,
    limitedCountry,
    isLimitAges,
    setisLimitAges,
    setLImitedAges,
    limitedAges,
    onStart,
    isMissingData,
  } = useDetailsScreen(props);
  // const popup = () => {
  //   return (
  //     <PopupPicture
  //       onPressClose={() => {
  //         setshowPopupChoose(false);
  //       }}
  //       onPressTakePicture={uri => {
  //         if (uri?.length > 0) {
  //           updateImageUri(uri);
  //           setshowPopupChoose(false);
  //         }
  //       }}
  //       onPressUploadFromGalery={uri => {
  //         if (uri?.length > 0) {
  //           updateImageUri(uri);
  //           setshowPopupChoose(false);
  //         }
  //       }}
  //       onError={e => {
  //         setshowPopupChoose(false);
  //         // console.log(e);
  //       }}
  //       isVisible={showPopupChoose}
  //       setVisible={setshowPopupChoose}
  //     />
  //   );
  // };
  return (
    <View style={styles.container}>
      {/* {showPopupChoose && popup()} */}
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          objectFit="cover"
          style={styles.video}
        />
      )}
      <View style={styles.shade} />
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scroll}>
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
          {/* <TouchableOpacity
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
          )} */}
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
          <Spacer size={22} />
          <View style={styles.horizontal}>
            <Text style={styles.subTitle}>Your gender:</Text>
            <Picker
              textStyle={styles.text}
              itemTextStyle={styles.pickerText}
              defaultSelectedId={defaultSelectedMyGenderIndex}
              dataInput={myGenderitemList}
            />
          </View>
          <Spacer size={22} />
          <View style={styles.horizontal}>
            <Text style={styles.subTitle}>You want to see:</Text>
            <Picker
              textStyle={styles.text}
              itemTextStyle={styles.pickerText}
              defaultSelectedId={defaultSelectedOtherGenderIndex}
              dataInput={otherGenderItemList}
            />
          </View>
          <Spacer size={32} />
          <View style={styles.horizontal}>
            <Text style={styles.subTitle}>Your country</Text>
            <CountryCodePicker
              textStyle={styles.text}
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
            disabled={isMissingData}
            style={[styles.startBtn, isMissingData && styles.disabledBtn]}
            onPress={() => {
              onStart();
            }}>
            <Text
              style={[styles.btnText, isMissingData && styles.disabledText]}>
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
