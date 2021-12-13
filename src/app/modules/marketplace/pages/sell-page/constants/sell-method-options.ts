import dutchAuction from '../../../../../../assets/images/marketplace/v2/dutch_auction.svg';
import englishAuction from '../../../../../../assets/images/marketplace/v2/english_auction.svg';
import fixedListing from '../../../../../../assets/images/marketplace/v2/fixed_listing.svg';
import { SellMethod } from '../enums';

interface IOption {
  value: SellMethod,
  title: string;
  description: string;
  image: string;
}

export const sellMethodOptions: Array<IOption> = [
  {
    value: SellMethod.FIXED,
    title: 'Fixed Listing',
    description: 'List your NFT for a fixed price',
    image: fixedListing
  },
  {
    value: SellMethod.DUTCH,
    title: 'Dutch Auction',
    description: 'Set price for your NFT to sell at fixed or declining cost',
    image: dutchAuction
  },
  {
    value: SellMethod.ENGLISH,
    title: 'English Auction',
    description: 'Set the starting bid and sell your NFT to the highest bidder',
    image: englishAuction
  },
];
