import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
    zIndex: 3,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    zIndex: 3,
  },
  imageBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: GlobalColors.TextColors.white,
    borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtn: {
    alignSelf: 'center',

    backgroundColor: GlobalColors.Brand.thierd,

    width: '50%',
    paddingVertical: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: GlobalColors.Shades.primary,
  },
  disabledText: {
    color: GlobalColors.BgColors.Bg4,
  },
  title: {
    color: GlobalColors.TextColors.white,

    fontSize: 35,

    fontFamily: 'Jersey10-Regular',
  },
  subTitle: {
    color: GlobalColors.Brand.thierd,

    fontSize: 20,

    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },
  textInputContainer: {
    width: '90%',
  },
  numberInputContainer: {
    width: '70%',
  },
  textInputText: {
    borderColor: GlobalColors.TextColors.white,
    color: GlobalColors.TextColors.white,
    fontSize: 25,
    textAlign: 'center',
    borderBottomWidth: 1,
    fontFamily: 'Jersey10-Regular',
  },
  textInputNumber: {
    borderColor: GlobalColors.TextColors.white,
    color: GlobalColors.TextColors.white,
    fontFamily: 'Jersey10-Regular',
    fontSize: 30,
    textAlign: 'center',
    borderBottomWidth: 1,
  },
  errorStyle: {
    backgroundColor: 'transparent',
  },
  image: {
    width: '70%',
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: GlobalColors.Brand.thierd,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: -15,
    left: -15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: GlobalColors.TextColors.white,
    zIndex: 4,
    padding: 5,
    backgroundColor: GlobalColors.Brand.thierd,
  },
  text: {
    color: GlobalColors.TextColors.white,

    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },
  btnText: {
    color: GlobalColors.TextColors.white,

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
  btnChoose: {
    paddingVertical: 10,
  },
  textChoose: {
    color: GlobalColors.Brand.primary,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
