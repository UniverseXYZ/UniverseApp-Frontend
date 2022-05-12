export interface ICollectionInfoResponse {
    owners: number;
    contractAddress: string;
    name: string;
}

export interface ICollectionOrderBookData {
    floorPrice: string;
    volumeTraded: string;
}
  
export interface ICollection {
    id: number;
    address: string;
    bannerUrl: string;
    coverUrl: string;
    creator: string;
    description: string;
    name: string;
    owner: string;
    publicCollection: boolean;
    instagramLink: string;
    discordLink: string;
    telegramLink: string;
    siteLink: string;
    mediumLink: string;
    shortUrl: string;
    source: string;
    symbol: string;
    txHash: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICollectionBackend extends Omit<ICollection, 'createdAt' | 'updatedAt'> {
    createdAt: string;
    updatedAt: string;
}

export interface ICollectionScrapper {
    contractAddress: string;
    createdAt: string;
    createdAtBlock: number;
    firstProcessedBlock: number;
    isProcessing: boolean;
    lastProcessedBlock: number;
    name: string;
    sentAt: string;
    tokenType: string;
    updatedAt: string;
    _id: string;
}

export interface ISearchBarDropdownCollection {
    id: string | number;
    address: string;
    name: string;
    image: string | undefined;
}