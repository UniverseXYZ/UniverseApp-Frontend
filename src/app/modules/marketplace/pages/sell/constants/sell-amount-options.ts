import singleIcon from '../../../../../../assets/images/sellNft/single-icon.svg';
import collectionIcon from '../../../../../../assets/images/sellNft/collection-icon.svg';

export const sellAmountOptions = [
  {
    value: 'single',
    title: 'Single Item',
    description: 'Sell one item',
    image: singleIcon
  },
  {
    value: 'bundle',
    title: 'Bundle',
    description: 'Group this item with others to sell',
    image: collectionIcon
  },
];
