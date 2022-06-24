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

import { Slot, Slots, SuccessOwnerPopup, SuccessWinnerPopup, Transaction } from './components';
import * as s from './ReleaseRewardsAuctionPage.styles';

export const ReleaseRewardsAuctionPage = () => {
  type IProceedState = 'notProceed' | 'pending' | 'proceed';

  const [isWinnerView, setIsWinnerView] = useState(false);

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

  type IWinner = [number, string, ITire, boolean];

  const [winners, setWinners] = useState<Array<IWinner>>([
    [1, 'Firefly', tires[0], false],
    [2, 'BUBUZZ', tires[0], false],
    [3, '0x366DE0dA1Aa4C3095D74f3d0A485363127Ac7234', tires[0], false],
    [4, '0x366DE0dA1Aa4C3095D74f3d0A485363127Ac7234', tires[0], false],
    [5, 'WeirdMan', tires[1], false],
    [6, '0x366DE0dA1Aa4C3095D74f3d0A485363127Ac7234', tires[1], false],
    [7, '0x366DE0dA1Aa4C3095D74f3d0A485363127Ac7234', tires[1], false],
    [8, 'Valium', tires[1], false],
    [9, 'Valium', tires[2], false],
    [10, 'Valium', tires[2], false],
    [11, 'Valium', tires[2], false],
    [12, 'Valium', tires[2], false],
  ]);

  const winnerSlot = winners[2];

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
  }, []);

  const handleProceedWinner = useCallback((winner: IWinner) => {
    setWinners((winners) => winners.map(w => w !== winner ? w : [winner[0], winner[1], winner[2], true]));
  }, []);

  const activeStep = useMemo(() => {
    if (proceedState !== 'proceed') {
      return EStep.finalizeAuction;
    }

    if (isWinnerView) {
      if (winnerSlot[3]) {
        return EStep.complete;
      }
    } else {
      const isAllTransactionsDeposited = transactions.every((tx) => tx.deposited);
      const isAllWinnersProceed = winners.every((winner) => winner[3]);

      if (isAllTransactionsDeposited || isAllWinnersProceed) {
        return EStep.complete;
      }
    }

    return EStep.captureSlotRevenue;
  }, [proceedState, transactions, winners, winnerSlot]);

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
            <Text>Owner view</Text>
            <Switch isChecked={isWinnerView} onChange={() => setIsWinnerView(!isWinnerView)} />
            <Text>Winner view</Text>
          </HStack>
          <Container maxW={'1110px'} p={0} pt={'40px'}>
            <NextLink href={'/account/auctions'} passHref>
              <Link {...s.MyAuctionsLink}>
                <Image src={ArrowIcon} alt={'Arrow icon'} display={'inline-block'} mt={'-2px'} mr={'12px'} />
                Go Back
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
                  {!isWinnerView ? (
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
                        <Slots disabled={activeStep !== EStep.captureSlotRevenue}>
                          {winners.map((winner, i) => (
                            <Slot
                              key={i}
                              number={winner[0]}
                              winner={winner[1]}
                              tire={winner[2]}
                              isProceed={winner[3]}
                              onProceed={() => handleProceedWinner(winner)}
                            />
                          ))}
                        </Slots>
                      )}
                    </>
                  ) : (
                    <>
                      {showAllSlots && (<Heading fontSize={'16px'} mb={'24px'}>Your slot</Heading>)}
                      <Slots disabled={activeStep !== EStep.captureSlotRevenue}>
                        <Slot
                          number={winnerSlot[0]}
                          winner={winnerSlot[1]}
                          tire={winnerSlot[2]}
                          isProceed={winnerSlot[3]}
                          onProceed={() => handleProceedWinner(winnerSlot)}
                        />
                      </Slots>
                      {showAllSlots && (
                        <Box pt={'32px'}>
                          <Heading fontSize={'16px'} mb={'24px'}>Other slots</Heading>
                          <Alert colorScheme={'blue'} status={'info'} mb={'24px'} w={'fit-content'}>
                            You don’t need to proceed with the other slots to claim your NFTs.
                          </Alert>
                          <Slots
                            disabled={activeStep !== EStep.captureSlotRevenue}
                            proceedButtonVariant={'ghost'}
                          >
                            {winners.map((winner, i) => winner === winnerSlot ? null : (
                              <Slot
                                key={i}
                                number={winner[0]}
                                winner={winner[1]}
                                tire={winner[2]}
                                isProceed={winner[3]}
                                onProceed={() => handleProceedWinner(winner)}
                              />
                            ))}
                          </Slots>
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
      {isWinnerView ? (
        <SuccessWinnerPopup
          isOpened={showSuccess}
          auctionId={1}
          auctionName={'My Auction Name'}
          onClose={() => setShowSuccess(false)}
        />
      ) : (
        <SuccessOwnerPopup
          isOpened={showSuccess}
          auctionId={1}
          auctionName={'My Auction Name'}
          onClose={() => setShowSuccess(false)}
        />
      )}
      <BeforeUnloadPopup show={showBeforeUnloadPopup} />
    </>
  )
};
