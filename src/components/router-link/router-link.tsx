import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface IRounterLinkProps {
  route: string;
}

export function RounterLink({ route }: IRounterLinkProps) {
  return (
    <NavLink
      exact={true}
      to={route}
      activeStyle={{
        textDecoration: 'none',
        color: 'black',
      }}
    >
      {route}
    </NavLink>
  );
}
