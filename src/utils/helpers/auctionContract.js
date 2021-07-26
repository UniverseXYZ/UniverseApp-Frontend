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
