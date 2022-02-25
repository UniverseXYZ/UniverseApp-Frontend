import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'react-query';

import * as styles from './styles';
import { TOKENS, TOKENS_MAP, ZERO_ADDRESS } from '../../../../../../constants';
import { Loading, TokenIcon } from '../../../../../../components';
import { INFT, IOrder } from '../../../../types';
import { TokenTicker } from '../../../../../../enums';

import ArrowIcon from '../../../../../../../assets/images/arrow-down.svg';
import SuccessIcon from '../../../../../../../assets/images/bid-submitted.png';
import { EncodeOrderApi, GetSaltApi, IEncodeOrderApiData } from '../../../../../../api';
import { useAuthContext } from '../../../../../../../contexts/AuthContext';
import axios from 'axios';
import { GetNFT2Api } from '../../../../api';
import { SellAmountType } from '../../../../../marketplace/pages/sell-page/enums';
import { BigNumber, ethers } from 'ethers';
import { sign } from '../../../../../../helpers';
import { NFTCancelListingPopup } from '..';

export enum ChangeListingPriceState {
  FORM,
  PROCESSING,
  SUCCESS,
}

export const NFTChangeListingPriceValidationSchema = Yup.object().shape({
  token: Yup.string().required('This field is required'),
  amount: Yup.number().required('This field is required').moreThan(0),
});

interface INFTChangeListingPricePopupProps {
  nft?: INFT;
  order?: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTChangeListingPricePopup = ({ nft, order, isOpen, onClose, }: INFTChangeListingPricePopupProps) => {
  const tokensBtnRef = useRef<HTMLButtonElement>(null);

  const [state, setState] = useState<ChangeListingPriceState>(ChangeListingPriceState.FORM);
  const [isCancelListingPopupOpened, setIsCancelListingPopupOpened] = useState(false);
  const [isMarkedForCancel, setIsMarkedForCancel] = useState(true);

  const tokens = useMemo(() => TOKENS, []);

  const { signer, web3Provider } = useAuthContext() as any;

  const getSaltMutation = useMutation(GetSaltApi);

  const encodeOrderMutation = useMutation(EncodeOrderApi);

  const createOrderMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/order`, data);
  });

  const formik = useFormik<{ amount: string; token: TokenTicker }>({
    initialValues: {
      amount: ethers.utils.formatEther(BigNumber.from(order?.take?.value || 0)),
      token: TOKENS_MAP.ETH.ticker,
    },
    validationSchema: NFTChangeListingPriceValidationSchema,
    onSubmit: async (value) => {
      if(nft == undefined || order == undefined) {
        return;
      }
      if (BigNumber.from(ethers.utils.parseUnits(`${value.amount}`,`${TOKENS_MAP[value.token as TokenTicker].decimals}`)).gt(BigNumber.from(order.take.value)) && isMarkedForCancel) {
        setIsCancelListingPopupOpened(true);
      } else {
        updateListing(value);
      }
    },
  });

  const updateListing = async (value: any) => {
    if(nft == undefined || order == undefined) {
      return;
    }

    setState(ChangeListingPriceState.PROCESSING);
    const network = await web3Provider.getNetwork();
    const address = await signer.getAddress();

    const salt = (await getSaltMutation.mutateAsync(address)).data.salt;

    const make: any = {
      assetType: {
        assetClass: nft?.standard,
        contract: nft?.collection?.address,
        tokenId: nft.tokenId,
      },
      value: '1',
    };

    // TODO Refactor - add logic for bundles

    const orderData: IEncodeOrderApiData = {
      salt: salt,
      maker: order.maker,
      make: make,
      taker: order.taker,
      take: order.take,
      type: order.type,
      start: order.start,
      end: order.end,
      data: order.data,
    };
    orderData.take.value = ethers.utils.parseUnits(
      `${value.amount}`,
      `${TOKENS_MAP[value.token as TokenTicker].decimals}`
    ).toString()

    const { data: encodedOrder } = (await encodeOrderMutation.mutateAsync(orderData as IEncodeOrderApiData));

    const signature = await sign(
      web3Provider.provider,
      encodedOrder,
      address,
      `${network.chainId}`,
      `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`
    );

    const createOrderResponse = (await createOrderMutation.mutateAsync({ ...orderData, signature })).data;

    setState(ChangeListingPriceState.SUCCESS)
  }

  useEffect(() => {
    formik.resetForm();
    formik.validateForm();
    setState(ChangeListingPriceState.FORM);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {state === ChangeListingPriceState.FORM && (
            <Box>
              <Heading {...styles.TitleStyle} mb={'40px'}>Change the listing price</Heading>
              <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>
                Please, be aware in case you increase your listing price, you have to cancel the current order.
              </Text>
              <br></br>

              <FormControl mb={'30px'} isInvalid={!!(formik.touched.amount && formik.errors.amount)}>
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
                </InputGroup>
                <FormErrorMessage>{formik.errors.amount}</FormErrorMessage>
              </FormControl>

              <Box {...styles.ButtonsContainerStyle}>
                <Button
                  boxShadow={'lg'}
                  disabled={!formik.isValid}
                  onClick={() => formik.submitForm()}
                >Set new price</Button>
                <Button variant={'outline'} onClick={onClose}>Cancel</Button>
              </Box>
            </Box>
          )}

          {state === ChangeListingPriceState.PROCESSING && (
            <Box>
              <Heading {...styles.TitleStyle} mb={'20px'}>Processing...</Heading>
              <Loading my={'64px'} />
            </Box>
          )}

          {state === ChangeListingPriceState.SUCCESS && (
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
                You have successfully changed price to
                <TokenIcon
                  ticker={formik.values.token}
                  display={'inline-block'}
                  size={18}
                  ml={'8px'}
                  mr={'4px'}
                  mt={'-3px'}
                />
                <strong>{formik.values.amount}</strong><br />
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
      <NFTCancelListingPopup
        order={order}
        isOpen={isCancelListingPopupOpened}
        onClose={() => setIsCancelListingPopupOpened(false)}
        handleCancel={() => setIsMarkedForCancel(false)}
      />
    </Modal>
  );
};
