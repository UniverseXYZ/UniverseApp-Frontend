import {
  Box,
  Container,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabPanel
} from '@chakra-ui/react';
import axios from 'axios';
import { utils } from 'ethers';
import { FormikProvider, useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { NextPageContext } from 'next';
import NextLink from 'next/link';

import bg from '@assets/images/marketplace/v2/bg.png';
import arrow from '@assets/images/arrow.svg';
import BGImage from '@assets/images/v2/stone_bg.jpg';

import {
  defaultDutchAuctionForm,
  defaultEnglishAuctionForm,
  defaultFixedListingForm,
  sellMethodOptions,
  settingsAmountTypeTitleText,
  settingsMethodsTitleText,
} from './constants';
import { IListingPage, ListingPageContext } from './ListingPage.context';
import { SettingsTab, SummaryTab } from './components';
import { SellAmountType, SellMethod, SellPageTabs } from './enums';
import { ISellForm } from './types';
import { sign } from '../../../../helpers';
import { TOKENS_MAP, ZERO_ADDRESS } from '../../../../constants';
import { TokenTicker } from '../../../../enums';
import {
  INFT,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
  IOrderAssetTypeETH,
  IOrderAssetTypeSingleListing,
} from '../../../nft/types';
import {
  EncodeOrderApi,
  GetActiveListingApi,
  GetHistoryApi,
  GetNFTApi,
  GetSaltApi,
  IEncodeOrderApiData,
} from '../../../../api';
import Contracts from '../../../../../contracts/contracts.json';
import { OrderAssetClass } from '../../../nft/enums';
import { Status as PostingPopupStatus } from './components/tab-summary/compoents/posting-popup/enums/index';
import { nftKeys, orderKeys } from '../../../../utils/query-keys';
import { useRouter } from 'next/router';
import { useAuthStore } from '../../../../../stores/authStore';
import { useErrorStore } from '../../../../../stores/errorStore';
import { useThemeStore } from 'src/stores/themeStore';
import { AreaButton } from '@app/modules/marketplace/components';
import { Icon } from '@app/components';
import { getListingValidationSchema } from './helpers';

// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

export const SellPage = () => {
  const router = useRouter();

  type IRouterQuery = {
    collectionAddress: string;
    tokenId: string;
  }

  const params = router.query as IRouterQuery;

  const { signer, web3Provider } = useAuthStore(state => ({signer: state.signer, web3Provider: state.web3Provider})) as any;

  const { setShowError, setErrorBody } = useErrorStore(s => ({setShowError: s.setShowError, setErrorBody: s.setErrorBody}))

  const queryClient = useQueryClient();

  const encodeOrderMutation = useMutation(
    (data: IEncodeOrderApiData<
      IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing,
      IOrderAssetTypeERC20 | IOrderAssetTypeETH
      >) => {
      return EncodeOrderApi(data);
    }
  );

  const createOrderMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/order`, data);
  }, {
    onSuccess: () => {
      //TODO: Invalidate browse marketplace query key
      queryClient.refetchQueries(orderKeys.browseAny)

      const listingQueryKey = orderKeys.listing({
        collectionAddress: params.collectionAddress.toLowerCase(),
        tokenId: params.tokenId
      });
      const historyQueryKey = orderKeys.history({
        collectionAddress: params.collectionAddress.toLowerCase(),
        tokenId: params.tokenId
      });

      queryClient.invalidateQueries(listingQueryKey);
      queryClient.prefetchQuery(listingQueryKey, () => GetActiveListingApi(params.collectionAddress.toLowerCase(), params.tokenId));

      queryClient.invalidateQueries(historyQueryKey);
      queryClient.prefetchQuery(historyQueryKey, () => GetHistoryApi(params.collectionAddress.toLowerCase(), params.tokenId));
    }
  });

  const { data: nft } = useQuery(
    nftKeys.nftInfo({collectionAddress: params.collectionAddress, tokenId: params.tokenId}),
    () => GetNFTApi(params.collectionAddress, params.tokenId),
    {
      onSuccess: (data) => console.log(data)
    }
  );

  const getSaltMutation = useMutation(GetSaltApi);

  const setDarkMode = useThemeStore(s => s.setDarkMode);
  const [activeTab, setActiveTab] = useState<SellPageTabs>(SellPageTabs.SELL_METHOD);
  const [amountType, setAmountType] = useState<SellAmountType>(SellAmountType.SINGLE); // TODO: add Bundle
  const [sellMethod, setSellMethod] = useState<SellMethod>();
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const [postingPopupStatus, setPostingPopupStatus] = useState<PostingPopupStatus>(PostingPopupStatus.HIDDEN);
  const [validateRoyalties, setValidateRoyalties] = useState(false);

  const form = useFormik<ISellForm>({
    initialValues: {} as ISellForm,
    validateOnMount: true,
    validationSchema: getListingValidationSchema(amountType, sellMethod, validateRoyalties),
    onSubmit: async (values: any) => {
      try {
        const network = await web3Provider.getNetwork();
        const address = await signer.getAddress();
  
        const salt = (await getSaltMutation.mutateAsync(address)).data.salt;
  
        const make: any = {
          assetType: {
            assetClass: nft?.standard,
            contract: params.collectionAddress.toLowerCase(),
            tokenId: params.tokenId,
          },
          value: `${values.amount}`,
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
          }, [[(params.collectionAddress.toLowerCase())], [[params.tokenId]]]);
  
          make.assetType = {
            assetClass: 'ERC721_BUNDLE',
            contracts: contracts,
            tokenIds: tokenIds,
            bundleName: values.bundleName,
            bundleDescription: values.bundleDescription,
          };
        }
  
        const orderData: IEncodeOrderApiData<
          IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing,
          IOrderAssetTypeERC20 | IOrderAssetTypeETH
          > = {
          salt: salt,
          maker: address,
          make,
          taker: values.buyerAddress || ZERO_ADDRESS,
          take: {
            assetType: values.priceCurrency === OrderAssetClass.ETH
              ? ({
                assetClass: OrderAssetClass.ETH,
              })
              : ({
                assetClass: OrderAssetClass.ERC20,
                contract: contractsData[values.priceCurrency]?.address
              }),
            value: utils.parseUnits(
              `${values.price}`,
              `${TOKENS_MAP[values.priceCurrency as TokenTicker].decimals}`
            ).toString(),
          },
          type: 'UNIVERSE_V1',
          start: values.startDate ? Math.floor(values.startDate.getTime()/1000) : 0,
          end: values.endDate ? Math.floor(values.endDate.getTime() / 1000) : 0,
          data: {
            dataType: 'ORDER_DATA',
            revenueSplits: values.royalties?.map((r: any) => ({
              account: r.address,
              value: +r.percent,
            })) ?? []
          },
        };

        console.log('orderData', orderData);
        return;
  
        const { data: encodedOrder } = (await encodeOrderMutation.mutateAsync(orderData));
  
        const signature = await sign(
          web3Provider.provider,
          encodedOrder,
          address,
          `${network.chainId}`,
          `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`
        );
  
        const createOrderResponse = (await createOrderMutation.mutateAsync({ ...orderData, signature })).data;
  
        setIsPosted(true);
      } catch(err: any) {
        console.log(err)   
        setPostingPopupStatus(PostingPopupStatus.HIDDEN);
  
        // Code 4001 is user rejected transaction
        if (err?.code === 4001) {
          return;
        }
  
        // Check if error comes from api request and if the api has returned a meaningful messages
        if (getSaltMutation.isError && !!(getSaltMutation as any)?.error?.response?.data?.message) {
          setErrorBody((getSaltMutation as any)?.error?.response?.data?.message)
        } else if (encodeOrderMutation.isError && !!(encodeOrderMutation as any)?.error?.response?.data?.message) {
          setErrorBody((encodeOrderMutation as any)?.error?.response?.data?.message)
        } else if (createOrderMutation.isError && !!(createOrderMutation as any)?.error?.response?.data?.message) {
          setErrorBody((createOrderMutation as any)?.error?.response?.data?.message)
        }
  
        setShowError(true);
      }
    },
  });

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
      [SellPageTabs.SETTINGS]: SellPageTabs.SELL_METHOD,
      [SellPageTabs.SUMMARY]: SellPageTabs.SETTINGS,
    };

    const prevTab = prevTabsMap[activeTab];

    if (prevTab !== undefined) {
      setActiveTab(prevTab);
    }
  }, [activeTab]);

  const handleContinue = useCallback(() => {
    const nextTabsMap: Partial<Record<SellPageTabs, SellPageTabs>> = {
      [SellPageTabs.SELL_METHOD]: SellPageTabs.SETTINGS,
      [SellPageTabs.SETTINGS]: SellPageTabs.SUMMARY,
    };

    const nextTab = nextTabsMap[activeTab];

    if (nextTab !== undefined) {
      setActiveTab(nextTab);
    }
  }, [activeTab]);

  useEffect(() => setDarkMode(false), []);

  useEffect(() => {
    if (!form.values.royalties) {
      return;
    }

    if (form.values.royalties.length > 1) {
      setValidateRoyalties(true);
    } else {
      setValidateRoyalties(form.values.royalties.some((r) => !!r.address || !!r.percent));
    }
  }, [form.values.royalties]);

  const contextValue: IListingPage = {
    nft: nft as INFT,
    isPosted,
    amountType: amountType as SellAmountType,
    sellMethod: sellMethod as SellMethod,
    form: form,
    goBack: handleGoBack,
    goContinue: handleContinue,
    postingPopupStatus: postingPopupStatus,
    setPostingPopupStatus: setPostingPopupStatus,
  };

  type IListingTab = {
    name: string;
    heading: string;
    renderIcon: () => React.ReactNode;
    renderTab: () => React.ReactNode;
  };

  const tabs: IListingTab[] = [
    {
      name: 'Select sell method',
      heading: 'Select your sell method',
      renderIcon: () => <Icon name={'label'} />,
      renderTab: () => (
        <SimpleGrid columns={sellMethodOptions.length} spacing={['20px', null, '26px', '30px']} mb={'100px'}>
          {sellMethodOptions.map((method, i) => (
            <AreaButton
              key={i}
              title={method.title}
              description={method.description}
              icon={method.icon}
              disabled={method.disabled}
              onClick={() => handleSelectSellMethod(method.value as SellMethod)}
            />
          ))}
        </SimpleGrid>
      )
    },
    {
      name: 'Settings',
      heading: (amountType && sellMethod)
        ? `${settingsAmountTypeTitleText[amountType]} - ${settingsMethodsTitleText[sellMethod]}`
        : '',
      renderIcon: () => <Icon name={'settings'} />,
      renderTab: () => <SettingsTab />
    },
    {
      name: 'Summary',
      heading: 'Summary',
      renderIcon: () => <Icon name={'eye'} />,
      renderTab: () => <SummaryTab />
    },
  ];

  return (
    <ListingPageContext.Provider value={contextValue}>
      <FormikProvider value={form}>
        <Box sx={{ bg: `url(${BGImage}) center / cover` }}>
          <Box
            bgImage={bg}
            bgSize="contain"
            bgRepeat="no-repeat"
            w="100%"
            sx={{ '--container-max-width': '1100px' }}
          >
            <Container maxW={'var(--container-max-width)'} pb={'0 !important'}>
              <Box px={{ base: '20px', md: '60px', xl: 0 }}>
                <LinkBox
                  mb={'20px'}
                  fontFamily={'Space Grotesk'}
                  fontWeight={500}
                  display={"inline-block"}
                  _hover={{ textDecoration: "none" }}
                >
                  <NextLink href={`/nft/${params.collectionAddress}/${params.tokenId}`}>
                    <LinkOverlay display={'contents'}>
                      <Image src={arrow} display="inline" mr="10px" position="relative" top="-2px" />
                      {nft?.name ?? params.tokenId}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>

                <Heading as="h1" mb={'50px'}>Sell NFT</Heading>

                <Tabs isFitted variant={'arrow'} index={activeTab} onChange={setActiveTab}>
                  <TabList overflowX={'scroll'} padding={'0 5px'}>
                    {tabs.map(({ name, renderIcon }, i) => (
                      <Tab key={i} minW={'130px'} isDisabled={i > activeTab || isPosted}>
                        {renderIcon()}
                        <Box as={'span'} ml={'6px'}>{name}</Box>
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    {tabs.map(({ heading, renderTab }, i) => (
                      <TabPanel key={i} p={0}>
                        <Heading as="h3" size="md" my={'60px'}>{heading}</Heading>
                        {activeTab === i && (renderTab())}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              </Box>
            </Container>
          </Box>
        </Box>
      </FormikProvider>
    </ListingPageContext.Provider>
  );
};

SellPage.getInitialProps = (ctx: NextPageContext) => ({});
