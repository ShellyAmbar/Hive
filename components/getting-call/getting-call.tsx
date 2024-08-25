import {View} from 'react-native';
import React from 'react';
import styles from './getting-call.styles';
import FloatingButton from '@hive/components/floating-button/floating-button';
import IGettingCall from './interfaces';
import Loading from 'react-native-animated-loading-dots';
import {GlobalColors} from '@hive/styles/colors';

const GettingCall = ({hangup, join}: IGettingCall) => {
  return (
    <View style={styles.container}>
      <FloatingButton
        containerStyle={{
          bottom: 50,
          alignSelf: 'center',
          backgroundColor: GlobalColors.SystemColors.Success,
        }}
        iconName="video"
        onPress={() => join()}
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
      <Loading
        dotCount={4}
        dotSize={30}
        dotSpacing={8}
        duration={300}
        dotStyle={{borderRadius: 5}}
        animationType="FADE_IN_OUT"
      />
    </View>
  );
};

export default GettingCall;
