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
import {getStream} from '@hive/utils/stream-util';
import ReactiveTextInput from 'rn-reactive-text-input';

import {useDispatch, useSelector} from 'react-redux';
import {GlobalColors} from '@hive/styles/colors';
import Header from '@hive/components/header/header';
import Spacer from '@hive/components/spacer/spacer';
const DetailsScreen = props => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();
  const dispatch = useDispatch();
  const {name: useName} = useSelector(state => state.user);
  const [name, setName] = useState(useName);
  const [image, setImage] = useState(null);
  const onStart = () => {
    dispatch({type: 'SET_NAME', payload: name});
    props.navigation.navigate('Home');
  };

  const closeStraem = () => {
    if (localStream) {
      localStream.getTracks().forEach(t => t.stop());
      // Stop all video tracks
      localStream.getVideoTracks().forEach(track => track.stop());
      // Stop all audio tracks
      localStream.getAudioTracks().forEach(track => track.stop());
      localStream.release();
    }

    setLocalStream(null);
  };

  const chooseImage = () => {};

  useEffect(() => {
    (async () => {
      const stream = await getStream(false, true);
      setLocalStream(stream);
    })();

    return () => {
      closeStraem();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header
        onClickBack={() => {
          props.navigation.navigate('Welcome');
        }}
        backButtonColor="#FFFF"
      />
      <RTCView
        streamURL={localStream?.toURL()}
        objectFit="cover"
        style={styles.video}
      />
      <View style={styles.shade} />
      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <Spacer size={10} />
          <Text style={styles.title}>Tell us about you..</Text>
          <Spacer size={30} />
          <Text style={styles.subTitle}>
            We would like to know you better and increase your calls
          </Text>
          <Spacer size={8} />
          <ReactiveTextInput
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
          <Spacer size={20} />
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
