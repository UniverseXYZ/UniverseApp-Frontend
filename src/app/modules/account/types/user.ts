export interface IUser {
    id?: number;
    about?: string;
    address: string;
    createdAt?: Date;
    displayName?: string;
    instagramUser?: string;
    logoImageUrl?: string;
    profileImageUrl?: string;
    twitterUser?: string;
    universePageUrl?: string;
}

export interface IUserOwnedCollection {
    name: string;
    contractAddress: string;
}

export interface IUserBackend extends Omit<IUser, 'createdAt'> {
    createdAt: string;
}