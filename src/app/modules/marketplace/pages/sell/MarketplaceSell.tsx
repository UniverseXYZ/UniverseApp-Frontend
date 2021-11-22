import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Image,
  Link,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import bg from '../../../../../assets/images/marketplace/v2/bg.png';
import arrow from '../../../../../assets/images/arrow.svg';

import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { sellPageTabs, MarketplaceSellContext } from './constants';
import { SelectAmountTab, SelectMethodType, SummaryTab, TabPanel } from './components';
import { SellPageTabs } from './enums';
import { IMarketplaceSellContextData } from './types';

export const MarketplaceSell = () => {
  const { setDarkMode } = useThemeContext() as any;
  const [activeTab, setActiveTab] = useState(SellPageTabs.SUMMARY);

  const handleSelectAmount = useCallback((amount: string) => {
    console.log('handleSelectAmount:', amount);
    setActiveTab(SellPageTabs.SELL_METHOD);
  }, []);

  const handleSelectSellMethod = useCallback((sellType: string) => {
    console.log('handleSelectSellType:', sellType);
    setActiveTab(SellPageTabs.SUMMARY); // TODO: change to SellPageTabs.SETTINGS
  }, []);

  const handleBackToSettings = useCallback(() => {
    setActiveTab(SellPageTabs.SETTINGS);
  }, []);

  const handleSave = useCallback(() => {
    console.log('SAVE');
  }, []);

  useEffect(() => setDarkMode(false), []);

  const contextValue: IMarketplaceSellContextData = {
    selectAmount: handleSelectAmount,
    selectMethod: handleSelectSellMethod,
    backToSettings: handleBackToSettings,
    save: handleSave,
  };

  return (
    <MarketplaceSellContext.Provider value={contextValue}>
      <Box
        bgImage={bg}
        bgSize="contain"
        bgRepeat="no-repeat"
        w="100%"
        sx={{ '--container-max-width': '1100px' }}
      >
        <Container maxW={'var(--container-max-width)'} pb={'0 !important'}>
          <Box px={{ base: '20px', md: '60px', xl: 0 }}>
            <Link
              href={'/'}
              mb={'20px'}
              fontFamily={'Space Grotesk'}
              fontWeight={500}
              sx={{ _hover: { textDecoration: 'none' } }}
            >
              <Image src={arrow} display="inline" mr="10px" position="relative" top="-2px" />
              NFT name
            </Link>

            <Heading as="h1" mb={'50px'}>Sell NFT</Heading>

            <Tabs isFitted variant={'arrow'} index={activeTab} onChange={setActiveTab}>
              <TabList overflowX={'scroll'}>
                {sellPageTabs.map((tab, i) => (
                  <Tab key={i} minW={'130px'} isDisabled={i > activeTab}>
                    <Image src={activeTab === i ? tab.iconActive : tab.icon} />
                    {tab.name}
                  </Tab>
                ))}
              </TabList>

              <TabPanels>
                <TabPanel name="Select the amount of items">
                  <SelectAmountTab />
                </TabPanel>
                <TabPanel name="Select your sell method">
                  <SelectMethodType />
                </TabPanel>
                <TabPanel name="Single item - Dutch auction">3</TabPanel>
                <TabPanel name="Summary">
                  <SummaryTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </MarketplaceSellContext.Provider>
  );
};
