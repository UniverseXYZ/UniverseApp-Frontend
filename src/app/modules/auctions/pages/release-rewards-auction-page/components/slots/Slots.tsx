import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box, Button,
  Flex, Image,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { utils } from 'ethers';

import ArrowDownImage from '@assets/images/arrow-down.svg';

import { TireNFTs } from '@app/modules/auctions/components';
import { formatAddress } from '@app/helpers';

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
    <Accordion allowMultiple={true} allowToggle={true} defaultIndex={[]} sx={{
      bg: 'white',
      borderRadius: '12px',
      boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
      padding: '0 30px',
    }}>
      {winners.map(([number, winner, tire]) => (
        <AccordionItem key={number} sx={{
          borderBottom: '1px solid #0000001A',
          padding: '20px 0',
          _last: {
            borderBottom: 0,
          },
        }}>
          <Flex alignItems={'center'} flexDir={'row'} w={'100%'}>
            <AccordionButton as={Button} variant={'ghostAlt'} size={'sm'} sx={{
              boxSize: '32px',
              mr: '10px',
              padding: '4px',

              _hover: {
                bg: 'transparent',
              },
              _focus: {
                boxShadow: 'none',
              },
              _expanded: {
                'img': {
                  transform: 'rotate(180deg)',
                },
              },
            }}>
              <Image src={ArrowDownImage} />
            </AccordionButton>
            <Text fontSize={'10px'} fontWeight={500} mr={'4px'}>{number}.</Text>
            <Text fontSize={'14px'} fontWeight={600} mr={'10px'}>{formatWinnerName(winner)}</Text>
            <Box flex={1} textAlign={'left'}>
              <Text borderColor={tire.color} color={tire.color} sx={{
                border: '1px solid',
                borderRadius: '20px',
                display: 'inline-block',
                fontSize: '10px',
                fontWeight: 'bold',
                padding: '2px 6px',
              }}>{tire.name}</Text>
            </Box>
            <Text fontSize={'14px'} fontWeight={400} mr={'20px'}>
              NFTs: <Box as={'strong'} fontWeight={700}>{tire.NFTs}</Box>
            </Text>
            <Button variant={proceedButtonVariant} disabled={disabled}>Proceed</Button>
          </Flex>
          <AccordionPanel padding={'20px 0 0'}>
            <TireNFTs NFTs={tire.NFTs} NFTBoxSize={'64px'} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
