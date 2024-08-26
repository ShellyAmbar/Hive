import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.BgColors.Bg2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 50,
  },
});
