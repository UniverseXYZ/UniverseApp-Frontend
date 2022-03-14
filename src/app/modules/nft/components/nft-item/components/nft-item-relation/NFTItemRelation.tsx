import { Avatar, Box, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { NFTRelationType } from '../../../../enums';
import { NFT_RELATION_TYPE_NAMES } from '../../../../constants';
import { useHistory } from 'react-router-dom';
import Blockies from 'react-blockies';
import { utils } from 'ethers';
import { shortenEthereumAddress } from '../../../../../../../utils/helpers/format'

export interface INFTItemRelationProps {
  type: NFTRelationType;
  image: string;
  value: string;
  linkParam: string;
  externalOwner?: boolean
}

export const NFTItemRelation = ({ type, image, value, linkParam, externalOwner }: INFTItemRelationProps) => {
  const router = useHistory();

  let owner = value;
  let ownerName = '';
  let avatar = null;

  if(externalOwner) {
    if(utils.isAddress(value)) {
       ownerName = shortenEthereumAddress(owner);
    }
    avatar = (
          <Box style={{ borderRadius: '50%', overflow: 'hidden'}}>
            <Blockies seed={owner} size={9} scale={4} />
          </Box>
        )
  } else {
    ownerName = `${owner.charAt(0)}`;

    avatar = (
        <Avatar
            w={'26px'}
            h={'26px'}
            src={image}
            name={ownerName}
            border={'2px solid white'}
            _notFirst={{
              marginLeft: '-7px',
              position: 'relative',
            }}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              switch (type) {
                case NFTRelationType.CREATOR: return router.push(`/${linkParam}`);
                case NFTRelationType.COLLECTION: return router.push(`/collection/${linkParam}`);
                case NFTRelationType.OWNER: return router.push(`/${linkParam}`);
              }
            }}
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
      {avatar}
    </Tooltip>
  );
};
