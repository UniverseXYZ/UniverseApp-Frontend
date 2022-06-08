import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
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
import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ArrowIcon from '../../../../../../../assets/images/arrow-down.svg';
import SuccessIcon from '../../../../../../../assets/images/bid-submitted.png';

import * as styles from './styles';
import { getTokenAddressByTicker, getTokenByAddress, TOKENS, TOKENS_MAP } from '../../../../../../constants';
import { Loading, TokenIcon } from '../../../../../../components';
import {
  INFT,
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
  IOrderAssetTypeETH,
  IOrderAssetTypeSingleListing,
} from '../../../../types';
import { TokenTicker } from '../../../../../../enums';
import { EncodeOrderApi, GetSaltApi, IEncodeOrderApiData } from '../../../../../../api';
import { sign } from '../../../../../../helpers';
import { NFTCancelListingPopup } from '..';
import { nftKeys, orderKeys } from '../../../../../../utils/query-keys';
import { useAuthStore } from '../../../../../../../stores/authStore';
import { useErrorStore } from '../../../../../../../stores/errorStore';
import { OrderAssetClass } from '@app/modules/nft/enums';

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
  order?: IOrder<IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing, IOrderAssetTypeERC20>;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTChangeListingPricePopup: React.FC<INFTChangeListingPricePopupProps> = (props) => {
  const { nft, order, isOpen, onClose } = props;

  const tokensBtnRef = useRef<HTMLButtonElement>(null);

  const [state, setState] = useState<ChangeListingPriceState>(ChangeListingPriceState.FORM);
  const queryClient = useQueryClient();
  const [isCancelListingPopupOpened, setIsCancelListingPopupOpened] = useState(false);
  const [oldOrder, setOldOrder] = useState<IOrder<IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing, IOrderAssetTypeERC20>>();

  const tokens = useMemo(() => TOKENS, []);

  const { signer, web3Provider } = useAuthStore(s => ({signer: s.signer, web3Provider: s.web3Provider}))

  const setShowError = useErrorStore(s => s.setShowError);

  const getSaltMutation = useMutation(GetSaltApi);

  type IEncodeOrderMutationData = IEncodeOrderApiData<
    IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing,
    IOrderAssetTypeERC20 | IOrderAssetTypeETH
    >;

  const encodeOrderMutation = useMutation((data: IEncodeOrderMutationData) => EncodeOrderApi(data));

  const createOrderMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/order`, data);
  });

  type IFormValue = {
    amount: string;
    token: TokenTicker;
  };

  const formik = useFormik<IFormValue>({
    initialValues: {
      amount: '',
      token: TOKENS_MAP.ETH.ticker,
    },
    validationSchema: NFTChangeListingPriceValidationSchema,
    onSubmit: async (value) => {
      try {

        if(nft == undefined) {
          return;
        }

        if (!order) {
          updateListing(value);
        } else {
          setOldOrder(order);
          setIsCancelListingPopupOpened(true);
        }

      } catch (e) {
        setShowError(true);        
      }
    },
  });

  const updateListing = async (value: any) => {
    try {
      if (!nft || !oldOrder || !web3Provider || !signer) {
        return;
      }

      setState(ChangeListingPriceState.PROCESSING);

      const network = await web3Provider.getNetwork();
      const address = await signer.getAddress();
  
      const salt = (await getSaltMutation.mutateAsync(address)).data.salt;

      const newToken = TOKENS_MAP[value.token as TokenTicker];

      const orderData: IEncodeOrderMutationData = {
        ...oldOrder,
        salt,
        take: {
          assetType: (newToken.ticker !== TokenTicker.ETH)
            ? ({
              assetClass: OrderAssetClass.ERC20,
              contract: getTokenAddressByTicker(newToken.ticker),
            })
            : ({
              assetClass: OrderAssetClass.ETH,
            }),
          value: `${ethers.utils.parseUnits(`${value.amount}`, `${newToken.decimals}`)}`,
        },
      };
      
      const { data: encodedOrder } = (await encodeOrderMutation.mutateAsync(orderData));
  
      const signature = await sign(
        web3Provider.provider,
        encodedOrder,
        address,
        `${network.chainId}`,
        `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`
      );
  
      const createOrderResponse = (await createOrderMutation.mutateAsync({ ...orderData, signature })).data;

      // FOR FUTURE: [Bundle] add bundle support
      const singleListingOrder = order as IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>;

      const tokenIdCollectionPair = {
        collectionAddress: singleListingOrder?.make.assetType.contract || "",
        tokenId: `${singleListingOrder.make.assetType.tokenId || ""}`,
      }

      queryClient.setQueryData(orderKeys.listing(tokenIdCollectionPair), createOrderResponse)
      queryClient.invalidateQueries(orderKeys.history(tokenIdCollectionPair));

      //TODO: Invalidate browse marketplace page if order has been loaded
      queryClient.refetchQueries(orderKeys.browseAny);

      // Invalidate my nfts query in order to see the new nft
      queryClient.refetchQueries(nftKeys.userNfts(address));

      setState(ChangeListingPriceState.SUCCESS)
    } catch(e) {
      setShowError(true);        
      setState(ChangeListingPriceState.FORM);
    }
  }

  useEffect(() => {
    if (isOpen) {
      if (order?.take) {
        const token = getTokenByAddress(order.take.assetType.contract);
        formik.setValues({
          amount: ethers.utils.formatUnits(BigNumber.from(order.take.value || 0), token.decimals),
          token: token.ticker,
        });
      }
    } else {
      formik.resetForm();
      formik.validateForm();
    }

    setState(ChangeListingPriceState.FORM);
  }, [order, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          {state === ChangeListingPriceState.FORM && (
            <Box>
              <Heading {...styles.TitleStyle} mb={'20px'}>Change the listing price</Heading>
              <Text color={'rgba(228, 182, 19, 1)'} textAlign={'center'}>
                You may have other listings on the item with a lower or different price. Please check Listings tab to cancel a listing.
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
      />
    </Modal>
  );
};
