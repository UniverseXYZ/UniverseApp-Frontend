import { IUser, IUserBackend } from '../types';

export function mapBackendUser(
  {
    createdAt,
    ...user
  }: IUserBackend
): IUser {
  return {
    ...user,
    createdAt: new Date(createdAt),
  };
}
