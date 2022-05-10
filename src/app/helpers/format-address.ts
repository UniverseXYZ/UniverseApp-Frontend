export const formatAddress = (
  address: string | null,
  startSymbols: number = 6,
  endSymbols: number = 4
) => {
  if (!address) {
    return '';
  }

  return `${address.slice(0, startSymbols)}...${address.slice(address.length - endSymbols, address.length)}`;
}
