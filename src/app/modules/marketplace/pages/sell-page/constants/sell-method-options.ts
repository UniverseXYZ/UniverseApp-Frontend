import { SellMethod } from '../enums';

import FixedListingImage from '@assets/images/v2/marketplace/fixed_listing.png';
import DutchAuctionImage from '@assets/images/v2/marketplace/dutch_aution.png';
import EnglishAuctionImage from '@assets/images/v2/marketplace/english_auction.png';

import { IAreaButton } from '@app/modules/marketplace/components';

interface ISellMethodOption extends Pick<IAreaButton, 'title' | 'description' | 'icon' | 'disabled'> {
  value: SellMethod;
}

export const sellMethodOptions: Array<ISellMethodOption> = [
  {
    value: SellMethod.FIXED,
    title: 'Fixed Listing',
    description: 'List your NFT for a fixed price',
    icon: FixedListingImage,
  },
  {
    value: SellMethod.DUTCH,
    title: 'Dutch Auction',
    // description: 'Set price for your NFT to sell at fixed or declining cost',
    description: 'Coming soon...',
    icon: DutchAuctionImage,
    disabled: true,
  },
  {
    value: SellMethod.ENGLISH,
    title: 'English Auction',
    // description: 'Set the starting bid and sell your NFT to the highest bidder',
    description: 'Coming soon...',
    icon: EnglishAuctionImage,
    disabled: true,
  },
];
