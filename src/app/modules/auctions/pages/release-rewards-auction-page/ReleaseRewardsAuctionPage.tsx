import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Switch,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';

import ArrowIcon from '@assets/images/arrow-2.svg';
import { ReactComponent as CheckSVG } from '@assets/images/checkmark.svg';
import { ReactComponent as InfoSVG } from '@assets/images/info-icon-2.svg';

import { Alert, BeforeUnloadPopup, CircularProgress, Step, Stepper } from '@app/components';

import { SuccessPopup, Transaction } from './components';
import * as s from './ReleaseRewardsAuctionPage.styles';
import { Slots } from '@app/modules/auctions/pages/release-rewards-auction-page/components/slots';

export const ReleaseRewardsAuctionPage = () => {
  type IProceedState = 'notProceed' | 'pending' | 'proceed';

  const [isBidderView, setIsBidderView] = useState(false);

  const [showAllSlots, setShowAllSlots] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [proceedState, setProceedState] = useState<IProceedState>('notProceed');

  type ITransaction = {
    name: string;
    deposited: boolean;
    slots: number;
    NFTs: number;
  };

  enum EStep {
    finalizeAuction = 0,
    captureSlotRevenue = 1,
    complete = 2,
  }

  const [transactions, setTransactions] = useState<ITransaction[]>([
    {
      name: 'Transaction 1',
      deposited: false,
      slots: 5,
      NFTs: 20,
    },
    {
      name: 'Transaction 2',
      deposited: false,
      slots: 20,
      NFTs: 3,
    }
  ]);

  type ITire = {
    name: string;
    color: string;
    NFTs: number;
  };

  const tires: Array<ITire> = [
    {
      name: 'Platinum',
      color: '#80CCDF',
      NFTs: 4,
    },
    {
      name: 'Gold',
      color: '#DDBC45',
      NFTs: 3,
    },
    {
      name: 'Silver',
      color: '#BCBCBC',
      NFTs: 1,
    },
  ];

  type IWinner = [number, string, ITire];

  const winners: Array<IWinner> = [
    [1, 'Firefly', tires[0]],
    [2, 'BUBUZZ', tires[0]],
    [3, '0x366DE0dA1Aa4C3095D74f3d0A485363127Ac7234', tires[0]],
    [4, '0x366DE0dA1Aa4C3095D74f3d0A485363127Ac7234', tires[0]],
    [5, 'WeirdMan', tires[1]],
    [6, '0x366DE0dA1Aa4C3095D74f3d0A485363127Ac7234', tires[1]],
    [7, '0x366DE0dA1Aa4C3095D74f3d0A485363127Ac7234', tires[1]],
    [8, 'Valium', tires[1]],
    [9, 'Valium', tires[2]],
    [10, 'Valium', tires[2]],
    [11, 'Valium', tires[2]],
    [12, 'Valium', tires[2]],
  ];

  const handleProceed = useCallback(() => {
    setProceedState('pending');
    setTimeout(() => {
      setProceedState('proceed');
    }, 2 * 1000);
  }, []);

  const handleDepositTransaction = useCallback((tx: ITransaction) => {
    setTransactions((transactions) => transactions.map((_tx) => {
      if (tx !== _tx) {
        return _tx;
      }

      return { ..._tx, deposited: true };
    }));
  }, [transactions]);

  const isAllTransactionsDeposited = useMemo(() => {
    return transactions.every((tx) => tx.deposited);
  }, [transactions]);

  const activeStep = useMemo(() => {
    switch (false) {
      case proceedState === 'proceed': return EStep.finalizeAuction;
      case isAllTransactionsDeposited: return EStep.captureSlotRevenue;
    }
    return EStep.complete;
  }, [proceedState, isAllTransactionsDeposited]);

  const showBeforeUnloadPopup = useMemo(() => {
    if (activeStep === EStep.complete) {
      return false;
    }

    return activeStep !== EStep.finalizeAuction || transactions.some((c) => c.deposited);
  }, [activeStep, transactions]);

  useEffect(() => {
    setShowSuccess(activeStep === EStep.complete);
  }, [activeStep]);

  const renderProceedState: Record<IProceedState, () => React.ReactNode> = {
    notProceed: () => (<Button variant={'primary'} onClick={handleProceed}>Proceed</Button>),
    pending: () => (<CircularProgress />),
    proceed: () => (
      <>
        <Button
          variant={'ghostAlt'}
          disabled={true}
          rightIcon={<Icon viewBox={'0 0 16 15'}><CheckSVG /></Icon>}
        >
          Completed
        </Button>
      </>
    )
  };

  return (
    <>
      <Box layerStyle={'StoneBG'}>
        <Box {...s.Wrapper}>
          <HStack bg={'white'} p={'20px'} pos={'fixed'} right={0} fontWeight={'bold'} zIndex={1000}>
            <Text>Creator view</Text>
            <Switch isChecked={isBidderView} onChange={() => setIsBidderView(!isBidderView)} />
            <Text>Bidder view</Text>
          </HStack>
          <Container maxW={'1110px'} p={0} pt={'40px'}>
            <NextLink href={'/account/auctions'} passHref>
              <Link {...s.MyAuctionsLink}>
                <Image src={ArrowIcon} alt={'Arrow icon'} display={'inline-block'} mt={'-2px'} mr={'12px'} />
                Auction Title Two
              </Link>
            </NextLink>
            <Heading as={'h1'} mb={'16px'}>Release rewards</Heading>
            <Text {...s.PageDescription}>
              Without this step, the auctioneer will not be able to collect his winnings and the bidders will not be able to claim their NFTs
            </Text>

            <Stepper activeStep={activeStep} direction={'column'}>
              <Step>
                <Box {...s.StepContainer}>
                  <Heading as={'h2'} {...s.StepTitle}>Finalize auction</Heading>
                  <Text {...s.StepDescription} maxW={['100%', null, null, '382px']}>This function will check which slots have been won, assign the winners and the bid amounts</Text>

                  <Stack direction={{ base: 'column', md: 'row' }} spacing={'12px'}>
                    {renderProceedState[proceedState]()}
                  </Stack>
                </Box>
              </Step>
              <Step>
                <Box {...s.StepContainer} pb={0}>
                  <Flex flexWrap={'wrap'} mb={'24px'}>
                    <Heading as={'h2'} {...s.StepTitle} flex={1}>Capture slot revenue</Heading>
                    <HStack spacing={'10px'} {...s.ShowAllSlotsContainer}>
                      <HStack spacing={'6px'}>
                        <Text fontSize={'14px'}>Show all slots</Text>
                        <Tooltip
                          hasArrow
                          variant={'black'}
                          placement={'top'}
                          label={'Use this toggle if you want to pay gas fees for the specific user separately'}
                        >
                          <Icon viewBox={'0 0 16 16'} color={'#00000066'} cursor={'pointer'}>
                            <InfoSVG />
                          </Icon>
                        </Tooltip>
                      </HStack>
                      <Switch
                        size={'lg'}
                        isChecked={showAllSlots}
                        onChange={() => setShowAllSlots(!showAllSlots)}
                      />
                    </HStack>
                    <Text {...s.StepDescription} w={'100%'} mb={0}>Once the auction is finalized, the revenue for each slot should be captured.</Text>
                  </Flex>
                  {!isBidderView ? (
                    <>
                      {!showAllSlots ? (
                        <VStack spacing={'30px'} justifyContent={'flex-start'}>
                          {transactions.map((tx, i) => (
                            <Transaction
                              key={i}
                              name={tx.name}
                              disabled={activeStep !== EStep.captureSlotRevenue}
                              slots={tx.slots}
                              NFTs={tx.NFTs}
                              isDeposited={tx.deposited}
                              onDeposit={() => handleDepositTransaction(tx)}
                            />
                          ))}
                        </VStack>
                      ) : (
                        <Slots
                          winners={winners}
                          disabled={activeStep !== EStep.captureSlotRevenue}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {showAllSlots && (<Heading fontSize={'16px'} mb={'24px'}>Your slot</Heading>)}
                      <Slots
                        winners={[winners[2]]}
                        disabled={activeStep !== EStep.captureSlotRevenue}
                      />
                      {showAllSlots && (
                        <Box pt={'32px'}>
                          <Heading fontSize={'16px'} mb={'24px'}>Other slots</Heading>
                          <Alert colorScheme={'blue'} status={'info'} mb={'24px'} w={'fit-content'}>
                            You don’t need to proceed with the other slots to claim your NFTs.
                          </Alert>
                          <Slots
                            winners={winners.filter((_, i) => i !== 2)}
                            disabled={activeStep !== EStep.captureSlotRevenue}
                            proceedButtonVariant={'ghost'}
                          />
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Step>
            </Stepper>
          </Container>
        </Box>
      </Box>
      <SuccessPopup
        isOpened={showSuccess}
        auctionId={1}
        auctionName={'My Auction name'}
        auctionStartDate={new Date()}
        onClose={() => setShowSuccess(false)}
      />
      <BeforeUnloadPopup show={showBeforeUnloadPopup} />
    </>
  )
};
