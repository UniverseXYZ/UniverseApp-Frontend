import {
  Box,
  Button,
  FormControl,
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
  MenuButtonProps,
  MenuItem,
  MenuItemProps,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay, Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import * as styles from './styles';
import { Checkbox, DateTimePicker } from '../../../../../../components';
import { ETH_USD_RATE } from '../../../../../../mocks';
import { coins } from '../../../../../../components/currency-input/consts';

import arrow from '../../../../../../../assets/images/arrow-down.svg';
import ether from '../../../../../../../assets/images/coins/eth.svg';

interface INFTMakeAnOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CurrencyMenuButtonStyle: MenuButtonProps = {
  background: 'rgba(0, 0, 0, 0.02)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '6px',
  height: '34px',
  ml: '8px',
  padding: '0 10px',

  sx: {
    '> span': {
      display: 'contents',
    },
    img: {
      _first: {
        mr: '10px',
      },
      _last: {
        ml: '10px',
        transition: '200ms',
      },
    },
  },

  _hover: {
    background: 'rgba(0, 0, 0, 0.03)',
    boxShadow: 'sm',
  },

  _focus: {
    background: 'rgba(0, 0, 0, 0.03)',
    boxShadow: 'sm',
  },

  _active: {
    boxShadow: 0,
    img: {
      _last: {
        transform: 'rotate(180deg)',
      }
    }
  },
}

const CurrencyItemStyle: MenuItemProps = {
  borderRadius: '5px',
  fontFamily: 'Space Grotesk',
  fontWeight: 500,
  padding: '10px',
  paddingRight: '20px',

  sx: {
    img: {
      mr: '10px',
    },
  },

  _hover: {
    bg: 'rgba(0, 0, 0, 0.05)',
  },
  _focus: {
    bg: 'rgba(0, 0, 0, 0.05)',
  }
};

export const NFTMakeAnOfferPopup = ({ isOpen, onClose, }: INFTMakeAnOfferPopupProps) => {
  const [agree, setAgree] = useState(false);

  const [amount, setAmount] = useState<string>();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          <Heading {...styles.TitleStyle}>Make an offer</Heading>

          <FormControl mb={'30px'}>
            <FormLabel>Price</FormLabel>
            {/*TODO: improve currency select & currency input components */}
            <InputGroup>
              <InputLeftElement w={'fit-content'}>
                <Menu>
                  <MenuButton as={Button} size={'sm'} {...CurrencyMenuButtonStyle}>
                    <Image src={ether} />
                    ETH
                    <Image src={arrow} />
                  </MenuButton>
                  <MenuList minWidth={'100px'} p={'8px'} position={'relative'} zIndex={3}>
                    {coins.map((coin, i) => (
                      <MenuItem key={i} {...CurrencyItemStyle} onClick={() => {}}>
                        <Image src={coin.icon} />
                        {coin.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </InputLeftElement>
              <Input
                type={'number'}
                placeholder={'Amount'}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                pl={'115px'}
              />
              <InputRightAddon>$ {!amount ? '0.00' : (+amount * ETH_USD_RATE).toFixed(2)}</InputRightAddon>
            </InputGroup>
          </FormControl>

          <FormControl mb={'40px'}>
            <FormLabel>Offer Expiration</FormLabel>
            <DateTimePicker value={new Date()} modalName={'Offer Expiration'} />
          </FormControl>

          <Checkbox size={'lg'} isChecked={agree} onChange={(e) => setAgree(e.target.checked)}>
            <Text fontSize={'12px'} fontWeight={400}>
              By checking this box, I agree to Universe’s <Link textDecor={'underline'} target={'_blank'} href={'https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper'}>Terms of Service</Link>
            </Text>
          </Checkbox>

          <Box {...styles.ButtonsContainerStyle}>
            <Button boxShadow={'lg'} disabled={!agree}>Make an Offer</Button>
            <Button variant={'outline'}>Convert ETH</Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
