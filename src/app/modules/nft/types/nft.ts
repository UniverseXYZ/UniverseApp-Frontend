export enum NFTArtworkType {
  JPG = 'jpg',
  JPEG = 'jpeg',
  IMAGE = 'image',
  VIDEO = 'video',
  PNG = 'png',
  GIF = 'gif',
  MP4 = 'mp4',
  MP3 = 'mp3',
  WEBP = 'webp',
}

export enum NFTStandard {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
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
  instagramLink: string;
  discordLink: string;
  telegramLink: string;
  siteLink: string;
  mediumLink: string;
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

export interface ICollectionScrapper {
  contractAddress: string;
  createdAt: string;
  createdAtBlock: number;
  firstProcessedBlock: number;
  isProcessing: boolean;
  lastProcessedBlock: number;
  name: string;
  sentAt: string;
  tokenType: string;
  updatedAt: string;
  _id: string;
}

export interface ISearchBarDropdownCollection {
  id: string | number;
  address: string;
  name: string;
  image: string | undefined;
}

export interface IUserOwnedCollection {
  name: string;
  contractAddress: string;
}

export interface INFTProperty {
  traitType: string;
  value: string;
  displayType?: string;
}

export interface INFT {
  _ownerAddress?: string;
  _creatorAddress?: string;
  _collectionAddress?: string;
  _properties?: INFTProperty[];
  id: string;
  amount: number;
  artworkTypes: NFTArtworkType[];
  collectionId: number;
  collection?: ICollection;
  createdAt: Date;
  creator?: IUser;
  description: string | null;
  name: string;
  numberOfEditions: number;
  videoUrl: string;
  gifUrl?: string;
  optimizedUrl: string;
  originalUrl: string;
  owner?: IUser;
  properties: Array<Record<string, string>>;
  royalties: Array<IRoyalty>;
  standard: NFTStandard;
  thumbnailUrl: string;
  previewUrl?: string;
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

export interface ICollectionInfoResponse {
  owners: number;
  contractAddress: string;
  name: string;
}

export interface ICollectionOrderBookData {
  floorPrice: string;
  volumeTraded: string;
}