import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './welcome-screen.styles';
import {MediaStream, RTCView} from 'react-native-webrtc';
import VideoStreamManager from '@hive/utils/stream-util';

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

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DateRoulatte</Text>
      <Text style={styles.subTitle}>
        {'Meet new friends\nin one click away ..'}
      </Text>

      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          objectFit="cover"
          style={styles.video}
        />
      )}
      <View style={styles.shade} />
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
