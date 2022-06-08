import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  INFT,
  IOrder,
  IOrderAssetTypeBundleListing,
  IOrderAssetTypeERC20,
  IOrderAssetTypeSingleListing,
} from '@app/modules/nft/types';
import { IUser } from '@app/modules/account/types';
import { NFTOffer } from './components/nft-offer/NFTOffer';
import { LoadingPopup } from '@app/components';
import { Contract } from 'ethers';
import { useMutation, useQueryClient } from 'react-query';
import Contracts from '../../../../../../../../../contracts/contracts.json';
import { EncodeOrderApi, GetOrdersApi, IEncodeOrderApiData } from '@app/api';
import { orderKeys } from '@app/utils/query-keys';
import { EventsEmpty } from '../shared';
import { useAuthStore } from '../../../../../../../../../stores/authStore';

interface ITabOffersProps<T> {
  nft?: INFT;
  offers: Array<T>;
  usersMap?: Record<string, IUser>;
  onAcceptOffer: (offer: T) => void;
}

enum CancelingText {
  PROGRESS = 'The transaction is in progress...',
  INDEXING = 'Indexing transaction...',
  INDEXING_TAKING_TOO_LONG = 'Receving the event from the blockchain is taking longer than expected. Please be patient.',
}

type IOfferSingleListing = IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>;
type IOfferBundleListing = IOrder<IOrderAssetTypeERC20, IOrderAssetTypeBundleListing>;

export const TabOffers = <T extends IOfferSingleListing | IOfferBundleListing>(props: ITabOffersProps<T>) => {
  const {
    nft,
    offers,
    usersMap,
    onAcceptOffer,
  } = props;

  const signer = useAuthStore(s => s.signer);
  const [offerCanceling, setOfferCanceling] = useState(false);
  const [offerCancelingText, setOfferCancelingText] = useState(CancelingText.PROGRESS);
  const [orderInterval, setOrderInterval] = useState<NodeJS.Timer>();
  const queryClient = useQueryClient();

  // @ts-ignore
  const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

  const encodeOrderMutation = useMutation(
    (data: IEncodeOrderApiData<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing | IOrderAssetTypeBundleListing>) => {
      return EncodeOrderApi(data);
    }
  );

  useEffect(() => {
    return () => {
      if (orderInterval) {
        clearInterval(orderInterval);
      }
    };
  }, []);

  const handleCancelOffer = async (offer: T) => {
    if (!signer) {
      return;
    }

    setOfferCanceling(true);
    setOfferCancelingText(CancelingText.PROGRESS);

    const contract = new Contract(
      `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`,
      contractsData.Marketplace.abi,
      signer
    );

    const { data: encodedOrderData } = await encodeOrderMutation.mutateAsync({
      type: offer.type,
      data: offer.data,
      maker: offer.maker,
      make: offer.make,
      salt: offer.salt,
      start: offer.start,
      end: offer.end,
      take: offer.take,
      taker: offer.taker,
    });

    try {
      const cancelReceipt = await contract.cancel(encodedOrderData);
      const cancelTx = await cancelReceipt.wait();

      if (cancelTx.status !== 1) {
        console.error('display error');
        return;
      }

      setOfferCancelingText(CancelingText.INDEXING);

      // This polling mechanic is temporary until we have marketplace web sockets
      let fetchCount = 0;
      const orderIndexing = setInterval(async () => {
        fetchCount += 1;
        const stringifiedOffers = offers.map((offer) => offer.id).join('');

        // FOR FUTURE: [Bundle] add bundle support
        const singleListingOffer = offer as IOrder<IOrderAssetTypeERC20, IOrderAssetTypeSingleListing>;

        const tokenId = singleListingOffer.take.assetType.tokenId?.toString();
        const collectionAddress = singleListingOffer.take.assetType.contract;

        // Fetch order api until a diffrent response is returned
        const newOffers = await GetOrdersApi({
          side: 0,
          tokenIds: tokenId,
          collection: collectionAddress,
        });

        // Change query information about order
        const newStringifiedoffers = newOffers?.orders?.map((offer) => offer.id).join('');
        if (stringifiedOffers !== newStringifiedoffers) {
          clearInterval(orderIndexing);
          queryClient.setQueryData(orderKeys.offers({ tokenId, collectionAddress }), newOffers || undefined);
          queryClient.invalidateQueries(orderKeys.listing({ tokenId, collectionAddress }));
          setOfferCanceling(false);
        }

        if (fetchCount === 3) {
          setOfferCancelingText(CancelingText.INDEXING_TAKING_TOO_LONG);
        }
      }, 4000);

      setOrderInterval(orderIndexing);
    } catch (error) {
      console.error(error);
      setOfferCanceling(false);
    }
  };

  return !offers.length ? (
    <EventsEmpty title="No active offers yet." subtitle="Be the first to make an offer!" />
  ) : (
    <Box>
      {offers
        // Filter only active offers
        .filter((offer) => offer.end * 1000 > new Date().getTime())
        .map((offer) => offer && nft && nft._ownerAddress && (
          <NFTOffer
            key={offer.id}
            offer={offer}
            owner={nft._ownerAddress}
            usersMap={usersMap || {}}
            onAcceptOffer={onAcceptOffer}
            onCancelOffer={handleCancelOffer}
          />
        ))}
      {/*TODO: add support of bundle*/}
      <LoadingPopup
        heading="Cancelling offer"
        text={offerCancelingText}
        isOpen={offerCanceling}
        onClose={() => setOfferCanceling(false)}
        transactions={[]}
      />
    </Box>
  );
};

