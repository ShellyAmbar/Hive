import {View} from 'react-native';
import React, {useState} from 'react';
import styles from './main-screen.styles';
import GettingCall from '@hive/components/getting-call/getting-call';
import Video from './video/video';
import {MediaStream} from 'react-native-webrtc';
const MainScreen = () => {
  const [localStream, setLocalStream] = useState<null | MediaStream>();
  const [remoteStream, setRemoteStream] = useState<null | MediaStream>();
  return (
    <View style={styles.container}>
      <Video hangup={() => {}} />
      <GettingCall join={() => {}} hangup={() => {}} />
    </View>
  );
};

export default MainScreen;
