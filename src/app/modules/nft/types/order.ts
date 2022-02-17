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
    assetType: {
      assetClass: 'ERC721' | 'ERC721_BUNDLE';
      contracts?: string[];
      tokenIds?: Array<Array<string>>;
      contract?: string;
      tokenId?: string;
    };
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
