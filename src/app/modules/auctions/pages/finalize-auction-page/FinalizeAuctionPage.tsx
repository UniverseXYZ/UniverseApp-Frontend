import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';
import NextLink from 'next/link';

import ArrowIcon from '@assets/images/arrow-2.svg';
import { ReactComponent as CheckSVG } from '@assets/images/checkmark.svg';

import { Alert, CircularProgress, Step, Stepper } from '@app/components';

import * as s from './FinalizeAuctionPage.styles';

export const FinalizeAuctionPage = () => {
  const [isProceed, setIsProceed] = useState(false);

  type ICollection = {
    name: string;
    coverUrl: string;
    state: 'not-approved' | 'approving' | 'approved',
  }

  const [collections, setCollections] = useState<Array<ICollection>>(
    new Array<ICollection>(3).fill({} as ICollection).map(() => ({
      name: 'ATEM Membership Cards',
      coverUrl: 'https://lh3.googleusercontent.com/Z01CWLTUynnxdgUuiwTe9AAQkRWuhfx4AIgp7-GhdOVeHLPn8aOCIwmBKvVIRTEra3IevEwNaguNhqQk1mCBFo4Bm-5jGY1GB8dAhhY=s130',
      state: 'not-approved',
    }))
  );

  const handleApproveCollection = useCallback((collection: ICollection) => {
    setCollections(collections.map((_collection) => {
      if (collection !== _collection) {
        return _collection;
      }

      return {..._collection, state: 'approving'};
    }));

    setTimeout(() => {
      setCollections(collections.map((_collection) => {
        if (collection !== _collection) {
          return _collection;
        }

        return {..._collection, state: 'approved'};
      }));
    }, 2 * 1000)
  }, [collections]);

  const isAllCollectionsApproved = useMemo(() => {
    return collections.every((collection) => collection.state === 'approved');
  }, [collections]);

  const activeStep = useMemo(() => {
    switch (false) {
      case isProceed: return 0;
      case isAllCollectionsApproved: return 1;
    }
    return 2;
  }, [isProceed, isAllCollectionsApproved]);

  return (
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
              <Box pl={'10px'} pb={'60px'}>
                <Heading as={'h2'} {...s.StepTitle}>Create auction</Heading>
                <Text {...s.StepDescription}>Proceed with the transaction to create the auction instance on the blockchain</Text>
                <Alert status={'warning'} w={'fit-content'} mb={'30px'}>
                  You will not be able to make any changes to the auction if you proceed
                </Alert>

                <HStack spacing={'12px'}>
                  {activeStep === 0 ? (
                    <Button
                      p={'11px 16px'}
                      boxShadow={'lg'}
                      onClick={() => setIsProceed(true)}
                    >Proceed</Button>
                  ) : (
                    <>
                      <Button
                        variant={'ghostAlt'}
                        p={'11px 16px'}
                        disabled={true}
                        rightIcon={<Icon viewBox={'0 0 16 15'} ml={'8px'}><CheckSVG /></Icon>}
                      >
                        Completed
                      </Button>
                      <Button
                        variant={'ghostAlt'}
                        p={'11px 16px'}
                        colorScheme={'red'}
                        onClick={() => setIsProceed(false)}
                      >Cancel</Button>
                    </>
                  )}
                </HStack>
              </Box>
            </Step>
            <Step>
              <Box pl={'10px'} pb={'60px'}>
                <Heading as={'h2'} {...s.StepTitle}>Set approvals</Heading>
                <Text {...s.StepDescription}>Approve NFTs for depositing into the auction contract</Text>
                <Alert status={'warning'} w={'fit-content'} mb={'30px'}>
                  Depending on the gas fee cost, you may need to have a significant amount of ETH to proceed
                </Alert>
                <SimpleGrid columns={3} spacing={'30px'}>
                  {collections.map((collection, i) => (
                    <Box key={i} sx={{
                      bg: 'white',
                      borderRadius: '12px',
                      boxShadow: '0px 10px 36px rgba(136, 120, 172, 0.14)',
                      padding: '30px',
                    }}>
                      <Stack alignItems={'center'} spacing={'30px'} direction={'row'}>
                        <Image
                          src={collection.coverUrl}
                          alt={'Collection image'}
                          borderRadius={'full'}
                          boxSize={'80px'}
                        />
                        <Box>
                          <Text fontSize={'16px'} fontWeight={700} mb={'16px'} noOfLines={1}>{collection.name}</Text>
                          {collection.state === 'not-approved' && (
                            <Button
                              boxShadow={'lg'}
                              p={'11px 16px'}
                              disabled={activeStep !== 1}
                              onClick={() => handleApproveCollection(collection)}
                            >Approve</Button>
                          )}

                          {collection.state === 'approving' && (
                            <CircularProgress />
                          )}
                          {collection.state === 'approved' && (
                            <Button
                              variant={'ghostAlt'}
                              p={'11px 16px'}
                              disabled={true}
                              rightIcon={<Icon viewBox={'0 0 16 15'} ml={'8px'}><CheckSVG /></Icon>}
                            >
                              Approved
                            </Button>
                          )}
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Step>
            <Step>
              <Box pl={'10px'} pb={'60px'}>
                <Heading as={'h2'} {...s.StepTitle}>Deposit NFTs</Heading>
                <Text {...s.StepDescription}>Deposit <Box as={'strong'} color={'black'}>58</Box> NFTs to the auction contract</Text>
              </Box>
            </Step>
          </Stepper>
        </Container>
      </Box>
    </Box>
  )
};
