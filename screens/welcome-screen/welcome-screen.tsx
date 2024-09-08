import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styles from './welcome-screen.styles';
import {RTCView} from 'react-native-webrtc';

import Spacer from '@hive/components/spacer/spacer';
import LottieView from 'lottie-react-native';
import useStream from '@hive/hooks/useStream';

const WelcomeScreen = props => {
  const onStart = () => {
    props.navigation.replace('Details');
  };

  const {localStream} = useStream({});

  return (
    <View style={styles.container}>
      {localStream?.toURL() && (
        <RTCView
          streamURL={localStream?.toURL()}
          objectFit="cover"
          style={styles.video}
        />
      )}
      <View style={styles.shade} />
      <Text style={styles.title}>Dateroulette</Text>
      <Spacer size={22} />
      <Text style={styles.subTitle}>
        {'Meet new friends\nin one click away ..'}
      </Text>
      <Spacer size={22} />
      <Image
        style={styles.image}
        source={require('@hive/assets/images/appImage.png')}
      />
      <Spacer size={42} />
      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => {
          onStart();
        }}>
        <Text style={styles.btnText}>Start</Text>
      </TouchableOpacity>
      <LottieView
        source={require('@hive/assets/lotties/sparks.json')}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
      <LottieView
        source={require('@hive/assets/lotties/bubbles.json')}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
      <LottieView
        source={require('@hive/assets/lotties/stars.json')}
        autoPlay
        loop
        speed={1}
        style={styles.lottie}
      />
    </View>
  );
};

export default WelcomeScreen;
