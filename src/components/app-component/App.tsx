import { map } from 'lodash';
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import {
  colorMixerRouteName,
  transferLiquidsRouteName,
} from '../../store/router-config';
import FooterComponent from '../footer/Footer';
import { NavbarComponent } from '../navbar/navbar';
import './App.scss';

const App: React.FC = () => {
  const routerConfig = {
    [transferLiquidsRouteName]: lazy(() =>
      import('../transfusion/transfusion'),
    ),
    [colorMixerRouteName]: lazy(() => import('../color-mixer/color-mixer')),
  };
  const routes = Object.keys(routerConfig);
  const routeTemplateData = map(routerConfig, (component, route) => (
    <Route key={route} path={`/${route}`} component={component} />
  ));

  return (
    <div>
      <NavbarComponent routes={routes}></NavbarComponent>

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routeTemplateData}
          <Route
            exact={true}
            path="/"
            component={() => <Redirect to={routes[0]} />}
          />
        </Switch>
      </Suspense>

      <FooterComponent />
    </div>
  );
};

export default App;
