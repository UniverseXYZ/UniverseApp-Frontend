import { Box, Button, Heading, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import React from 'react';

import { Alert, AlertPopup, InfoTooltip, InputShadow, TokenIcon } from "@app/components";
import { TOKENS_MAP } from "@app/constants";

interface IPlaceBidPopupProps {
  isOpened: boolean;
  onClose: () => void;
}

export const PlaceBidPopup = (props: IPlaceBidPopupProps) => {
  const { isOpened, onClose } = props;

  return (
    <AlertPopup
      isOpen={isOpened}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      showCloseButton
    >
      <Box display="flex" flexDirection="column" alignItems="flex-start" gap={4}>
        <Heading fontSize={{ base: '20px', md: '26px' }} lineHeight={{ base: '24px', md: '32px' }}>Place a bid</Heading>
        <Text fontSize="16px" lineHeight="24px" color="rgba(0, 0, 0, 0.6)" textAlign="left">
          You are about to place a bid for <strong>Auction Title Two</strong> by <strong>Justin 3LAU</strong>.
        </Text>
        {/*  - Ask for ammount input */}
        <Box display="flex" flexDirection="column" width="100%" alignItems="flex-Start">
          <Text as="span" fontSize="14px" lineHeight="22px" fontWeight={700}>Your bid</Text>
          <InputGroup mr={'12px'}>
            <InputShadow display={'contents'}>
              <InputRightElement pointerEvents="none" children={<Box display="flex" mr={5}>
                {/* TODO - display colored token icon if possible */}
                <TokenIcon ticker={TOKENS_MAP.ETH.ticker} size={20} />
                <Text>ETH</Text>
              </Box>} />
              <Input pr={'50px'} />
            </InputShadow>
          </InputGroup>
        </Box>
        <Box display="flex" alignItems="center">
          {/* TODO - Discuss text color change */}
          <Text>Your bid is eligible to win a <Text as="span" color="#DDBC45">Gold tier</Text></Text>
          <InfoTooltip
            label="TO DO"
          />
        </Box>
        <Box display="flex" flexDirection="column" width="100%" gap={1}>
          <Box display="flex" alignItems="center" justifyContent="space-between" fontSize="14px" lineHeight="20px">
            <Text as="span" color="rgba(0, 0, 0, 0.6)">
              Your balance
            </Text>
            <Text as="span" fontWeight={700}>48.24 ETH</Text>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" fontSize="14px" lineHeight="20px">
            <Box display="flex" alignItems="center">
              <Text as="span" color="rgba(0, 0, 0, 0.6)">Service fee</Text>
              <InfoTooltip
                label="We are decentralization maxis and our goal is to empower creators and community to create, buy and sell digital art in a feeless way."
              />
            </Box>
            <Text as="span" fontWeight={700}>No fees, boom!</Text>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" fontSize="14px" lineHeight="20px">
            <Box display="flex" alignItems="center">
              <Text as="span" color="rgba(0, 0, 0, 0.6)">Total bid amount</Text>
              <InfoTooltip
                label="Keep in mind that your funds will be used only if your bid wins a certain tier. If you don't win, you will be able to withdraw your funds by clicking the Withdraw button that will become active after the auction ends."
              />
            </Box>
            <Text as="span" fontWeight={700}>4.305 ETH</Text>
          </Box>
        </Box>
        <Alert
          colorScheme={'blue'}
          status={'info'}
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={{ base: 1, md: 0 }}
        >
          To avoid rekt attacks based on ERC20 allowance exploit you have to set the allowance to max before placing a bid.
        </Alert>
        <Button
          variant={'primary'}
          onClick={() => {}}
          width="100%"
        >Place a bid</Button>
        <Text as="span"  fontSize="12px" lineHeight="18px" color="#FF4949" textAlign="center" width="100%">Not enough funds</Text>
        <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gap={4} width="100%">
          <Button
            variant={'primary'}
            onClick={() => {}}
            flexGrow={1}
          >Max allowance</Button>
          <Button
            variant={'primary'}
            onClick={() => {}}
            flexGrow={1}
            disabled
          >Place a bid</Button>
        </Box>
      </Box>
    </AlertPopup>
  );
}
