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
  const {incomingUserName, incomingUserImage} = useSelector(
    state => state.user,
  );
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
      {isHideUser && <View style={[styles.otherVideo, styles.otherShade]} />}
      <View style={styles.otherData}>
        {incomingUserName && (
          <Text style={styles.otherText}>{incomingUserName}</Text>
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
      {isHideMe && <View style={[styles.myVideo, styles.myShade]} />}

      <View style={styles.buttons}>
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
