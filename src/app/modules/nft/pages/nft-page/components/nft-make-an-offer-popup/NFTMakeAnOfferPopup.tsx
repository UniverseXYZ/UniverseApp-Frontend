import {
  Box,
  Button,
  FormControl, FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Link,
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
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { BigNumber } from 'bignumber.js';
import axios from 'axios';
import { Contract, ethers, utils } from 'ethers';
import { default as dayjs } from 'dayjs';
import * as Yup from 'yup';
import * as styles from './styles';
import { TOKENS, TOKENS_MAP } from '../../../../../../constants';
import { Checkbox, DateTimePicker, Loading, TokenIcon } from '../../../../../../components';
import { ETH_USD_RATE } from '../../../../../../mocks';
import { INFT, IOrder } from '../../../../types';
import { TokenTicker } from '../../../../../../enums';
import { sign } from '../../../../../../helpers';

import ArrowIcon from '../../../../../../../assets/images/arrow-down.svg';
import SuccessIcon from '../../../../../../../assets/images/bid-submitted.png';
import { IToken } from '../../../../../../types';
import { GetSaltApi } from '../../../../../../api';
import { OrderAssetClass } from '../../../../enums';

import Contracts from '../../../../../../../contracts/contracts.json';
import { useNFTPageData } from '../../NFTPage.context';

import { getEtherscanTxUrl} from '../../../../../../../utils/helpers';
import { formatAddress } from '../../../../../../../utils/helpers/format';
import { NFTCustomError } from '../nft-custom-error/NFTCustomError';
import { useErrorContext } from '../../../../../../../contexts/ErrorContext';
import { useAuthStore } from '../../../../../../../stores/authStore';

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
  token: Yup.string().required('This field is required'),
  amount: Yup.number().required('This field is required').moreThan(0),
  expireAt: Yup.date().typeError('This field is required').required('This field is required').min(new Date()),
});

interface INFTMakeAnOfferPopupProps {
  nft?: INFT;
  order?: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTMakeAnOfferPopup = ({ nft, order, isOpen, onClose, }: INFTMakeAnOfferPopupProps) => {
  const tokensBtnRef = useRef<HTMLButtonElement>(null);
  
  const { setShowError, setErrorBody} = useErrorContext() as any;

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

  const formik = useFormik<{ amount: string; token: TokenTicker, expireAt: Date | null; }>({

    initialValues: {
      amount: '',
      token: TOKENS_MAP.WETH.ticker,
      expireAt: threeDaysAway,
    },
    validationSchema: NFTMakeAnOfferValidationSchema,
    onSubmit: async (value) => {
      try {
        setState(MakeAnOfferState.PROCESSING);
  
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();
  
        const salt = (await getSaltMutation.mutateAsync(address)).data.salt;
  
        const paymentToken = TOKENS_MAP[value.token as TokenTicker];
        const paymentAmount = utils.parseUnits(value.amount, paymentToken.decimals);

        const contract = new Contract(contractsData[paymentToken.contractName].address, contractsData[paymentToken.contractName].abi, signer);
        const balance = await contract.balanceOf(address);

        if (paymentAmount.gt(balance)) {
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
            value: paymentAmount.toString(),
          },
          take: order?.make,
          salt: salt,
          start: 0,
          end: Math.floor((value.expireAt as Date).getTime() / 1000),
          data: order?.data,
        };

        // Add taker info, in case the NFT is not listed
        if (!order) {
          offerData = {...offerData,
            taker: ethers.constants.AddressZero,
            take: {
              value: "1",
              assetType: {
                tokenId: nft?.tokenId as unknown as number, 
                contract: nft?._collectionAddress?.toLowerCase() as string, 
                assetClass: nft?.standard as unknown as OrderAssetClass.ERC721
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

        if(paymentAmount.gt(allowance)) {
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

  const handlePriceChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const validPrice = Number(value) > -1 && value.length < 21;
    if(validPrice) {
      formik.handleChange(event);
    }
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {state === MakeAnOfferState.FORM && (
            <Box>
              <Heading {...styles.TitleStyle} mb={'40px'}>Make an offer</Heading>

              <FormControl mb={'30px'} isInvalid={!!(formik.touched.amount && formik.errors.amount)}>
                <FormLabel>Price</FormLabel>
                {/*TODO: improve currency select & currency input components */}
                <InputGroup>
                  <InputLeftElement w={'fit-content'}>
                    <Menu>
                      <MenuButton as={Button} size={'sm'} {...styles.CurrencyMenuButtonStyle} ref={tokensBtnRef}>
                        <Image src={TOKENS_MAP[formik.values.token].icons[0]} />
                        {TOKENS_MAP[formik.values.token].ticker}
                        <Image src={ArrowIcon} />
                      </MenuButton>
                      <MenuList minWidth={'100px'} p={'8px'} position={'relative'} zIndex={3}>
                        {tokens.map((TOKEN) => (
                          <MenuItem
                            key={TOKEN.ticker}
                            {...styles.CurrencyItemStyle}
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
                    name={'amount'}
                    value={formik.values.amount}
                    pl={`${(tokensBtnRef.current?.clientWidth ?? 0) + (2 * 8)}px`}
                    onChange={(event) => handlePriceChange(event)}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightAddon>
                    $ {!formik.values.amount ? '0.00' : (new BigNumber(+formik.values.amount * tokenPrice).toFixed(2))}
                  </InputRightAddon>
                </InputGroup>
                <FormErrorMessage>{formik.errors.amount}</FormErrorMessage>
              </FormControl>

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

              <Box {...styles.ButtonsContainerStyle}>
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
              <Heading {...styles.TitleStyle} mb={'20px'}>Making an offer...</Heading>

              <Text fontSize={'14px'} mx={'auto'} maxW={'260px'} textAlign={'center'}>
                Just accept the signature request and wait for us to process your offer
              </Text>

              <Loading my={'64px'} />
            </Box>
          )}

          {state === MakeAnOfferState.APPROVAL && (
            <Box>
              <Heading {...styles.TitleStyle} mb={'20px'}>Making an offer...</Heading>

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
              <Heading {...styles.TitleStyle} mt={'50px'} mb={'24px'}>Congratulations!</Heading>
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
                <strong>{formik.values.amount}</strong><br />
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
                onClick={onClose}
              >Close</Button>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
