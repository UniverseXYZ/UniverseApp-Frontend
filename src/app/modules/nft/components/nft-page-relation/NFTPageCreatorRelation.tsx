import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import Blockies from 'react-blockies';

import { IUser } from '../../types';
import { NFTRelationType } from '../../enums';
import { NFTPageRelation } from './NFTPageRelation';
import { RelationAvatar } from './RelationAvatar';

interface INFTPageCreatorRelationProps {
  creator: IUser;
  avatarStyle?: BoxProps;
}

export const NFTPageCreatorRelation = ({ creator, avatarStyle = {} } : INFTPageCreatorRelationProps) => {
  return (
    <NFTPageRelation
      type={NFTRelationType.CREATOR}
      href={`/${creator?.universePageUrl}`}
      value={`${creator?.displayName || creator?.address}`}
      renderAvatar={() => (creator?.profileImageUrl
          ? <RelationAvatar src={creator?.profileImageUrl} {...avatarStyle} />
          : (
            <Box style={{ borderRadius: '50%', overflow: 'hidden'}} {...avatarStyle}>
              <Blockies seed={creator.address} size={9} scale={4} />
            </Box>
          )
      )}
    />
  );
}
