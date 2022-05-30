import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { BigNumber } from 'bignumber.js';
import axios from 'axios';
import { Contract, ethers, utils } from 'ethers';
import { default as dayjs } from 'dayjs';
import * as Yup from 'yup';
import { TOKENS, TOKENS_MAP } from '../../../../../../constants';
import { AmountSelector, DateTimePicker, Loading, TokenIcon } from '../../../../../../components';
import { TokenTicker } from '../../../../../../enums';
import { sign } from '../../../../../../helpers';

import ArrowIcon from '../../../../../../../assets/images/arrow-down.svg';
import SuccessIcon from '../../../../../../../assets/images/bid-submitted.png';
import { GetSaltApi } from '../../../../../../api';
import { OrderAssetClass } from '../../../../enums';

import Contracts from '../../../../../../../contracts/contracts.json';
import { useNFTPageData } from '../../NFTPage.context';

import { getEtherscanTxUrl } from '../../../../../../../utils/helpers';
import { formatAddress } from '../../../../../../../utils/helpers/format';
import { NFTCustomError } from '../nft-custom-error/NFTCustomError';
import { useAuthStore } from '../../../../../../../stores/authStore';
import { useErrorStore } from '../../../../../../../stores/errorStore';
import { useNFTMakeOfferStore } from '../../../../../../../stores/nftMakeOfferStore';
import * as s from './NFTMakeAnOfferPopup.styles';
import { IOrderAssetTypeSingleListing } from '@app/modules/nft/types';

// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

export enum MakeAnOfferState {
  FORM,
  INSUFFICIENT_BALANCE,
  PROCESSING,
  APPROVAL,
  SUCCESS,
}

export const NFTMakeAnOfferValidationSchema = Yup.object().shape({
  price: Yup.number().required('This field is required').moreThan(0),
  token: Yup.string().required('This field is required'),
  expireAt: Yup.date().typeError('This field is required').required('This field is required').min(new Date()),
});


