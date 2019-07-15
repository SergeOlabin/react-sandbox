import { map } from 'lodash';
import React from 'react';
import { Redirect, Route } from 'react-router';
import BoardComponent from '../board-component/Board';
import ColorMixer from '../color-mixer/color-mixer';
import { NavbarComponent } from '../navbar/navbar';
import './App.scss';

const App: React.FC = () => {
  const routerConfig = {
    pelelivayka: BoardComponent,
    'color-mixer': ColorMixer,
  };
  const routes = Object.keys(routerConfig);
  const routeTemplateData = map(routerConfig, (component, route) => (
    <Route key={route} path={`/${route}`} component={component} />
  ));

  return (
    <div>
      <NavbarComponent routes={routes}></NavbarComponent>

      {routeTemplateData}
      <Redirect from="/" to={routes[0]} />
    </div>
  );
};

export default App;
