import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

import { Metadata } from '../../mocks';
import * as styles from './styles';

import EthIcon from './../../../../../../../assets/images/eth-icon-new.svg';
import { CoinIconStyle } from './styles';

interface IMetadataItemProps {
  name: string;
  children?: React.ReactNode;
}

const MetadataItem = ({ name, children }: IMetadataItemProps) => {
  return (
    <Flex {...styles.ItemStyle}>
      <Text>{name}</Text>
      <Box>{children}</Box>
    </Flex>
  );
};

interface IHashProps {
  hash: string;
}

const Hash = ({ hash }: IHashProps) => {
  return (
    <Text {...styles.HashStyle}>
      <Box as={'span'} display={{ base: 'none', md: 'block', }}>{hash.slice(0, 13)}...{hash.slice(-4)}</Box>
      <Box as={'span'} display={{ base: 'block', md: 'none', }}>{hash.slice(0, 6)}...{hash.slice(-4)}</Box>
    </Text>
  );
}

export const TabMetadata = () => {
  const { owner, genome, nextPrice } = Metadata;

  return (
    <Box>
      <MetadataItem name={'Next morph price'}>
        <Text fontSize={'18px'} fontWeight={700}>
          <Image src={EthIcon} {...CoinIconStyle} />
          {nextPrice}
        </Text>
      </MetadataItem>
      <MetadataItem name={'Owner'}>
        <Hash hash={owner} />
      </MetadataItem>
      <MetadataItem name={'Genome string'}>
        <Hash hash={genome} />
      </MetadataItem>
    </Box>
  );
};
