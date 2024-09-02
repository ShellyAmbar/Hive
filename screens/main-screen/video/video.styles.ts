import {GlobalColors} from '@hive/styles/colors';
import {StyleSheet} from 'react-native';

const createStyle = (isHiding: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: GlobalColors.BgColors.Bg2,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    myVideo: {
      height: 150,
      width: 150,
      position: 'absolute',
      bottom: 100,
      right: 10,
      zIndex: 2,
    },
    otherVideo: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 0,
    },
    subTitle: {
      color: GlobalColors.TextColors.white,
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'Jersey10-Regular',
      marginBottom: 50,
    },
    buttons: {
      position: 'absolute',
      bottom: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      zIndex: 4,
    },
    hangupBtn: {
      backgroundColor: GlobalColors.SystemColors.Error,
      position: 'relative',
    },
    switchBtn: {
      backgroundColor: GlobalColors.Border,
      position: 'relative',
      width: 45,
      height: 45,
    },
    myShade: {
      zIndex: 3,
      backgroundColor: GlobalColors.BgColors.Bg2,
    },
    otherShade: {
      zIndex: 1,
      backgroundColor: GlobalColors.BgColors.Bg2,
    },
    otherData: {
      zIndex: 2,
      position: 'absolute',
      top: 10,
      right: 20,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    otherImage: {
      borderRadius: 100,
      width: 80,
      height: 80,
    },
    otherText: {
      color: isHiding
        ? GlobalColors.TextColors.white
        : GlobalColors.TextColors.primary,
      fontSize: 22,
      fontFamily: 'Jersey10-Regular',
    },

    content: {
      flex: 1,
      zIndex: 3,
    },
  });

export default createStyle;
