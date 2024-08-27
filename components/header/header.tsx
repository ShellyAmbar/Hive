import React from 'react';
import Styles from './header.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderProps from './interfaces';
import {Text, TouchableOpacity, View} from 'react-native';
const Header = ({title, onClickBack, backButtonColor}: HeaderProps) => {
  return (
    <View style={Styles.horizontal}>
      {onClickBack ? (
        <TouchableOpacity
          style={Styles.button}
          onPress={() => {
            onClickBack();
          }}>
          {/* <Back stroke={backButtonColor ?? "#000"} width={24} height={24} /> */}
          <Icon
            name={'arrow-back'}
            style={{}}
            color={backButtonColor ?? '#000'}
            size={24}
          />
        </TouchableOpacity>
      ) : (
        <View style={{width: 24, height: 24}} />
      )}
      <Text style={Styles.title}>{title ?? ''}</Text>
      <View style={Styles.space} />
    </View>
  );
};

export default Header;
