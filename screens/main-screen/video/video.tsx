import {View} from 'react-native';
import React from 'react';
import styles from './video.styles';
import IVideoProps from './interfaces';
import FloatingButton from '@hive/components/floating-button/floating-button';
import {RTCView} from 'react-native-webrtc';
import Waiting from '../waiting/waiting';
import IconVideo from 'react-native-vector-icons/FontAwesome5';
import IconVideoSwitch from 'react-native-vector-icons/Ionicons';
import Spacer from '@hive/components/spacer/spacer';
const Video = ({
  localStrem,
  remoteStrem,
  hangup,
  switchCamera,
  isFront,
}: IVideoProps) => {
  const showLocalStream = () => (
    <Waiting
      isWaiting={true}
      hangup={hangup}
      title={'Looking for \n a partner for you ..'}
      localStream={localStrem}
    />
  );

  const showBothStreams = () => (
    <>
      <RTCView
        streamURL={remoteStrem?.toURL()}
        objectFit="cover"
        style={styles.otherVideo}
      />

      <RTCView
        streamURL={localStrem?.toURL()}
        objectFit="contain"
        style={styles.myVideo}
      />
      <View style={styles.buttons}>
        <FloatingButton
          icon={() =>
            isFront ? (
              <IconVideoSwitch
                size={24}
                color={'#000'}
                name={'camera-reverse-outline'}
              />
            ) : (
              <IconVideoSwitch
                size={24}
                color={'#000'}
                name={'camera-outline'}
              />
            )
          }
          onPress={() => switchCamera()}
          containerStyle={styles.switchBtn}
        />
        <Spacer size={12} isVertical={false} />
        <FloatingButton
          containerStyle={styles.hangupBtn}
          icon={() => <IconVideo size={24} color={'#FFF'} name="video" />}
          onPress={() => hangup()}
        />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {(remoteStrem === null || remoteStrem === undefined) && showLocalStream()}
      {localStrem !== undefined &&
        remoteStrem !== undefined &&
        localStrem !== null &&
        remoteStrem !== null &&
        showBothStreams()}
    </View>
  );
};

export default Video;
