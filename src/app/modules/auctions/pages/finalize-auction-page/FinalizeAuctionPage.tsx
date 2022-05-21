import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text, VStack,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NextLink from 'next/link';

import ArrowIcon from '@assets/images/arrow-2.svg';
import { ReactComponent as CheckSVG } from '@assets/images/checkmark.svg';

import { Alert, CircularProgress, CollectionApprove, Step, Stepper } from '@app/components';

import { SuccessPopup, Transaction } from './components';
import * as s from './FinalizeAuctionPage.styles';

export const FinalizeAuctionPage = () => {
  type IProceedState = 'notProceed' | 'pending' | 'proceed';

  const [showSuccess, setShowSuccess] = useState(false);

  const [proceedState, setProceedState] = useState<IProceedState>('notProceed');

  type ICollection = {
    name: string;
    coverUrl: string;
    isApproved: boolean,
  }

  type ITransaction = {
    name: string;
    deposited: boolean;
    tires: Array<{
      name: string;
      slots: number;
      NFTs: number;
    }>;
  };

  enum EStep {
    proceed = 0,
    collectionsApprove = 1,
    transactionsDeposit = 2,
    complete = 3,
  }

  const [collections, setCollections] = useState<ICollection[]>(
    new Array<ICollection>(3).fill({} as ICollection).map(() => ({
      name: 'ATEM Membership Cards',
      coverUrl: 'https://lh3.googleusercontent.com/Z01CWLTUynnxdgUuiwTe9AAQkRWuhfx4AIgp7-GhdOVeHLPn8aOCIwmBKvVIRTEra3IevEwNaguNhqQk1mCBFo4Bm-5jGY1GB8dAhhY=s130',
      isApproved: false,
    }))
  );

  const [transactions, setTransactions] = useState<ITransaction[]>([
    {
      name: 'Transaction 1',
      deposited: false,
      tires: [
        { name: 'Platinum Tier', slots: 5, NFTs: 7 },
        { name: 'Gold Tier', slots: 10, NFTs: 20 },
      ]
    },
    {
      name: 'Transaction 2',
      deposited: false,
      tires: [
        { name: 'Silver Tier', slots: 20, NFTs: 1 },
      ]
    }
  ]);

  const handleProceed = useCallback(() => {
    setProceedState('pending');
    setTimeout(() => {
      setProceedState('proceed');
    }, 2 * 1000);
  }, []);

  const handleCancelProceed = useCallback(() => {
    setProceedState('notProceed');
  }, []);

  const handleApproveCollection = useCallback((collection: ICollection) => {
    setCollections((collections) => collections.map((_collection) => {
      if (collection !== _collection) {
        return _collection;
      }

      return { ..._collection, isApproved: true };
    }));
  }, [collections]);

  const handleDepositTransaction = useCallback((tx: ITransaction) => {
    setTransactions((transactions) => transactions.map((_tx) => {
      if (tx !== _tx) {
        return _tx;
      }

      return { ..._tx, deposited: true };
    }));
  }, [transactions]);

  const isAllCollectionsApproved = useMemo(() => {
    return collections.every((collection) => collection.isApproved);
  }, [collections]);

  const isAllTransactionsDeposited = useMemo(() => {
    return transactions.every((tx) => tx.deposited);
  }, [transactions]);

  const totalNFTs = useMemo(() => {
    return transactions.reduce((total, tx) => total + tx.tires.reduce((acc, tire) => acc + tire.NFTs, 0), 0);
  }, [transactions]);

  const activeStep = useMemo(() => {
    switch (false) {
      case proceedState === 'proceed': return EStep.proceed;
      case isAllCollectionsApproved: return EStep.collectionsApprove;
      case isAllTransactionsDeposited: return EStep.transactionsDeposit;
    }
    return EStep.complete;
  }, [proceedState, isAllCollectionsApproved, isAllTransactionsDeposited]);

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
        <Button
          variant={'ghostAlt'}
          colorScheme={'red'}
          onClick={handleCancelProceed}
          disabled={activeStep === EStep.complete}
        >Cancel</Button>
      </>
    )
  };

  return (
    <>
      <Box layerStyle={'StoneBG'}>
        <Box {...s.Wrapper}>
          <Container maxW={'1110px'} p={0} pt={'40px'}>
            <NextLink href={'/account/auctions'} passHref>
              <Link {...s.MyAuctionsLink}>
                <Image src={ArrowIcon} alt={'Arrow icon'} display={'inline-block'} mt={'-2px'} mr={'12px'} />
                My auctions
              </Link>
            </NextLink>
            <Heading as={'h1'} mb={'16px'}>Finalize auction</Heading>
            <Text {...s.PageDescription}>
              The auction landing page will be automatically published after you successfully complete all the transactions below
            </Text>

            <Stepper activeStep={activeStep} direction={'column'}>
              <Step>
                <Box {...s.StepContainer}>
                  <Heading as={'h2'} {...s.StepTitle}>Create auction</Heading>
                  <Text {...s.StepDescription}>Proceed with the transaction to create the auction instance on the blockchain</Text>
                  <Alert status={'warning'} {...s.Alert}>
                    You will not be able to make any changes to the auction if you proceed
                  </Alert>

                  <Stack direction={{ base: 'column', md: 'row' }} spacing={'12px'}>
                    {renderProceedState[proceedState]()}
                  </Stack>
                </Box>
              </Step>
              <Step>
                <Box {...s.StepContainer}>
                  <Heading as={'h2'} {...s.StepTitle}>Set approvals</Heading>
                  <Text {...s.StepDescription}>Approve NFTs for depositing into the auction contract</Text>
                  <Alert status={'warning'} {...s.Alert}>
                    Depending on the gas fee cost, you may need to have a significant amount of ETH to proceed
                  </Alert>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={'30px'}>
                    {collections.map((collection, i) => (
                      <CollectionApprove
                        key={i}
                        address={`${i}`}
                        name={collection.name}
                        coverUrl={collection.coverUrl}
                        disabled={activeStep !== EStep.collectionsApprove}
                        isApproved={collection.isApproved}
                        onApproved={() => handleApproveCollection(collection)}
                      />
                    ))}
                  </SimpleGrid>
                </Box>
              </Step>
              <Step>
                <Box {...s.StepContainer} pb={0}>
                  <Heading as={'h2'} {...s.StepTitle}>Deposit NFTs</Heading>
                  <Text {...s.StepDescription}>Deposit <Box as={'strong'} color={'black'}>{totalNFTs}</Box> NFTs to the auction contract</Text>
                  <VStack spacing={'30px'} justifyContent={'flex-start'}>
                    {transactions.map((tx, i) => (
                      <Transaction
                        key={i}
                        name={tx.name}
                        tires={tx.tires}
                        disabled={activeStep !== EStep.transactionsDeposit}
                        isDeposited={tx.deposited}
                        onDeposit={() => handleDepositTransaction(tx)}
                      />
                    ))}
                  </VStack>
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
    </>
  )
};
