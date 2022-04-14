import { Avatar, Box, Tooltip } from '@chakra-ui/react';
import React from 'react';
import Blockies from 'react-blockies';
import { utils } from 'ethers';
import { useRouter } from 'next/router';

import { NFTRelationType } from '../../../../enums';
import { NFT_RELATION_TYPE_NAMES } from '../../../../constants';
import { shortenEthereumAddress } from '../../../../../../../utils/helpers/format'

export interface INFTItemRelationProps {
  type: NFTRelationType;
  image: string;
  value: string;
  linkParam: string;
  externalOwner?: boolean
}

export const NFTItemRelation = ({ type, image, value, linkParam, externalOwner }: INFTItemRelationProps) => {
  const router = useRouter();

  let owner = value; // * displayName or address
  let ownerName = '';
  let avatar = null;

  const goToPage = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    switch (type) {
      case NFTRelationType.CREATOR: return router.push(`/${linkParam}`);
      case NFTRelationType.COLLECTION: return router.push(`/collection/${linkParam}`);
      case NFTRelationType.OWNER: return router.push(`/${linkParam}`);
    }
}
  // * If externalOwner prop is passed we set the owner address to be the owner display name and a blockie for his avatar (instead of profile image)
  if(externalOwner) {
    if(utils.isAddress(value)) {
       ownerName = shortenEthereumAddress(owner);

        avatar = (
          <Box ml={'-7px'} display={'inline-block'} overflow={'hidden'} borderRadius={'50%'} border={'2px solid #fff'} height={'27px'} width={'27px'} position={'relative'} onClick={(e: any) => {
            e.preventDefault();
            router.push(`/${owner}`)
          }}>
            <Blockies seed={owner} size={9} scale={3} />
          </Box>
        )
    }

  } else {
    ownerName = `${owner.charAt(0)}`;

    avatar = (
        <Avatar
            w={'27px'}
            h={'27px'}
            src={image}
            name={ownerName}
            border={'2px solid white'}
            _notFirst={{
              marginLeft: '-7px',
              position: 'relative',
            }}
            onClick={goToPage}
          />
      )
  }

  return (
    <Tooltip
      hasArrow
      label={`${NFT_RELATION_TYPE_NAMES[type]}: ${owner}`}
      placement={'top'}
      variant={'black'}
      fontWeight={700}
    >
      <>{avatar}</>
    </Tooltip>
  );
};
