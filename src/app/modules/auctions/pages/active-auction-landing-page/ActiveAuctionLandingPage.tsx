import { Box } from '@chakra-ui/react';
import { OpenGraph } from '@app/components';
import { ActionSection, CreatorSection, HeroSection, TiersSection } from './components';

export const ActiveAuctionLandingPage = () => {

  return (
    <Box layerStyle={'StoneBG'}>
      {/* TODO - set open graph correctly */}
      {/* <OpenGraph title={'Universe Minting - Products - Auction House'} /> */}
      <HeroSection />
      <TiersSection />
      <CreatorSection />
      <ActionSection />
    </Box>
  );
};
