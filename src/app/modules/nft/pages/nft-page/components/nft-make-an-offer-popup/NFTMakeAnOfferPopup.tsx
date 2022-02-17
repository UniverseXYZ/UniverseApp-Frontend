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
import axios from 'axios';
import { utils } from 'ethers';
import { default as dayjs } from 'dayjs';
import * as Yup from 'yup';

import * as styles from './styles';
import { TOKENS, TOKENS_MAP } from '../../../../../../constants';
import { Checkbox, DateTimePicker, Loading, TokenIcon } from '../../../../../../components';
import { ETH_USD_RATE } from '../../../../../../mocks';
import { IOrder } from '../../../../types';
import { TokenTicker } from '../../../../../../enums';
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import { sign } from '../../../../../../helpers';

import ArrowIcon from '../../../../../../../assets/images/arrow-down.svg';
import SuccessIcon from '../../../../../../../assets/images/bid-submitted.png';
import { IToken } from '../../../../../../types';
import { GetSaltApi } from '../../../../../../api';

export enum MakeAnOfferState {
  FORM,
  PROCESSING,
  SUCCESS,
}

export const NFTMakeAnOfferValidationSchema = Yup.object().shape({
  token: Yup.string().required('This field is required'),
  amount: Yup.number().required('This field is required').moreThan(0),
  expireAt: Yup.date().typeError('This field is required').required('This field is required').min(new Date()),
});

interface INFTMakeAnOfferPopupProps {
  order?: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTMakeAnOfferPopup = ({ order, isOpen, onClose, }: INFTMakeAnOfferPopupProps) => {
  const tokensBtnRef = useRef<HTMLButtonElement>(null);

  const { signer, web3Provider } = useAuthContext() as any;

  const [state, setState] = useState<MakeAnOfferState>(MakeAnOfferState.FORM);
  const [agree, setAgree] = useState(false);

  const tokens = useMemo(() => TOKENS.filter((token) => ![TOKENS_MAP.ETH.ticker].includes(token.ticker)), []);

  const encodeDataMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/encoder/order`, data);
  });

  const createOfferMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/order`, data);
  });

  const getSaltMutation = useMutation(GetSaltApi);

  const formik = useFormik<{ amount: string; token: TokenTicker, expireAt: Date | null; }>({
    initialValues: {
      amount: '',
      token: TOKENS_MAP.WETH.ticker,
      expireAt: null,
    },
    validationSchema: NFTMakeAnOfferValidationSchema,
    onSubmit: async (value) => {
      setState(MakeAnOfferState.PROCESSING);

      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();

      const salt = (await getSaltMutation.mutateAsync(address)).data.salt;

      const offerData = {
        type: 'UNIVERSE_V1',
        maker: address,
        taker: order?.maker,
        make: {
          assetType: {
            assetClass: value.token,
          },
          value: utils.parseUnits(
            `${value.amount}`,
            `${TOKENS_MAP[value.token as TokenTicker].decimals}`
          ).toString(),
        },
        take: order?.make,
        side: 0,
        salt: salt,
        start: 0,
        end: (value.expireAt as Date).getTime(),
        data: order?.data,
      };

      const response = (await encodeDataMutation.mutateAsync(offerData)).data;

      const signature = await sign(
        web3Provider.provider,
        response,
        address,
        `${network.chainId}`,
        `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`
      );

      const createOrderResponse = (await createOfferMutation.mutateAsync({ ...offerData, signature })).data;

      setState(MakeAnOfferState.SUCCESS);

      console.log('createOrderResponse', createOrderResponse);
    },
  });

  useEffect(() => {
    formik.resetForm();
    formik.validateForm();
    setState(MakeAnOfferState.FORM);
    setAgree(false);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
                    type={'number'}
                    placeholder={'Amount'}
                    name={'amount'}
                    value={formik.values.amount}
                    pl={`${(tokensBtnRef.current?.clientWidth ?? 0) + (2 * 8)}px`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightAddon>
                    $ {!formik.values.amount ? '0.00' : (+formik.values.amount * ETH_USD_RATE).toFixed(2)}
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
                />
                <FormErrorMessage>{formik.errors.expireAt}</FormErrorMessage>
              </FormControl>

              <Checkbox size={'lg'} isChecked={agree} onChange={(e) => setAgree(e.target.checked)}>
                <Text fontSize={'12px'} fontWeight={400}>
                  By checking this box, I agree to Universe’s <Link textDecor={'underline'} target={'_blank'} href={'https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper'}>Terms of Service</Link>
                </Text>
              </Checkbox>

              <Box {...styles.ButtonsContainerStyle}>
                <Button
                  boxShadow={'lg'}
                  disabled={!(agree && formik.isValid)}
                  onClick={() => formik.submitForm()}
                >Make an Offer</Button>
                {/*<Button variant={'outline'}>Convert ETH</Button>*/}
              </Box>
            </Box>
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
