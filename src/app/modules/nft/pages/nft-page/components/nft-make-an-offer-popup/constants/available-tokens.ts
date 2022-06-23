import { TOKENS, TOKENS_MAP } from '@app/constants';

export const AVAILABLE_TOKENS = TOKENS.filter((token) => ![TOKENS_MAP.ETH.ticker].includes(token.ticker));
