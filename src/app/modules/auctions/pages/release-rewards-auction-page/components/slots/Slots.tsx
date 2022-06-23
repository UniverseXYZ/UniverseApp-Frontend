import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { utils } from 'ethers';

import ArrowDownImage from '@assets/images/arrow-down.svg';

import { formatAddress } from '@app/helpers';
import { TireNFTs } from '@app/modules/auctions/components';

import * as s from './Slots.styles';

interface ISlots {
  winners: Array<[number, string, {
    name: string;
    color: string;
    NFTs: number;
  }]>;
  disabled: boolean;
  proceedButtonVariant?: 'primary' | 'ghost';
}

export const Slots: React.FC<ISlots> = (props) => {
  const {
    winners,
    disabled,
    proceedButtonVariant = 'primary'
  } = props;

  const formatWinnerName = useCallback((winner: string) => {
    return utils.isAddress(winner.toLowerCase()) ? formatAddress(winner) : winner;
  }, []);

  return (
    <Accordion allowMultiple={true} allowToggle={true} defaultIndex={[]} {...s.Accordion}>
      {winners.map(([number, winner, tire]) => (
        <AccordionItem key={number} {...s.AccordionItem}>
          <Box {...s.SlotHeader}>
            <AccordionButton as={Button} variant={'ghostAlt'} size={'sm'} {...s.AccordionButton}>
              <Image src={ArrowDownImage} />
            </AccordionButton>
            <Text {...s.SlotNumberLabel}>{number}.</Text>
            <Text {...s.SlotWinnerName}>{formatWinnerName(winner)}</Text>
            <Box flex={1}>
              <Text {...s.TireNameLabel} borderColor={tire.color} color={tire.color}>{tire.name}</Text>
            </Box>
            <Text {...s.SlotNFTsAmountLabel}>
              NFTs: <Box as={'strong'} fontWeight={700}>{tire.NFTs}</Box>
            </Text>
            <Box {...s.BreakLine} />
            <Button variant={proceedButtonVariant} disabled={disabled} {...s.ProceedButton}>Proceed</Button>
          </Box>
          <AccordionPanel padding={'20px 0 0'}>
            <TireNFTs NFTs={tire.NFTs} NFTBoxSize={'64px'} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
