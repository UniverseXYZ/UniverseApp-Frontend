import { Box, Button, Flex, Icon, SimpleGrid, Stack, Text, Tooltip, VStack } from '@chakra-ui/react';
import React from 'react';

import { ReactComponent as InfoSVG } from '@assets/images/info-icon-2.svg';

import { TokenIcon } from '@app/components';
import { TokenTicker } from '@app/enums';

import * as s from './RewardBalance.styles';

interface IRewardBalanceProps {
  unreleasedFunds: number;
  availableBalance: number;
  onReleaseRewards: () => void;
  onClaimFunds: () => void;
}

export const RewardBalance = (props: IRewardBalanceProps) => {
  const {
    unreleasedFunds,
    availableBalance,
    onReleaseRewards,
    onClaimFunds,
  } = props;

  return (
    <Box {...s.GradientWrapper}>
      <Box {...s.Wrapper}>
        <SimpleGrid columns={2} spacing={0}>
          <RewardBalanceItem
            label={'Unreleased funds'}
            tooltip={'For the auctioneer to be able to collect their winnings and for the users to be able to claim their NFTs  the rewards need to be released first.'}
            amount={unreleasedFunds}
            buttonName={'Release rewards'}
            onClick={onReleaseRewards}
          />
          <RewardBalanceItem
            label={'Available balance'}
            tooltip={'This is the released reward amount available for claiming'}
            amount={availableBalance}
            buttonName={'Claim funds'}
            onClick={onClaimFunds}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}

interface IRewardBalanceItemProps {
  label: string;
  tooltip: string;
  amount: number;
  buttonName: string;
  onClick: () => void;
}

export const RewardBalanceItem = (props: IRewardBalanceItemProps) => {
  const { label, tooltip, amount, buttonName, onClick } = props;

  return (
    <Box {...s.RewardBalanceItemWrapper}>
      <VStack spacing={'10px'} alignItems={'start'}>
        <Text {...s.Label}>
          {label}
          <Tooltip
            hasArrow
            variant={'black'}
            placement={'top'}
            label={tooltip}
          >
            <Icon viewBox={'0 0 16 16'} boxSize={'16px'} ml={'4px'} mt={'-2px'}>
              <InfoSVG />
            </Icon>
          </Tooltip>
        </Text>
        <Flex flexDir={'row'} flexWrap={'wrap'} alignItems={'center'} gap={'6px'}>
          <TokenIcon ticker={TokenTicker.WETH} boxSize={'28px'} />
          <Stack {...s.AmountContainer}>
            <Text {...s.Amount}>{amount}</Text>
            <Text {...s.USDAmount}>~$41,594</Text>
          </Stack>
          <Box {...s.ButtonContainer}>
            <Button {...s.Button} onClick={onClick}>{buttonName}</Button>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}
