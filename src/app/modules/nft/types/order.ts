import { IUser } from "../../account/types";
import { OrderAssetClass } from "../enums";

export interface IOrderAssetTypeSingleListing {
  assetClass: OrderAssetClass.ERC721 | OrderAssetClass.ERC1155;
  contract: string;
  tokenId: number;
}

export interface IOrderAssetTypeBundleListing {
  assetClass: OrderAssetClass.ERC721_BUNDLE;
  contracts: string[];
  tokenIds: Array<Array<number>>;
  bundleName: string;
  bundleDescription: string;
}

export interface IOrderAssetTypeERC20 {
  assetClass: OrderAssetClass.ERC20;
  contract: string;
}

export interface IOrderAssetTypeETH {
  assetClass: OrderAssetClass.ETH;
}

export interface IOrderAsset<
  T =
    | IOrderAssetTypeSingleListing
    | IOrderAssetTypeBundleListing
    | IOrderAssetTypeERC20
    | IOrderAssetTypeETH
> {
  assetType: T;
  value: string;
}

export interface IOrder<M, T> {
  blockNum?: number;
  cancelledTxHash: null | string;
  createdAt: Date;
  data: {
    dataType: "ORDER_DATA";
    revenueSplits?: Array<{
      account: string;
      value: number;
    }>;
  };
  end: number;
  fill: string;
  from: string;
  hash: string;
  _id: string;
  make: IOrderAsset<M>;
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
  take: IOrderAsset<T>;
  taker: string;
  type: string;
  to: string;
  updatedAt: Date;
  modified: boolean;
}

export interface IOrderBackend<M, T>
  extends Omit<
    IOrder<M, T>,
    "salt" | "start" | "end" | "createdAt" | "updatedAt"
  > {
  salt: string;
  start: string;
  end: string;
  createdAt: string;
  updatedAt: string;
}
