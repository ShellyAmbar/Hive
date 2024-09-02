import {Text, View, Image} from 'react-native';
import React from 'react';
import styles from './getting-call.styles';
import FloatingButton from '@hive/components/floating-button/floating-button';
import IGettingCall from './interfaces';
import Loading from 'react-native-animated-loading-dots';
import {GlobalColors} from '@hive/styles/colors';
import {useSelector} from 'react-redux';
import {RTCView} from 'react-native-webrtc';
import Spacer from '@hive/components/spacer/spacer';
import Icon from 'react-native-vector-icons/FontAwesome5';
const GettingCall = ({hangup, join, localStream}: IGettingCall) => {
  const {
    incomingUserName,
    incomingUserImage,
    incomingUserAge,
    incomingUserCountry,
  } = useSelector(state => state.user);

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
          {`${incomingUserName}, ${incomingUserAge} from ${incomingUserCountry} ` +
            '\n' +
            ' is calling you'}
        </Text>

        <Spacer size={52} />
        {incomingUserImage?.length > 0 && (
          <>
            <Image style={styles.image} source={{uri: incomingUserImage}} />
            <Spacer size={52} />
          </>
        )}

        <View style={styles.horizontal}>
          <FloatingButton
            containerStyle={{
              position: 'relative',

              backgroundColor: GlobalColors.SystemColors.Success,
            }}
            icon={() => <Icon size={24} color={'#FFF'} name="phone" />}
            onPress={() => join()}
          />
          <FloatingButton
            containerStyle={{
              position: 'relative',

              backgroundColor: GlobalColors.SystemColors.Error,
            }}
            icon={() => <Icon size={24} color={'#FFF'} name="phone" />}
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
