import { ICollection, ICollectionBackend } from '../types';

export function mapBackendCollection(
  {
    createdAt,
    updatedAt,
    ...collection
  }: ICollectionBackend
): ICollection {
  return {
    ...collection,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}
