import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
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

import {
  chooseImageFromGallery,
  deleteImagePath,
  dounloadImageFromStorage,
  takePicture,
  uploadImageToCloude,
} from '@hive/utils/image-util';
import Popup from 'rn-sliding-popup';
import DeviceInfo from 'react-native-device-info';
const DetailsScreen = props => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();
  const dispatch = useDispatch();
  const {
    name: useName,
    image: myImage,
    myAge,
  } = useSelector(state => state.user);
  const [name, setName] = useState(useName);
  const [image, setImage] = useState<string | null>(myImage ? myImage : null);
  const [age, setAge] = useState(myAge ? myAge : 16);
  const [showPopupChoose, setshowPopupChoose] = useState(false);
  const [isNeedToUpdateCloude, setisNeedToUpdateCloude] = useState(false);
  const [isErrorAge, setisErrorAge] = useState(false);

  const updateImageUri = useCallback((imageUri: string | null) => {
    console.log('updateImageUri----');

    setImage(imageUri);
    setisNeedToUpdateCloude(true);
  }, []);

  const updateImageToCloude = useCallback(async () => {
    console.log('updateImageToCloude------------');
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

    if (isNeedToUpdateCloude) {
      updateImageToCloude();
    }

    props.navigation.navigate('Home');
  }, [isNeedToUpdateCloude, name, age]);

  const chooseImage = () => {
    setshowPopupChoose(true);
  };

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
      <Popup
        isCancelable={true}
        isVisible={showPopupChoose}
        onClickClose={() => {
          setshowPopupChoose(false);
        }}>
        <View>
          <TouchableOpacity
            style={styles.btnChoose}
            onPress={() => {
              setshowPopupChoose(false);
              chooseImageFromGallery(
                uri => {
                  updateImageUri(uri);
                },
                err => {},
              );
            }}>
            <Text style={styles.textChoose}>{'Upload from library'}</Text>
          </TouchableOpacity>
          <Spacer size={12} />
          <TouchableOpacity
            style={styles.btnChoose}
            onPress={() => {
              setshowPopupChoose(false);
              takePicture(
                uri => {
                  updateImageUri(uri);
                },
                err => {},
              );
            }}>
            <Text style={styles.textChoose}>{'Take new image'}</Text>
          </TouchableOpacity>
        </View>
      </Popup>
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
            textContentType="familyName"
            onDebounce={text => {
              setName(text);
            }}
            keyboardType="email-address"
            keyboardAppearance="default"
            blurOnSubmit={false}
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            cursorColor={GlobalColors.TextColors.white}
          />
          <Spacer size={40} />
          <TouchableOpacity
            style={styles.imageBtn}
            onPress={() => chooseImage()}>
            <Text style={styles.text}>Upload a picture</Text>
          </TouchableOpacity>
          <Spacer size={55} />
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
          <Spacer size={8} />

          <ReactiveTextInput
            textAlignVertical={'bottom'}
            placeholder="Enter your age"
            placeHolderColor="#FFFF"
            defaultValue={age}
            containerStyle={styles.numberInputContainer}
            errorInputStyle={styles.errorStyle}
            textInputStyle={styles.textInputText}
            inputmode="numeric"
            onDebounce={text => {
              if (text >= 16 && text <= 100) {
                setisErrorAge(false);
                setAge(text);
              } else {
                setisErrorAge(true);
              }
            }}
            keyboardType="numeric"
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
          <Spacer size={55} />
          <TouchableOpacity
            disabled={name?.length === 0 || age === 0 || isErrorAge}
            style={[
              styles.startBtn,
              (name?.length === 0 || age === 0 || isErrorAge) &&
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
