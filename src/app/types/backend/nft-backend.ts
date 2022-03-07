export interface INFTBackendType {
  _id: string;
  contractAddress: string;
  tokenId: string;
  createdAt: string;
  needToRefresh: boolean;
  alternativeMediaFiles: Array<{
    type: string; // image
    url: string;
  }>;
  firstOwner: string;
  owners: Array<{
    address: string;
    transactionHash: string;
    value: number;
  }>;
  tokenType: string;
  updatedAt: string;
  sentAt: string;
  externalDomainViewUrl: string;
  metadata: {
    description: string;
    name: string;
    image: string;
    image_url: string;
    image_preview_url: string;
    image_thumbnail_url: string;
    image_original_url: string;
    external_url: string;
    attributes: Array<{
      trait_type: string;
      value: string;
      display_type?: string;
    }>;
    royalties?: Array<{
      address: string;
      amount: number;
    }>;
  };
  sentForMediaAt: string;
}
