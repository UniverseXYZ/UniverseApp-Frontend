import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext';
import Cookies from 'js-cookie';

function AuthenticatedRoute({ children, ...restOfProps }) {
  const { isAuthenticated, isWalletConnected } = useAuthContext();
  const accessToken = Cookies.get('xyz_access_token');

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
