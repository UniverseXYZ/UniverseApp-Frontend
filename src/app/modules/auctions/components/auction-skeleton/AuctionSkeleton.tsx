import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useMeasure } from 'react-use';

import * as styles from './AuctionSkeleton.styles';
import { useCallback } from 'react';

interface IAuctionSkeletonProps {
  showMyBid?: boolean;
  showHighestLowestBids?: boolean;
}

export const AuctionSkeleton = (props: IAuctionSkeletonProps) => {
  const {
    showMyBid = false,
    showHighestLowestBids = false,
  } = props;

  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const renderDetails = useCallback(() => {
    return new Array(showHighestLowestBids ? 4 : 2).fill(null).map((_, i) => (
      <Box key={i} {...styles.DetailsItem}>
        <Box {...styles.DetailsItemLabel} />
        <Box {...styles.DetailsItemValue} />
      </Box>
    ));
  }, [showHighestLowestBids]);

  return (
    <Box ref={ref} {...styles.Wrapper}>
      <Box h={`${width}px`} {...styles.Asset}>
        <Box {...styles.TimerWrapper}>
          <Box {...styles.TimerLabel} />
          <Box {...styles.TimerValue} />
        </Box>
      </Box>
      <Box {...styles.ContentWrapper}>
        <Box {...styles.Title} />

        <Flex alignItems={'center'} mb={'20px'}>
          <Box {...styles.CreatorAvatar} />
          <Box {...styles.CreatorName} />
        </Flex>

        {showMyBid && (
          <Box {...styles.MyBidWrapper}>
            <Box {...styles.MyBidLabel} />
            <Box {...styles.MyBidValue} />
            <Box {...styles.MyBidValueUSD} />
          </Box>
        )}

        <SimpleGrid columns={2} spacingX={'10px'} {...styles.DetailsWrapper}>
          {renderDetails()}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
