import {TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './floating-button.styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IFloatingButton from './interfaces';
const FloatingButton = ({
  iconName,
  containerStyle,
  iconStyle,
  onPress,
  iconColor = '#FFF',
  iconSize = 30,
}: IFloatingButton) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles.shadow, {...containerStyle}]}
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
