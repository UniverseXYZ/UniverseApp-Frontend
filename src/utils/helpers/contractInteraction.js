// TODO:: Rename this file !
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

/**
 * @param {Object[]} royalties
 * @param {string} royalties.address
 * @param {string} royalties.amount
 * @returns [{ address: ${'address'}, amount: ${amount}}] - removes entries with missing data
 */
export const parseRoyalties = (royalties, amountPropertyName) =>
  royalties
    ?.filter((r) => r.address && r.amount)
    .map((r) => ({
      address: r.address,
      [amountPropertyName || 'amount']: Number(r.amount),
    }));

/**
 * @param {Object[]} royalties
 * @param {string} royalties.address
 * @param {string} royalties.amount
 * @returns [[${'address'}, ${amount}]]
 */
export const formatRoyaltiesForMinting = (royalties) =>
  royalties?.map((royalty) =>
    royalty.address && royalty.amount ? [royalty.address, Math.round(royalty.amount * 100)] : []
  );

export const parseProperties = (properties) =>
  properties?.filter((p) => p.name && p.value).map((p) => ({ [p.name]: p.value }));

const getPropertyKey = (p) => Object.keys(p)[0];
export const parsePropertiesForFrontEnd = (properties) =>
  properties?.map((p) => ({ name: getPropertyKey(p), value: p[getPropertyKey(p)] }));
