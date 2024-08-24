import {ViewStyle} from 'react-native';

interface IFloatingButton {
  iconName: string;
  iconColor?: string;
  containerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  onPress: () => void;
  iconSize?: number;
}

export default IFloatingButton;
