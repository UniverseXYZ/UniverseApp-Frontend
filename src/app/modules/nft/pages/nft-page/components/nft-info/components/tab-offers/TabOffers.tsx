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


interface ITabOffersProps {
  nft?: INFT;
  order?: IOrder;
  offers?: IOrder[];
  usersMap?: Record<string, IUser>;
}
export const TabOffers:React.FC<ITabOffersProps> = ({nft, order, offers, usersMap}) => {
  const { signer } = useAuthContext() as any;
  const [offerForAccept, setOfferForAccept] = useState<IOrder | null>(null);
  const [offerCanceling, setOfferCanceling] = useState(false);

  // @ts-ignore
  const { contracts: contractsData } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

  const encodeOrderMutation = useMutation(EncodeOrderApi);

  const handleCancelOffer = async (order: IOrder) => {
    setOfferCanceling(true);
    const contract = new Contract(`${process.env.REACT_APP_MARKETPLACE_CONTRACT}`, contractsData.Marketplace.abi, signer);

    const { data: encodedOrderData } = (await encodeOrderMutation.mutateAsync({
        type: order.type,
        data: order.data,
        maker: order.maker,
        make: order.make as any,
        salt: order.salt,
        start: order.start,
        end: order.end,
        take: order.take,
        taker: order.taker,
    }));

    try {
      const cancelReceipt = await contract.cancel(encodedOrderData);
      const cancelTx = await cancelReceipt.wait();

      if(cancelTx.status !== 1) {
        console.error('display error');
        return;
      }

      setOfferCanceling(false);

    } catch (error) {
      console.error(error);
    }
  }

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
      <LoadingPopup
          heading='Cancelling offer'
          text="The transaction is in progress..."
          isOpen={offerCanceling}
          onClose={() => setOfferCanceling(false)}
          transactions={[]}
        />
    </Box>
  );
}