export const NFTMakeAnOfferPopup: React.FC = () => {
  const { isOpen, order, NFT: nft, close } = useNFTMakeOfferStore();

  const tokensBtnRef = useRef<HTMLButtonElement>(null);

  const { setShowError, setErrorBody} = useErrorStore(s => ({setShowError: s.setShowError, setErrorBody: s.setErrorBody}))

  const { signer, web3Provider } = useAuthStore(s => ({signer: s.signer, web3Provider: s.web3Provider}));
  const { refetchOffers } = useNFTPageData();

  const [state, setState] = useState<MakeAnOfferState>(MakeAnOfferState.FORM);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [approveTx, setApproveTx] = useState<string>('')

  const tokens = useMemo(() => TOKENS.filter((token) => ![TOKENS_MAP.ETH.ticker].includes(token.ticker)), []);

  const getPriceMutation = useMutation((coingeckoId: any) => {
    return axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`);
  });

  const encodeDataMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/encoder/order`, data);
  });

  const createOfferMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/order`, data);
  });

  const getSaltMutation = useMutation(GetSaltApi);

  const threeDaysAway = new Date();
  threeDaysAway.setDate(threeDaysAway.getDate()+3);

  type IMakeOfferFormValue = {
    price: string;
    token: TokenTicker;
    amount: number;
    expireAt: Date | null;
  };

  const formik = useFormik<IMakeOfferFormValue>({
    initialValues: {
      price: '',
      token: TOKENS_MAP.WETH.ticker,
      amount: +(order?.make.value ?? 1),
      expireAt: threeDaysAway,
    },
    validationSchema: NFTMakeAnOfferValidationSchema,
    onSubmit: async (value) => {
      try {
        if (!signer || !web3Provider || !nft) {
          return;
        }
        setState(MakeAnOfferState.PROCESSING);

        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        const salt = (await getSaltMutation.mutateAsync(address)).data.salt;

        const paymentToken = TOKENS_MAP[value.token as TokenTicker];
        const paymentPrice = utils.parseUnits(value.price, paymentToken.decimals);

        const contract = new Contract(contractsData[paymentToken.contractName].address, contractsData[paymentToken.contractName].abi, signer);
        const balance = await contract.balanceOf(address);

        if (paymentPrice.gt(balance)) {
          setState(MakeAnOfferState.INSUFFICIENT_BALANCE);
          return;
        }

        let offerData = {
          type: 'UNIVERSE_V1',
          maker: address,
          taker: ethers.constants.AddressZero,
          make: {
            assetType: {
              assetClass: OrderAssetClass.ERC20,
              contract: contractsData[paymentToken.contractName].address
            },
            value: paymentPrice.toString(),
          },
          take: {
            ...(order?.make ?? {}),
            value: `${formik.values.amount}`,
          },
          salt: salt,
          start: 0,
          end: Math.floor((value.expireAt as Date).getTime() / 1000),
          data: order?.data,
        };

        // Add taker info, in case the NFT is not listed
        if (!order) {
          offerData = {
            ...offerData,
            taker: ethers.constants.AddressZero,
            take: {
              value: `${formik.values.amount}`,
              assetType: {
                assetClass: nft.standard as unknown as IOrderAssetTypeSingleListing["assetClass"],
                contract: nft._collectionAddress ?? '',
                tokenId: +nft.tokenId,
              },
            },
            data: {
              dataType: "ORDER_DATA",
              revenueSplits: []
             }
          }
        }

        const response = (await encodeDataMutation.mutateAsync(offerData)).data;

        const allowance = await contract.allowance(address, process.env.REACT_APP_MARKETPLACE_CONTRACT);

        if(paymentPrice.gt(allowance)) {
          setState(MakeAnOfferState.APPROVAL);

          const approveTx = await contract.approve(process.env.REACT_APP_MARKETPLACE_CONTRACT, ethers.constants.MaxUint256);
          setApproveTx(approveTx?.hash);

          await approveTx.wait();

          setState(MakeAnOfferState.PROCESSING);
        }

        const signature = await sign(
          web3Provider.provider,
          response,
          address,
          `${network.chainId}`,
          `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`
        );

        const createOrderResponse = (await createOfferMutation.mutateAsync({ ...offerData, signature })).data;

        setState(MakeAnOfferState.SUCCESS);
        refetchOffers();
        setApproveTx('');
        } catch(err: any) {
        console.log(err)   
        setState(MakeAnOfferState.FORM);

        // Code 4001 is user rejected transaction
        if (err?.code === 4001) {
          return;
        }

        // Check if error comes from api request and if the api has returned a meaningful messages
        if (getSaltMutation.isError && !!(getSaltMutation as any)?.error?.response?.data?.message) {
          setErrorBody((getSaltMutation as any)?.error?.response?.data?.message)
        } else if (encodeDataMutation.isError && !!(encodeDataMutation as any)?.error?.response?.data?.message) {
          setErrorBody((encodeDataMutation as any)?.error?.response?.data?.message)
        } else if (createOfferMutation.isError && !!(createOfferMutation as any)?.error?.response?.data?.message) {
          setErrorBody((createOfferMutation as any)?.error?.response?.data?.message)
        }

        setShowError(true);
      }
    },
  });

  const isERC1155 = useMemo(() => {
    switch (order?.make.assetType.assetClass) {
      case OrderAssetClass.ERC1155: return true;
      default: return false;
    }
  }, [order]);

  const totalPrice = useMemo(() => {
    const { price, amount } = formik.values;
    return +(price || 0) * amount;
  }, [formik]);

  const totalPriceUSD = useMemo(() => {
    return new BigNumber(totalPrice * tokenPrice).toFixed(2);
  }, [formik, totalPrice]);

  const handlePriceChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const validPrice = Number(value) > -1 && value.length < 21;
    if(validPrice) {
      formik.handleChange(event);
    }
  }, [formik]);

  useEffect(()=> {
    const loadPrice = async () => {
      const token = formik.values.token as TokenTicker;
      const response = (await getPriceMutation.mutateAsync(TOKENS_MAP[token].coingeckoId)).data
      setTokenPrice(response[TOKENS_MAP[token].coingeckoId]['usd']);
    }
    loadPrice();
  },[formik.values.token])

  useEffect(() => {
    formik.resetForm();
    formik.validateForm();
    setState(MakeAnOfferState.FORM);
  }, [isOpen]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={close} closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {state === MakeAnOfferState.FORM && (
            <Box>
              <Heading {...s.TitleStyle} mb={'40px'}>Make an offer</Heading>

              <VStack spacing={'24px'} alignItems={'flex-start'}>
                <FormControl isInvalid={!!(formik.touched.price && formik.errors.price)}>
                  <FormLabel>Price</FormLabel>
                  {/*TODO: improve currency select & currency input components */}
                  <InputGroup>
                    <InputLeftElement w={'fit-content'}>
                      <Menu>
                        <MenuButton as={Button} size={'sm'} {...s.CurrencyMenuButtonStyle} ref={tokensBtnRef}>
                          <Image src={TOKENS_MAP[formik.values.token].icons[0]} />
                          {TOKENS_MAP[formik.values.token].ticker}
                          <Image src={ArrowIcon} />
                        </MenuButton>
                        <MenuList minWidth={'100px'} p={'8px'} position={'relative'} zIndex={3}>
                          {tokens.map((TOKEN) => (
                            <MenuItem
                              key={TOKEN.ticker}
                              {...s.CurrencyItemStyle}
                              onClick={() => formik.setFieldValue('token', TOKEN.ticker)}
                            >
                              <Image src={TOKEN.icons[0]} />
                              {TOKEN.ticker}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </InputLeftElement>
                    <Input
                      type={'text'}
                      placeholder={'Amount'}
                      name={'price'}
                      value={formik.values.price}
                      pl={`${(tokensBtnRef.current?.clientWidth ?? 0) + (2 * 8)}px`}
                      onChange={(event) => handlePriceChange(event)}
                      onBlur={formik.handleBlur}
                    />
                    <InputRightAddon>
                      $ {!formik.values.price ? '0.00' : (new BigNumber(+formik.values.price * tokenPrice).toFixed(2))}
                    </InputRightAddon>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
                </FormControl>

                {isERC1155 && (
                  <FormControl>
                    <HStack spacing={0} justifyContent={'space-between'} w={'100%'}>
                      <FormLabel>Amount</FormLabel>
                      <AmountSelector
                        size={'sm'}
                        options={{
                          value: formik.values.amount,
                          min: 1,
                          max: +(order?.make.value ?? 1),
                          onChange: (_, value) => formik.setFieldValue('amount', value),
                        }}
                      />
                    </HStack>
                  </FormControl>
                )}

                <FormControl mb={'40px'} isInvalid={!!(formik.touched.expireAt && formik.errors.expireAt)}>
                  <FormLabel>Offer Expiration</FormLabel>
                  <DateTimePicker
                    value={formik.values.expireAt}
                    modalName={'Offer Expiration'}
                    onChange={(date) => formik.setFieldValue('expireAt', date)}
                    onClose={() => formik.setFieldTouched('expireAt', true)}
                    minDate={dayjs().toDate()}
                  />
                  <FormErrorMessage>{formik.errors.expireAt}</FormErrorMessage>
                </FormControl>

                {isERC1155 && (
                  <HStack spacing={0} justifyContent={'space-between'} w={'100%'}>
                    <Text {...s.TotalLabel}>Total</Text>
                    <VStack spacing={0} alignItems={'flex-end'}>
                      <HStack spacing={'4px'}>
                        <TokenIcon ticker={TokenTicker.ETH} boxSize={'18px'} />
                        <Text {...s.TotalPrice}>{totalPrice}</Text>
                      </HStack>
                      <Text {...s.TotalPriceUSD}>${totalPriceUSD}</Text>
                    </VStack>
                  </HStack>
                )}
              </VStack>

              <Box {...s.ButtonsContainerStyle}>
                <Button
                  boxShadow={'lg'}
                  disabled={!formik.isValid}
                  onClick={() => formik.submitForm()}
                >Make an Offer</Button>
                {/*<Button variant={'outline'}>Convert ETH</Button>*/}
              </Box>
            </Box>
          )}

          {state === MakeAnOfferState.INSUFFICIENT_BALANCE && (
            <NFTCustomError
              title={`Insufficient balance`}
              message={`You do not have enough ${TOKENS_MAP[formik.values.token].ticker} in your wallet!`}
            ></NFTCustomError>
          )}

          {state === MakeAnOfferState.PROCESSING && (
            <Box>
              <Heading {...s.TitleStyle} mb={'20px'}>Making an offer...</Heading>

              <Text fontSize={'14px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Just accept the signature request and wait for us to process your offer
              </Text>

              <Loading my={'64px'} />
            </Box>
          )}

          {state === MakeAnOfferState.APPROVAL && (
            <Box>
              <Heading {...s.TitleStyle} mb={'20px'}>Making an offer...</Heading>

              <Text fontSize={'14px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Please give an approval for the specified amount ..
              </Text>

              <Loading my={'64px'} />


              {approveTx && (
                <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'} key={approveTx}>
                  Transaction hash #{1}:{' '}
                  <a target="_blank" href={getEtherscanTxUrl(approveTx)} rel="noreferrer" style={{color: 'blue'}}>
                    {formatAddress(approveTx)}
                  </a>
                </Text>
              )}

            </Box>
          )}

          {state === MakeAnOfferState.SUCCESS && (
            <Box>
              <Image src={SuccessIcon} w={'220px'} h={'165px'} m={'auto'} />
              <Heading {...s.TitleStyle} mt={'50px'} mb={'24px'}>Congratulations!</Heading>
              <Text
                sx={{
                  color: 'rgba(0, 0, 0, .6)',
                  m: 'auto',
                  textAlign: 'center',

                  strong: {
                    color: 'black',
                  }
                }}
              >
                You have successfully made an offer for
                <TokenIcon
                  ticker={formik.values.token}
                  display={'inline-block'}
                  size={18}
                  ml={'8px'}
                  mr={'4px'}
                  mt={'-3px'}
                />
                <strong>{formik.values.price}</strong><br />
                {formik.values.expireAt && (
                  <Box as={'span'}>
                    that ends on <strong>{dayjs(formik.values.expireAt).format('MMM DD, YYYY, HH:mm z')}</strong>
                  </Box>
                )}
              </Text>
              <Button
                variant={'outline'}
                display={'block'}
                mt={'40px'}
                mx={'auto'}
                p={'10px 50px'}
                onClick={close}
              >Close</Button>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
