import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import AppContext from '../../ContextAPI';
import { useAuthContext } from '../../contexts/AuthContext';

function AuthenticatedRoute({ children, ...restOfProps }) {
  const { isAuthenticated, isWalletConnected } = useAuthContext();
  const accessToken = localStorage.getItem('access_token');

  return accessToken || (isAuthenticated && isWalletConnected) ? (
    <Route {...restOfProps}>{children}</Route>
  ) : (
    <Redirect to="/" />
  );
}
AuthenticatedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
export default AuthenticatedRoute;
