import { Box, Flex, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useMeasure } from 'react-use';

import * as styles from './AuctionCardSkeleton.styles';

interface IAuctionCardSkeletonProps {
  showMyBid?: boolean;
  showHighestLowestBids?: boolean;
}

export const AuctionCardSkeleton = (props: IAuctionCardSkeletonProps) => {
  const {
    showMyBid = false,
    showHighestLowestBids = false,
  } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const renderDetails = useCallback(() => {
    return new Array(showHighestLowestBids ? 4 : 2).fill(null).map((_, i) => (
      <Box key={i} {...styles.DetailsItem}>
        <Skeleton {...styles.DetailsItemLabel} />
        <Skeleton {...styles.DetailsItemValue} />
      </Box>
    ));
  }, [showHighestLowestBids]);

  return (
    <Box ref={ref} {...styles.Wrapper}>
      <Box h={`${width}px`} {...styles.AssetWrapper}>
        <Skeleton {...styles.Asset} />
        <Box {...styles.TimerWrapper}>
          <Skeleton {...styles.TimerLabel} />
          <Skeleton {...styles.TimerValue} />
        </Box>
      </Box>
      <Box {...styles.ContentWrapper}>
        <Skeleton {...styles.Title} />

        <Flex alignItems={'center'} mb={'20px'}>
          <Skeleton {...styles.CreatorAvatar} />
          <Skeleton {...styles.CreatorName} />
        </Flex>

        {showMyBid && (
          <Box {...styles.MyBidWrapper}>
            <Box {...styles.MyBidLabelWrapper}>
              <Skeleton {...styles.MyBidLabel} />
            </Box>
            <Skeleton {...styles.MyBidValue} />
            <Skeleton {...styles.MyBidValueUSD} />
          </Box>
        )}

        <SimpleGrid columns={2} spacingX={'10px'} {...styles.DetailsWrapper}>
          {renderDetails()}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
