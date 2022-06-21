import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Avatar } from '@app/components'

const HeaderAvatar = () => {
  const { loggedInArtist, address } = useAuthStore(s => ({loggedInArtist: s.loggedInArtist, address: s.address}))

  return (
    <Avatar
      src={loggedInArtist.avatar}
      name={loggedInArtist.name}
      address={address}
      width='40px'
      height='40px'
    />
  );
};

export default HeaderAvatar;
