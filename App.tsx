/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';

import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import StackNavigation from './navigation/stack-navigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
