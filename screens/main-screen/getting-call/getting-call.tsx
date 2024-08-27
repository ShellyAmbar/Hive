import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './getting-call.styles';
import FloatingButton from '@hive/components/floating-button/floating-button';
import IGettingCall from './interfaces';
import Loading from 'react-native-animated-loading-dots';
import {GlobalColors} from '@hive/styles/colors';
import {useSelector} from 'react-redux';
import {RTCView} from 'react-native-webrtc';

const GettingCall = ({hangup, join, localStream}: IGettingCall) => {
  const {incomingUserName} = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <RTCView
        streamURL={localStream?.toURL()}
        objectFit="cover"
        style={styles.video}
      />
      <View style={styles.shade} />
      <View style={styles.content}>
        <Text style={styles.subTitle}>
          {incomingUserName + '\n' + ' is calling you'}
        </Text>
        <View style={styles.horizontal}>
          <FloatingButton
            containerStyle={{
              position: 'relative',

              backgroundColor: GlobalColors.SystemColors.Success,
            }}
            iconName="phone"
            onPress={() => join()}
          />
          <FloatingButton
            containerStyle={{
              position: 'relative',

              backgroundColor: GlobalColors.SystemColors.Error,
            }}
            iconName="phone"
            onPress={() => hangup()}
          />
        </View>
        <Loading
          dotCount={4}
          dotSize={30}
          dotSpacing={8}
          duration={300}
          dotStyle={{borderRadius: 30}}
          animationType="FADE_IN_OUT"
        />
      </View>
    </View>
  );
};

export default GettingCall;
