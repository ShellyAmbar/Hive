import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './welcome-screen.styles';
import {MediaStream, RTCView} from 'react-native-webrtc';
import {getStream} from '@hive/utils/stream-util';
import {useDispatch, useSelector} from 'react-redux';
const WelcomeScreen = props => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();

  const onStart = () => {
    props.navigation.navigate('Details');
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
      <Text style={styles.title}>DateRoulatte</Text>
      <Text style={styles.subTitle}>Meet new friends in one click away ..</Text>

      <RTCView
        streamURL={localStream?.toURL()}
        objectFit="cover"
        style={styles.video}
      />
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
