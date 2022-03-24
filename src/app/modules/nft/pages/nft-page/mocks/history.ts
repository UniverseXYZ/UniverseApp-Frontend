import { HistoryType } from '../enums';

export const History: Array<{
  type: HistoryType,
  user: {
    name: string;
  },
  addedAt: Date;
  expiredAt?: Date;
  price: number;
  transactionId: string;
}> = [
  {
    type: HistoryType.BID,
    user: {
      name: 'Cryptopoasd',
    },
    addedAt: new Date(),
    price: 0.05,
    transactionId: `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`,
  },
  {
    type: HistoryType.BOUGHT,
    user: {
      name: 'dominixz',
    },
    addedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    price: 0.05,
    transactionId: `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`,
  },
  {
    type: HistoryType.MINTED,
    user: {
      name: 'CryptoX',
    },
    addedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    price: 0.05,
    transactionId: `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`,
  },
  {
    type: HistoryType.PUT_ON_SALE,
    user: {
      name: 'Cryptopoasd',
    },
    addedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    price: 0.05,
    transactionId: `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`,
  },
  {
    type: HistoryType.LISTED,
    user: {
      name: 'CryptoCartel',
    },
    addedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    price: 0.05,
    transactionId: `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`,
  },
  {
    type: HistoryType.OFFER,
    user: {
      name: 'CryptoCartel',
    },
    addedAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    expiredAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    price: 0.05,
    transactionId: `${process.env.REACT_APP_MARKETPLACE_CONTRACT}`,
  },
];
