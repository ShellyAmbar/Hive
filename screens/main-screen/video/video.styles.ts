import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.BgColors.Bg2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myVideo: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  otherVideo: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  hangupBtn: {
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: GlobalColors.SystemColors.Error,
  },
});
