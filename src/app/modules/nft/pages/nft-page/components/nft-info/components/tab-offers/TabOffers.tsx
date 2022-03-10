import { Box } from '@chakra-ui/react';
import {  useState } from 'react';
import { NFTAcceptOfferPopup, OffersEmpty } from './components';
import { INFT, IOrder, IUser } from '../../../../../../types';
import { NFTOffer } from './components/nft-offer/NFTOffer';
import { LoadingPopup } from '../../../../../../../marketplace/components/popups/loading-popup';
import { Contract } from 'ethers';
import { useMutation } from 'react-query';
import { useAuthContext } from '../../../../../../../../../contexts/AuthContext';
import { EncodeOrderApi } from '../../../../../../../../api';
import Contracts from '../../../../../../../../../contracts/contracts.json';


interface ITabOffersProps {
  nft?: INFT;
  order?: IOrder;
  offers?: IOrder[];
  usersMap?: Record<string, IUser>;
}

enum CancelingText {
  PROGRESS = 'The transaction is in progress...',
  INDEXING = 'Indexing transaction...'
}

export const TabOffers:React.FC<ITabOffersProps> = ({nft, offers, usersMap}) => {
  const { signer } = useAuthContext() as any;
  const [offerForAccept, setOfferForAccept] = useState<IOrder | null>(null);
  const [offerCanceling, setOfferCanceling] = useState(false);
  const [offerCancelingText, setOfferCancelingText] = useState(CancelingText.PROGRESS);

  // @ts-ignore
  const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

  const encodeOrderMutation = useMutation(EncodeOrderApi);

  const handleCancelOffer = async (offer: IOrder) => {
    setOfferCanceling(true);
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
      //TODO: this is temporary solution
      setOfferCancelingText(CancelingText.INDEXING)
      setTimeout(() => {
        location.reload();
      }, 20000)

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