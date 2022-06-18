import { ICollection } from "../../collection/types";

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

export interface INFTProperty {
  traitType: string;
  value: string;
  displayType?: string;
}

export interface INFT {
  _ownerAddress?: string;
  _creatorAddress?: string | null;
  _collectionAddress?: string;
  _properties?: INFTProperty[];
  id: string;
  creatorAddress?: string;
  amount: number;
  artworkTypes: NFTArtworkType[];
  collectionId: number;
  collection: ICollection | null;
  createdAt?: Date;
  description: string | null;
  name: string;
  numberOfEditions: number;
  videoUrl: string;
  gifUrl?: string;
  optimizedUrl: string;
  originalUrl: string;
  properties: Array<Record<string, string>>;
  royalties: Array<IRoyalty>;
  standard: NFTStandard;
  thumbnailUrl: string;
  previewUrl?: string;
  tokenId: string;
  tokenIds: string[];
  tokenUri: string;
  txHash: string | null;
  updatedAt?: Date;
  url: string;
  hidden?: boolean;
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
