import { INftBackend } from './nft-backend';

export interface INft extends Omit<INftBackend, 'auctionExpDate'> {
  auctionExpDate: Date;
}
