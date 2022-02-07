import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { Contract, utils } from 'ethers';

import * as styles from './styles';
import { IERC721AssetType, IOrder } from '../../../../types';

import Contracts from '../../../../../../../contracts/contracts.json';
import { useAuthContext } from '../../../../../../../contexts/AuthContext';

// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

interface INFTCancelListingPopupProps {
  order?: IOrder;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTCancelListingPopup = ({ order, isOpen, onClose, }: INFTCancelListingPopupProps) => {

  const { signer } = useAuthContext();

  const contract = useMemo(
    () => new Contract(`${process.env.REACT_APP_MARKETPLACE_CONTRACT}`, contractsData.Marketplace.abi, signer),
    [order, signer]
  );

  const encodeDataMutation = useMutation((data: any) => {
    return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/encoder/order`, data);
  });

  const handleCancelListing = useCallback(async () => {
    const { data: encodedOrder } = (await encodeDataMutation.mutateAsync({
      ...order,
      salt: +`${order?.salt}`,
      start: +`${order?.start}`,
      end: +`${order?.end}`,
    }));

    const cancelResponse = await contract.cancel(encodedOrder);

    console.log('cancelResponse', cancelResponse);

    onClose();
  }, [contract, order, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'40px !important'}>
          <Heading {...styles.TitleStyle} mb={'24px'}>Are you sure you want to cancel your listing?</Heading>

          <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'}>
            Canceling your listing will unpublish this sale from Universe and requires a transaction to make sure it will never be fulfilable.
          </Text>

          <Box {...styles.ButtonsContainerStyle}>
            <Button boxShadow={'lg'} onClick={handleCancelListing}>Cancel listing</Button>
            <Button variant={'outline'} onClick={onClose}>Go back</Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
