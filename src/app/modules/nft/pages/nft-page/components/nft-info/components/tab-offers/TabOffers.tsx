import { Box } from '@chakra-ui/react';
import {  useState } from 'react';
import { NFTAcceptOfferPopup, OffersEmpty } from './components';
import { INFT, IOrder, IUser } from '../../../../../../types';
import { NFTOffer } from './components/nft-offer/NFTOffer';

interface ITabOffersProps {
  nft?: INFT;
  order?: IOrder;
  offers?: IOrder[];
  usersMap?: Record<string, IUser>;
}
export const TabOffers:React.FC<ITabOffersProps> = ({nft, order, offers, usersMap}) => {
  const [offerForAccept, setOfferForAccept] = useState<IOrder | null>(null);
  
  return !offers?.length ? <OffersEmpty /> : (
    <Box>
      {offers?.map((offer) => (
        offer && order && usersMap && <NFTOffer
            key={offer.id} 
            offer={offer}
            order={order}
            usersMap={usersMap}
            setOfferForAccept={setOfferForAccept}
          />      
      ))}
      {/*TODO: add support of bundle*/}
      {offerForAccept && (
        <NFTAcceptOfferPopup
          NFT={nft as INFT}
          order={offerForAccept}
          isOpen={!!offerForAccept}
          onClose={() => setOfferForAccept(null)}
        />
      )}
    </Box>
  );
}