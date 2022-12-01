import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  </>
);

export default App;
