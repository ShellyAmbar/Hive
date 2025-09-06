import { GlobalColors } from '@hive/styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.SystemColors.Success,
    height: 60,
    width: 60,
    borderRadius: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: GlobalColors.Shades.primary,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,

    elevation: 15,
  },
});
