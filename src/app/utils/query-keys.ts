export interface KVP {
  tokenId: string;
  collectionAddress: string;
}
export const orderKeys = {
  all: ['orders'] as const,
  listings: ['orders', 'listings'] as const,
  browse: (filters: any) => ['orders', 'browse', { ...filters }],
  browseAny: ['orders', 'browse'],
  listing: (orderInfo: KVP) =>
    [
      'orders',
      'listing',
      { orderInfo: { tokenId: orderInfo.tokenId, collectionAddress: orderInfo.collectionAddress.toLowerCase() } },
    ] as const,
  offers: (orderInfo: KVP) =>
    [
      'orders',
      'listing',
      'offers',
      { orderInfo: { tokenId: orderInfo.tokenId, collectionAddress: orderInfo.collectionAddress.toLowerCase() } },
    ] as const,
  history: (orderInfo: KVP) =>
    [
      'orders',
      'listing',
      'history',
      { orderInfo: { tokenId: orderInfo.tokenId, collectionAddress: orderInfo.collectionAddress.toLowerCase() } },
    ] as const,
  cardOffers: (orderInfo: KVP) =>
    [
      'orders',
      'listing',
      'offers',
      'card',
      { orderInfo: { tokenId: orderInfo.tokenId, collectionAddress: orderInfo.collectionAddress.toLowerCase() } },
    ] as const,
};

export const nftKeys = {
  all: ['nfts'] as const,
  nftInfo: (nftInfo: KVP) =>
    [
      'nfts',
      'info',
      { nftInfo: { tokenId: nftInfo.tokenId, collectionAddress: nftInfo.collectionAddress.toLowerCase() } },
    ] as const,
  nftOwner: (nftInfo: KVP, userAddress: string) =>
    [
      'nfts',
      'info',
      'owner',
      {
        nftInfo: { tokenId: nftInfo.tokenId, collectionAddress: nftInfo.collectionAddress.toLowerCase() },
        userAddress: userAddress.toLowerCase(),
      },
    ] as const,
  nftCreator: (nftInfo: KVP, userAddress: string) =>
    [
      'nfts',
      'info',
      'creator',
      {
        nftInfo: { tokenId: nftInfo.tokenId, collectionAddress: nftInfo.collectionAddress.toLowerCase() },
        userAddress: userAddress.toLowerCase(),
      },
    ] as const,
  userNfts: (userAddress: string) => ['nfts', { userAddress: userAddress.toLowerCase() }],
  fetchNftSummary: (userAddress: string) => ['nfts', 'nftsSummary', { userAddress: userAddress.toLowerCase() }],
  artistNFTs: (address: string, filters: any) => [
    'artist',
    address,
    'NFTs',
    { ...filters },
  ],
};

export const userKeys = {
  all: ['users'] as const,
  info: (userAddress: string) => ['users', 'info', { userAddress: userAddress.toLowerCase() }],
};

export const collectionKeys = {
  all: ['collections'] as const,
  info: (collectionAddress: string) => ['collections', 'collection', {collectionAddress: collectionAddress.toLowerCase()}] as const,
  centralizedInfo: (collectionAddress: string) => ['collections', 'collection', 'centralized', {collectionAddress: collectionAddress.toLowerCase()}] as const,
  datacraperInfo: (collectionAddress: string) =>  ['collections', 'collection', 'datascraper', 'info', {collectionAddress: collectionAddress.toLowerCase()}] as const,
  datascraperAdditionalInfo: (collectionAddress: string) =>  ['collections', 'collection', 'datascraper', 'additional', {collectionAddress: collectionAddress.toLowerCase()}] as const,
  datascraperGeneralInfo: (collectionAddress: string) =>  ['collections', 'collection', 'datascraper', 'general', {collectionAddress: collectionAddress.toLowerCase()}] as const,
  userCollections: (userAddress: string) =>  ['collections', 'user', {userAddress: userAddress.toLowerCase()}] as const,
  collectionOwner: (address: string) => ['collection', address, 'owner'],
  collectionStatistic: (address: string) => ['collection', address, 'statistic'],
  collectionNFTs: (address: string, filters: any = {}) => ['collection', address, 'NFTs', {...filters}]
}
