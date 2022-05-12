import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { NFTCancelListingPopup } from '../../..';
import { useAuthStore } from '../../../../../../../../../stores/authStore';
import { IUser } from '../../../../../../../account/types';
import { IOrder } from '../../../../../../types';
import { useNFTPageData } from '../../../../NFTPage.context';
import { EventsEmpty } from '../shared';
import HistoryEvent from '../shared/history-listings-event/HistoryEvent';

interface ITabListingsProps {
  owner: IUser;
  ownerAddress: string | undefined;
}

export const TabListings = (props: ITabListingsProps) => {
  const [isCancelListingPopupOpened, setIsCancelListingPopupOpened] = useState(false);
  const { owner, ownerAddress } = props;
  const address = useAuthStore(s => s.address)
  const { order } = useNFTPageData();
  const [isOrderExpired, setIsOrderExpired] = useState(false);
  const endTime = order ? (new Date(order?.end * 1000).getTime() - new Date().getTime()) : 10000;

  if (!order || isOrderExpired) {
    return <EventsEmpty title="No active listings yet." />;
  }
  
  setTimeout(
    () => {
      setIsOrderExpired(true)
    }, 
    endTime
  );

  return (
    <Box>
      {[order].map((listing: IOrder | any) => {
        return (
          <React.Fragment key={listing.id}>
            <HistoryEvent
              key={listing.id ?? listing._id}
              event={{ ...listing, makerData: owner } as IOrder}
              onlyListings
              cancelListing={setIsCancelListingPopupOpened}
              isOwner={(owner?.address || ownerAddress) === address}
            />
            <NFTCancelListingPopup
              order={listing}
              isOpen={isCancelListingPopupOpened}
              onClose={() => setIsCancelListingPopupOpened(false)}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
};
