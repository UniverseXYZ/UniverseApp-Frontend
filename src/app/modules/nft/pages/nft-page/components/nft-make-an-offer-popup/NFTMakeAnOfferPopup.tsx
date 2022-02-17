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
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay, Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import * as styles from './styles';
import { TOKENS, TOKENS_MAP } from '../../../../../../constants';
import { Checkbox, DateTimePicker } from '../../../../../../components';
import { ETH_USD_RATE } from '../../../../../../mocks';

import ArrowIcon from '../../../../../../../assets/images/arrow-down.svg';

interface INFTMakeAnOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

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
                  <MenuButton as={Button} size={'sm'} {...styles.CurrencyMenuButtonStyle}>
                    <Image src={TOKENS_MAP.ETH.icons[0]} />
                    {TOKENS_MAP.ETH.ticker}
                    <Image src={ArrowIcon} />
                  </MenuButton>
                  <MenuList minWidth={'100px'} p={'8px'} position={'relative'} zIndex={3}>
                    {TOKENS.map((TOKEN) => (
                      <MenuItem key={TOKEN.ticker} {...styles.CurrencyItemStyle} onClick={() => {}}>
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
