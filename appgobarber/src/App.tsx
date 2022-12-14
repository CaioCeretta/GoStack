import 'react-native-gesture-handler';
import React from 'react';

import {View, StatusBar, Text} from 'react-native';

import {
  useFonts,
  RobotoSlab_400Regular as RobotoSlab_Regular,
  RobotoSlab_500Medium as RobotoSlab_Medium,
  RobotoSlab_700Bold as RobotoSlab_Bold,
} from '@expo-google-fonts/roboto-slab';
import {NavigationContainer} from '@react-navigation/native';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    RobotoSlab_Regular,
    RobotoSlab_Medium,
    RobotoSlab_Bold,
  });

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
        <View style={{flex: 1, backgroundColor: '#312e38'}}>
          {fontsLoaded ? <Routes /> : <Text>EEEEEEEE, CARALHO</Text>}
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
