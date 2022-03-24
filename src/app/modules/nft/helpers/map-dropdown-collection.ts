import { ISearchBarDropdownCollection, ICollectionScrapper } from '../types';

export function mapDropdownCollection(
    collection: ICollectionScrapper
): ISearchBarDropdownCollection {
  return {
    id: collection._id,
    address: collection.contractAddress,
    name: collection.name,
    image: undefined,
  };
}
