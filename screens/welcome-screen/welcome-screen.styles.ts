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
    fontSize: 40,
    marginBottom: 20,
    fontFamily: 'Jersey10-Regular',
  },
  subTitle: {
    color: GlobalColors.Brand.thierd,
    zIndex: 3,
    fontSize: 20,
    marginBottom: 50,
    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },
  textInputContainer: {
    borderColor: GlobalColors.TextColors.white,
    borderWidth: 1,
    borderRadius: 10,

    width: '80%',
    zIndex: 3,
    marginBottom: 50,
  },
  textInputText: {
    color: GlobalColors.TextColors.white,
    fontFamily: 'Jersey10-Regular',
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    color: GlobalColors.TextColors.white,
    zIndex: 3,
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },
  btnText: {
    color: GlobalColors.Brand.primary,

    fontSize: 20,
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
