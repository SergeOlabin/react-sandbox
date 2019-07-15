import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface IRounterLinkProps {
  route: string;
  children?: any;
}

export function RounterLink({ route, children }: IRounterLinkProps) {
  return (
    <NavLink
      exact={true}
      to={route}
      activeStyle={{
        textDecoration: 'none',
        color: 'black',
      }}
    >
      {children}
    </NavLink>
  );
}
