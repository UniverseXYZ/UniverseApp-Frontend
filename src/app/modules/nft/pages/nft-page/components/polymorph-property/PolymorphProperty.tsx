import { Box, BoxProps, Text } from '@chakra-ui/react';

import { INFTProperty } from '../nft-property';

const PropertyStyle: BoxProps = {
  bg: 'rgba(0, 0, 0, 0.05)',
  borderRadius: '100px',
  mr: '12px',
  mb: '12px',
  padding: '6px 16px',
}

export const PolymorphProperty = ({ name, value }: INFTProperty) => {
  return (
    <Box {...PropertyStyle}>
      <Text fontSize={'14px'}>
        {name}:
        <Box as={'span'} fontWeight={700} ml={'6px'}>{value}</Box>
      </Text>
    </Box>
  );
}
