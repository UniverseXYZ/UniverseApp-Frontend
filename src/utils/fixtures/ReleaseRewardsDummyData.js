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

export const SlotsRewardData = [
  {
    id: uuid(),
    number: 1,
    name: 'Firefly',
    type: 'platinum',
    nftsQuantity: 4,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft1,
        editions: 1,
      },
      {
        id: uuid(),
        image: nft2,
        editions: 3,
      },
    ],
  },
  {
    id: uuid(),
    number: 2,
    name: 'BUBUZZ',
    type: 'platinum',
    nftsQuantity: 4,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft3,
        editions: 2,
      },
      {
        id: uuid(),
        image: nft4,
        editions: 2,
      },
    ],
  },
  {
    id: uuid(),
    number: 3,
    name: '0x2ef8...0d8c',
    type: 'platinum',
    nftsQuantity: 4,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft5,
        editions: 2,
      },
      {
        id: uuid(),
        image: nft6,
        editions: 1,
      },
      {
        id: uuid(),
        image: nft1,
        editions: 1,
      },
    ],
  },
  {
    id: uuid(),
    number: 4,
    name: '0x2ef8...0d8c',
    type: 'platinum',
    nftsQuantity: 4,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft2,
        editions: 1,
      },
      {
        id: uuid(),
        image: nft5,
        editions: 2,
      },
      {
        id: uuid(),
        image: nft6,
        editions: 1,
      },
    ],
  },
  {
    id: uuid(),
    number: 5,
    name: 'WeirdMan',
    type: 'gold',
    nftsQuantity: 3,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft6,
        editions: 1,
      },
      {
        id: uuid(),
        image: nft4,
        editions: 2,
      },
    ],
  },
  {
    id: uuid(),
    number: 6,
    name: '0x5ef8...2d8n',
    type: 'gold',
    nftsQuantity: 3,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft5,
        editions: 3,
      },
    ],
  },
  {
    id: uuid(),
    number: 7,
    name: '0r2ef8...0f8c',
    type: 'gold',
    nftsQuantity: 3,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft3,
        editions: 1,
      },
      {
        id: uuid(),
        image: nft6,
        editions: 2,
      },
    ],
  },
  {
    id: uuid(),
    number: 8,
    name: 'Valium',
    type: 'gold',
    nftsQuantity: 3,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft1,
        editions: 1,
      },
      {
        id: uuid(),
        image: nft2,
        editions: 2,
      },
    ],
  },
  {
    id: uuid(),
    number: 9,
    name: 'Valium',
    type: 'silver',
    nftsQuantity: 1,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft1,
        editions: 1,
      },
    ],
  },
  {
    id: uuid(),
    number: 10,
    name: 'Valium',
    type: 'silver',
    nftsQuantity: 1,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft4,
        editions: 1,
      },
    ],
  },
  {
    id: uuid(),
    number: 11,
    name: 'Valium',
    type: 'silver',
    nftsQuantity: 1,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft5,
        editions: 1,
      },
    ],
  },
  {
    id: uuid(),
    number: 12,
    name: 'Valium',
    type: 'silver',
    nftsQuantity: 1,
    completed: false,
    open: false,
    nfts: [
      {
        id: uuid(),
        image: nft1,
        editions: 1,
      },
    ],
  },
];
