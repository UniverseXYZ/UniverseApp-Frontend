import { fees } from './fees';

export const totalFee = Object.keys(fees).reduce((acc, key) => (acc + fees[key]), 0);
