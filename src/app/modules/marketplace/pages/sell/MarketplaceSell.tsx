import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Button,
  Container, Flex,
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
import { BoxSelect, TieredAuctionsBanner } from './components';

export const MarketplaceSell = () => {
  const { setDarkMode } = useThemeContext() as any;
  const [activeTab, setActiveTab] = useState(0);

  const handleSelectAmount = useCallback((amount: string) => {
    console.log('handleSelectAmount:', amount);
    setActiveTab(activeTab + 1);
  }, [activeTab]);

  const handleSelectSellType = useCallback((sellType: string) => {
    console.log('handleSelectSellType:', sellType);
    setActiveTab(activeTab + 1);
  }, [activeTab]);

  useEffect(() => setDarkMode(false), []);

  return (
    <Box
      bgImage={bg}
      bgSize="contain"
      bgRepeat="no-repeat"
      w="100%"
      sx={{ '--container-max-width': '1100px' }}
    >
      <Container maxW={'var(--container-max-width)'} pb={'0 !important'}>
        <Box px={{ base: '20px', md: '60px', xl: 0 }}>
          <Link href={'/'} mb={'20px'} fontFamily={'Space Grotesk'} fontWeight={500} sx={{ _hover: { textDecoration: 'none' } }}>
            <Image src={arrow} display="inline" mr="10px" position="relative" top="-2px" />
            NFT name
          </Link>

          <Heading as="h1" mb={'50px'}>Sell NFT</Heading>

          <Tabs isFitted variant={'arrow'} index={activeTab} onChange={(index) => setActiveTab(index)}>
            <TabList overflowX={'scroll'}>
              {sellPageTabs.map((tab, i) => (
                <Tab key={i} minW={'130px'} isDisabled={i > activeTab && i != 3}>
                  <Image src={activeTab === i ? tab.iconActive : tab.icon} />
                  {tab.name}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <Heading as="h3" size="md" my={'60px'}>Select the amount of items</Heading>
                <Box mb={'100px'}>
                  <BoxSelect options={amountOptions} onSelect={handleSelectAmount} />
                </Box>
                <TieredAuctionsBanner />
              </TabPanel>
              <TabPanel p={0}>
                <Heading as="h3" size="md" my={'60px'}>Select your sell method</Heading>
                <Box mb={'120px'}>
                  <BoxSelect options={sellMethodOptions} onSelect={handleSelectSellType} />
                </Box>
              </TabPanel>
              <TabPanel p={0}>3</TabPanel>
              <TabPanel p={0}>
                <Heading as="h3" size="md" my={'60px'}>Summary</Heading>
                <Flex
                  borderRadius={'12px'}
                  boxShadow={'0 10px 36px rgba(136, 120, 172, 0.14)'}
                  flexDir={'column'}
                  p={'50px'}
                  mb={'50px'}
                >
                  <p>Listing</p>
                  <p>Your bundle will be listed for</p>
                  <p>Fees</p>
                  <p>Listing is free! At the time of the sale, the following fees will be deducted. </p>
                  <p>You will receive:</p>
                </Flex>
                <Box textAlign={'right'} mb={'50px'}>
                  <Button mr={'10px'}>Back</Button>
                  <Button>Post your listing</Button>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>

      {/*{activeTab === 0 && (<TieredAuctionsBanner />)}*/}
    </Box>
  );
};
