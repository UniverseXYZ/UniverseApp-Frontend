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

import * as styles from './styles';
import { TOKENS, TOKENS_MAP } from '../../../../../../constants';
import { Loading, TokenIcon } from '../../../../../../components';
import { IOrder } from '../../../../types';
import { TokenTicker } from '../../../../../../enums';

import ArrowIcon from '../../../../../../../assets/images/arrow-down.svg';
import SuccessIcon from '../../../../../../../assets/images/bid-submitted.png';

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
  order?: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTChangeListingPricePopup = ({ order, isOpen, onClose, }: INFTChangeListingPricePopupProps) => {
  const tokensBtnRef = useRef<HTMLButtonElement>(null);

  const [state, setState] = useState<ChangeListingPriceState>(ChangeListingPriceState.FORM);

  const tokens = useMemo(() => TOKENS.filter((token) => ![TOKENS_MAP.ETH.ticker].includes(token.ticker)), []);

  const formik = useFormik<{ amount: string; token: TokenTicker }>({
    initialValues: {
      amount: '',
      token: TOKENS_MAP.WETH.ticker,
    },
    validationSchema: NFTChangeListingPriceValidationSchema,
    onSubmit: async (value) => {
      console.log('onSubmit(value)', value);

      setState(ChangeListingPriceState.PROCESSING);

      setTimeout(() => setState(ChangeListingPriceState.SUCCESS), 3000);
    },
  });

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
    </Modal>
  );
};
