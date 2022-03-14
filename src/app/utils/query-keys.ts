export interface KVP {
  tokenId: string,
  collectionAddress: string
}
export const orderKeys = {
  all: ['orders'] as const,
  listings: ['orders', 'listings' ] as const,
  browse: (filters: any) =>  ['orders', 'browse', { ...filters }],
  browseAny: ['orders', 'browse'],
  listing: (orderInfo: KVP) => ['orders', 'listing', { orderInfo: {tokenId: orderInfo.tokenId, collectionAddress: orderInfo.collectionAddress.toLowerCase()} }] as const,
  offers: (orderInfo: KVP) => ['orders', 'listing', 'offers', { orderInfo: {tokenId: orderInfo.tokenId, collectionAddress: orderInfo.collectionAddress.toLowerCase()} }] as const,
  history: (orderInfo: KVP) => ['orders', 'listing', 'history', { orderInfo: {tokenId: orderInfo.tokenId, collectionAddress: orderInfo.collectionAddress.toLowerCase()} }] as const,
  cardOffers: (orderInfo: KVP) => ['orders', 'listing', 'offers', 'card', { orderInfo: {tokenId: orderInfo.tokenId, collectionAddress: orderInfo.collectionAddress.toLowerCase()} }] as const,
}

export const nftKeys = {
  all: ['nfts'] as const,
  nftInfo: (nftInfo: KVP) => ['nfts', 'info', { nftInfo: {tokenId: nftInfo.tokenId, collectionAddress: nftInfo.collectionAddress.toLowerCase()} }] as const,
  nftOwner: (nftInfo: KVP, userAddress: string) => ['nfts', 'info', 'owner', { nftInfo: {tokenId: nftInfo.tokenId, collectionAddress: nftInfo.collectionAddress.toLowerCase()}, userAddress: userAddress.toLowerCase() }] as const,
  nftCreator: (nftInfo: KVP, userAddress: string) => ['nfts', 'info', 'creator', { nftInfo: {tokenId: nftInfo.tokenId, collectionAddress: nftInfo.collectionAddress.toLowerCase()}, userAddress: userAddress.toLowerCase() }] as const,
  userNfts: (userAddress: string) => ['nfts', { userAddress: userAddress.toLowerCase() }]
}