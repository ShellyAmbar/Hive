import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './welcome-screen.styles';
import {MediaStream, RTCView} from 'react-native-webrtc';
import {getStream} from '@hive/utils/stream-util';
import ReactiveTextInput from 'rn-reactive-text-input';
import {GlobalColors} from '@hive/styles/colors';
const WelcomeScreen = props => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();
  const [name, setName] = useState('');
  useEffect(() => {
    (async () => {
      const stream = await getStream(false, true);
      setLocalStream(stream);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DateRoulatte</Text>
      <Text style={styles.subTitle}>Meet new friends in one click away ..</Text>
      <Text style={styles.text}>Enter your name..</Text>

      <ReactiveTextInput
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
      <RTCView
        streamURL={localStream?.toURL()}
        objectFit="cover"
        style={styles.video}
      />
      <View style={styles.shade} />
      <TouchableOpacity
        disabled={name?.length === 0}
        style={[styles.startBtn, name?.length === 0 && styles.disabledBtn]}
        onPress={() => {
          props.navigation.navigate('Home');
        }}>
        <Text
          style={[styles.btnText, name?.length === 0 && styles.disabledText]}>
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
