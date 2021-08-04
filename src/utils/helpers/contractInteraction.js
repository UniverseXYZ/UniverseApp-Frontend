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

export const parseRoyalties = (royalties) => {
  const parsedRoyalties = [];

  royalties?.forEach((royalty) => {
    if (royalty.address && royalty.amount)
      parsedRoyalties.push({
        address: royalty.address,
        amount: parseInt(royalty.amount, 10),
      });
  });
  return parsedRoyalties;
};

export const formatRoyaltiesForMinting = (royalties) =>
  royalties.map((royalty) =>
    royalty.address && royalty.amount ? [royalty.address, royalty.amount * 100] : []
  );

export const parseProperties = (properties) => {
  const parsedProperties = [];
  properties.forEach((property) => {
    if (property.name && property.value) parsedProperties.push({ [property.name]: property.value });
  });
  return parsedProperties;
};

export const parsePropertiesForFrontEnd = (properties) => {
  const parsedProperties = [];

  properties?.forEach((property) => {
    const key = Object.keys(property)[0];
    parsedProperties.push({ name: key, value: property[key] });
  });
  return parsedProperties;
};
