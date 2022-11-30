import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <SignIn />
  </>
);

export default App;
