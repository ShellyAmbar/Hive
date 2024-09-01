import {TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './floating-button.styles';
import IFloatingButton from './interfaces';
const FloatingButton = ({
  containerStyle,
  onPress,

  icon,
}: IFloatingButton) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow, {...containerStyle}]}
      onPress={onPress}>
      {icon && icon()}
    </TouchableOpacity>
  );
};

export default FloatingButton;
