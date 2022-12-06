import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <NavigationContainer>
      <Auth.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: '#312e37',
          },
        }}
      >
        <Auth.Screen name="SignIn" component={SignIn} />
      </Auth.Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
