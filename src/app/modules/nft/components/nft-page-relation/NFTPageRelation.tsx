import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export enum RelationType {
  CREATOR,
  COLLECTION,
  OWNER,
}

export const TypeNames: Record<RelationType, string> = {
  [RelationType.CREATOR]: 'Creator',
  [RelationType.COLLECTION]: 'Collection',
  [RelationType.OWNER]: 'Owner',
}

export interface INFTPageRelationProps {
  type: RelationType;
  image: string;
  value: string;
}

export const NFTPageRelation = ({ type, image, value }: INFTPageRelationProps) => (
  <Flex sx={{
    alignItems: 'center',
    flex: 1,
    fontSize: '12px',

    img: {
      borderRadius: '50%',
      objectFit: 'cover',
      mr: '10px',
      h: '30px',
      w: '30px',
    },
  }}>
    <Image src={image} />
    <Box>
      <Text color={'rgba(0, 0, 0, 0.4)'} fontWeight={500}>{TypeNames[type]}</Text>
      <Text fontWeight={700}>{value}</Text>
    </Box>
  </Flex>
)
