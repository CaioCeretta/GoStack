import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

interface Props {
  children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);
