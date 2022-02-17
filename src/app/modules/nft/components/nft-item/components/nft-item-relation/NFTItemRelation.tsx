import { Avatar, Tooltip } from '@chakra-ui/react';
import React from 'react';

import { NFTRelationType } from '../../../../enums';
import { NFT_RELATION_TYPE_NAMES } from '../../../../constants';

export interface INFTItemRelationProps {
  type: NFTRelationType;
  image: string;
  value: string;
}

export const NFTItemRelation = ({ type, image, value }: INFTItemRelationProps) => (
  <Tooltip
    hasArrow
    label={`${NFT_RELATION_TYPE_NAMES[type]}: ${value}`}
    placement={'top'}
    variant={'black'}
    fontWeight={700}
  >
    <Avatar
      w={'26px'}
      h={'26px'}
      src={image}
      name={`${value.charAt(0)}`}
      border={'2px solid white'}
      _notFirst={{
        marginLeft: '-7px',
        position: 'relative',
      }}
    />
  </Tooltip>
);
