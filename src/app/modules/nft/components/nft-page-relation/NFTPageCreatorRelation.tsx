import { Box } from '@chakra-ui/react';
import React from 'react';

import { IUser } from '../../../account/types';
import { NFTRelationType } from '../../enums';
import { NFTPageRelation } from './NFTPageRelation';
import { RelationAvatar } from './RelationAvatar';
import { Avatar } from '@app/components'

interface INFTPageCreatorRelationProps {
  creatorAddress: string;
  creator?: IUser;
}

export const NFTPageCreatorRelation: React.FC<INFTPageCreatorRelationProps> = (props) => {
  const { creatorAddress, creator } = props;

  return (
    <NFTPageRelation
      type={NFTRelationType.CREATOR}
      href={`/${creator?.universePageUrl || creatorAddress}`}
      value={`${creator?.displayName || creatorAddress}`}
      renderAvatar={() => (creator?.profileImageUrl
          ? <RelationAvatar src={creator?.profileImageUrl} />
          : (
            <Box borderRadius={'full'} overflow={'hidden'}>
              <Avatar
                address={creatorAddress}
                width='36px'
                height='36px'
              />
            </Box>
          )
      )}
    />
  );
}
