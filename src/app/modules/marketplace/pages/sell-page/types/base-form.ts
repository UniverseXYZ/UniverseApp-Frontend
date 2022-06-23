export interface IBaseForm {
  bundleName: string;
  bundleDescription: string;
  bundleSelectedNFTs: string[];
  amount: number;
  royalties: Array<{
    address: string;
    percent: string;
  }>;
}
