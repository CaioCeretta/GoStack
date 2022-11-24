import React from 'react';
import {
  BrowserRouter as RouterContainer,
  Routes as RoutesItens,
  Route,
} from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <RouterContainer>
    <RoutesItens>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/repositories/:author/:repository"
        element={<Repository />}
      />
    </RoutesItens>
  </RouterContainer>
);

export default Routes;
