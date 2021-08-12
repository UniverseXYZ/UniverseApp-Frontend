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

export const parseRoyalties = (royalties) =>
  royalties
    ?.filter((r) => r.address && r.amount)
    .map((r) => ({
      address: r.address,
      amount: parseInt(r.amount, 10),
    }));

export const formatRoyaltiesForMinting = (royalties) =>
  royalties?.map((royalty) =>
    royalty.address && royalty.amount ? [royalty.address, royalty.amount * 100] : []
  );

export const parseProperties = (properties) =>
  properties?.filter((p) => p.name && p.value).map((p) => ({ [p.name]: p.value }));

const getPropertyKey = (p) => Object.keys(p)[0];
export const parsePropertiesForFrontEnd = (properties) =>
  properties?.map((p) => ({ name: getPropertyKey(p), value: p[getPropertyKey(p)] }));
