import {View} from 'react-native';
import React from 'react';
import FloatingButton from '@hive/components/floating-button/floating-button';
import styles from './main-screen.styles';
const MainScreen = () => {
  return (
    <View style={styles.container}>
      <FloatingButton
        containerStyle={{bottom: 50, alignSelf: 'center'}}
        iconName="video"
        onPress={() => {}}
      />
    </View>
  );
};

export default MainScreen;
