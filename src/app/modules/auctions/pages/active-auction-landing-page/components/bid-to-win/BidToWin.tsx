import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { useCallback } from 'react';

import * as styles from './BidToWin.styles';

export const BidToWin = () => {

  const handlePlaceBid = useCallback(() => {
    // TODO - BE implementation
  }, []);

  return (
    <Box {...styles.WrapperStyle}>
      <Container {...styles.ContainerStyle}>
        <Heading {...styles.HeadingStyle}>Bid to win 1 of 3 NFT bundles</Heading>
        <Button {...styles.ButtonStyle} onClick={handlePlaceBid}>
          Place a bid
        </Button>
      </Container>
    </Box>
  );
};
