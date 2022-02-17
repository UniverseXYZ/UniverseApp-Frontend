import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

import { NFTRelationType } from '../../enums';
import { NFT_RELATION_TYPE_NAMES } from '../../constants';
import * as styles from './styles';

export interface INFTPageRelationProps {
  type: NFTRelationType;
  image: string;
  value: string;
}

export const NFTPageRelation = ({ type, image, value }: INFTPageRelationProps) => (
  <Flex {...styles.WrapperStyle}>
    <Image src={image} />
    <Box>
      <Text color={'rgba(0, 0, 0, 0.4)'} fontWeight={500}>{NFT_RELATION_TYPE_NAMES[type]}</Text>
      <Text fontWeight={700}>{value}</Text>
    </Box>
  </Flex>
)
