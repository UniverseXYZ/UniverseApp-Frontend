import { ICardContentState } from './types';

export const MESSAGES: Record<ICardContentState, {title: string; description: string}> = {
  didntGetBids: {
    title: 'The auction didn’t get bids on all the slots',
    description: 'You can withdraw your NFTs by clicking a button below.',
  },
  canWithdraw: {
    title: 'The auction didn’t get bids on',
    description: 'You can withdraw your NFTs by clicking a button below.',
  },
  alreadyWithdrawn: {
    title: 'The auction didn’t get bids on',
    description: 'You have already withdrawn your NFTs to your wallet.',
  },
  auctionWasCancelled: {
    title: 'The auction was cancelled',
    description: 'You can withdraw your NFTs by clicking a button below.',
  },
};
