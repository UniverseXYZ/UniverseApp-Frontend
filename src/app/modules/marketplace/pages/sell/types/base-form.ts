export interface IBaseForm {
  NFT: any; // TODO
  selectedNFTsIds: Record<string, 'boolean' | string[]>;
  bundleName: string;
  bundleDescription: string;
}
