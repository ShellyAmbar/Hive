import {View, Image, Text} from 'react-native';
import React from 'react';
import createstyle from './video.styles';
import IVideoProps from './interfaces';
import FloatingButton from '@hive/components/floating-button/floating-button';
import {RTCView} from 'react-native-webrtc';
import Waiting from '../waiting/waiting';
import IconVideo from 'react-native-vector-icons/FontAwesome5';
import IconVideoSwitch from 'react-native-vector-icons/Ionicons';
import IconHideSwitch from 'react-native-vector-icons/Feather';
import Spacer from '@hive/components/spacer/spacer';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';

import {GlobalColors} from '@hive/styles/colors';
import ActionsFloatingButton from 'rn-actions-floating-button';

const Video = ({
  localStrem,
  remoteStrem,
  hangup,
  switchCamera,
  isFront,
  setIsHideMe,
  isHideMe,
  isHideUser,
}: IVideoProps) => {
  const {
    incomingUserName,
    incomingUserImage,
    incomingUserAge,
    incomingUserCountry,
  } = useSelector(state => state.user);

  const styles = createstyle(isHideUser);

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
      {isHideUser && (
        <View style={[styles.otherVideo, styles.otherShade]}>
          <LottieView
            source={require('@hive/assets/lotties/sparks.json')}
            autoPlay
            loop
            speed={2}
            style={styles.lottie}
          />
          <LottieView
            source={require('@hive/assets/lotties/sparks.json')}
            autoPlay
            loop
            speed={2}
            style={[styles.lottie, {transform: [{rotate: '90deg'}]}]}
          />
          <LottieView
            source={require('@hive/assets/lotties/stars.json')}
            autoPlay
            loop
            speed={2}
            style={styles.lottie}
          />
          <LottieView
            source={require('@hive/assets/lotties/bubbles.json')}
            autoPlay
            loop
            speed={1}
            style={styles.lottie}
          />
        </View>
      )}
      <View style={styles.otherData}>
        {incomingUserName && (
          <Text
            style={
              styles.otherText
            }>{`${incomingUserName}, ${incomingUserAge}\nfrom ${incomingUserCountry}`}</Text>
        )}
        <Spacer size={12} />
        {incomingUserImage?.length > 0 && (
          <Image source={{uri: incomingUserImage}} style={styles.otherImage} />
        )}
      </View>

      <RTCView
        streamURL={localStrem?.toURL()}
        objectFit="cover"
        style={styles.myVideo}
      />
      {isHideMe && (
        <View style={[styles.myVideo, styles.myShade]}>
          <LottieView
            source={require('@hive/assets/lotties/sparks.json')}
            autoPlay
            loop
            speed={2}
            style={styles.lottie}
          />
          <LottieView
            source={require('@hive/assets/lotties/sparks.json')}
            autoPlay
            loop
            speed={2}
            style={[styles.lottie, {transform: [{rotate: '90deg'}]}]}
          />
          <LottieView
            source={require('@hive/assets/lotties/stars.json')}
            autoPlay
            loop
            speed={2}
            style={styles.lottie}
          />
          <LottieView
            source={require('@hive/assets/lotties/bubbles.json')}
            autoPlay
            loop
            speed={1}
            style={styles.lottie}
          />
        </View>
      )}

      <View style={styles.buttons}>
        <ActionsFloatingButton
          mainButton={{
            id: 0,
            style: {
              backgroundColor: GlobalColors.Brand.secondary,
            },
            icon: () => <AntDesign name="plus" size={20} color="#FFFF" />,
          }}
          animateMainButton={true}
          style={styles.actionsButton}
          actionButtons={[
            {
              id: 0,
              icon: () => <Entypo name="rocket" size={20} color="#FFFF" />,
              onClick: () => {
                () => {};
              },
              style: {backgroundColor: GlobalColors.Brand.secondary},
            },
            {
              id: 1,
              icon: () => (
                <Entypo name="heart-outlined" size={20} color="#FFFF" />
              ),

              onClick: () => {
                () => {};
              },
              style: {backgroundColor: GlobalColors.Brand.secondary},
            },
            {
              id: 2,
              icon: () => (
                <Ionicons name="flame-sharp" size={20} color="#FFFF" />
              ),
              onClick: () => {
                () => {};
              },
              style: {backgroundColor: GlobalColors.Brand.secondary},
            },
            {
              id: 3,
              icon: () => <AntDesign name="like2" size={20} color="#FFFF" />,
              onClick: () => {
                () => {};
              },
              style: {backgroundColor: GlobalColors.Brand.secondary},
            },
            {
              id: 4,
              icon: () => (
                <Material name="party-popper" size={20} color="#FFFF" />
              ),

              onClick: () => {
                () => {};
              },
              style: {backgroundColor: GlobalColors.Brand.secondary},
            },
            {
              id: 5,
              icon: () => <Material name="unicorn" size={20} color="#FFFF" />,
              onClick: () => {
                () => {};
              },
              style: {backgroundColor: GlobalColors.Brand.secondary},
            },
            {
              id: 6,
              icon: () => (
                <Ionicons name="flower-outline" size={20} color="#FFFF" />
              ),
              onClick: () => {
                () => {};
              },
              style: {backgroundColor: GlobalColors.Brand.secondary},
            },
          ]}
        />
        <FloatingButton
          icon={() =>
            isHideMe ? (
              <IconHideSwitch size={24} color={'#000'} name={'camera'} />
            ) : (
              <IconHideSwitch size={24} color={'#000'} name={'camera-off'} />
            )
          }
          onPress={() => setIsHideMe(!isHideMe)}
          containerStyle={styles.switchBtn}
        />
        <Spacer size={12} isVertical={false} />
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
