import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.BgColors.Bg2,
    height: 60,
    width: 60,
    borderRadius: 50,
    position: 'absolute',
    left: 30,
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
