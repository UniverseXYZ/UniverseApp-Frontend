import { Box } from '@chakra-ui/react';
import React from 'react';

import { IUser } from '../../../account/types';
import { NFTRelationType } from '../../enums';
import { NFTPageRelation } from './NFTPageRelation';
import { RelationAvatar } from './RelationAvatar';
import { Avatar } from '@app/components'

interface INFTPageOwnerRelationProps {
  ownerAddress: string | undefined;
  owner?: IUser;
}

export const NFTPageOwnerRelation: React.FC<INFTPageOwnerRelationProps> = (props) => {
  const { ownerAddress, owner } = props;

  return (
    <NFTPageRelation
      type={NFTRelationType.OWNER}
      href={`/${owner?.universePageUrl || owner?.address?.toLowerCase() || ownerAddress}`}
      value={`${owner?.displayName || owner?.address || ownerAddress}`}
      renderAvatar={() => (owner?.profileImageUrl
          ? <RelationAvatar src={owner?.profileImageUrl} />
          : (
            <Box borderRadius={'full'} overflow={'hidden'}>
              <Avatar
                address={owner?.address || ownerAddress as string}
                width='36px'
                height='36px'
              />
            </Box>
          )
      )}
    />
  );
}
