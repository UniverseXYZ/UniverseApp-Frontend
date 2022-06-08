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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Contract } from 'ethers';

import Contracts from '../../../../../../../contracts/contracts.json';

import * as styles from './styles';
import {
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20, IOrderAssetTypeETH,
  IOrderAssetTypeSingleListing,
} from '../../../../types';
import { orderKeys } from '../../../../../../utils/query-keys';
import { useAuthStore } from '../../../../../../../stores/authStore';
import { useLoadingStore } from 'src/stores/loadingStore';
import { EncodeOrderApi, GetActiveListingApi, IEncodeOrderApiData } from '../../../../../../api';

// @ts-ignore
const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

interface INFTCancelListingPopupProps {
  order?: IOrder<IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing, IOrderAssetTypeERC20>;
  isOpen: boolean;
  onClose: () => void;
}

const INDEXING_TAKING_TOO_LONG = "Receving the event from the blockchain is taking longer than expected. Please be patient.";

export const NFTCancelListingPopup = ({ order, isOpen, onClose }: INFTCancelListingPopupProps) => {

  const signer = useAuthStore(s => s.signer)
  const { setShowLoading, closeLoading, setLoadingTitle, setLoadingBody, setTransactions } = useLoadingStore(s => ({setShowLoading: s.setShowLoading, closeLoading: s.closeLoading, setLoadingTitle: s.setLoadingTitle, setLoadingBody: s.setLoadingBody, setTransactions: s.setTransactions}));
  const queryClient = useQueryClient();

  const [orderInterval, setOrderInterval] = useState<NodeJS.Timer>();
  
  const contract = useMemo(
    () => signer ? new Contract(`${process.env.REACT_APP_MARKETPLACE_CONTRACT}`, contractsData.Marketplace.abi, signer) : null,
    [order, signer]
  );

  type IEncodeOrderMutationData = IEncodeOrderApiData<
    IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing,
    IOrderAssetTypeERC20 | IOrderAssetTypeETH
    >;

  const encodeOrderMutation = useMutation((data: IEncodeOrderMutationData) => EncodeOrderApi(data));

  useEffect(() => {
    return () => {
      if (orderInterval) {
        clearInterval(orderInterval);
      }
    }
  }, []);

  const handleCancelListing = useCallback(async () => {
    const orderData: any = { ...order };
    orderData.make.assetType.tokenId = `${orderData.make.assetType.tokenId}`;

    if (!order || !contract) {
      return;
    }

    const { data: encodedOrderData } = (await encodeOrderMutation.mutateAsync({
      type: order.type,
      data: order.data,
      maker: order.maker,
      make: order.make,
      salt: order.salt,
      start: order.start,
      end: order.end,
      take: order.take,
      taker: order.taker,
    }));

    const cancelResponse = await contract.cancel(encodedOrderData);
    // Close the cancel listing modal
    onClose();

    // Show loading modal
    setShowLoading(true);
    setTransactions([cancelResponse.hash]);

    await cancelResponse.wait();
    // Close loading modal
    setLoadingTitle("Indexing transaction...");

    // This polling mechanic is temporary until we have marketplace web sockets
    let fetchCount = 0;
    const indexInterval = setInterval(async () => {
      fetchCount += 1;

      // FOR FUTURE: [Bundle] add bundle support
      const singleListingOrder = order as IOrder<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>;

      const tokenId = singleListingOrder.make?.assetType.tokenId?.toString();
      const collectionAddress = singleListingOrder.make?.assetType.contract;

      // Fetch order api until a diffrent response is returned
      const newOrder = await GetActiveListingApi(collectionAddress,tokenId);

      // Change query information about order
      if (!newOrder?.id || order.id !== newOrder.id) {
        clearInterval(indexInterval);

        queryClient.invalidateQueries(orderKeys.history({tokenId, collectionAddress}));
        queryClient.setQueryData(orderKeys.listing({tokenId, collectionAddress}), newOrder || undefined);
        queryClient.refetchQueries(orderKeys.browseAny)
        closeLoading();
      }

      if (fetchCount === 3) {
        setLoadingBody(INDEXING_TAKING_TOO_LONG);
      }

    }, 4000);

    setOrderInterval(indexInterval);
  }, [contract, order, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW={'480px'}>
        <ModalCloseButton />
        <ModalBody pt={'45px !important'} pb={'45px !important'}>
          <Heading {...styles.TitleStyle} mb={'33px'}>Are you sure you want to cancel your listing?</Heading>

          <Text color={'rgba(0, 0, 0, 0.6)'} textAlign={'center'} lineHeight={'1.5'}>
            Canceling your listing will unpublish this sale from Universe and requires a transaction to make sure it will never be fulfillable.
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
