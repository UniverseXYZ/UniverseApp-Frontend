import uuid from 'react-uuid';
import artistAvatar from '../../assets/images/artist-avatar.svg';

export const PLACEHOLDER_MY_BIDS = [
  {
    id: 7,
    artist: {
      id: uuid(),
      name: 'Justin 3LAU',
      avatar: artistAvatar,
    },
    name: 'My first auction',
    headline: null,
    startingBid: '2',
    tokenAddress: '0x0000000000000000000000000000000000000000',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    startDate: '2021-10-06T12:21:00.000Z',
    endDate: '2021-10-07T12:21:00.000Z',
    royaltySplits: null,
    link: null,
    promoImageUrl: null,
    backgroundImageUrl: null,
    backgroundImageBlur: false,
    createdAt: '2021-10-04T12:22:19.864Z',
    updatedAt: '2021-10-04T12:22:19.864Z',
    rewardTiers: [
      {
        id: 8,
        auctionId: 7,
        name: 'Platinum tier',
        numberOfWinners: 1,
        nftsPerWinner: 1,
        minimumBid: '0.1',
        tierPosition: 0,
        description: null,
        imageUrl: null,
        color: null,
        createdAt: '2021-10-04T12:22:19.864Z',
        updatedAt: '2021-10-04T12:22:19.864Z',
        nfts: [
          {
            id: 688,
            collectionId: 1,
            txHash: '0x8594012365289f75ea76298c1d831489a41e12d3c3a29b47867ada6878e720eb',
            creator: '0x88f107857b9046a07c06d36566b661edd2993e0b',
            name: 'NFT 1',
            description: 'df dsfd dsf dsfdsfdsfdsffrerbn ',
            tokenId: 3171,
            artworkType: 'png',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            original_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            tokenUri: 'https://arweave.net/NcOBOELHW58zjvbowq5lGil64EZwrcT376ZZVypEq3g',
            properties: [
              {
                Color: 'Red',
              },
            ],
            royalties: null,
            numberOfEditions: 1,
            createdAt: '2021-10-04T11:58:45.177Z',
            updatedAt: '2021-10-04T11:58:45.177Z',
          },
        ],
      },
      {
        id: 9,
        auctionId: 7,
        name: 'Gold tier',
        numberOfWinners: 1,
        nftsPerWinner: 1,
        minimumBid: '0.1',
        tierPosition: 1,
        description: null,
        imageUrl: null,
        color: null,
        createdAt: '2021-10-04T12:22:19.864Z',
        updatedAt: '2021-10-04T12:22:19.864Z',
        nfts: [
          {
            id: 688,
            collectionId: 1,
            txHash: '0x8594012365289f75ea76298c1d831489a41e12d3c3a29b47867ada6878e720eb',
            creator: '0x88f107857b9046a07c06d36566b661edd2993e0b',
            name: 'NFT 1',
            description: 'df dsfd dsf dsfdsfdsfdsffrerbn ',
            tokenId: 3171,
            artworkType: 'png',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            original_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            tokenUri: 'https://arweave.net/NcOBOELHW58zjvbowq5lGil64EZwrcT376ZZVypEq3g',
            properties: [
              {
                Color: 'Red',
              },
            ],
            royalties: null,
            numberOfEditions: 1,
            createdAt: '2021-10-04T11:58:45.177Z',
            updatedAt: '2021-10-04T11:58:45.177Z',
          },
        ],
      },
      {
        id: 10,
        auctionId: 7,
        name: 'Silver tier',
        numberOfWinners: 1,
        nftsPerWinner: 1,
        minimumBid: '0.1',
        tierPosition: 2,
        description: null,
        imageUrl: null,
        color: null,
        createdAt: '2021-10-04T12:22:19.864Z',
        updatedAt: '2021-10-04T12:22:19.864Z',
        nfts: [
          {
            id: 688,
            collectionId: 1,
            txHash: '0x8594012365289f75ea76298c1d831489a41e12d3c3a29b47867ada6878e720eb',
            creator: '0x88f107857b9046a07c06d36566b661edd2993e0b',
            name: 'NFT 1',
            description: 'df dsfd dsf dsfdsfdsfdsffrerbn ',
            tokenId: 3171,
            artworkType: 'png',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            original_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/afddb8de899cb75550b9b56cc03ed45f5e9a06b64f37e211.png',
            tokenUri: 'https://arweave.net/NcOBOELHW58zjvbowq5lGil64EZwrcT376ZZVypEq3g',
            properties: [
              {
                Color: 'Red',
              },
            ],
            royalties: null,
            numberOfEditions: 1,
            createdAt: '2021-10-04T11:58:45.177Z',
            updatedAt: '2021-10-04T11:58:45.177Z',
          },
        ],
      },
    ],
  },
  {
    id: 25,
    artist: {
      id: uuid(),
      name: 'Justin 3LAU',
      avatar: artistAvatar,
    },
    name: 'My Second Auction ',
    headline: null,
    startingBid: '-2',
    tokenAddress: '0x0000000000000000000000000000000000000000',
    tokenSymbol: 'ETH',
    tokenDecimals: 18,
    startDate: '2021-10-08T05:54:00.000Z',
    endDate: '2021-10-10T05:50:00.000Z',
    royaltySplits: null,
    link: null,
    promoImageUrl:
      'https://universeapp-assets-dev.s3.amazonaws.com/auctions/24296b29d620384849f13eac2d3d022511962bbcd58d31ae.png',
    backgroundImageUrl:
      'https://universeapp-assets-dev.s3.amazonaws.com/auctions/80fd5fe8d62653815f7abb07f03ab13d813d62f62e3ee96a.png',
    backgroundImageBlur: false,
    createdAt: '2021-10-08T05:51:11.377Z',
    updatedAt: '2021-10-08T05:51:39.416Z',
    rewardTiers: [
      {
        id: 31,
        auctionId: 25,
        name: 'dsfsdf',
        numberOfWinners: 1,
        nftsPerWinner: 1,
        minimumBid: '0.1',
        tierPosition: 0,
        description: 'sdfgdfgdfg',
        imageUrl: null,
        color: '#16c8ea',
        createdAt: '2021-10-08T05:51:11.377Z',
        updatedAt: '2021-10-08T05:51:39.726Z',
        nfts: [
          {
            id: 4069,
            collectionId: 1,
            txHash: '0xf27e92770981caa2f3882274af618f13afd00617806383402b9394a54c9e431f',
            creator: '0x88f107857b9046a07c06d36566b661edd2993e0b',
            name: 'NFT 3',
            description: 'f sdfsdf sdfsd',
            tokenId: 6185,
            artworkType: 'png',
            url: 'https://universeapp-assets-dev.s3.amazonaws.com/7f217284d3c13c4c3dc3a9d16ddb473e4aefd4ce01af5388.png',
            optimized_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/7f217284d3c13c4c3dc3a9d16ddb473e4aefd4ce01af5388.png',
            thumbnail_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/7f217284d3c13c4c3dc3a9d16ddb473e4aefd4ce01af5388.png',
            original_url:
              'https://universeapp-assets-dev.s3.amazonaws.com/7f217284d3c13c4c3dc3a9d16ddb473e4aefd4ce01af5388.png',
            tokenUri: 'https://arweave.net/RDWYu6JVCTq_MT3Yh1ZshEx7yw1EuIhP5fS1IsLuu5k',
            properties: [
              {
                dafsdf: 'dfsggdfg',
              },
              {
                dfgdfg: 'dfgdfgd',
              },
              {
                ertre: 'dfgdfg',
              },
              {
                fghfgh: 'fghfgh',
              },
            ],
            royalties: null,
            numberOfEditions: 60,
            createdAt: '2021-10-06T08:12:19.889Z',
            updatedAt: '2021-10-06T08:12:19.889Z',
          },
        ],
      },
    ],
  },
];
