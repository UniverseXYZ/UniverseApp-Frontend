export const getEtherScanAddress = (transactionId: string) => {
  return `https://rinkeby.etherscan.io/address/${transactionId}`;
}
