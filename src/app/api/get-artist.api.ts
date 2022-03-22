import axios from 'axios';
import { utils } from 'ethers';

import { mapUserData } from '../../utils/helpers';
import { GetUserApi } from '../modules/nft/api';

export const getArtistApi = async (artistUsername: string) => {
  if (utils.isAddress(artistUsername)) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/user/get-profile-info/${artistUsername.toLowerCase()}`;

    const { data, status } = await axios.get(url);
    if (data.error || status !== 200) {
      return new Error('404');
    }
  
    return {
      artist: mapUserData(data),
      address: data.address.toLowerCase()
    };
  
  }

  const url = `${process.env.REACT_APP_API_BASE_URL}/api/pages/user-profile/${artistUsername}`;

  const { data, status } = await axios.get(url);
  if (data.error || status !== 200) {
    return new Error('404');
  }

  return {
    artist: mapUserData(data),
    address: data.address.toLowerCase()
  };
}
