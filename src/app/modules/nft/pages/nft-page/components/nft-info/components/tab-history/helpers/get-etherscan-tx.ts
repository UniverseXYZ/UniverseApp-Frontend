export const getEtherScanTx = (transactionId: string) => {
  return `https://rinkeby.etherscan.io/tx/${transactionId}`;
}
