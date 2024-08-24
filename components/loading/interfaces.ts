import {ViewStyle} from 'react-native';
type AnimationType = 'UP_AND_DOWN' | 'FADE_IN_OUT';

interface ILoadingDotsProps {
  dotCount: number;
  dotSize: number;
  dotSpacing: number;
  duration: number;
  colors?: string[];
  dotStyle?: ViewStyle;
  animationType?: AnimationType;
  slideHeight?: number;
}

export {ILoadingDotsProps, AnimationType};
