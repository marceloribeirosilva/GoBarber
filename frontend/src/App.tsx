import React from 'react';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import AuthContext from './hooks/auth';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Marcelo' }}>
      <SignIn />
    </AuthContext.Provider>

    <GlobalStyle />
  </>
);

export default App;
