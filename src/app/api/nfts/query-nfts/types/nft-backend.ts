import { IOrderAssetTypeERC20, IOrderAssetTypeSingleListing, IOrderBackend } from '@app/modules/nft/types';

export interface INFTBackend {
  contractAddress: string;
  tokenId: string;
  tokenType: string; // ERC721 | ERC1155
  externalDomainViewUrl: string;
  metadata?: {
    name?: string;
    description?: string;
    dna?: string;
    image: string;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    animation_url?: string;
    gif?: string;
    royalties: Array<{
      address: string;
      amount: number;
    }>;
    attributes?: Array<{
      trait_type: string;
      value: string;
      display_type?: string;
    }>;
  };
  processingSentAt: string; // date
  sentAt: string; // date
  sentForMediaAt: string; // date
  alternativeMediaFiles: Array<{
    type: string; // image
    url: string;
  }>;
  needToRefresh: boolean;
  source: string;
  orders?: IOrderBackend<IOrderAssetTypeSingleListing, IOrderAssetTypeERC20>[];
  owners: Array<{
    owner: string;
    transactionHash: string;
    value: string | number;
  }>;
}
