import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  subTitle: {
    color: GlobalColors.TextColors.white,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Jersey10-Regular',
    marginBottom: 50,
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
  content: {
    flex: 1,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hangupBtn: {
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: GlobalColors.SystemColors.Error,
  },
  createBtn: {
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: GlobalColors.SystemColors.Success,
  },
});
