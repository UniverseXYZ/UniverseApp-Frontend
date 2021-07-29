export function chunkifyArray(nftsArr, chunkSize) {
  const chunkifiedArray = [];
  let tokenStartIndex = 0;
  let tokenEndIndex = nftsArr.length % chunkSize;

  do {
    if (tokenEndIndex !== 0) chunkifiedArray.push(nftsArr.slice(tokenStartIndex, tokenEndIndex));

    tokenStartIndex = tokenEndIndex;
    tokenEndIndex = tokenStartIndex + chunkSize;
  } while (tokenStartIndex < nftsArr.length);

  return chunkifiedArray;
}

export const parseRoyalties = (royaltyAddress) =>
  royaltyAddress.map((royalty) => ({
    address: royalty.address,
    amount: parseInt(royalty.amount, 10),
  }));

export const formatRoyaltiesForMinting = (royalties) =>
  royalties.map((royalty) =>
    royalty.address && royalty.amount ? [royalty.address, royalty.amount * 100] : []
  );
