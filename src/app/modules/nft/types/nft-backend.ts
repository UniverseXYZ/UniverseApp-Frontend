export interface INftBackend {
  amount: number;
  artworkType: string;
  collection: {
    address: string;
    bannerUrl?: string;
    coverUrl: string;
    createdAt: string;
    creator: string;
    description?: string;
    id: number;
    name: string;
    owner: string;
    publicCollection: boolean;
    shortUrl?: string;
    source: string;
    symbol: string;
    txHash: string;
    updatedAt: string;
  }
  collectionId: number;
  createdAt: string;
  creator: {
    about: string;
    address: string;
    createdAt: string;
    displayName: string;
    id: number;
    instagramUser: string;
    logoImageUrl?: string;
    profileImageUrl: string;
    twitterUser: string;
    universePageUrl: string;
  }
  description: string;
  id: number;
  name: string;
  numberOfEditions: number;
  optimized_url: string;
  original_url: string;
  owner: {
    about: string;
    address: string;
    createdAt: string;
    displayName: string;
    id: number;
    instagramUser: string;
    logoImageUrl?: string;
    profileImageUrl: string;
    twitterUser: string;
    universePageUrl: string;
    name?: string;
    avatar?: string;
  };
  nft: {
    "id": number;
    "collectionId": number;
    "txHash": string;
    "creator": string;
    "owner": string;
    "name": string;
    "description": string;
    "tokenId": string;
    "artworkType": string;
    "url": string;
    "optimized_url": string;
    "thumbnail_url": string;
    "original_url": string;
    "tokenUri": string;
    "properties": any,
    "royalties": [
      {
        "amount": number;
        "address": string;
      }
    ],
    "numberOfEditions": number;
    "createdAt": string;
    "updatedAt": string;
    "amount": number;
    "standard": string;
  };
  properties: any[];
  royalties: Array<{
    address: string;
    amount: number;
  }>;
  standard: string;
  thumbnail_url: string;
  tokenId: string;
  tokenIds: string[];
  tokenUri: string;
  txHash: string;
  updatedAt: string;
  url: string;

  // TODO
  likes: string[];
  isLiked: boolean;
  isAudio: boolean;
  isVideo: boolean;
  auctionExpDate: string;
  assets: string[]; // storybook
  price: number | string;
  offerPrice: number | string;
  lastPrice: number | string;
  moreFromCollection?: Array<IMoreNftBackend>
}

export interface IMoreNftBackend {
  id: number;
  collectionId: number;
  txHash: string;
  creator: {
    id: number;
    address: string;
    displayName?: string;
    universePageUrl?: string;
    about?: string;
    instagramUser?: string;
    twitterUser?: string;
    createdAt: string;
    profileImageUrl?: string | null;
    logoImageUrl?: string | null;
  },
  owner: {
    id: number;
    address: string;
    displayName?: string;
    universePageUrl?: string;
    about?: string;
    instagramUser?: string;
    twitterUser?: string;
    createdAt: string;
    profileImageUrl?: string | null;
    logoImageUrl?: string | null;
  },
  name: string;
  description?: string |  null;
  tokenId: string;
  artworkType: string;
  url: string;
  optimized_url: string;
  thumbnail_url: string;
  original_url: string;
  tokenUri: string;
  properties?: any | null;
  royalties: any;
  numberOfEditions: number;
  createdAt: string;
  updatedAt: string;
  amount: number;
  standard: string;
}
