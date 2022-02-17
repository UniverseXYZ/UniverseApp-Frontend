import React, { useCallback, useEffect, useState } from 'react';
import { Box, Container, Heading, Image, Link, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { useFormik } from 'formik';

import bg from '../../../../../assets/images/marketplace/v2/bg.png';
import arrow from '../../../../../assets/images/arrow.svg';

import { useThemeContext } from '../../../../../contexts/ThemeContext';
import {
  defaultDutchAuctionForm, defaultEnglishAuctionForm,
  defaultFixedListingForm,
  MarketplaceSellContext,
  sellPageTabs,
  settingsAmountTypeTitleText,
  settingsMethodsTitleText,
} from './constants';
import { SelectAmountTab, SelectMethodType, SettingsTab, SummaryTab, TabPanel } from './components';
import { SellAmountType, SellMethod, SellPageTabs } from './enums';
import { IMarketplaceSellContextData, ISellForm } from './types';

export const SellPage = () => {
  const { setDarkMode } = useThemeContext() as any;
  const [activeTab, setActiveTab] = useState<SellPageTabs>(SellPageTabs.SELL_AMOUNT);
  const [amountType, setAmountType] = useState<SellAmountType>();
  const [sellMethod, setSellMethod] = useState<SellMethod>();

  const form = useFormik<ISellForm>({
    initialValues: {} as ISellForm,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSelectAmount = useCallback((amountType: SellAmountType) => {
    setAmountType(amountType);
    setSellMethod(undefined);
    setActiveTab(SellPageTabs.SELL_METHOD);
  }, []);

  const handleSelectSellMethod = useCallback((sellMethod: SellMethod) => {
    setSellMethod(sellMethod);
    setActiveTab(SellPageTabs.SETTINGS);

    switch (sellMethod) {
      case SellMethod.FIXED:
        form.setValues({...defaultFixedListingForm});
        break;
      case SellMethod.DUTCH:
        form.setValues({...defaultDutchAuctionForm});
        break;
      case SellMethod.ENGLISH:
        form.setValues({...defaultEnglishAuctionForm});
        break;
    }

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

  useEffect(() => setDarkMode(false), []);

  const contextValue: IMarketplaceSellContextData = {
    amountType: amountType as SellAmountType,
    sellMethod: sellMethod as SellMethod,
    form: form,
    selectAmount: handleSelectAmount,
    selectMethod: handleSelectSellMethod,
    goBack: handleGoBack,
    goContinue: handleContinue,
  };

  const settingsTabName = (amountType && sellMethod)
    ? `${settingsAmountTypeTitleText[amountType]} - ${settingsMethodsTitleText[sellMethod]}`
    : '';

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
              href={'/v2/marketplace/browse'}
              mb={'20px'}
              fontFamily={'Space Grotesk'}
              fontWeight={500}
              _hover={{ textDecoration: 'none' }}
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
