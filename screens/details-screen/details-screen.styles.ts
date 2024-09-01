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

    backgroundColor: GlobalColors.Shades.primary,

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

    fontSize: 35,

    fontFamily: 'Jersey10-Regular',
  },
  subTitle: {
    color: GlobalColors.Brand.thierd,

    fontSize: 20,

    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
    width: '100%',
  },
  textInputContainer: {
    borderColor: GlobalColors.TextColors.white,
    borderBottomWidth: 1,

    width: '90%',
  },
  textInputText: {
    color: GlobalColors.TextColors.white,
    fontFamily: 'Jersey10-Regular',
    fontSize: 30,
    textAlign: 'center',
  },
  image: {
    width: '70%',
    height: 200,
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: -10,
    left: -10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: GlobalColors.TextColors.white,
    zIndex: 4,
    padding: 5,
  },
  text: {
    color: GlobalColors.TextColors.white,

    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
  },
  btnText: {
    color: GlobalColors.Brand.secondary,

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
});
