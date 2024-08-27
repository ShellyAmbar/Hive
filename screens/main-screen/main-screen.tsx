import React from 'react';
import GettingCall from '@hive/components/getting-call/getting-call';
import Video from './video/video';
import useMainScreen from './hooks/useMainScreen';
import Waiting from './waiting/waiting';
import {View} from 'react-native';
import styles from './main-screen.styles';
import Header from '@hive/components/header/header';

const MainScreen = props => {
  const {
    create,
    gettingCall,
    join,
    localStream,
    remoteStream,
    declineIncomingCall,
    hangup,
  } = useMainScreen();

  return (
    <View style={styles.container}>
      <Header
        onClickBack={() => {
          props.navigation.navigate('Welcome');
          hangup();
        }}
        backButtonColor="#FFFF"
      />
      {gettingCall ? (
        <GettingCall
          localStream={localStream}
          join={join}
          hangup={() => {
            declineIncomingCall();
          }}
        />
      ) : localStream ? (
        <Video
          hangup={() => {
            hangup();
          }}
          localStrem={localStream}
          remoteStrem={remoteStream}
        />
      ) : (
        <Waiting
          create={create}
          isWaiting={false}
          title={'Create a new call'}
        />
      )}
    </View>
  );
};

export default MainScreen;
