import React from 'react';
import PropTypes from 'prop-types';
import Blockies from 'react-blockies';
import { useAuthContext } from '../../contexts/AuthContext';

const HeaderAvatar = ({ scale }) => {
  const { loggedInArtist, address } = useAuthContext();

  return (
    <>
      {loggedInArtist.avatar ? (
        <img
          className={scale === 3 ? 'blockie-md' : 'blockie-lg'}
          src={loggedInArtist.avatar}
          alt="avatar"
        />
      ) : (
        <Blockies seed={address} size={9} scale={scale} />
      )}
    </>
  );
};

HeaderAvatar.propTypes = {
  scale: PropTypes.number.isRequired,
};

export default HeaderAvatar;
