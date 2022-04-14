import { Box, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import React from 'react';

import * as styles from './styles';
import { NFTRelationType } from '../../enums';
import { NFT_RELATION_TYPE_NAMES } from '../../constants';
import NextLink from 'next/link';

export interface INFTPageRelationProps {
  type: NFTRelationType;
  value: string;
  href: string;
  renderAvatar: () => React.ReactNode;
}

export const NFTPageRelation = ({ type, value, href, renderAvatar }: INFTPageRelationProps) => (
    <LinkBox>
      <NextLink href={href}>
        <LinkOverlay {...styles.RelationStyle}>
          <Flex alignItems={'center'} flex={1}>
            {renderAvatar()}
            <Box fontSize={'12px'} ml={'10px'} w={'110px'}>
              <Text color={'rgba(0, 0, 0, 0.4)'} fontWeight={500}>{NFT_RELATION_TYPE_NAMES[type]}</Text>
              <Text isTruncated fontWeight={700}>{value}</Text>
            </Box>
          </Flex>
        </LinkOverlay>
      </NextLink>
    </LinkBox>
);

