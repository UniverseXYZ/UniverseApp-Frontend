export interface KVP {
  tokenId: string,
  collectionAddress: string
}
export const orderKeys = {
  all: ['orders'] as const,
  listings: ['orders', 'listings' ] as const,
  listing: (orderInfo: KVP) => ['orders', 'listing', { orderInfo }] as const,
  offers: (orderInfo: KVP) => ['orders', 'listing', 'offers', { orderInfo }] as const,
}