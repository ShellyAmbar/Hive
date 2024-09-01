import {ViewStyle} from 'react-native';

interface IFloatingButton {
  containerStyle?: ViewStyle;
  onPress: () => void;
  icon?: () => JSX.Element;
}

export default IFloatingButton;
