import nft1 from '../../assets/images/marketplace/nfts/nft1.png';
import nft2 from '../../assets/images/marketplace/nfts/nft2.png';
import nft3 from '../../assets/images/marketplace/nfts/nft3.mp3';
import nft4 from '../../assets/images/marketplace/nfts/nft4.png';
import nft5 from '../../assets/images/marketplace/nfts/nft5.png';
import nft6 from '../../assets/images/marketplace/nfts/nft6.png';
import nft7 from '../../assets/images/marketplace/nfts/nft7.png';
import nft8 from '../../assets/images/marketplace/nfts/nft8.png';
import nft9 from '../../assets/images/marketplace/nfts/nft9.png';
import nft10 from '../../assets/images/marketplace/nfts/nft10.mp4';
import nft11 from '../../assets/images/marketplace/nfts/nft11.png';
import nft12 from '../../assets/images/marketplace/nfts/nft12.png';
import nft13 from '../../assets/images/marketplace/nfts/nft13.png';
import nft14 from '../../assets/images/marketplace/nfts/nft14.png';
import nft15 from '../../assets/images/marketplace/nfts/nft15.png';
import nft16 from '../../assets/images/marketplace/nfts/nft16.mp4';
import auction1 from '../../assets/images/marketplace/auctions/auction1.png';
import auction2 from '../../assets/images/marketplace/auctions/auction2.png';
import auction3 from '../../assets/images/marketplace/auctions/auction3.png';
import user1 from '../../assets/images/marketplace/users/user1.png';
import user2 from '../../assets/images/marketplace/users/user2.png';
import user3 from '../../assets/images/marketplace/users/user3.png';
import user4 from '../../assets/images/marketplace/users/user4.png';
import gallery1 from '../../assets/images/marketplace/galleries/gallery1.png';
import gallery2 from '../../assets/images/marketplace/galleries/gallery2.png';
import gallery3 from '../../assets/images/marketplace/galleries/gallery3.png';
import gallery4 from '../../assets/images/marketplace/galleries/gallery4.png';
import gallery5 from '../../assets/images/marketplace/galleries/gallery5.png';
import gallery6 from '../../assets/images/marketplace/galleries/gallery6.png';
import gallery7 from '../../assets/images/marketplace/galleries/gallery7.png';
import gallery8 from '../../assets/images/marketplace/galleries/gallery8.png';
import gallery9 from '../../assets/images/marketplace/galleries/gallery9.png';
import gallery10 from '../../assets/images/marketplace/galleries/gallery10.png';
import gallery11 from '../../assets/images/marketplace/galleries/gallery11.png';
import gallery12 from '../../assets/images/marketplace/galleries/gallery12.png';
import gallery13 from '../../assets/images/marketplace/galleries/gallery13.png';
import gallery14 from '../../assets/images/marketplace/galleries/gallery14.png';
import gallery15 from '../../assets/images/marketplace/galleries/gallery15.png';
import gallery16 from '../../assets/images/marketplace/galleries/gallery16.png';
import community1 from '../../assets/images/marketplace/communities/community1.png';
import community2 from '../../assets/images/marketplace/communities/community2.png';
import community3 from '../../assets/images/marketplace/communities/community3.png';
import community4 from '../../assets/images/marketplace/communities/community4.png';
import community5 from '../../assets/images/marketplace/communities/community5.png';
import community6 from '../../assets/images/marketplace/communities/community6.png';
import community7 from '../../assets/images/marketplace/communities/community7.png';
import community8 from '../../assets/images/marketplace/communities/community8.png';

