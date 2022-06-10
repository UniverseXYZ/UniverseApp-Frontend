import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FieldArray, FormikErrors, FormikProvider, useFormik } from 'formik';
import { useMutation } from 'react-query';
import { BigNumber } from 'bignumber.js';
import axios from 'axios';
import { Contract, ethers, utils } from 'ethers';
import { default as dayjs } from 'dayjs';
import {
  AmountSelector,
  DateTimePicker,
  Icon,
  Loading,
  TokenBalanceInput,
  TokenIcon,
  FormControl as XYZFormControl
} from '../../../../../../components';
import { sign } from '../../../../../../helpers';

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
import { IOrderAssetTypeSingleListing, NFTStandard } from '@app/modules/nft/types';
import { getMakeOfferValidationSchema } from './helpers';
import { AVAILABLE_TOKENS } from '@app/modules/nft/pages/nft-page/components/nft-make-an-offer-popup/constants';
import { IToken } from '@app/types';
import { TOKENS_MAP } from '@app/constants';
import { getTokenPriceCoingecko } from '../../../../../../../utils/api/etherscan';

// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

export enum MakeAnOfferState {
  FORM,
  INSUFFICIENT_BALANCE,
  PROCESSING,
  APPROVAL,
  SUCCESS,
}


export const NFTMakeAnOfferPopup: React.FC = () => {
  const { isOpen, order, NFT: nft, close } = useNFTMakeOfferStore();

  const tokensBtnRef = useRef<HTMLButtonElement>(null);

  const { setShowError, setErrorBody} = useErrorStore(s => ({setShowError: s.setShowError, setErrorBody: s.setErrorBody}))

  const { signer, web3Provider } = useAuthStore(s => ({signer: s.signer, web3Provider: s.web3Provider}));
  const { refetchOffers } = useNFTPageData();

  const [userBalance, setUserBalance] = useState(0);
  const [state, setState] = useState<MakeAnOfferState>(MakeAnOfferState.FORM);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [approveTx, setApproveTx] = useState<string>('');
  const [validateRoyalties, setValidateRoyalties] = useState(false);

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
    token: IToken;
    amount: number;
    expireAt: Date | null;
    royalties: Array<{
      address: string;
      percent: string;
    }>;
  };

  const formik = useFormik<IMakeOfferFormValue>({
    initialValues: {
      price: '',
      token: TOKENS_MAP.WETH,
      amount: +(order?.make.value ?? 1),
      expireAt: threeDaysAway,
      royalties: [{
        address: '',
        percent: '',
      }],
    },
    validationSchema: getMakeOfferValidationSchema(validateRoyalties, userBalance),
    onSubmit: async (value) => {
      try {
        if (!signer || !web3Provider || !nft) {
          return;
        }
        setState(MakeAnOfferState.PROCESSING);

        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();

        const salt = (await getSaltMutation.mutateAsync(address)).data.salt;

        const paymentPrice = utils.parseUnits(value.price, value.token.decimals);

        const contract = new Contract(contractsData[value.token.contractName].address, contractsData[value.token.contractName].abi, signer);
        const balance = await contract.balanceOf(address);

        if (paymentPrice.gt(balance)) {
          setState(MakeAnOfferState.INSUFFICIENT_BALANCE);
          return;
        }

        let offerData = {
          type: 'UNIVERSE_V1',
          maker: address,
          make: {
            assetType: {
              assetClass: OrderAssetClass.ERC20,
              contract: contractsData[value.token.contractName].address
            },
            value: paymentPrice.toString(),
          },
          taker: ethers.constants.AddressZero,
          take: {
            ...(order?.make ?? {}),
            value: `${formik.values.amount}`,
          },
          salt: salt,
          start: 0,
          end: Math.floor((value.expireAt as Date).getTime() / 1000),
          data: {
            dataType: 'ORDER_DATA',
            revenueSplits: value.royalties?.map((r) => ({
              account: r.address,
              value: +r.percent,
            })) ?? []
          },
        };

        // Add taker info, in case the NFT is not listed
        if (!order) {
          offerData = {
            ...offerData,
            take: {
              value: `${formik.values.amount}`,
              assetType: {
                assetClass: nft.standard as unknown as IOrderAssetTypeSingleListing["assetClass"],
                contract: nft._collectionAddress ?? '',
                tokenId: +nft.tokenId,
              },
            },
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
    switch (nft?.standard) {
      case NFTStandard.ERC1155: return true;
      default: return false;
    }
  }, [nft]);

  const totalPrice = useMemo(() => {
    const { price, amount } = formik.values;
    return +(price || 0) * amount;
  }, [formik]);

  const totalPriceUSD = useMemo(() => {
    return new BigNumber(totalPrice * tokenPrice).toFixed(2);
  }, [formik, totalPrice]);

  const handlePriceChange = useCallback((value) => {
    const validPrice = Number(value) > -1 && value.length < 21;
    if (validPrice) {
      formik.setFieldValue('price', value);
    }
  }, [formik]);

  type IRoyaltyKey = keyof IMakeOfferFormValue["royalties"][number];

  const getRoyaltyError = useCallback((i: number, prop: IRoyaltyKey) => {
    return (formik.errors.royalties?.[i] as FormikErrors<Partial<Record<IRoyaltyKey, string>>>)?.[prop] ?? '';
  }, [formik]);

  useEffect(()=> {
    const loadPrice = async () => {
      const token = formik.values.token as TokenTicker;
      const response = await getTokenPriceCoingecko(TOKENS_MAP[token].coingeckoId);
      setTokenPrice(response['usd']);
    }
    loadPrice();
  },[formik.values.token])

  useEffect(() => {
    formik.resetForm();
    formik.validateForm();
    setState(MakeAnOfferState.FORM);
  }, [isOpen]);

  useEffect(() => {
    if (!formik.values.royalties) {
      return;
    }

    if (formik.values.royalties.length > 1) {
      setValidateRoyalties(true);
    } else {
      setValidateRoyalties(formik.values.royalties.some((r) => !!r.address || !!r.percent));
    }
  }, [formik.values.royalties]);

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior={'inside'}
      isCentered={true}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      onClose={close}
    >
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        {state == MakeAnOfferState.FORM && (
          <>
            <ModalHeader>
              <Heading {...s.TitleStyle}>Make an offer</Heading>
            </ModalHeader>
            <ModalBody>
              <FormikProvider value={formik}>
                <VStack spacing={'24px'} alignItems={'flex-start'}>
                  <XYZFormControl
                    isInvalid={!!(formik.touched.price && formik.errors.price)}
                    label={isERC1155 ? 'Price per item' : 'Price'}
                    error={formik.errors.price}
                  >
                    <TokenBalanceInput
                      type={'text'}
                      placeholder={'Amount'}

                      name={'price'}
                      value={formik.values.price}
                      onChange={handlePriceChange}
                      onBlur={formik.handleBlur}

                      availableTokens={AVAILABLE_TOKENS}
                      token={formik.values.token}
                      onTokenChange={(token) => formik.setFieldValue('token', token)}

                      onBalanceLoaded={(balance) => setUserBalance(balance)}
                    />
                  </XYZFormControl>

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

                  <FormControl mb={'40px'} isInvalid={!!(formik.touched.expireAt && formik.errors.expireAt)}>
                    <FormLabel>Royalty Splits</FormLabel>
                    <FieldArray
                      name="royalties"
                      render={(arrayHelpers) => (
                        <>
                          <VStack spacing={'8px'} w={'100%'}>
                            {formik.values.royalties.map((royalty, i) => (
                              <HStack key={i} spacing={'8px'} w={'100%'} alignItems={'flex-start'}>
                                <FormControl
                                  isInvalid={!!(
                                    formik.touched.royalties?.[i] &&
                                    !!getRoyaltyError(i, 'address')
                                  )}
                                >
                                  <Input
                                    placeholder={'Enter wallet address'}
                                    name={`royalties.${i}.address`}
                                    value={royalty.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  <FormErrorMessage>{getRoyaltyError(i, 'address')}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                  w={'auto'}
                                  isInvalid={!!(
                                    formik.touched.royalties?.[i] &&
                                    !!getRoyaltyError(i, 'percent')
                                  )}
                                >
                                  <Input
                                    placeholder={'0%'}
                                    maxW={'128px'}
                                    name={`royalties.${i}.percent`}
                                    value={royalty.percent}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  />
                                  <FormErrorMessage>{getRoyaltyError(i, 'percent')}</FormErrorMessage>
                                </FormControl>
                                {formik.values.royalties.length > 1 && (
                                  <Button
                                    variant={'simpleOutline'}
                                    {...s.RoyaltyRemoveButton}
                                    onClick={() => arrayHelpers.remove(i)}
                                  >
                                    <Icon name={'trash'} flex={1} />
                                  </Button>
                                )}
                              </HStack>
                            ))}
                          </VStack>

                          <FormControl isInvalid={typeof formik.errors.royalties === 'string'}>
                            <FormErrorMessage>{formik.errors.royalties}</FormErrorMessage>
                          </FormControl>

                          {formik.values.royalties.length < 5 && (
                            <HStack spacing={'10px'} mt={'24px'}>
                              <Center {...s.RoyaltyAddButtonIconWrapper}>
                                <Icon name={'plus'} viewBox={'0 0 20 20'} boxSize={'12px'} />
                              </Center>
                              <Text
                                {...s.RoyaltyAddButtonText}
                                onClick={() => arrayHelpers.push({
                                  address: '',
                                  percent: '',
                                })}
                              >
                                Add Wallet
                              </Text>
                            </HStack>
                          )}
                        </>
                      )}
                    />
                  </FormControl>

                  {isERC1155 && (
                    <HStack spacing={0} justifyContent={'space-between'} w={'100%'}>
                      <Text {...s.TotalLabel}>Total</Text>
                      <VStack spacing={0} alignItems={'flex-end'}>
                        <HStack spacing={'4px'}>
                          <TokenIcon ticker={formik.values.token.ticker} boxSize={'18px'} />
                          <Text {...s.TotalPrice}>{totalPrice}</Text>
                        </HStack>
                        <Text {...s.TotalPriceUSD}>${totalPriceUSD}</Text>
                      </VStack>
                    </HStack>
                  )}
                </VStack>
              </FormikProvider>
            </ModalBody>
            <ModalFooter>
              <Button
                boxShadow={'lg'}
                disabled={!formik.isValid}
                onClick={() => formik.submitForm()}
              >Make an Offer</Button>
              {/*<Button variant={'outline'}>Convert ETH</Button>*/}
            </ModalFooter>
          </>
        )}

        {state === MakeAnOfferState.INSUFFICIENT_BALANCE && (
          <ModalBody padding={'32px'}>
            <NFTCustomError
              title={`Insufficient balance`}
              message={`You do not have enough ${formik.values.token.ticker} in your wallet!`}
            ></NFTCustomError>
          </ModalBody>
        )}

        {state === MakeAnOfferState.PROCESSING && (
          <ModalBody padding={'32px'}>
            <Box>
              <Heading {...s.TitleStyle} mb={'20px'}>Making an offer...</Heading>

              <Text fontSize={'14px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Just accept the signature request and wait for us to process your offer
              </Text>

              <Loading my={'64px'} />
            </Box>
          </ModalBody>
        )}

        {state === MakeAnOfferState.APPROVAL && (
          <ModalBody padding={'32px'}>
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
          </ModalBody>
        )}

        {state === MakeAnOfferState.SUCCESS && (
          <ModalBody padding={'56px 32px 32px'}>
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
                  ticker={formik.values.token.ticker}
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
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
