import { Box, Button, Center, Heading, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { CircularProgress } from '@app/components';
import { TireNFTs } from '@app/modules/auctions/components';
import { ReactComponent as CheckSVG } from '@assets/images/checkmark.svg';

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
      w={{ base: '100%', md: 'fit-content' }}
      onClick={handleDeposit}
    >Deposit</Button>
  )
  const renderPendingState = () => (
    <Center><CircularProgress /></Center>
  )
  const renderDepositedState = () => (
    <Button
      variant={'ghostAlt'}
      disabled={true}
      w={{ base: '100%', md: 'fit-content' }}
      rightIcon={<Icon viewBox={'0 0 16 15'}><CheckSVG /></Icon>}
    >
      Completed
    </Button>
  )

  const stateRenders: Record<TransactionState, () => React.ReactNode> = {
    notDeposited: renderNotDepositedState,
    pending: renderPendingState,
    deposited: renderDepositedState,
  };

  return (
    <Box sx={{
      bg: 'white',
      borderRadius: '12px',
      boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
      padding: '20px 30px 30px',
      w: '100%',
    }}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: '10px', md: '40px' }}
        alignItems={{ base: 'flex-start', md: 'center' }}
        mb={'20px'}
      >
        <Heading fontSize={'16px'} flex={1}>{name}</Heading>
        <Text fontSize={'14px'}>Total NFTs: <strong>{totalNFTs}</strong></Text>
        <Box display={{ base: 'none', md: 'block' }}>
          {stateRenders[transactionState]()}
        </Box>
      </Stack>

      <Box>
        {tires.map((tire, j) => (
          <Box key={j} sx={{
            borderTop: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '20px 0 30px',
            _last: {
              paddingBottom: {
                base: '30px',
                md: 0,
              },
            },
          }}>
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
