import {TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import styles from './floating-button.styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
const FloatingButton = ({
  iconName,
  containerStyle,
  iconStyle,
  onPress,
  iconColor = '#FFF',
  iconSize = 20,
}: {
  iconName: string;
  iconColor?: string;
  containerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  onPress: () => void;
  iconSize?: number;
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {...containerStyle}]}
      onPress={onPress}>
      <Icon
        name={iconName}
        style={{...iconStyle}}
        color={iconColor}
        size={iconSize}
      />
    </TouchableOpacity>
  );
};

export default FloatingButton;
