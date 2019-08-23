import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';
import Header from '../Header/Header';

export default function PrivateRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <>
            <Header hasAuthToken={true} />
            <Component {...componentProps} />{' '}
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: componentProps.location }
            }}
          />
        )
      }
    />
  );
}