export const PLACEHOLDER_MARKETPLACE_NFTS = [
  {
    id: 1,
    type: 'single',
    view: 'user',
    state: '',
    creator: {
      id: 1,
      name: 'Creator1',
      avatar: user1,
    },
    collection: {
      id: 1,
      name: 'Collection1',
      avatar: nft9,
    },
    owner: {
      id: 1,
      name: 'Owner1',
      avatar: user2,
    },
    likesCount: 20,
    liked: false,
    media: {
      url: nft1,
      type: 'image/png',
    },
    name: 'NFT 1',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 0.67,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-07-04 09:00:00',
    endDate: '2021-07-15 09:00:00',
    listedDate: '2021-07-29 15:46:42',
    soldDate: '2021-07-15 09:00:00',
  },
  {
    id: 2,
    type: 'single',
    view: 'seller',
    state: '',
    creator: {
      id: 2,
      name: 'Creator2',
      avatar: user1,
    },
    collection: {
      id: 2,
      name: 'Collection2',
      avatar: nft9,
    },
    owner: {
      id: 2,
      name: 'Owner2',
      avatar: user2,
    },
    likesCount: 28,
    liked: false,
    media: {
      url: nft2,
      type: 'image/png',
    },
    name: 'NFT 2',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 0.5,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-08-10 12:00:00',
    endDate: '2021-08-20 12:00:00',
    listedDate: '2021-08-17 17:32:25',
    soldDate: '2021-08-15 09:00:00',
  },
  {
    id: 3,
    type: 'single',
    view: 'seller',
    state: '',
    creator: {
      id: 3,
      name: 'Creator3',
      avatar: user1,
    },
    collection: {
      id: 3,
      name: 'Collection3',
      avatar: nft9,
    },
    owner: {
      id: 3,
      name: 'Owner3',
      avatar: user2,
    },
    likesCount: 24,
    liked: false,
    media: {
      url: nft3,
      type: 'audio/mpeg',
    },
    name: 'NFT 3',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 1,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-04-24 11:20:00',
    endDate: '2021-05-05 11:20:00',
    listedDate: '2021-07-27 15:46:49',
    soldDate: '2021-05-04 19:00:00',
  },
  {
    id: 4,
    type: 'bundles',
    view: 'user',
    state: '',
    creator: {
      id: 4,
      name: 'Creator4',
      avatar: user1,
    },
    collection: {
      id: 4,
      name: 'Collection4',
      avatar: nft9,
    },
    owner: {
      id: 4,
      name: 'Owner4',
      avatar: user2,
    },
    likesCount: 24,
    liked: false,
    media: {
      url: nft4,
      type: 'image/png',
    },
    allItems: [
      {
        id: 4,
        url: nft4,
        type: 'image/png',
      },
      {
        id: 7,
        url: nft7,
        type: 'image/png',
      },
      {
        id: 3,
        url: nft3,
        type: 'audio/mpeg',
      },
      {
        id: 9,
        url: nft9,
        type: 'image/png',
      },
      {
        id: 10,
        url: nft10,
        type: 'video/mp4',
      },
      {
        id: 11,
        url: nft11,
        type: 'image/png',
      },
      {
        id: 12,
        url: nft12,
        type: 'image/png',
      },
    ],
    name: 'NFT 4',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 1.2,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-03-01 08:00:00',
    endDate: '2021-03-09 08:00:00',
    listedDate: '2021-08-10 14:00:41',
    soldDate: '2021-03-08 09:00:00',
  },
  {
    id: 5,
    type: 'single',
    view: 'user',
    state: '',
    creator: {
      id: 5,
      name: 'Creator5',
      avatar: user1,
    },
    collection: {
      id: 5,
      name: 'Collection5',
      avatar: nft9,
    },
    owner: {
      id: 5,
      name: 'Owner5',
      avatar: user2,
    },
    likesCount: 39,
    liked: false,
    media: {
      url: nft5,
      type: 'image/png',
    },
    name: 'NFT 5',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 0.2,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-07-04 09:00:00',
    endDate: '2021-07-05 09:00:00',
    listedDate: '2021-08-17 11:36:42',
    soldDate: '2021-07-15 09:00:00',
  },
  {
    id: 6,
    type: 'single',
    view: 'user',
    state: 'On Auction',
    creator: {
      id: 6,
      name: 'Creator6',
      avatar: user1,
    },
    collection: {
      id: 6,
      name: 'Collection6',
      avatar: nft9,
    },
    owner: {
      id: 6,
      name: 'Owner6',
      avatar: user2,
    },
    likesCount: 29,
    liked: false,
    media: {
      url: nft6,
      type: 'image/png',
    },
    name: 'NFT 6',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 3,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-08-15 19:00:00',
    endDate: '2021-09-05 19:00:00',
    listedDate: '2021-08-17 15:46:42',
    soldDate: '2021-07-15 09:00:00',
  },
  {
    id: 7,
    type: 'single',
    view: 'seller',
    state: '',
    creator: {
      id: 7,
      name: 'user 7',
      avatar: user1,
    },
    collection: {
      id: 7,
      name: 'Collection7',
      avatar: nft9,
    },
    owner: {
      id: 7,
      name: 'Owner7',
      avatar: user2,
    },
    likesCount: 14,
    liked: false,
    media: {
      url: nft7,
      type: 'image/png',
    },
    name: 'NFT 7',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 2.1,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-02-14 16:30:00',
    endDate: '2021-02-19 16:30:00',
    listedDate: '2021-07-29 15:46:42',
    soldDate: '2021-02-17 19:00:00',
  },
  {
    id: 8,
    type: 'single',
    view: 'user',
    state: '',
    creator: {
      id: 8,
      name: 'Creator8',
      avatar: user1,
    },
    collection: {
      id: 8,
      name: 'Collection8',
      avatar: nft9,
    },
    owner: {
      id: 8,
      name: 'Owner8',
      avatar: user2,
    },
    likesCount: 44,
    liked: false,
    media: {
      url: nft8,
      type: 'image/png',
    },
    name: 'NFT 8',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 4,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-06-01 15:00:00',
    endDate: '2021-06-15 15:00:00',
    listedDate: '2021-07-30 15:46:42',
    soldDate: '2021-07-15 09:00:00',
  },
  {
    id: 9,
    type: 'single',
    view: 'seller',
    state: 'On Auction',
    creator: {
      id: 9,
      name: 'Creator9',
      avatar: user1,
    },
    collection: {
      id: 9,
      name: 'Collection9',
      avatar: nft9,
    },
    owner: {
      id: 9,
      name: 'Owner9',
      avatar: user2,
    },
    likesCount: 42,
    liked: false,
    media: {
      url: nft9,
      type: 'image/png',
    },
    name: 'NFT 9',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 2.2,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-08-14 09:30:00',
    endDate: '2021-09-01 09:00:00',
    listedDate: '2021-08-17 16:40:42',
    soldDate: '-',
  },
  {
    id: 10,
    type: 'single',
    view: 'seller',
    state: 'On Auction',
    creator: {
      id: 10,
      name: 'Creator10',
      avatar: user1,
    },
    collection: {
      id: 10,
      name: 'Collection10',
      avatar: nft9,
    },
    owner: {
      id: 10,
      name: 'Owner10',
      avatar: user2,
    },
    likesCount: 54,
    liked: false,
    media: {
      url: nft10,
      type: 'video/mp4',
    },
    name: 'NFT 10',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 1.5,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-08-01 19:30:00',
    endDate: '2021-08-29 18:30:00',
    listedDate: '2021-08-15 15:46:42',
    soldDate: '-',
  },
  {
    id: 11,
    type: 'single',
    view: 'user',
    state: '',
    creator: {
      id: 11,
      name: 'Creator11',
      avatar: user1,
    },
    collection: {
      id: 11,
      name: 'Collection11',
      avatar: nft9,
    },
    owner: {
      id: 11,
      name: 'Owner11',
      avatar: user2,
    },
    likesCount: 24,
    liked: false,
    media: {
      url: nft11,
      type: 'image/png',
    },
    name: 'NFT 11',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 0.4,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-02-14 10:00:00',
    endDate: '2021-02-28 10:00:00',
    listedDate: '2021-06-29 15:46:42',
    soldDate: '2021-02-25 09:00:00',
  },
  {
    id: 12,
    type: 'single',
    view: 'user',
    state: '',
    creator: {
      id: 12,
      name: 'Creator12',
      avatar: user1,
    },
    collection: {
      id: 12,
      name: 'Collection12',
      avatar: nft9,
    },
    owner: {
      id: 12,
      name: 'Owner12',
      avatar: user2,
    },
    likesCount: 30,
    liked: false,
    media: {
      url: nft12,
      type: 'image/png',
    },
    name: 'NFT 12',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 0.22,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-05-13 02:00:00',
    endDate: '2021-06-05 09:00:00',
    listedDate: '2021-07-21 15:46:42',
    soldDate: '2021-06-05 08:00:00',
  },
  {
    id: 13,
    type: 'single',
    view: 'user',
    state: '',
    creator: {
      id: 13,
      name: 'Creator13',
      avatar: user1,
    },
    collection: {
      id: 13,
      name: 'Collection13',
      avatar: nft9,
    },
    owner: {
      id: 13,
      name: 'Owner13',
      avatar: user2,
    },
    likesCount: 33,
    liked: false,
    media: {
      url: nft13,
      type: 'image/png',
    },
    name: 'NFT 13',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 0.65,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-04-04 09:00:00',
    endDate: '2021-04-15 09:00:00',
    listedDate: '2021-08-09 15:46:42',
    soldDate: '2021-04-14 09:00:00',
  },
  {
    id: 14,
    type: 'single',
    view: 'seller',
    state: '',
    creator: {
      id: 14,
      name: 'Creator14',
      avatar: user1,
    },
    collection: {
      id: 14,
      name: 'Collection14',
      avatar: nft9,
    },
    owner: {
      id: 14,
      name: 'Owner14',
      avatar: user2,
    },
    likesCount: 20,
    liked: false,
    media: {
      url: nft14,
      type: 'image/png',
    },
    name: 'NFT 14',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 0.7,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-01-04 09:00:00',
    endDate: '2021-01-09 09:00:00',
    listedDate: '2021-05-29 15:46:42',
    soldDate: '2021-01-08 09:00:00',
  },
  {
    id: 15,
    type: 'single',
    view: 'seller',
    state: 'On Auction',
    creator: {
      id: 15,
      name: 'Creator15',
      avatar: user1,
    },
    collection: {
      id: 15,
      name: 'Collection15',
      avatar: nft9,
    },
    owner: {
      id: 15,
      name: 'Owner15',
      avatar: user2,
    },
    likesCount: 22,
    liked: false,
    media: {
      url: nft15,
      type: 'image/png',
    },
    name: 'NFT 15',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 0.15,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-08-14 09:00:00',
    endDate: '2021-09-05 09:00:00',
    listedDate: '2021-08-17 15:46:42',
    soldDate: '-',
  },
  {
    id: 16,
    type: 'single',
    view: 'seller',
    state: '',
    creator: {
      id: 16,
      name: 'Creator16',
      avatar: user1,
    },
    collection: {
      id: 16,
      name: 'Collection16',
      avatar: nft9,
    },
    owner: {
      id: 16,
      name: 'Owner16',
      avatar: user2,
    },
    likesCount: 11,
    liked: false,
    media: {
      url: nft16,
      type: 'video/mp4',
    },
    name: 'NFT 16',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    price: 0.55,
    editions: '1/10',
    offerFor: 0.35,
    startDate: '2021-03-20 13:00:00',
    endDate: '2021-03-30 13:00:00',
    listedDate: '2021-06-15 17:26:42',
    soldDate: '2021-03-29 09:00:00',
  },
];

