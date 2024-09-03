import {StyleSheet} from 'react-native';
const createStyles = ({
  primaryColor,
  seconderyColor,
}: {
  primaryColor: string;
  seconderyColor: string;
}) =>
  StyleSheet.create({
    sliderContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: '100%',
      height: 80,
    },
    sliderBack: {
      height: 8,
      backgroundColor: seconderyColor,
      borderRadius: 20,
      position: 'absolute',
      bottom: 0,
    },
    sliderFront: {
      height: 8,
      backgroundColor: primaryColor,
      borderRadius: 20,
      position: 'absolute',
      bottom: 0,
    },
    thumb: {
      left: -10,
      width: 20,
      height: 20,
      position: 'absolute',
      bottom: -5,
      backgroundColor: 'white',
      borderColor: primaryColor,
      borderWidth: 5,
      borderRadius: 10,
    },
    label: {
      position: 'absolute',
      top: -70,
      bottom: 30,
      backgroundColor: seconderyColor,
      borderRadius: 50,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: primaryColor,
      borderWidth: 2,
      paddingHorizontal: 10,
    },
    labelLine: {
      position: 'absolute',
      top: -18,
      bottom: 0,
      backgroundColor: primaryColor,
      width: 5,
      height: 15,
      alignSelf: 'center',
      borderRadius: 50,
    },
    labelText: {
      color: primaryColor,
      fontWeight: 'bold',
      fontSize: 16,
      width: '100%',
      textAlign: 'center',
    },
  });
export default createStyles;
