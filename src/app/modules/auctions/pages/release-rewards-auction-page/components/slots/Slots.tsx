import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  Image,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { utils } from 'ethers';

import ArrowDownImage from '@assets/images/arrow-down.svg';

import { formatAddress } from '@app/helpers';
import { TireNFTs } from '@app/modules/auctions/components';

import { SlotProceedButton } from './components';
import * as s from './Slots.styles';

interface ISlot {
  number: number;
  winner: string;
  tire: {
    name: string;
    color: string;
    NFTs: number;
  };
  isProceed: boolean;
  onProceed: () => void;
}

export const Slot: React.FC<ISlot> = () => null;

interface ISlots {
  disabled: boolean;
  proceedButtonVariant?: 'primary' | 'ghost';
  children: BoxProps['children'];
}

export const Slots: React.FC<ISlots> = (props) => {
  const {
    disabled,
    proceedButtonVariant = 'primary',
    children,
  } = props;

  const formatWinnerName = useCallback((winner: string) => {
    return utils.isAddress(winner.toLowerCase()) ? formatAddress(winner) : winner;
  }, []);

  return (
    <Accordion allowMultiple={true} allowToggle={true} defaultIndex={[]} {...s.Accordion}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<ISlot>(child)) {
          return null;
        }

        const elementChild: React.ReactElement<ISlot> = child;

       const { number, winner, tire, isProceed, onProceed } = elementChild.props;

        return (
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
              <SlotProceedButton
                variant={proceedButtonVariant}
                disabled={disabled}
                isProceed={isProceed}
                onProceed={onProceed}
              />
            </Box>
            <AccordionPanel padding={'20px 0 0'}>
              <TireNFTs NFTs={tire.NFTs} NFTBoxSize={'64px'} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
