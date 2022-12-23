import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {CartProvider} from './cart';

type Props = {
  children: React.ReactNode;
};

const AppProvider: React.FC<Props> = ({children}) => {
  return (
    <CartProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </CartProvider>
  );
};

export default AppProvider;
