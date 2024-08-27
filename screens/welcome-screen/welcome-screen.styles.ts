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
    backgroundColor: GlobalColors.Brand.primary,
    zIndex: 3,
    width: '50%',
    paddingVertical: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: GlobalColors.TextColors.white,
    zIndex: 3,
    fontSize: 30,
    marginBottom: 20,
  },
  subTitle: {
    color: GlobalColors.Brand.secondary,
    zIndex: 3,
    fontSize: 20,
    marginBottom: 50,
    textAlign: 'center',
  },
  btnText: {
    color: GlobalColors.TextColors.white,
    fontSize: 20,
    textAlign: 'center',
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
