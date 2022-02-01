export enum NFTArtworkType {
  JPEG = 'jpeg',
  PNG = 'png',
  MP4 = 'mp4',
  MP3 = 'mp3',
}

export enum NFTStandard {
  ERC721 = 'ERC721',
}

export interface IRoyalty {
  address: string;
  amount: number;
}

export interface IUser {
  id?: number;
  about?: string;
  address: string;
  createdAt?: Date;
  displayName?: string;
  instagramUser?: string;
  logoImageUrl?: string;
  profileImageUrl?: string;
  twitterUser?: string;
  universePageUrl?: string;
}

export interface IUserBackend extends Omit<IUser, 'createdAt'> {
  createdAt: string;
}

export interface ICollection {
  id: number;
  address: string;
  bannerUrl: string;
  coverUrl: string;
  creator: string;
  description: string;
  name: string;
  owner: string;
  publicCollection: boolean;
  shortUrl: string;
  source: string;
  symbol: string;
  txHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICollectionBackend extends Omit<ICollection, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface INFT {
  id: number;
  amount: number;
  artworkType: NFTArtworkType;
  collectionId: number;
  collection?: ICollection;
  createdAt: Date;
  creator?: IUser;
  description: string | null;
  name: string;
  numberOfEditions: number;
  optimizedUrl: string;
  originalUrl: string;
  owner?: IUser;
  properties: Array<Record<string, string>>;
  royalties: Array<IRoyalty>;
  standard: NFTStandard;
  thumbnailUrl: string;
  tokenId: string;
  tokenIds: string[];
  tokenUri: string;
  txHash: string | null;
  updatedAt: Date;
  url: string;
  hidden?: boolean;
  moreFromCollection?: INFT[];
}

export interface INFTBackend
  extends Omit<
    INFT,
    'creator'
    | 'owner'
    | 'collection'
    | 'optimized_url'
    | 'original_url'
    | 'thumbnail_url'
    | 'createdAt'
    | 'updatedAt'
    > {
  creator: string;
  owner: string;
  optimized_url: string;
  original_url: string;
  thumbnail_url: string;
  createdAt: string;
  updatedAt: string;
}
