import { BoxProps, Flex } from '@chakra-ui/react';
import React from 'react';

import { ICollectionFilterValue } from '../../types';
import { getCollectionBackgroundColor } from '../../../../../../../../../../utils/helpers';

const PlaceholderStyle: BoxProps = {
  alignItems: 'center',
  borderRadius: '5px',
  fontFamily: '"Sharp Grotesk Medium"',
  fontSize: '16px',
  fontWeight: 'bold',
  justifyContent: 'center',
  h: '30px',
  w: '30px',
};

interface ICollectionImagePlaceholderProps extends BoxProps {
  collection: ICollectionFilterValue;
}

export const CollectionImagePlaceholder = (props: ICollectionImagePlaceholderProps) => {
  const { collection, ...rest } = props;

  return (
    <Flex
      {...PlaceholderStyle}
      {...rest}
      bgColor={getCollectionBackgroundColor(collection)}
    >
      {collection?.name?.charAt(0) || collection?.address?.charAt(collection?.address?.length - 1) || ''}
    </Flex>
  );
}
