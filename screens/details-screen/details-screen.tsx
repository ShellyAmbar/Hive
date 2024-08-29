import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './details-screen.styles';
import {MediaStream, RTCView} from 'react-native-webrtc';
import VideoStreamManager from '@hive/utils/stream-util';
import ReactiveTextInput from 'rn-reactive-text-input';

import {useDispatch, useSelector} from 'react-redux';
import {GlobalColors} from '@hive/styles/colors';
import Header from '@hive/components/header/header';
import Spacer from '@hive/components/spacer/spacer';

import {
  chooseImageFromGallery,
  dounloadImageFromStorage,
  takePicture,
  uploadImageToCloude,
} from '@hive/utils/image-util';
import Popup from 'rn-sliding-popup';
import DeviceInfo from 'react-native-device-info';
const DetailsScreen = props => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();
  const dispatch = useDispatch();
  const {name: useName} = useSelector(state => state.user);
  const [name, setName] = useState(useName);
  const [image, setImage] = useState(null);
  const [showPopupChoose, setshowPopupChoose] = useState(false);

  useEffect(() => {
    (async () => {
      if (image) {
        await uploadImageToCloude(DeviceInfo.getDeviceId(), name, image);
        const imageUri = await dounloadImageFromStorage(
          DeviceInfo.getDeviceId(),
          name,
        );

        dispatch({type: 'SET_IMAGE', payload: imageUri});
      }
    })();
  }, [image]);

  const onStart = async () => {
    dispatch({type: 'SET_NAME', payload: name});

    props.navigation.navigate('Home');
  };

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
                  setImage(uri);
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
                  setImage(uri);
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
      <Header
        onClickBack={() => {
          props.navigation.replace('Welcome');
        }}
        backButtonColor="#FFFF"
      />
      {showPopupChoose && popup()}
      <RTCView
        streamURL={localStream?.toURL()}
        objectFit="cover"
        style={styles.video}
      />
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
          <Spacer size={30} />
          <TouchableOpacity
            style={styles.imageBtn}
            onPress={() => chooseImage()}>
            <Text style={styles.text}>Upload a picture</Text>
          </TouchableOpacity>
          <Spacer size={50} />
          {image && (
            <>
              <Image style={styles.image} source={{uri: image}} />
              <Spacer size={50} />
            </>
          )}

          <TouchableOpacity
            disabled={name?.length === 0}
            style={[styles.startBtn, name?.length === 0 && styles.disabledBtn]}
            onPress={() => {
              onStart();
            }}>
            <Text
              style={[
                styles.btnText,
                name?.length === 0 && styles.disabledText,
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
