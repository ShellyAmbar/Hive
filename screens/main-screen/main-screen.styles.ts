import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.BgColors.Bg2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callBtn: {
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: GlobalColors.SystemColors.Success,
  },
});
