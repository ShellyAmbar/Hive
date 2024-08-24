import {View} from 'react-native';
import React from 'react';
import styles from './main-screen.styles';
import GettingCall from '@hive/components/getting-call/getting-call';
import Video from './video/video';
const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Video />
      <GettingCall join={() => {}} hangup={() => {}} />
    </View>
  );
};

export default MainScreen;
