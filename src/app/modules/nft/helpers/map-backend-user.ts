import { IUser, IUserBackend } from "../../account/types";

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
