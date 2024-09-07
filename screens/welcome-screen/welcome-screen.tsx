import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './welcome-screen.styles';
import {MediaStream, RTCView} from 'react-native-webrtc';
import VideoStreamManager from '@hive/utils/stream-util';
import Spacer from '@hive/components/spacer/spacer';

const WelcomeScreen = props => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();

  const onStart = () => {
    props.navigation.replace('Details');
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

    return () => {
      const videoStreamManager = VideoStreamManager.getInstance();
      videoStreamManager.stopStream();
    };
  }, []);

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
    </View>
  );
};

export default WelcomeScreen;
