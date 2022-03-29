import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

import { ICollection } from '../../types';
import { NFTRelationType } from '../../enums';
import { getCollectionBackgroundColor } from '../../../../../utils/helpers';
import { NFTPageRelation } from './NFTPageRelation';
import { RelationAvatar } from './RelationAvatar';

interface INFTPageCollectionRelationProps {
  collection: ICollection;
  collectionAddress?: string;
  avatarStyle?: BoxProps;
}

export const NFTPageCollectionRelation = ({ collection, collectionAddress, avatarStyle = {} } : INFTPageCollectionRelationProps) => {
  return (
    <NFTPageRelation
      type={NFTRelationType.COLLECTION}
      href={`/collection/${collection?.address || collectionAddress}`}
      value={`${collection?.name || collectionAddress}`}
      renderAvatar={() => (collection?.coverUrl
          ? <RelationAvatar src={collection?.coverUrl} {...avatarStyle} />
          : (
            <Box
              className="random--bg--color"
              sx={{
                alignItems: 'center',
                bg: getCollectionBackgroundColor(collection),
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                h: '30px',
                w: '30px',
              }}
            >{collection?.name?.charAt(0) || collectionAddress?.charAt(collectionAddress?.length - 1)}</Box>
          )
      )}
    />
  );
}
