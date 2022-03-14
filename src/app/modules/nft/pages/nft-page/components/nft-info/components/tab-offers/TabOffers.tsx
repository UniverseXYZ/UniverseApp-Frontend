import { Box } from '@chakra-ui/react';
import {  useState } from 'react';
import { NFTAcceptOfferPopup, OffersEmpty } from './components';
import { IERC721AssetType, INFT, IOrder, IUser } from '../../../../../../types';
import { NFTOffer } from './components/nft-offer/NFTOffer';
import { LoadingPopup } from '../../../../../../../marketplace/components/popups/loading-popup';
import { Contract } from 'ethers';
import { useMutation, useQueryClient } from 'react-query';
import { useAuthContext } from '../../../../../../../../../contexts/AuthContext';
import { EncodeOrderApi } from '../../../../../../../../api';
import Contracts from '../../../../../../../../../contracts/contracts.json';
import { GetActiveListingApi, GetOrdersApi } from '../../../../../../api';
import { orderKeys } from '../../../../../../../../utils/query-keys';
import { useNFTPageData } from '../../../../NFTPage.context';


interface ITabOffersProps {
  nft?: INFT;
  order?: IOrder;
  offers?: IOrder[];
  usersMap?: Record<string, IUser>;
}

enum CancelingText {
  PROGRESS = 'The transaction is in progress...',
  INDEXING = 'Indexing transaction...',
  INDEXING_TAKING_TOO_LONG = "Receving the event from the blockchain is taking longer than expected. Please be patient."
}

export const TabOffers:React.FC<ITabOffersProps> = ({nft, offers, usersMap}) => {
  const { signer } = useAuthContext() as any;
  const [offerForAccept, setOfferForAccept] = useState<IOrder | null>(null);
  const [offerCanceling, setOfferCanceling] = useState(false);
  const [offerCancelingText, setOfferCancelingText] = useState(CancelingText.PROGRESS);
  const queryClient = useQueryClient();

  // @ts-ignore
  const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

  const encodeOrderMutation = useMutation(EncodeOrderApi);

  const handleCancelOffer = async (offer: IOrder) => {
    setOfferCanceling(true);
    setOfferCancelingText(CancelingText.PROGRESS)
    const contract = new Contract(`${process.env.REACT_APP_MARKETPLACE_CONTRACT}`, contractsData.Marketplace.abi, signer);

    const { data: encodedOrderData } = (await encodeOrderMutation.mutateAsync({
        type: offer.type,
        data: offer.data,
        maker: offer.maker,
        make: offer.make as any,
        salt: offer.salt,
        start: offer.start,
        end: offer.end,
        take: offer.take,
        taker: offer.taker,
    }));

    try {
      const cancelReceipt = await contract.cancel(encodedOrderData);
      const cancelTx = await cancelReceipt.wait();

      if(cancelTx.status !== 1) {
        console.error('display error');
        return;
      }

      setOfferCancelingText(CancelingText.INDEXING)
      
      // This polling mechanic is temporary until we have marketplace web sockets
      let fetchCount = 0;
      const indexInterval = setInterval(async () => {
        fetchCount += 1;
        const stringifiedOffers = offers?.map(offer => offer.id).join('');

        const convertedOrder = offer.take.assetType as IERC721AssetType;
        const tokenId = convertedOrder.tokenId?.toString();
        const collectionAddress = convertedOrder.contract?.toLowerCase()
  
        // Fetch order api until a diffrent response is returned
        const newOffers = await GetOrdersApi({
          side: 0, 
          tokenIds: tokenId, 
          collection: collectionAddress 
        })
  
        // Change query information about order
        const newStringifiedoffers = newOffers?.orders?.map(offer => offer.id).join('');
        if (stringifiedOffers !== newStringifiedoffers) {
          clearInterval(indexInterval);
          queryClient.setQueryData(orderKeys.offers({tokenId, collectionAddress}), newOffers || undefined);
          queryClient.invalidateQueries(orderKeys.listing({tokenId, collectionAddress}));
          setOfferCanceling(false);

        }
  
        if (fetchCount === 3) {
          setOfferCancelingText(CancelingText.INDEXING_TAKING_TOO_LONG)
        }
  
      }, 4000);  

    } catch (error) {
      console.error(error);
      setOfferCanceling(false);
    }
  }


  const handleClose = () => {
    setTimeout(() => {
      setOfferForAccept(null);
      location.reload();
    }, 1000)
  }
  
  return !offers?.length ? <OffersEmpty /> : (
    <Box>
      {offers?.map((offer) => (
        offer && nft && nft._ownerAddress && <NFTOffer
            key={offer.id} 
            offer={offer}
            owner={nft._ownerAddress}
            usersMap={usersMap || {}}
            setOfferForAccept={setOfferForAccept}
            cancelOffer={handleCancelOffer}
          />      
      ))}
      {/*TODO: add support of bundle*/}
      {offerForAccept && (
        <NFTAcceptOfferPopup
          NFT={nft as INFT}
          order={offerForAccept}
          isOpen={!!offerForAccept}
          onClose={() => handleClose()}
        />
      )}
      <LoadingPopup
          heading='Cancelling offer'
          text={offerCancelingText}
          isOpen={offerCanceling}
          onClose={() => setOfferCanceling(false)}
          transactions={[]}
        />
    </Box>
  );
}