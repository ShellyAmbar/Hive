/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';

import React from 'react';

import {LogBox, SafeAreaView, StatusBar} from 'react-native';
import StackNavigation from './navigation/stack-navigation';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
