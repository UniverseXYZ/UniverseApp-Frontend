import { Box, Button, Center, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { ReactComponent as CheckSVG } from '@assets/images/checkmark.svg';

import { CircularProgress } from '@app/components';
import { TireNFTs } from '@app/modules/auctions/components';

import * as s from './Transaction.styles';

interface ITransactionProps {
  name: string;
  isDeposited: boolean;
  disabled?: boolean;
  tires: Array<{
    name: string;
    slots: number;
    NFTs: number;
  }>;
  onDeposit: () => void;
}

export const Transaction = (props: ITransactionProps) => {
  const { name, isDeposited, disabled = false, tires, onDeposit } = props;

  type TransactionState = 'notDeposited' | 'pending' | 'deposited';

  const [transactionState, setTransactionState] = useState<TransactionState>('notDeposited');

  const handleDeposit = useCallback(() => {
    setTransactionState('pending');
    setTimeout(() => {
      setTransactionState('deposited');
      onDeposit();
    }, 2 * 1000);
  }, [onDeposit]);

  const totalNFTs = useMemo(() => {
    return tires.reduce((total, tire) => total + tire.NFTs, 0);
  }, [tires]);

  useEffect(() => {
    setTransactionState(isDeposited ? 'deposited' : 'notDeposited');
  }, [isDeposited]);

  const renderNotDepositedState = () => (
    <Button
      variant={'primary'}
      disabled={disabled}
      {...s.Button}
      onClick={handleDeposit}
    >Deposit</Button>
  );
  const renderPendingState = () => (<Center><CircularProgress /></Center>);
  const renderDepositedState = () => (
    <Button
      variant={'ghostAlt'}
      disabled={true}
      {...s.Button}
      rightIcon={<Icon viewBox={'0 0 16 15'}><CheckSVG /></Icon>}
    >
      Completed
    </Button>
  );

  const stateRenders: Record<TransactionState, () => React.ReactNode> = {
    notDeposited: renderNotDepositedState,
    pending: renderPendingState,
    deposited: renderDepositedState,
  };

  return (
    <Box {...s.Wrapper}>
      <Stack {...s.TitleContainer}>
        <Heading fontSize={'16px'} flex={1}>{name}</Heading>
        <Text fontSize={'14px'}>Total NFTs: <strong>{totalNFTs}</strong></Text>
        <Box display={{ base: 'none', md: 'block' }}>
          {stateRenders[transactionState]()}
        </Box>
      </Stack>

      <Box>
        {tires.map((tire, j) => (
          <Box key={j} {...s.TireWrapper}>
            <HStack spacing={'22px'} mb={'20px'}>
              <Heading fontSize={'12px'}>{tire.name}</Heading>
              <Text fontSize={'14px'}>Slots: <strong>{tire.slots}</strong></Text>
              <Text fontSize={'14px'}>NFTs: <strong>{tire.NFTs}</strong></Text>
            </HStack>
            <TireNFTs NFTs={tire.NFTs} />
          </Box>
        ))}
      </Box>

      <Box display={{ base: 'block', md: 'none' }} >
        {stateRenders[transactionState]()}
      </Box>
    </Box>
  );
}
