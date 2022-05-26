import { IUser } from '../../account/types';
import { OrderAssetClass } from '../enums';

export interface IERC1155AssetType {
  assetClass: OrderAssetClass.ERC1155;
  contract: string;
  tokenId: number;
}

export interface IERC721AssetType {
  assetClass: OrderAssetClass.ERC721;
  contract: string;
  tokenId: number;
}
export interface IERC20AssetType {
  assetClass: OrderAssetClass.ERC20;
  contract: string;
}

export interface IERC721BundleAssetType {
  assetClass: OrderAssetClass.ERC721_BUNDLE;
  contracts: string[];
  tokenIds: Array<Array<number>>;
  bundleName: string;
  bundleDescription: string;
}

export interface IOrder {
  blockNum?: number;
  cancelledTxHash: null | string;
  createdAt: Date;
  data: {
    dataType: 'ORDER_DATA';
    revenueSplits: Array<{
      account: string;
      value: number;
    }>;
  };
  end: number;
  fill: string;
  from: string;
  hash: string;
  id: string;
  make: {
    assetType: IERC1155AssetType | IERC721AssetType | IERC721BundleAssetType | IERC20AssetType;
    value: string;
  };
  makeBalance: string;
  makeStock: string;
  maker: string;
  makerData: IUser | undefined;
  matchedTxHash: null | string;
  salt: number;
  side: number;
  signature: string;
  start: number;
  status: number;
  take: {
    assetType: {
      assetClass: string;
      contract?: string;
    }
    value: string;
  };
  taker: string;
  type: string;
  to: string;
  updatedAt: Date;
  modified: boolean;
}

export interface IOrderBackend extends
  Omit<IOrder,
    'salt' | 'start' | 'end' | 'createdAt' | 'updatedAt'
    > {
  salt: string;
  start: string;
  end: string;
  createdAt: string;
  updatedAt: string;
}
