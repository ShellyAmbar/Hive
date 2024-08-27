import {View, Text} from 'react-native';
import React from 'react';
import Loading from 'react-native-animated-loading-dots';
import {MediaStream, RTCView} from 'react-native-webrtc';
import styles from './waiting.styles';

import FloatingButton from '@hive/components/floating-button/floating-button';
const Waiting = ({
  hangup,
  create,
  isWaiting,
  title,
  localStream,
}: {
  hangup?: () => void;
  create?: () => void;
  isWaiting: boolean;
  title: string;
  localStream?: null | MediaStream;
}) => {
  return (
    <>
      {localStream && (
        <RTCView
          streamURL={localStream?.toURL()}
          objectFit="cover"
          style={styles.video}
        />
      )}
      <View style={styles.shade} />
      <View style={styles.content}>
        <Text style={styles.subTitle}>{title}</Text>
        {isWaiting && (
          <Loading
            dotCount={4}
            dotSize={30}
            dotSpacing={8}
            duration={300}
            dotStyle={{borderRadius: 30}}
            animationType="UP_AND_DOWN"
          />
        )}
        {isWaiting ? (
          <FloatingButton
            containerStyle={styles.hangupBtn}
            iconName="phone"
            onPress={() => hangup && hangup()}
          />
        ) : (
          <FloatingButton
            containerStyle={styles.createBtn}
            iconName="video"
            onPress={() => create && create()}
          />
        )}
      </View>
    </>
  );
};

export default Waiting;
