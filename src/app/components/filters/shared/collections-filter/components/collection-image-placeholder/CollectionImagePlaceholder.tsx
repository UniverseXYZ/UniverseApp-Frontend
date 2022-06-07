import { BoxProps, Flex } from '@chakra-ui/react';
import React from 'react';

import { getRandomCollectionBGColor } from '@app/helpers';

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
  name?: string;
  address?: string;
}

export const CollectionImagePlaceholder: React.FC<ICollectionImagePlaceholderProps> = (props) => {
  const { name, address, ...rest } = props;

  return (
    <Flex
      {...PlaceholderStyle}
      {...rest}
      bgColor={getRandomCollectionBGColor(address)}
    >
      {name?.charAt(0) || address?.charAt(address?.length - 1) || ''}
    </Flex>
  );
}
