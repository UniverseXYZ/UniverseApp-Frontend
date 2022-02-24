import axios from 'axios';
import { OrderAssetClass } from '../modules/nft/enums';

export type IAssetClass = OrderAssetClass.ERC721 | OrderAssetClass.ERC721_BUNDLE | OrderAssetClass.ERC20;

export interface IOrderAssetBackend {
  assetType: {
    assetClass: string;
    contract?: string;
    tokenId?: string;
    contracts?: string[];
    tokenIds?: Array<string[]>;
  },
  value: string;
}

export interface IEncodeOrderApiData {
  make: IOrderAssetBackend;
  maker: string;
  take: IOrderAssetBackend;
  salt: number;
  start: number;
  end: number;
  taker: string;
  type: string;
  data: {
    dataType: string;
    revenueSplits: Array<{
      account: string;
      value: number;
    }>;
  };
}

// export const prepareBackendAsset: (
//   value: string,
//   assetClass: string,
//   contracts: string[],
//   tokenIds: (Array<string | number>) | Array<Array<string | number>>
// ) => IOrderAssetBackend = (
//   value,
//   assetClass,
//   contracts = [],
//   tokenIds = []
// ) => {
//   const asset: IOrderAssetBackend = {
//     value,
//     assetType: {
//       assetClass,
//       // contracts?: string[];
//       // tokenIds?: Array<string[]>;
//     },
//   };
//
//   if (assetClass === OrderAssetClass.ERC721)
//   switch (assetClass) {
//     case OrderAssetClass.ERC721:
//       asset.assetType.contract = contracts[0];
//       asset.assetType.tokenId = tokenIds.map(String);
//       break;
//     case OrderAssetClass.ERC721_BUNDLE:
//       break;
//   }
//
//   return ;
// }

export const EncodeOrderApi = (data: IEncodeOrderApiData) => {
  return axios.post(`${process.env.REACT_APP_MARKETPLACE_BACKEND}/v1/orders/encoder/order`, data);
};
