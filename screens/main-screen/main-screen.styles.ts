import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: GlobalColors.BgColors.Bg2,
  },
  callBtn: {
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: GlobalColors.SystemColors.Success,
  },
});
