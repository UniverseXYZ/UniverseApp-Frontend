import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import Blockies from 'react-blockies';

import { IUser } from '../../types';
import { NFTRelationType } from '../../enums';
import { NFTPageRelation } from './NFTPageRelation';
import { RelationAvatar } from './RelationAvatar';

interface INFTPageOwnerRelationProps {
  owner: IUser;
  avatarStyle?: BoxProps;
}

export const NFTPageOwnerRelation = ({ owner, avatarStyle = {} } : INFTPageOwnerRelationProps) => {
  return (
    <NFTPageRelation
      type={NFTRelationType.OWNER}
      href={`/${owner?.universePageUrl}`}
      value={`${owner?.displayName || owner?.address}`}
      renderAvatar={() => (owner?.profileImageUrl
          ? <RelationAvatar src={owner?.profileImageUrl} {...avatarStyle} />
          : (
            <Box style={{ borderRadius: '50%', overflow: 'hidden'}} {...avatarStyle}>
              <Blockies seed={owner.address} size={9} scale={4} />
            </Box>
          )
      )}
    />
  );
}
