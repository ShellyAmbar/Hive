import {View} from 'react-native';
import React from 'react';
import styles from './video.styles';
import IVideoProps from './interfaces';
import FloatingButton from '@hive/components/floating-button/floating-button';
import {RTCView} from 'react-native-webrtc';

const Video = ({localStrem, remoteStrem, hangup}: IVideoProps) => {
  const showLocalStream = () => (
    <>
      <RTCView
        streamURL={localStrem?.toURL()}
        objectFit="cover"
        style={styles.otherVideo}
      />
      <FloatingButton
        containerStyle={styles.hangupBtn}
        iconName="video"
        onPress={() => hangup()}
      />
    </>
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

      <FloatingButton
        containerStyle={styles.hangupBtn}
        iconName="video"
        onPress={() => hangup()}
      />
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
