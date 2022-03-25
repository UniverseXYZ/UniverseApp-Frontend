import { Box, Container, Heading, Image, LinkBox, LinkOverlay, Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import axios from 'axios';
import { utils } from 'ethers';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import * as Yup from 'yup';
import { Contract } from 'ethers';
import { Link } from 'react-router-dom';

import bg from '../../../../../assets/images/marketplace/v2/bg.png';
import arrow from '../../../../../assets/images/arrow.svg';
import BGImage from './../../../../../assets/images/v2/stone_bg.jpg';

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
import { SelectMethodType, SettingsTab, SummaryTab, TabPanel } from './components';
import { SellAmountType, SellMethod, SellPageTabs } from './enums';
import { IMarketplaceSellContextData, ISellForm } from './types';
import { sign } from '../../../../helpers';
import { useAuthContext } from '../../../../../contexts/AuthContext';
import { TOKENS_MAP, ZERO_ADDRESS } from '../../../../constants';
import { TokenTicker } from '../../../../enums';
import { GetActiveListingApi, GetHistoryApi, GetNFT2Api } from '../../../nft/api';
import { INFT } from '../../../nft/types';
import { EncodeOrderApi, GetSaltApi, IEncodeOrderApiData } from '../../../../api';
import Contracts from '../../../../../contracts/contracts.json';
import { OrderAssetClass } from '../../../nft/enums';
import { useQueryClient } from 'react-query'

// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];
import { Status, Status as PostingPopupStatus } from './components/tab-summary/compoents/posting-popup/enums/index';
import { useErrorContext } from '../../../../../contexts/ErrorContext';
import { nftKeys, orderKeys } from '../../../../utils/query-keys';

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
  const params = useParams<{ collectionAddress: string; tokenId: string; }>();

  const { signer, web3Provider, address } = useAuthContext() as any;

  const { setShowError, setErrorBody} = useErrorContext() as any;

  const queryClient = useQueryClient();

  const encodeOrderMutation = useMutation(EncodeOrderApi);

  const createOrderMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/order`, data);
  }, {
    onSuccess: () => {
      //TODO: Invalidate browse marketplace query key
      queryClient.refetchQueries(orderKeys.browseAny)

      queryClient.invalidateQueries(orderKeys.listing({ collectionAddress: params.collectionAddress.toLowerCase(), tokenId: params.tokenId }));
      queryClient.invalidateQueries(orderKeys.history({ collectionAddress: params.collectionAddress.toLowerCase(), tokenId: params.tokenId }));
      queryClient.prefetchQuery(orderKeys.listing({ collectionAddress: params.collectionAddress.toLowerCase(), tokenId: params.tokenId }), async () => {
        const result = await GetActiveListingApi(params.collectionAddress.toLowerCase(), params.tokenId);
        return result;
      })
      queryClient.prefetchQuery(orderKeys.history({ collectionAddress: params.collectionAddress.toLowerCase(), tokenId: params.tokenId }), async () => {
        const result = await GetHistoryApi(params.collectionAddress.toLowerCase(), params.tokenId);
        return result;
      });
    }
  });

  const { data: nft } = useQuery(
    nftKeys.nftInfo({collectionAddress: params.collectionAddress, tokenId: params.tokenId}),
    () => GetNFT2Api(params.collectionAddress, params.tokenId),
    {
      onSuccess: (data) => console.log(data)
    }
  );

  const getSaltMutation = useMutation(GetSaltApi);

  const { setDarkMode } = useThemeContext() as any;
  const [activeTab, setActiveTab] = useState<SellPageTabs>(SellPageTabs.SELL_METHOD);
  const [amountType, setAmountType] = useState<SellAmountType>(SellAmountType.SINGLE); // TODO: add Bundle
  const [sellMethod, setSellMethod] = useState<SellMethod>();
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const [postingPopupStatus, setPostingPopupStatus] = useState<PostingPopupStatus>(PostingPopupStatus.HIDDEN);

  const form = useFormik<ISellForm>({
    initialValues: {} as ISellForm,
    validateOnMount: true,
    validationSchema: getValidationSchema(amountType, sellMethod),
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
          }, [[(params.collectionAddress.toLowerCase())], [[params.tokenId]]]);
  
          make.assetType = {
            assetClass: 'ERC721_BUNDLE',
            contracts: contracts,
            tokenIds: tokenIds,
            bundleName: values.bundleName,
            bundleDescription: values.bundleDescription,
          };
        }
  
        const orderData: IEncodeOrderApiData = {
          salt: salt,
          maker: address,
          make,
          taker: values.buyerAddress || ZERO_ADDRESS,
          take: {
            assetType: {
              assetClass: values.priceCurrency === OrderAssetClass.ETH ? OrderAssetClass.ETH : OrderAssetClass.ERC20,
            },
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
            revenueSplits: nft?.royalties?.map((royalty: any) => ({
              account: royalty.address as string,
              value: royalty.amount * 100,
            })) || []
          },
        };
  
        if (orderData.take.assetType.assetClass === OrderAssetClass.ERC20) {
          orderData.take.assetType.contract = contractsData[values.priceCurrency]?.address;
        }
  
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
    postingPopupStatus: postingPopupStatus,
    setPostingPopupStatus: setPostingPopupStatus,
  };

  const settingsTabName = (amountType && sellMethod)
    ? `${settingsAmountTypeTitleText[amountType]} - ${settingsMethodsTitleText[sellMethod]}`
    : '';

  return (
    <MarketplaceSellContext.Provider value={contextValue}>
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
                _hover={{ textDecoration: 'none' }}
              >
                <LinkOverlay
                  as={Link}
                  display={'contents'}
                  to={`/nft/${params.collectionAddress}/${params.tokenId}`}  
                >
                <Image src={arrow} display="inline" mr="10px" position="relative" top="-2px" />
                {nft?.name ?? params.tokenId}
              </LinkOverlay>
              </LinkBox>

              <Heading as="h1" mb={'50px'}>Sell NFT</Heading>

              <Tabs isFitted variant={'arrow'} index={activeTab} onChange={setActiveTab}>
                <TabList overflowX={'scroll'} padding={'0 5px'}>
                  {sellPageTabs.map((tab, i) => (
                    <Tab key={i} minW={'130px'} isDisabled={i > activeTab || isPosted}>
                      <Image src={activeTab === i ? tab.iconActive : tab.icon} />
                      {tab.name}
                    </Tab>
                  ))}
                </TabList>

                <TabPanels>
                  <TabPanel name="Select your sell method">
                    {activeTab === SellPageTabs.SELL_METHOD && <SelectMethodType />}
                  </TabPanel>
                  <TabPanel name={settingsTabName}>
                    {activeTab === SellPageTabs.SETTINGS && <SettingsTab />}
                  </TabPanel>
                  <TabPanel name='Summary'>
                    {activeTab === SellPageTabs.SUMMARY && <SummaryTab />}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Container>
        </Box>
      </Box>
    </MarketplaceSellContext.Provider>
  );
};
