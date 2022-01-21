import Blockies from 'react-blockies';

import { Image, Box } from "@chakra-ui/react";

import {getCollectionBackgroundColor} from "../../../../../../utils/helpers";


export const Bindings = [
  {
    name: 'Creator',
    getLink: (nft: any) =>  `/${nft.creator.universePageUrl}`,
    getImage: (nft: any) =>
      nft.creator.profileImageUrl
        ? (
      <Image src={nft.creator.profileImageUrl} sx={{
        borderRadius: '50%',
        objectFit: 'cover',
        h: '30px',
        w: '30px',
      }} />
    )
    : (
          <Box style={{ borderRadius: '50%', overflow: 'hidden'}}>
            <Blockies seed={nft.creator.address} size={9} scale={4} />
          </Box>
        ),
    getValue: (nft: any) => nft.creator.displayName || nft.creator.address,
  },
  {
    name: 'Collection',
    getLink: (nft: any) =>  `/collection/${nft.collection.address}`,
    getImage: (nft: any) =>
      nft.collection.coverUrl
        ? (
          <Image src={nft.collection.coverUrl} sx={{
            borderRadius: '50%',
            objectFit: 'cover',
            h: '30px',
            w: '30px',
          }} />
        )
        : (
          <div
            className="random--bg--color"
            style={{ backgroundColor: getCollectionBackgroundColor(nft.collection) }}
          >
            {nft.collection.name.charAt(0)}
          </div>
        ),
    getValue: (nft: any) => nft.collection.name,
  },
  {
    name: 'Owner',
    getLink: (nft: any) =>  `/${nft.owner.universePageUrl}`,
    getImage: (nft: any) =>
      nft.owner.avatar || nft.owner.profileImageUrl
        ? (
          <Image src={nft.owner.avatar || nft.owner.profileImageUrl} sx={{
            borderRadius: '50%',
            objectFit: 'cover',
            h: '30px',
            w: '30px',
          }} />
        )
        : (
          <Box style={{ borderRadius: '50%', overflow: 'hidden'}}>
            <Blockies seed={nft.creator.address} size={9} scale={4} />
          </Box>
        ),
    getValue: (nft: any) => nft.owner.address,
  },
];
