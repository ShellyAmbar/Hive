import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: GlobalColors.BgColors.Bg9,
  },
  content: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtn: {
    alignSelf: 'center',

    backgroundColor: GlobalColors.Shades.primary,
    zIndex: 3,
    width: '50%',
    paddingVertical: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: GlobalColors.Brand.primary,
  },
  disabledText: {
    color: GlobalColors.Shades.primary,
  },
  title: {
    color: GlobalColors.TextColors.white,

    zIndex: 3,
    fontSize: 45,

    fontFamily: 'Jersey10-Regular',
  },
  subTitle: {
    color: GlobalColors.Brand.thierd,
    zIndex: 3,
    fontSize: 25,

    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },

  btnText: {
    color: GlobalColors.Brand.secondary,

    fontSize: 22,
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
  image: {
    zIndex: 3,
    width: '60%',
    height: 200,
    borderRadius: 100,
  },
  shade: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: GlobalColors.BgColors.Bg2,
  },
  lottie: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
