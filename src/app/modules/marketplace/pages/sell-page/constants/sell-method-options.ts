import { SellMethod } from '../enums';
import { IBoxSelectOption } from '../components';

import FixedListingImage from '../../../../../../assets/images/v2/marketplace/fixed_listing.png';
import DutchAuctionImage from '../../../../../../assets/images/v2/marketplace/dutch_aution.png';
import EnglishAuctionImage from '../../../../../../assets/images/v2/marketplace/english_auction.png';

export const sellMethodOptions: Array<IBoxSelectOption> = [
  {
    value: SellMethod.FIXED,
    title: 'Fixed Listing',
    description: 'List your NFT for a fixed price',
    image: FixedListingImage,
  },
  {
    value: SellMethod.DUTCH,
    title: 'Dutch Auction',
    // description: 'Set price for your NFT to sell at fixed or declining cost',
    description: 'Coming soon...',
    image: DutchAuctionImage,
    disabled: true,
  },
  {
    value: SellMethod.ENGLISH,
    title: 'English Auction',
    // description: 'Set the starting bid and sell your NFT to the highest bidder',
    description: 'Coming soon...',
    image: EnglishAuctionImage,
    disabled: true,
  },
];
