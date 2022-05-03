import { Container, Tab as ChakraTab, TabList, TabPanel, TabPanels, Tabs, TabProps, Box, Icon } from '@chakra-ui/react';
import { useEffect } from 'react';

import { ReactComponent as TabActiveCorner } from '@assets/images/tab-active-corner.svg';
import { OpenGraph } from '@app/components';

import { AuctionsList, CreateYourAuction, Filters, WelcomeSection } from './components';
import { useThemeStore } from '@app/stores';
import * as styles from './AuctionsHousePage.styles';

export const ACTIVE_AUCTION_SORT_BY_ITEMS = [
  'Ending soon',
  'Recently added',
  'Highest winning bid',
  'Lowest winning bid',
];

export const FUTURE_AUCTION_SORT_BY_ITEMS = [
  'Starts soon',
  'Recently added',
];

export const Tab = ({ children, ...props }: TabProps) => {
  return (
    <>
      <ChakraTab {...props}>
        <Icon viewBox={'0 0 12 12'} color={'white'} data-selected-corner={'left'}>
          <TabActiveCorner />
        </Icon>
        {children}
        <Icon viewBox={'0 0 12 12'} color={'white'} data-selected-corner={'right'}>
          <TabActiveCorner />
        </Icon>
      </ChakraTab>
    </>
  );
}

export const AuctionsHousePage = () => {
  const setDarkMode = useThemeStore(s => s.setDarkMode);

  useEffect(() => setDarkMode(true), []);

  return (
    <Box layerStyle={'StoneBG'}>
      <OpenGraph title={'Universe Minting - Products - Auction House'} />
      <WelcomeSection />

      {/*<Tabs />*/}

      <Container maxW={'1110px'} m={'0 auto'} p={0}>
        <Tabs mt={'-50px'}>
          <TabList {...styles.TabList}>
            <Tab {...styles.Tab}>Active auctions</Tab>
            <Tab {...styles.Tab}>Future auctions</Tab>
          </TabList>

          <TabPanels>
            <TabPanel {...styles.TabPanel}>
              <Filters sortByItems={ACTIVE_AUCTION_SORT_BY_ITEMS} />
              <AuctionsList
                type={'active'}
              />
            </TabPanel>
            <TabPanel {...styles.TabPanel}>
              <Filters sortByItems={FUTURE_AUCTION_SORT_BY_ITEMS} />
              <AuctionsList
                type={'future'}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <CreateYourAuction />
    </Box>
  );
};
