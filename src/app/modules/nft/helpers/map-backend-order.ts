import { IOrder, IOrderBackend } from '../types';

type IMapBackendOrderFn = <M, T>(data: IOrderBackend<M, T>) => IOrder<M, T>;

export const mapBackendOrder: IMapBackendOrderFn = (data) => {
  const {
    salt,
    start,
    end,
    createdAt,
    updatedAt,
    ...order
  } = data;

  return {
    ...order,
    salt: +salt,
    start: +start,
    end: +end,
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
  };
}
