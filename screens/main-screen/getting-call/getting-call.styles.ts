import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.BgColors.Bg2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  horizontal: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 50,
  },
  content: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  subTitle: {
    color: GlobalColors.TextColors.white,

    fontSize: 30,

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
  image: {
    width: 200,
    height: 200,
    borderColor: GlobalColors.TextColors.white,
    borderBottomWidth: 1,
    borderRadius: 100,
  },
});
