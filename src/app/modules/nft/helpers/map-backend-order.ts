import { IOrder, IOrderBackend } from '../types';

export function mapBackendOrder(
  {
    createdAt,
    updatedAt,
    ...order
  }: IOrderBackend
): IOrder {
  return {
    ...order,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}
