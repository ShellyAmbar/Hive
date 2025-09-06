import { View, Image, Text } from 'react-native';
import React from 'react';
import createstyle from './video.styles';
import IVideoProps from './interfaces';
import FloatingButton from '@hive/components/floating-button/floating-button';
import { RTCView } from 'react-native-webrtc';
import Waiting from '../waiting/waiting';
import IconVideo from 'react-native-vector-icons/FontAwesome5';
import IconVideoSwitch from 'react-native-vector-icons/Ionicons';
import IconHideSwitch from 'react-native-vector-icons/Feather';
import Spacer from '@hive/components/spacer/spacer';
import LottieView from 'lottie-react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { GlobalColors } from '@hive/styles/colors';
import ActionsFloatingButton from 'rn-actions-floating-button';
import useVideo from './hooks/useVideo';

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
    actionButtons,
    incomingUserName,
    incomingUserImage,
    incomingUserAge,
    incomingUserCountry,
    isShowOtherUserAnimation,
    isShowMyAnimation,
    getAnimationSourceFromType,
    otherUserSelectedAnimation,
    mySelectedAnimation,
  } = useVideo();

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
      <View style={styles.otherVideo}>
        <RTCView
          streamURL={remoteStrem?.toURL()}
          objectFit="cover"
          style={styles.fitInside}
        />

        {isHideUser && (
          <View style={[styles.fitInside, styles.otherShade]}>
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
              style={[styles.lottie, { transform: [{ rotate: '90deg' }] }]}
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

        {isShowOtherUserAnimation &&
          getAnimationSourceFromType(otherUserSelectedAnimation) && (
            <LottieView
              source={getAnimationSourceFromType(otherUserSelectedAnimation)}
              autoPlay
              loop
              speed={1}
              resizeMode="cover"
              style={[styles.fitInside, styles.otherAnimation]}
            />
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
            <Image
              source={{ uri: incomingUserImage }}
              style={styles.otherImage}
            />
          )}
        </View>
      </View>

      {/*  saperator ------------------ */}

      <View style={styles.myVideo}>
        <RTCView
          streamURL={localStrem?.toURL()}
          objectFit="cover"
          style={styles.fitInside}
        />
        {isShowMyAnimation &&
          getAnimationSourceFromType(mySelectedAnimation) && (
            <LottieView
              source={getAnimationSourceFromType(mySelectedAnimation)}
              autoPlay
              loop
              speed={1}
              resizeMode="cover"
              style={[styles.fitInside, styles.myAnimation]}
            />
          )}

        {isHideMe && (
          <View style={[styles.fitInside, styles.myShade]}>
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
              style={[styles.lottie, { transform: [{ rotate: '90deg' }] }]}
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
      </View>
      <View style={styles.buttons}>
        <ActionsFloatingButton
          mainButton={{
            id: 0,
            style: {
              backgroundColor: GlobalColors.BgColors.Bg11,
            },
            icon: () => <AntDesign name="plus" size={20} color="#FFFF" />,
          }}
          animateMainButton={!isShowOtherUserAnimation}
          style={styles.actionsButton}
          actionButtons={actionButtons}
        />
        <FloatingButton
          icon={() =>
            isHideMe ? (
              <IconHideSwitch size={24} color={GlobalColors.TextColors.white} name={'camera'} />
            ) : (
              <IconHideSwitch size={24} color={GlobalColors.TextColors.white} name={'camera-off'} />
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
                color={GlobalColors.TextColors.white}
                name={'camera-reverse'}
              />
            ) : (
              <IconVideoSwitch
                size={24}
                color={GlobalColors.TextColors.white}
                name={'camera-reverse-outline'}
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
