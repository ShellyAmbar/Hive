import { GlobalColors } from '@hive/styles/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    zIndex: 3,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtn: {
    marginTop: '30%',
  },
  disabledBtn: {
    backgroundColor: GlobalColors.Brand.primary,
  },
  disabledText: {
    color: GlobalColors.Shades.primary,
  },
  title: {
    color: GlobalColors.TextColors.white,
    fontSize: 45,

    fontFamily: 'Jersey10-Regular',
  },
  subTitle: {
    color: GlobalColors.TextColors.white,
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },

  btnText: {
    color: GlobalColors.TextColors.white,

    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },
  video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },

  shade: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: GlobalColors.BgColors.Bg10,
  },
});
