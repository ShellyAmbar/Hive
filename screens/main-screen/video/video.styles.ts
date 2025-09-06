import { GlobalColors } from '@hive/styles/colors';
import { StyleSheet } from 'react-native';

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
      height: '50%',

      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      zIndex: 2,
      overflow: 'hidden',
    },
    otherVideo: {
      position: 'absolute',
      height: '50%',
      top: 0,
      right: 0,
      left: 0,
      zIndex: 2,
      overflow: 'hidden',
    },
    fitInside: {
      position: 'absolute',

      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
    lottie: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    subTitle: {
      color: GlobalColors.TextColors.white,
      fontSize: 30,
      textAlign: 'center',
      fontFamily: 'Jersey10-Regular',
      marginBottom: 50,
    },
    actionsButton: {
      position: 'absolute',
      bottom: 100,
      right: 50,
    },
    buttons: {
      position: 'absolute',
      bottom: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      zIndex: 6,
    },
    hangupBtn: {
      backgroundColor: GlobalColors.SystemColors.Error,
      position: 'relative',
    },
    switchBtn: {
      backgroundColor: GlobalColors.BgColors.Bg11,
      position: 'relative',
      width: 45,
      height: 45,
    },
    myShade: {
      zIndex: 3,
      backgroundColor: GlobalColors.BgColors.Bg9,
    },
    otherShade: {
      zIndex: 3,
      backgroundColor: GlobalColors.BgColors.Bg9,
    },
    otherData: {
      zIndex: 5,
      position: 'absolute',
      top: 0,
      right: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomLeftRadius: 30,

      backgroundColor: GlobalColors.BgColors.Bg4,
    },
    otherImage: {
      borderRadius: 100,
      width: 60,
      height: 60,
    },
    otherText: {
      color: GlobalColors.TextColors.white,
      fontSize: 14,
      fontFamily: 'Jersey10-Regular',
      textAlign: 'center',
    },

    otherAnimation: {
      zIndex: 4,
    },
    myAnimation: {
      zIndex: 4,
    },
  });

export default createStyle;
