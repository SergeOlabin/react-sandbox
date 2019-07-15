import * as React from 'react';
import { RounterLink } from '../router-link/router-link';
import './navbar.scss';

export interface INavbarProps {
  routes: string[];
}

export function NavbarComponent({ routes }: INavbarProps) {
  const routeTemaplateData = routes.map(value => (
    <div key={value} className="route-link">
      <RounterLink route={value}>{value}</RounterLink>
    </div>
  ));

  return <div className="navbar">{routeTemaplateData}</div>;
}
