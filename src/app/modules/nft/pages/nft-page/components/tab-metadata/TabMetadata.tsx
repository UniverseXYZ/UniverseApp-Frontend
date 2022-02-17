import { Box, BoxProps, Flex, Image, Text, TextProps } from '@chakra-ui/react';
import React from 'react';

import { Metadata } from '../../mocks/metadata';

import EthIcon from './../../../../../../../assets/images/eth-icon-new.svg';

const MetadataItemStyle: BoxProps = {
  alignItems: 'center',
  bg: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  fontWeight: 500,
  justifyContent: 'space-between',
  padding: '18px 24px',
  mb: '20px',
  _last: {
    mb: 0,
  },
};

interface IMetadataItemProps {
  name: string;
  children?: React.ReactNode;
}

const MetadataItem = ({ name, children }: IMetadataItemProps) => {
  return (
    <Flex {...MetadataItemStyle}>
      <Text>{name}</Text>
      <Box>{children}</Box>
    </Flex>
  );
};

const HashStyle: TextProps = {
  color: '#4D66EB',
};

export const TabMetadata = () => {
  const { owner, genome, nextPrice } = Metadata;

  return (
    <Box>
      <MetadataItem name={'Next morph price'}>
        <Text fontSize={'18px'} fontWeight={700}>
          <Image src={EthIcon} display={'inline-block'} mr={'4px'} w={'12px'} h={'18px'} mt={'-3px'} />
          {nextPrice}
        </Text>
      </MetadataItem>
      <MetadataItem name={'Owner'}>
        <Text {...HashStyle} display={{ base: 'none', md: 'block', }}>{owner.slice(0, 13)}...{owner.slice(-4)}</Text>
        <Text {...HashStyle} display={{ base: 'block', md: 'none', }}>{owner.slice(0, 6)}...{owner.slice(-4)}</Text>
      </MetadataItem>
      <MetadataItem name={'Genome string'}>
        <Text {...HashStyle} display={{ base: 'none', md: 'block', }}>{genome.slice(0, 13)}...{genome.slice(-4)}</Text>
        <Text {...HashStyle} display={{ base: 'block', md: 'none', }}>{genome.slice(0, 6)}...{genome.slice(-4)}</Text>
      </MetadataItem>
    </Box>
  );
};
