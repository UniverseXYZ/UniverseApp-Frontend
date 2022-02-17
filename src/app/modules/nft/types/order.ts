export interface IERC721AssetType {
  assetClass: 'ERC721';
  contract: string;
  tokenId: string;
}

export interface IERC721BundleAssetType {
  assetClass: 'ERC721_BUNDLE';
  contracts: string[];
  tokenIds: Array<Array<string>>;
  bundleName: string;
  bundleDescription: string;
}

export interface IOrder {
  cancelledTxHash: null | string;
  createdAt: Date;
  data: {
    dataType: 'ORDER_DATA';
    revenueSplits: Array<{
      account: string;
      value: number;
    }>;
  };
  end: string;
  fill: string;
  hash: string;
  id: string;
  make: {
    assetType: IERC721AssetType | IERC721BundleAssetType;
    value: string;
  };
  makeBalance: string;
  makeStock: string;
  maker: string;
  matchedTxHash: null | string;
  salt: string;
  side: number;
  signature: string;
  start: string;
  status: number;
  take: {
    assetType: {
      assetClass: string;
    }
    value: string;
  };
  taker: string;
  type: string;
  updatedAt: Date;
}

export interface IOrderBackend extends Omit<IOrder, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}
