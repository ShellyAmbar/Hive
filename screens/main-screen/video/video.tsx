import {Text, View} from 'react-native';
import React from 'react';
import styles from './video.styles';
import IVideoProps from './interfaces';
import FloatingButton from '@hive/components/floating-button/floating-button';
import {RTCView} from 'react-native-webrtc';
import Loading from 'react-native-animated-loading-dots';

const Video = ({localStrem, remoteStrem, hangup}: IVideoProps) => {
  const showLocalStream = () => (
    <>
      <RTCView
        streamURL={localStrem?.toURL()}
        objectFit="cover"
        style={styles.otherVideo}
      />
      <View style={styles.shade} />
      <View style={styles.content}>
        <Text style={styles.subTitle}>
          {'Looking for \n a partner for you ..'}
        </Text>
        <Loading
          dotCount={4}
          dotSize={30}
          dotSpacing={8}
          duration={300}
          dotStyle={{borderRadius: 30}}
          animationType="UP_AND_DOWN"
        />
        <FloatingButton
          containerStyle={styles.hangupBtn}
          iconName="video"
          onPress={() => hangup()}
        />
      </View>
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
