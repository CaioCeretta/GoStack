import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import GlobalStyle from './styles/global';

import Routes from './routes';
import { AppProvider } from './hooks';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </Router>
);

export default App;
