import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';
import { useAuthContext } from '../../contexts/AuthContext';

function AuthenticatedRoute({ children, requireProfile, ...restOfProps }) {
  const { isAuthenticated, isWalletConnected, loggedInArtist } = useAuthContext();
  const accessToken = localStorage.getItem('xyz_access_token');

  const validateRoute = () => {
    const hasSignedIn = accessToken || (isAuthenticated && isWalletConnected);
    if (!requireProfile && hasSignedIn) {
      return true;
    }
    const hasSetupProfile =
      loggedInArtist && loggedInArtist.universePageAddress && loggedInArtist.avatar;
    if (requireProfile && hasSetupProfile) {
      return true;
    }

    return false;
  };

  return validateRoute() ? <Route {...restOfProps}>{children}</Route> : <Redirect to="/" />;
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  requireProfile: PropTypes.bool,
};

AuthenticatedRoute.defaultProps = {
  requireProfile: false,
};
export default AuthenticatedRoute;
