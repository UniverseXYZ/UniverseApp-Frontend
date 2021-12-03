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
}
