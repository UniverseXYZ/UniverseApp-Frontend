import { Box, Heading, HStack, Image, LinkOverlay, SimpleGrid, Text, Tooltip, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMeasure } from 'react-use';
import Countdown from 'react-countdown';

import AuctionAssetImage from '@assets/images/_MOCK_AUCTION.png';
import CreatorAvatarImage from '@assets/images/_MOCK_AUCTION_CREATOR.png';
import { ItemWrapper, TokenIcon } from '@app/components';
import { TokenTicker } from '@app/enums';

import * as styles from './AuctionCard.styles';
import { AuctionCardState } from './enums';
import { renderCountdown } from './helpers';

interface IAuctionCardProps {}

export const AuctionCard = (props: IAuctionCardProps) => {
  const {} = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const [state, setState] = useState<AuctionCardState>(AuctionCardState.FUTURE);
  const [showMyBid] = useState(true);
  const [showHighestLowestBids] = useState(true);

  const [auction] = useState({
    start: dayjs().add(90, 'seconds').toDate(),
    end: dayjs().add(120, 'seconds').toDate(),
  });

  const updateState = useCallback(() => {
    if (auction.start > new Date()) {
      setState(AuctionCardState.FUTURE);
    } else if (auction.start <= new Date() && auction.end > new Date()) {
      setState(AuctionCardState.ACTIVE);
    } else {
      setState(AuctionCardState.ENDED);
    }
  }, []);

  const timerLabel = useMemo<string>(() => {
    const labels: Record<AuctionCardState, string> = {
      [AuctionCardState.FUTURE]: 'Starts in',
      [AuctionCardState.ACTIVE]: 'Time left',
      [AuctionCardState.ENDED]: 'Ended on',
    };
    return labels[state];
  }, [state]);

  useEffect(() => {
    updateState();
  }, []);

  return (
    <ItemWrapper ref={ref}>
      <Box {...styles.Wrapper}>
        <Box {...styles.AssetWrapper}>
          <Image
            src={AuctionAssetImage}
            alt={'Auction asset image'}
            opacity={state === AuctionCardState.ENDED ? 0.6 : 1}
          />
          <VStack spacing={0} {...styles.getTimerWrapperStyle(state, AuctionAssetImage, width)}>
            <Text {...styles.TimerLabel}>{timerLabel}</Text>
            <Text {...styles.TimerValue}>
              {state === AuctionCardState.FUTURE && (
                // @ts-ignore
                <Countdown
                  date={auction.start}
                  renderer={renderCountdown}
                  onComplete={updateState}
                />
              )}
              {state === AuctionCardState.ACTIVE && (
                // @ts-ignore
                <Countdown
                  date={auction.end}
                  renderer={renderCountdown}
                  onComplete={updateState}
                />
              )}
              {state === AuctionCardState.ENDED && (
                <>{dayjs(auction.end).format('MMMM DD, YYYY [at] H:m a')}</>
              )}
            </Text>
          </VStack>
        </Box>
        <VStack {...styles.ContentWrapper}>
          <VStack spacing={'6px'} align={'start'} mb={'6px'}>
            <Heading as={'h2'} fontSize={'14px'}>Auction super long title</Heading>
            <HStack spacing={'6px'}>
              <Image
                src={CreatorAvatarImage}
                alt={'Auction creator avatar'}
                borderRadius={'full'}
                boxSize={'24px'}
              />
              <NextLink href='#' passHref>
                <LinkOverlay>
                  <Text fontSize={'12px'} fontWeight={600}>
                    <Box as={'span'} color={'rgba(0 0 0 / 40%)'}>by</Box> Justin 3LAU
                  </Text>
                </LinkOverlay>
              </NextLink>
            </HStack>
          </VStack>

          {showMyBid && (
            <Box {...styles.MyBidGradientWrapper}>
              <Box {...styles.MyBidLabel}>My bid</Box>
              <HStack {...styles.MyBidWrapper}>
                <TokenIcon ticker={TokenTicker.WETH} boxSize={'20px'} />
                <Text fontSize={'20px'} fontWeight={500}>14,24</Text>
                <Text fontSize={'12px'} fontWeight={400} color={'rgba(0 0 0 / 40%)'}>~$41,594</Text>
              </HStack>
            </Box>
          )}

          <SimpleGrid columns={2} {...styles.DetailsWrapper}>
            <Box {...styles.DetailsItem}>
              <Text {...styles.DetailsItemLabel}>Winners</Text>
              <Text {...styles.DetailsItemValue}>35</Text>
            </Box>
            <Box {...styles.DetailsItem}>
              <Text {...styles.DetailsItemLabel}>NFTs Per Winner:</Text>
              <Text {...styles.DetailsItemValue}>10-7</Text>
            </Box>
            {showHighestLowestBids && (
              <>
                <Box {...styles.DetailsItem}>
                  <Text {...styles.DetailsItemLabel}>Highest Winning Bid:</Text>
                  <HStack spacing={'4px'} flexWrap={'wrap'}>
                    <TokenIcon ticker={TokenTicker.WETH} boxSize={'16px'} />
                    <Text {...styles.DetailsItemValue}>40,21</Text>
                    <Tooltip hasArrow variant={'black'} placement={'top'} label={'~$41,594'}>
                      <Text {...styles.DetailsItemValueUSD}>~$41,594</Text>
                    </Tooltip>
                  </HStack>
                </Box>
                <Box {...styles.DetailsItem}>
                  <Text {...styles.DetailsItemLabel}>Lowest Winning Bid:</Text>
                  <HStack spacing={'4px'} flexWrap={'wrap'}>
                    <TokenIcon ticker={TokenTicker.WETH} boxSize={'16px'} />
                    <Text {...styles.DetailsItemValue}>14,2</Text>
                    <Tooltip hasArrow variant={'black'} placement={'top'} label={'~$41,594'}>
                      <Text {...styles.DetailsItemValueUSD}>~$41,594</Text>
                    </Tooltip>
                  </HStack>
                </Box>
              </>
            )}
          </SimpleGrid>
        </VStack>
      </Box>
    </ItemWrapper>
  );
};
