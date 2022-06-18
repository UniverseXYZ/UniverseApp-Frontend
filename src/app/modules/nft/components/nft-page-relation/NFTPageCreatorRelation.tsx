import { Box } from '@chakra-ui/react';
import React from 'react';
import Blockies from 'react-blockies';

import { IUser } from '../../../account/types';
import { NFTRelationType } from '../../enums';
import { NFTPageRelation } from './NFTPageRelation';
import { RelationAvatar } from './RelationAvatar';

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
              <Blockies seed={creatorAddress} size={9} scale={4} />
            </Box>
          )
      )}
    />
  );
}
