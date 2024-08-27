import {View} from 'react-native';
import React from 'react';
import styles from './main-screen.styles';
import GettingCall from '@hive/components/getting-call/getting-call';
import Video from './video/video';

import FloatingButton from '@hive/components/floating-button/floating-button';
import useMainScreen from './hooks/useMainScreen';

const MainScreen = () => {
  const {
    gettingCall,
    join,
    hangup,
    localStream,
    remoteStream,
    create,
    hangupAndCallAgain,
    declineIncomingCall,
  } = useMainScreen();

  if (gettingCall) {
    return (
      <GettingCall
        join={join}
        hangup={() => {
          // hangup();
          declineIncomingCall();
        }}
      />
    );
  }
  if (localStream) {
    return (
      <Video
        hangup={() => {
          hangupAndCallAgain();
        }}
        localStrem={localStream}
        remoteStrem={remoteStream}
      />
    );
  }
  return (
    <View style={styles.container}>
      <FloatingButton
        containerStyle={styles.callBtn}
        iconName="video"
        onPress={() => create()}
      />
    </View>
  );
};

export default MainScreen;
