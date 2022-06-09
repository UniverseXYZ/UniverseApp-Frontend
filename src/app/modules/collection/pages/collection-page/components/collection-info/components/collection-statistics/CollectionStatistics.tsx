import { Box, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { utils } from 'ethers';
import React from 'react';

import { TOKENS_MAP } from '@app/constants';
import { Icon, Icons, TokenIcon } from '@app/components';
import { TokenTicker } from '@app/enums';
import { formatPrice } from '@app/utils/formatPrice';

import * as s from './CollectionStatistics.styles';

interface ICollectionStatisticsProps {
  amountNFTs?: number;
  amountOwners?: number;
  floorPrice?: string;
  volumeTraded?: string;
}

export const CollectionStatistics: React.FC<ICollectionStatisticsProps> = (props) => {
  const { amountNFTs, amountOwners, floorPrice, volumeTraded } = props;

  type IItem = {
    icon: Icons;
    name: string;
    isPrice: boolean;
    value: string | number;
  }

  const items: IItem[] = [
    {
      icon: 'statisticItems',
      name: 'Items',
      isPrice: false,
      value: amountNFTs || '',
    },
    {
      icon: 'statisticOwners',
      name: 'Owners',
      isPrice: false,
      value: amountOwners || '',
    },
    {
      icon: 'statisticFloorPrice',
      name: 'Floor price',
      isPrice: true,
      value: floorPrice ? formatPrice(floorPrice) : '-',
    },
    {
      icon: 'statisticVolumeTraded',
      name: 'Volume traded',
      isPrice: true,
      value: volumeTraded && Number(volumeTraded) > 0
        ? Number(utils.formatUnits(volumeTraded, `${TOKENS_MAP.ETH.decimals}`)).toFixed(1)
        : '-',
    },
  ];

  return (
    <>
      <Box {...s.Wrapper}>
        <SimpleGrid {...s.Grid}>
          {items.map(({ icon, name, isPrice, value }, i) => (
            <VStack key={i} spacing={'10px'} {...s.ItemWrapper}>
              <HStack spacing={'6px'} {...s.ItemLabel}>
                <Icon name={icon} />
                <Box as={'span'}>{name}</Box>
              </HStack>
              <HStack spacing={'6px'}>
                {isPrice && (<TokenIcon ticker={TokenTicker.ETH} h={'28px'} />)}
                <Box {...s.ItemValue}>
                  {value}
                </Box>
              </HStack>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
