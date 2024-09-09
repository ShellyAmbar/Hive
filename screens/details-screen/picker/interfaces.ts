import {TextStyle, ViewStyle} from 'react-native';

type Item = {
  id: number;
  text: string;
  uri?: string;
  onClick: () => void;
};
type PickerProps = {
  dataInput: Item[];
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  defaultSelectedId: number;
};

export {Item, PickerProps};
