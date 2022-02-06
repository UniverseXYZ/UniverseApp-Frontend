import { Image, Box } from '@chakra-ui/react';
import Blockies from 'react-blockies';

import { getCollectionBackgroundColor } from '../../../../../../utils/helpers';
import { INFT } from '../../../types';

export const Bindings = [
  {
    name: 'Creator',
    getLink: (nft: INFT) => `/${nft.creator?.universePageUrl}`,
    getImage: (nft: INFT) => nft.creator?.profileImageUrl ? (
      <Image
        src={nft.creator.profileImageUrl}
        sx={{
          borderRadius: '50%',
          objectFit: 'cover',
          h: '30px',
          w: '30px',
        }}
      />
    ) : (
      <Box style={{ borderRadius: '50%', overflow: 'hidden'}}>
        <Blockies seed={nft.creator?.address} size={9} scale={4} />
      </Box>
    ),
    getValue: (nft: INFT) => nft.creator?.displayName || nft.creator?.address,
  },
  {
    name: 'Collection',
    getLink: (nft: INFT) => `/collection/${nft.collection?.address}`,
    getImage: (nft: INFT) => nft.collection?.coverUrl ? (
      <Image
        src={nft.collection?.coverUrl}
        sx={{
          borderRadius: '50%',
          objectFit: 'cover',
          h: '30px',
          w: '30px',
        }}
      />
    ) : (
      <Box
        className="random--bg--color"
        sx={{
          alignItems: 'center',
          bg: getCollectionBackgroundColor(nft.collection),
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          h: '30px',
          w: '30px',
        }}
      >
        {nft.collection?.name.charAt(0)}
      </Box>
    ),
    getValue: (nft: INFT) => nft.collection?.name,
  },
  {
    name: 'Owner',
    getLink: (nft: INFT) => `/${nft.owner?.universePageUrl}`,
    getImage: (nft: INFT) => nft.owner?.profileImageUrl ? (
      <Image
        src={nft.owner.profileImageUrl}
        sx={{
          borderRadius: '50%',
          objectFit: 'cover',
          h: '30px',
          w: '30px',
        }}
      />
      ) : (
        <Box style={{ borderRadius: '50%', overflow: 'hidden'}}>
          <Blockies seed={nft.owner?.address} size={9} scale={4} />
        </Box>
    ),
    getValue: (nft: INFT) => nft.owner?.displayName || nft.owner?.address,
  },
];
