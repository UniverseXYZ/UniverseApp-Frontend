import React, { useCallback, useEffect, useState } from 'react';
import { Box, Container, Heading, Image, Link, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';

import bg from '../../../../../assets/images/marketplace/v2/bg.png';
import arrow from '../../../../../assets/images/arrow.svg';

import { useThemeContext } from '../../../../../contexts/ThemeContext';
import { sellPageTabs, MarketplaceSellContext } from './constants';
import { SelectAmountTab, SelectMethodType, SettingsTab, SummaryTab, TabPanel } from './components';
import { SellAmountType, SellPageTabs, SellMethod } from './enums';
import { IMarketplaceSellContextData } from './types';
import { useFormik } from 'formik';

const settingsAmountTypeTitleText: Record<SellAmountType, string> = {
  [SellAmountType.SINGLE]: 'Single item',
  [SellAmountType.BUNDLE]: 'Bundle',
};

const settingsMethodsTitleText: Record<SellMethod, string> = {
  [SellMethod.FIXED]: 'Fixed Listing',
  [SellMethod.DUTCH]: 'Dutch auction',
  [SellMethod.ENGLISH]: 'English auction',
};

export const MarketplaceSell = () => {
  const { setDarkMode } = useThemeContext() as any;
  const [activeTab, setActiveTab] = useState<SellPageTabs>(SellPageTabs.SELL_AMOUNT);

  const form = useFormik({
    initialValues: {
      amountType: '',
      sellMethod: '',
      price: {
        value: 0,
        currency: '',
      },
      endingPrice: {
        value: 0,
        currency: '',
      },
      expirationDate: new Date(),
      withPrivacy: false,
      isScheduledForFutureTime: false,
      futureDate: '',
      buyerAddress: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSelectAmount = useCallback((amountType: SellAmountType) => {
    form.setFieldValue('amountType', amountType);
    setActiveTab(SellPageTabs.SELL_METHOD);
  }, []);

  const handleSelectSellMethod = useCallback((sellMethod: SellMethod) => {
    form.setFieldValue('sellMethod', sellMethod);
    setActiveTab(SellPageTabs.SETTINGS);
  }, []);

  const handleGoBack = useCallback(() => {
    const prevTabsMap: Partial<Record<SellPageTabs, SellPageTabs>> = {
      [SellPageTabs.SELL_METHOD]: SellPageTabs.SELL_AMOUNT,
      [SellPageTabs.SETTINGS]: SellPageTabs.SELL_METHOD,
      [SellPageTabs.SUMMARY]: SellPageTabs.SETTINGS,
    };

    const prevTab = prevTabsMap[activeTab];

    if (prevTab) {
      setActiveTab(prevTab);
    }
  }, [activeTab]);

  const handleContinue = useCallback(() => {
    const nextTabsMap: Partial<Record<SellPageTabs, SellPageTabs>> = {
      [SellPageTabs.SELL_AMOUNT]: SellPageTabs.SELL_METHOD,
      [SellPageTabs.SELL_METHOD]: SellPageTabs.SETTINGS,
      [SellPageTabs.SETTINGS]: SellPageTabs.SUMMARY,
    };

    const nextTab = nextTabsMap[activeTab];

    if (nextTab) {
      setActiveTab(nextTab);
    }
  }, [activeTab]);

  const handleSave = useCallback(() => {
    console.log('SAVE');
  }, []);

  useEffect(() => setDarkMode(false), []);

  const contextValue: IMarketplaceSellContextData = {
    form: form,
    selectAmount: handleSelectAmount,
    selectMethod: handleSelectSellMethod,
    goBack: handleGoBack,
    goContinue: handleContinue,
    save: handleSave,
  };

  const settingsTabName = `
    ${settingsAmountTypeTitleText[form.values.amountType as SellAmountType]} -
    ${settingsMethodsTitleText[form.values.sellMethod as SellMethod]}
  ` ;

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
                <TabPanel name={settingsTabName}>
                  <SettingsTab />
                </TabPanel>
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
