import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Loading from 'react-native-animated-loading-dots';
import { MediaStream, RTCView } from 'react-native-webrtc';
import styles from './waiting.styles';

import FloatingButton from '@hive/components/floating-button/floating-button';
import CircularTimer from 'react-native-animated-circular-counter';
import { GlobalColors } from '@hive/styles/colors';
import IconVideo from 'react-native-vector-icons/FontAwesome5';
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
        {!isWaiting && (
          <CircularTimer
            duration={20}
            height={60}
            width={80}
            onFinish={() => {
              create && create();
            }}
            textStyle={{ fontSize: 12 }}
            progressColor={GlobalColors.Brand.secondary}
            circleColor="white"
            isCountDown={true}
            animateFillProgress={true}
            intervalDuration={1000}
            strokeWidth={5}
          />
        )}
        {isWaiting && (
          <Loading
            dotCount={4}
            dotSize={20}
            dotSpacing={8}
            duration={300}
            colors={[GlobalColors.BgColors.Bg16, GlobalColors.BgColors.Bg17, GlobalColors.BgColors.Bg18, GlobalColors.BgColors.Bg19]}
            dotStyle={{ borderRadius: 30 }}
            animationType="UP_AND_DOWN"
          />
        )}
        {isWaiting ? (
          <FloatingButton
            containerStyle={styles.hangupBtn}
            icon={() => <IconVideo size={24} color={'#FFF'} name="video" />}
            onPress={() => hangup && hangup()}
          />
        ) : (
          <FloatingButton
            containerStyle={styles.createBtn}
            icon={() => <IconVideo size={24} color={'#FFF'} name="video" />}
            onPress={() => create && create()}
          />
        )}
      </View>
    </>
  );
};

export default Waiting;
