import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import styles from './welcome-screen.styles';

import Spacer from '@hive/components/spacer/spacer';
import Video, { VideoRef } from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalColors } from '@hive/styles/colors';
const WelcomeScreen = props => {
  const onStart = () => {
    props.navigation.replace('Details');
  };
  const videoRef = useRef<VideoRef>(null);
  useEffect(() => {
    videoRef.current?.seek(0);
  }, []);
  const play = () => {
    videoRef.current?.seek(0);
  };
  return (
    <View style={styles.container}>
      <Video
        // Can be a URL or a local file.
        source={require('@hive/assets/videos/promotion.mp4')}
        // Store reference
        ref={videoRef}
        style={styles.video}
        resizeMode="cover"
        onEnd={play}
      />
      <LinearGradient
        colors={['transparent', GlobalColors.BgColors.Bg11]}
        style={styles.shade}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Dateroulette</Text>
        <Spacer size={22} />
        <Text style={styles.subTitle}>
          {'Ready to meet your\nnext date?'}
        </Text>

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => {
            onStart();
          }}>
          <Text style={styles.btnText}>START DATING</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
