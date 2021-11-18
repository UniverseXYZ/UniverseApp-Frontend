import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Image,
  Link,
  Tab,
  TabList, TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import bg from '../../../../../assets/images/marketplace/v2/bg.png';

import arrow from '../../../../../assets/images/arrow.svg';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { sellPageTabs, amountOptions, sellMethodOptions } from './constants';
import { BoxSelect } from './components/box-select';
import { TieredAuctionsBanner } from './components';

export interface IMarketplaceBrowseNFTsProps {}

export const MarketplaceSell = (props: IMarketplaceBrowseNFTsProps) => {
  const { setDarkMode } = useThemeContext() as any;
  const [activeTab, setActiveTab] = useState(0);

  const handleSelectAmount = useCallback((amount: string) => {
    console.log('handleSelectAmount:', amount);
  }, []);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <Box w="100%" bgImage={bg} bgSize="contain" bgRepeat="no-repeat" sx={{ '--container-max-width': '1100px' }}>
      <Container maxW={'var(--container-max-width)'} pb={'0 !important'}>
        <Link href={'/'} mb={30} sx={{ _hover: { textDecoration: 'none' } }}>
          <Image src={arrow} display="inline" mr="10px" position="relative" top="-2px" />
          NFT name
        </Link>
        <Heading as="h1" mb={50}>Sell NFT</Heading>

        <Tabs isFitted variant={'arrow'} index={activeTab} onChange={(index) => setActiveTab(index)}>
          <TabList>
            {sellPageTabs.map((tab, i) => (
              <Tab key={i}>
                <Image src={activeTab === i ? tab.iconActive : tab.icon} display={'inline'} mr={'5px'} h={'17px'} />
                {tab.name}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <Heading as="h3" size="md" my={'60px'}>Select the amount of items</Heading>
              <Box mb={'200px'}>
                <BoxSelect options={amountOptions} onSelect={handleSelectAmount} />
              </Box>
            </TabPanel>
            <TabPanel p={0}>
              <Heading as="h3" size="md" my={'60px'}>Select your sell method</Heading>
              <Box mb={'120px'}>
                <BoxSelect options={sellMethodOptions} onSelect={handleSelectAmount} />
              </Box>
            </TabPanel>
            <TabPanel p={0}>3</TabPanel>
            <TabPanel p={0}>4</TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

      {activeTab === 0 && (<TieredAuctionsBanner />)}
    </Box>
  );
};
