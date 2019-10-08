import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../../services/token-service';
import Header from '../Header/Header';

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={(componentProps) =>
        TokenService.hasAuthToken() ? (
          <Redirect to={'/user'} />
        ) : (
          <>
            <Header hasAuthToken={false} />
            <Component {...componentProps} />
          </>
        )
      }
    />
  );
}
