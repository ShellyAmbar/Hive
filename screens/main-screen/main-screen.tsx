import React, {useEffect} from 'react';
import GettingCall from '@hive/screens/main-screen/getting-call/getting-call';
import Video from './video/video';
import useMainScreen from './hooks/useMainScreen';
import Waiting from './waiting/waiting';
import {View} from 'react-native';
import styles from './main-screen.styles';
import Header from '@hive/components/header/header';
import DeviceInfo from 'react-native-device-info';

const MainScreen = props => {
  const {
    create,
    gettingCall,
    join,
    localStream,
    remoteStream,
    declineIncomingCall,
    hangup,
    connecting,
  } = useMainScreen();

  return (
    <View style={styles.container}>
      <Header
        onClickBack={() => {
          props.navigation.replace('Welcome');
          hangup();
        }}
        backButtonColor="#FFFF"
      />
      {gettingCall && (
        <GettingCall
          localStream={localStream}
          join={join}
          hangup={() => {
            declineIncomingCall();
          }}
        />
      )}

      {connecting.current && (
        <Video
          hangup={hangup}
          localStrem={localStream}
          remoteStrem={remoteStream}
        />
      )}
      {!gettingCall && !connecting.current && (
        <Waiting
          create={create}
          isWaiting={false}
          title={'Create a new call'}
          localStream={localStream}
        />
      )}
    </View>
  );
};

export default MainScreen;
