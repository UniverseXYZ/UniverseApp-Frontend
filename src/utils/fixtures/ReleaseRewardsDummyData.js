import uuid from 'react-uuid';
import nft1 from '../../assets/images/marketplace/nfts/nft1.png';
import nft2 from '../../assets/images/marketplace/nfts/nft4.png';
import nft3 from '../../assets/images/marketplace/nfts/nft6.png';
import nft4 from '../../assets/images/marketplace/nfts/nft9.png';
import nft5 from '../../assets/images/marketplace/nfts/nft13.png';
import nft6 from '../../assets/images/marketplace/nfts/nft15.png';

export const ReleaseRewardsData = [
  {
    id: uuid(),
    name: 'Transaction 1',
    totalNFTs: 100,
    completed: false,
    tiers: [
      {
        id: uuid(),
        type: 'Platinum tier',
        slots: 5,
        nftQuantity: 80,
        nfts: [
          {
            id: uuid(),
            image: nft1,
          },
          {
            id: uuid(),
            image: nft2,
          },
          {
            id: uuid(),
            image: nft3,
          },
        ],
      },
      {
        id: uuid(),
        type: 'Gold tier',
        slots: 10,
        nftQuantity: 80,
        nfts: [
          {
            id: uuid(),
            image: nft4,
          },
          {
            id: uuid(),
            image: nft5,
          },
        ],
      },
    ],
  },
  {
    id: uuid(),
    name: 'Transaction',
    totalNFTs: 20,
    completed: false,
    tiers: [
      {
        id: uuid(),
        type: 'Silver tier',
        slots: 20,
        nftQuantity: 20,
        nfts: [
          {
            id: uuid(),
            image: nft6,
          },
        ],
      },
    ],
  },
];
