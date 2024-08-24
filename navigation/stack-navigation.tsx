import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '@hive/screens/main-screen/main-screen';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
