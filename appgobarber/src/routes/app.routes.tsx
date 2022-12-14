import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import {useAuth} from '../hooks/auth';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const {user} = useAuth();

  return (
    <App.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#312e37'},
      }}>
      <App.Screen name="Dashboard" component={Dashboard} />
    </App.Navigator>
  );
};

export default AppRoutes;
