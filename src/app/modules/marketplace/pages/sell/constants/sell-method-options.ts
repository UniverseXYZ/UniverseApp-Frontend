import singleIcon from '../../../../../../assets/images/sellNft/single-icon.svg';
import collectionIcon from '../../../../../../assets/images/sellNft/collection-icon.svg';

export const sellMethodOptions = [
  {
    value: 'fixed',
    title: 'Fixed Listing',
    description: 'List your NFT for a fixed price',
    image: singleIcon
  },
  {
    value: 'dutch',
    title: 'Dutch Auction',
    description: 'Set price for your NFT to sell at fixed or declining cost',
    image: collectionIcon
  },
  {
    value: 'english',
    title: 'English Auction',
    description: 'Set the starting bid and sell your NFT to the highest bidder',
    image: singleIcon
  },
];
