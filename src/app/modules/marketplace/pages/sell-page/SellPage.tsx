import { Box, Container, Heading, Image, Link, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import axios from 'axios';
import { utils } from 'ethers';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import * as Yup from 'yup';

import bg from '../../../../../assets/images/marketplace/v2/bg.png';
import arrow from '../../../../../assets/images/arrow.svg';

import { useThemeContext } from '../../../../../contexts/ThemeContext';
import {
  defaultDutchAuctionForm,
  defaultEnglishAuctionForm,
  defaultFixedListingForm,
  MarketplaceSellContext,
  sellPageTabs,
  settingsAmountTypeTitleText,
  settingsMethodsTitleText,
} from './constants';
import { SelectAmountTab, SelectMethodType, SettingsTab, SummaryTab, TabPanel } from './components';
import { SellAmountType, SellMethod, SellPageTabs } from './enums';
import { IMarketplaceSellContextData, ISellForm } from './types';
import { sign } from '../../../../helpers';
import { useAuthContext } from '../../../../../contexts/AuthContext';
import { TOKENS_MAP } from '../../../../constants';
import { TokenTicker } from '../../../../enums';
import { GetNFTApi } from '../../../nft/api';
import { INFT } from '../../../nft/types';
import { GetSaltApi } from '../../../../api';

const getValidationSchema = (amountType?: SellAmountType, sellMethod?: SellMethod) => {
  switch (sellMethod) {
    case SellMethod.FIXED: return Yup.object().shape({
      bundleName: amountType === SellAmountType.SINGLE ? Yup.string() : Yup.string().required('Required'),
      bundleDescription: amountType === SellAmountType.SINGLE ? Yup.string() : Yup.string().max(500, 'Too Long!'), // TODO: use variable maxDescriptionSymbols
      price: Yup.number()
        .typeError('Invalid price')
        .required('Required')
        .moreThan(0, 'Price must be greater than 0'),
    });
    default: return Yup.object().shape({});
  }
}

export const SellPage = () => {
  const history = useHistory();
  const params = useParams<{ collectionAddress: string; tokenId: string; }>();

  const { signer, web3Provider } = useAuthContext() as any;

  const encodeDataMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/encoder/order`, data);
  });

  const createOrderMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/order`, data);
  });

  const { data: nft } = useQuery(
    ['sell-nft', params.collectionAddress, params.tokenId],
    () => GetNFTApi(params.collectionAddress, params.tokenId)
  );

  const getSaltMutation = useMutation(GetSaltApi);

  const { setDarkMode } = useThemeContext() as any;
  const [activeTab, setActiveTab] = useState<SellPageTabs>(SellPageTabs.SELL_AMOUNT);
  const [amountType, setAmountType] = useState<SellAmountType>();
  const [sellMethod, setSellMethod] = useState<SellMethod>();
  const [isPosted, setIsPosted] = useState<boolean>(false);

  const form = useFormik<ISellForm>({
    initialValues: {} as ISellForm,
    validateOnMount: true,
    validationSchema: getValidationSchema(amountType, sellMethod),
    onSubmit: async (values: any) => {
      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();

      const salt = (await getSaltMutation.mutateAsync(address)).data.salt;

      const make: any = {
        assetType: {
          assetClass: nft?.standard,
          contract: nft?.collection?.address,
          tokenId: +params.tokenId,
        },
        value: '1',
      };

      if (amountType === SellAmountType.BUNDLE) {
        const [contracts, tokenIds] = (values.bundleSelectedNFTs as string[]).reduce<[string[], [string[]]]>((acc, key: string) => {
          const [NFTId, NFTHash, NFTTokenId] = key.split(':');

          let i = acc[0].indexOf(NFTHash);

          if (i === -1) {
            acc[0].push(NFTHash);
            acc[1].push([]);
            i = acc[0].length - 1;
          }

          acc[1][i].push(NFTTokenId);
          return acc;
        }, [[(nft?.collection?.address ?? '')], [[params.tokenId]]]);

        make.assetType = {
          assetClass: 'ERC721_BUNDLE',
          contracts: contracts,
          tokenIds: tokenIds,
          bundleName: values.bundleName,
          bundleDescription: values.bundleDescription,
        };
      }

      const data = {
        type: 'UNIVERSE_V1',
        maker: address,
        taker: values.buyerAddress || '0x0000000000000000000000000000000000000000',
        make,
        // TODO: improve take.assetClass & take.value for Dutch & English auction
        take: {
          assetType: {
            assetClass: values.priceCurrency,
          },
          value: utils.parseUnits(
            `${values.price}`,
            `${TOKENS_MAP[values.priceCurrency as TokenTicker].decimals}`
          ).toString(),
        },
        salt: salt,
        start: 0,
        end: 0,
        signature: '1', // TODO: remove
        data: {
          dataType: 'ORDER_DATA',
          revenueSplits: nft?.royalties.map((royalty: any) => ({
            account: royalty.address,
            value: royalty.amount * 100,
          }))
        },
      };

      const response = (await encodeDataMutation.mutateAsync(data)).data;

      const signature = await sign(
        web3Provider.provider,
        response,
        address,
        `${network.chainId}`,
        `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`
      );

      const createOrderResponse = (await createOrderMutation.mutateAsync({ ...data, signature })).data;

      console.log('createOrderResponse', createOrderResponse);
      setIsPosted(true);
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
    nft: nft as INFT,
    isPosted,
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
              href={`/nft/${params.collectionAddress}/${params.tokenId}`}
              mb={'20px'}
              fontFamily={'Space Grotesk'}
              fontWeight={500}
              _hover={{ textDecoration: 'none' }}
            >
              <Image src={arrow} display="inline" mr="10px" position="relative" top="-2px" />
              {nft?.name ?? params.collectionAddress}
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
                  { amountType && sellMethod && nft && <SettingsTab />}
                </TabPanel>
                <TabPanel name='Summary'>
                  {nft && activeTab === 3 && <SummaryTab />}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </MarketplaceSellContext.Provider>
  );
};
