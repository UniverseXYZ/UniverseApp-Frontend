import dutchAuction from '../../../../../../assets/images/marketplace/v2/dutch_auction.svg';
import englishAuction from '../../../../../../assets/images/marketplace/v2/english_auction.svg';
import fixedListing from '../../../../../../assets/images/marketplace/v2/fixed_listing.svg';

export const sellMethodOptions = [
  {
    value: 'fixed',
    title: 'Fixed Listing',
    description: 'List your NFT for a fixed price',
    image: fixedListing
  },
  {
    value: 'dutch',
    title: 'Dutch Auction',
    description: 'Set price for your NFT to sell at fixed or declining cost',
    image: dutchAuction
  },
  {
    value: 'english',
    title: 'English Auction',
    description: 'Set the starting bid and sell your NFT to the highest bidder',
    image: englishAuction
  },
];
