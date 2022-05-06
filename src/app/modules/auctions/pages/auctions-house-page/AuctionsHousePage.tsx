import { Tab as ChakraTab, TabList, TabPanel, TabPanels, Tabs, TabProps, Box, Icon } from '@chakra-ui/react';
import { useEffect } from 'react';

import { ReactComponent as TabActiveCorner } from '@assets/images/tab-active-corner.svg';
import { OpenGraph } from '@app/components';
import { useThemeStore } from '@app/stores';

import { SORT_BY_ACTIVE_AUCTIONS, SORT_BY_FUTURE_AUCTIONS } from '../../constants';
import { AuctionsList, CreateYourAuction, Filters, WelcomeSection } from './components';
import * as styles from './AuctionsHousePage.styles';

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

      <Box m={'0 auto'} p={'0 30px'}>
        <Tabs mt={'-50px'}>
          <TabList {...styles.TabList}>
            <Tab {...styles.Tab}>Active auctions</Tab>
            <Tab {...styles.Tab}>Future auctions</Tab>
          </TabList>

          <TabPanels>
            <TabPanel {...styles.TabPanel}>
              <Filters sortByItems={SORT_BY_ACTIVE_AUCTIONS} />
              <AuctionsList type={'active'} />
            </TabPanel>
            <TabPanel {...styles.TabPanel}>
              <Filters sortByItems={SORT_BY_FUTURE_AUCTIONS} />
              <AuctionsList type={'future'} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <CreateYourAuction />
    </Box>
  );
};