export const PLACEHOLDER_MARKETPLACE_AUCTIONS = [
  {
    id: 1,
    name: 'Active auction 1',
    photo: auction1,
    startDate: '2021-07-17 09:00:00',
    endDate: '2021-09-30 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
  {
    id: 2,
    name: 'Active auction 2',
    photo: auction1,
    startDate: '2021-07-17 09:00:00',
    endDate: '2021-09-30 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
  {
    id: 3,
    name: 'Active auction 3',
    photo: auction1,
    startDate: '2021-07-17 09:00:00',
    endDate: '2021-09-30 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
  {
    id: 4,
    name: 'Future auction 1',
    photo: auction2,
    startDate: '2021-09-25 12:00:00',
    endDate: '2021-11-30 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
  {
    id: 5,
    name: 'Future auction 2',
    photo: auction2,
    startDate: '2021-09-25 12:00:00',
    endDate: '2021-11-30 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
  {
    id: 6,
    name: 'Future auction 3',
    photo: auction2,
    startDate: '2021-09-25 12:00:00',
    endDate: '2021-11-30 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
  {
    id: 7,
    name: 'Past auction 1',
    photo: auction3,
    startDate: '2021-07-04 09:00:00',
    endDate: '2021-07-05 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
  {
    id: 8,
    name: 'Past auction 2',
    photo: auction3,
    startDate: '2021-07-04 09:00:00',
    endDate: '2021-07-05 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
  {
    id: 9,
    name: 'Past auction 3',
    photo: auction3,
    startDate: '2021-07-04 09:00:00',
    endDate: '2021-07-05 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
  {
    id: 10,
    name: 'Past auction 4',
    photo: auction3,
    startDate: '2021-07-04 09:00:00',
    endDate: '2021-07-05 09:00:00',
    creator: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    winners: 35,
    nftsPerWinner: '10-7',
    highestWinningBid: 40,
    lowestWinningBid: 14,
  },
];

export const PLACEHOLDER_MARKETPLACE_USERS = [
  {
    id: 1,
    name: 'User 1',
    avatar: user1,
    description:
      'Digital Sculptor & Art Director with more than fifteen years bringing 3D stuff to life.',
    followers: 430,
    following: false,
    galleries: [gallery1, gallery2, gallery3, gallery4],
  },
  {
    id: 2,
    name: 'User 2',
    avatar: user2,
    description:
      'Digital Sculptor & Art Director with more than fifteen years bringing 3D stuff to life.',
    followers: 430,
    following: true,
    galleries: [gallery5, gallery6, gallery7, gallery8],
  },
  {
    id: 3,
    name: 'User 3',
    avatar: user3,
    description:
      'Digital Sculptor & Art Director with more than fifteen years bringing 3D stuff to life.',
    followers: 430,
    following: false,
    galleries: [gallery9, gallery10, gallery11, gallery12],
  },
  {
    id: 4,
    name: 'User 4',
    avatar: user4,
    description:
      'Digital Sculptor & Art Director with more than fifteen years bringing 3D stuff to life.',
    followers: 430,
    following: true,
    galleries: [gallery13, gallery14, gallery15, gallery16],
  },
  {
    id: 5,
    name: 'User 5',
    avatar: user1,
    description:
      'Digital Sculptor & Art Director with more than fifteen years bringing 3D stuff to life.',
    followers: 430,
    following: false,
    galleries: [gallery1, gallery2, gallery3, gallery4],
  },
  {
    id: 6,
    name: 'User 6',
    avatar: user2,
    description:
      'Digital Sculptor & Art Director with more than fifteen years bringing 3D stuff to life.',
    followers: 430,
    following: true,
    galleries: [gallery5, gallery6, gallery7, gallery8],
  },
  {
    id: 7,
    name: 'User 7',
    avatar: user3,
    description:
      'Digital Sculptor & Art Director with more than fifteen years bringing 3D stuff to life.',
    followers: 430,
    following: false,
    galleries: [gallery9, gallery10, gallery11, gallery12],
  },
  {
    id: 8,
    name: 'User 8',
    avatar: user4,
    description:
      'Digital Sculptor & Art Director with more than fifteen years bringing 3D stuff to life.',
    followers: 430,
    following: true,
    galleries: [gallery13, gallery14, gallery15, gallery16],
  },
];

export const PLACEHOLDER_MARKETPLACE_COLLECTIONS = [
  {
    id: 1,
    name: 'Collection1',
    background: null,
    photo: nft1,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 2,
    name: 'Collection2',
    background: nft13,
    photo: nft2,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 3,
    name: 'Collection3',
    background: null,
    photo: null,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 4,
    name: 'Collection4',
    background: nft14,
    photo: nft4,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 5,
    name: 'Collection5',
    background: nft15,
    photo: nft5,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 6,
    name: 'Collection6',
    background: null,
    photo: nft6,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 7,
    name: 'Collection7',
    background: null,
    photo: nft7,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 8,
    name: 'Collection8',
    background: null,
    photo: nft8,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 9,
    name: 'Collection9',
    background: nft1,
    photo: nft9,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 10,
    name: 'Collection10',
    background: nft11,
    photo: null,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 11,
    name: 'Collection11',
    background: null,
    photo: nft11,
    owner: {
      name: 'Justin 3LAU',
    },
  },
  {
    id: 12,
    name: 'Collection12',
    background: null,
    photo: nft12,
    owner: {
      name: 'Justin 3LAU',
    },
  },
];

export const PLACEHOLDER_MARKETPLACE_COMMUNITIES = [
  {
    id: 1,
    name: 'CryptoPunks Verified 1',
    photo: community1,
    members: 10622,
    description:
      'Luctus lectus ut consectetur ut sagittis fringilla tempus ultricies scelerisque. Suspendisse nisi, porta facilisi quam auctor. Sem dolor proin vitae mollis sed dolor sit. ',
  },
  {
    id: 2,
    name: 'CryptoPunks Verified 2',
    photo: community2,
    members: 10622,
    description:
      'Luctus lectus ut consectetur ut sagittis fringilla tempus ultricies scelerisque. Suspendisse nisi, porta facilisi quam auctor. Sem dolor proin vitae mollis sed dolor sit. ',
  },
  {
    id: 3,
    name: 'CryptoPunks Verified 3',
    photo: community3,
    members: 10622,
    description:
      'Luctus lectus ut consectetur ut sagittis fringilla tempus ultricies scelerisque. Suspendisse nisi, porta facilisi quam auctor. Sem dolor proin vitae mollis sed dolor sit. ',
  },
  {
    id: 4,
    name: 'CryptoPunks Verified 4',
    photo: community4,
    members: 10622,
    description:
      'Luctus lectus ut consectetur ut sagittis fringilla tempus ultricies scelerisque. Suspendisse nisi, porta facilisi quam auctor. Sem dolor proin vitae mollis sed dolor sit. ',
  },
  {
    id: 5,
    name: 'CryptoPunks Verified 5',
    photo: community5,
    members: 10622,
    description:
      'Luctus lectus ut consectetur ut sagittis fringilla tempus ultricies scelerisque. Suspendisse nisi, porta facilisi quam auctor. Sem dolor proin vitae mollis sed dolor sit. ',
  },
  {
    id: 6,
    name: 'CryptoPunks Verified 6',
    photo: community6,
    members: 10622,
    description:
      'Luctus lectus ut consectetur ut sagittis fringilla tempus ultricies scelerisque. Suspendisse nisi, porta facilisi quam auctor. Sem dolor proin vitae mollis sed dolor sit. ',
  },
  {
    id: 7,
    name: 'CryptoPunks Verified 7',
    photo: community7,
    members: 10622,
    description:
      'Luctus lectus ut consectetur ut sagittis fringilla tempus ultricies scelerisque. Suspendisse nisi, porta facilisi quam auctor. Sem dolor proin vitae mollis sed dolor sit. ',
  },
  {
    id: 8,
    name: 'CryptoPunks Verified 8',
    photo: community8,
    members: 10622,
    description:
      'Luctus lectus ut consectetur ut sagittis fringilla tempus ultricies scelerisque. Suspendisse nisi, porta facilisi quam auctor. Sem dolor proin vitae mollis sed dolor sit. ',
  },
];

export const PLACEHOLDER_MARKETPLACE_GALLERIES = [
  {
    id: 1,
    name: 'Gallery 1',
    likesCount: 24,
    liked: false,
    user: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    count: 10,
    photos: [gallery1, gallery2, gallery3],
  },
  {
    id: 2,
    name: 'Gallery 2',
    likesCount: 24,
    liked: false,
    user: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    count: 10,
    photos: [gallery4, gallery5, gallery6],
  },
  {
    id: 3,
    name: 'Gallery 3',
    likesCount: 24,
    liked: false,
    user: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    count: 10,
    photos: [gallery7, gallery8, gallery9],
  },
  {
    id: 4,
    name: 'Gallery 4',
    likesCount: 24,
    liked: false,
    user: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    count: 10,
    photos: [gallery10, gallery11, gallery12],
  },
  {
    id: 5,
    name: 'Gallery 5',
    likesCount: 24,
    liked: false,
    user: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    count: 10,
    photos: [gallery13, gallery14, gallery15],
  },
  {
    id: 6,
    name: 'Gallery 6',
    likesCount: 24,
    liked: false,
    user: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    count: 10,
    photos: [gallery16, gallery1, gallery2],
  },
  {
    id: 7,
    name: 'Gallery 7',
    likesCount: 24,
    liked: false,
    user: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    count: 10,
    photos: [gallery1, gallery2, gallery3],
  },
  {
    id: 8,
    name: 'Gallery 8',
    likesCount: 24,
    liked: false,
    user: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    count: 10,
    photos: [gallery4, gallery5, gallery6],
  },
  {
    id: 9,
    name: 'Gallery 9',
    likesCount: 24,
    liked: false,
    user: {
      name: 'Justin 3LAU',
      avatar: user1,
    },
    count: 10,
    photos: [gallery7, gallery8, gallery9],
  },
];
