import { IOrder, IOrderBackend } from '../types';

export function mapBackendOrder(
  {
    salt,
    start,
    end,
    createdAt,
    updatedAt,
    ...order
  }: IOrderBackend
): IOrder {
  return {
    ...order,
    salt: +salt,
    start: +start,
    end: +end,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}
