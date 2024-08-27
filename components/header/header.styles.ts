import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 4,
    backgroundColor: 'transparent',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    alignSelf: 'flex-start',
  },
  space: {
    alignSelf: 'flex-end',
    width: 24,
    height: 24,
  },
  title: {
    color: GlobalColors.Brand.primary,
  },
});
