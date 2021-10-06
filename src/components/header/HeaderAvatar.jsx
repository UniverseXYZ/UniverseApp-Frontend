import React from 'react';
import PropTypes from 'prop-types';
import Blockies from 'react-blockies';

const HeaderAvatar = ({ avatarUrl, address, scale }) => (
  <>
    {avatarUrl ? (
      <img className={scale === 3 ? 'blockie-md' : 'blockie-lg'} src={avatarUrl} alt="avatar" />
    ) : (
      <Blockies seed={address} size={9} scale={scale} />
    )}
  </>
);

HeaderAvatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
};

export default HeaderAvatar;
