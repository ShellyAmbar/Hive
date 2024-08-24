import {View} from 'react-native';
import React from 'react';
import styles from './video.styles';
import IVideoProps from './interfaces';
import FloatingButton from '@hive/components/floating-button/floating-button';
import {GlobalColors} from '@hive/styles/colors';
import {RTCView} from 'react-native-webrtc';

const Video = ({localStrem, remoteStrem, hangup}: IVideoProps) => {
  return (
    <View style={styles.container}>
      {localStrem && !remoteStrem ? (
        <RTCView
          streamURL={localStrem.toURL()}
          objectFit="cover"
          style={styles.otherVideo}
        />
      ) : localStrem && remoteStrem ? (
        <>
          <RTCView
            streamURL={remoteStrem.toURL()}
            objectFit="cover"
            style={styles.otherVideo}
          />

          <RTCView
            streamURL={localStrem.toURL()}
            objectFit="cover"
            style={styles.myVideo}
          />

          <FloatingButton
            containerStyle={{
              bottom: 50,
              alignSelf: 'center',
              backgroundColor: GlobalColors.SystemColors.Error,
            }}
            iconName="video"
            onPress={() => hangup()}
          />
        </>
      ) : (
        <FloatingButton
          containerStyle={{
            bottom: 50,
            alignSelf: 'center',
            backgroundColor: GlobalColors.SystemColors.Error,
          }}
          iconName="video"
          onPress={() => hangup()}
        />
      )}
    </View>
  );
};

export default Video;
