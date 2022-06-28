import { Box } from '@chakra-ui/react';
import { OpenGraph } from '@app/components';
import { BidToWin, RewardTiers } from './components';
import * as styles from './ActiveAuctionLandingPage.styles';

export const ActiveAuctionLandingPage = () => {

  return (
    <Box layerStyle={'StoneBG'}>
      {/* TODO - set open graph correctly */}
      {/* <OpenGraph title={'Universe Minting - Products - Auction House'} /> */}
      <RewardTiers />
      <BidToWin />
    </Box>
  );
};
