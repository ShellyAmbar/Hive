import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: GlobalColors.BgColors.Bg2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    marginBottom: 20,
    fontFamily: 'Jersey10-Regular',
  },
  subTitle: {
    color: GlobalColors.Brand.thierd,
    zIndex: 3,
    fontSize: 25,
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },

  btnText: {
    color: GlobalColors.Brand.primary,

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
  shade: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: GlobalColors.BgColors.Bg2,
  },
});
