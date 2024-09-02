import React from 'react';
import GettingCall from '@hive/screens/main-screen/getting-call/getting-call';
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
    startListenToPending,
    switchCamera,
    isFront,
    setIsHideMe,
    isHideMe,
    isHideUser,
  } = useMainScreen();

  return (
    <View style={styles.container}>
      <Header
        onClickBack={() => {
          props.navigation.replace('Welcome');
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

      {!startListenToPending && !gettingCall && (
        <Video
          hangup={hangup}
          localStrem={localStream}
          remoteStrem={remoteStream}
          switchCamera={switchCamera}
          isFront={isFront}
          isHideMe={isHideMe}
          setIsHideMe={setIsHideMe}
          isHideUser={isHideUser}
        />
      )}
      {!gettingCall && startListenToPending && (
        <Waiting
          create={create}
          isWaiting={false}
          title={'create a new call\nor wait for a partner\nto join'}
          localStream={localStream}
        />
      )}
    </View>
  );
};

export default MainScreen;
