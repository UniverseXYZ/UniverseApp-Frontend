import { mapBackendUser } from '@app/modules/nft';
import axios from 'axios';
import { utils } from 'ethers';

import { mapUserData } from '../../utils/helpers';

export const getArtistApi = async (artistUsername: string) => {
  if (utils.isAddress(artistUsername)) {
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/user/get-profile-info/${artistUsername.toLowerCase()}`;

    const { data, status } = await axios.get(url);
    if (data.error || status !== 200) {
      return {
        mappedArtist: null,
        artist: null,
        address: "",
      }    
    }
  
    return {
      mappedArtist: mapBackendUser(data),
      artist: mapUserData(data),
      address: data.address?.toLowerCase() || "",
    };
  
  }

  const url = `${process.env.REACT_APP_API_BASE_URL}/api/pages/user-profile/${artistUsername}`;

  const { data, status } = await axios.get(url);
  if (data.error || status !== 200) {
    return {
      mappedArtist: null,
      artist: null,
      address: "",
    }
  }

  return {
    mappedArtist: mapBackendUser(data),
    artist: mapUserData(data),
    address: data.address?.toLowerCase() || "",
  };
}
