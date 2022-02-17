export const getLocationSearchObj = (search: string) =>  {
  const pairs = search.substring(1).split('&');
  const obj: Record<string, number | string> = {};

  let pair;
  let i;

  for (i in pairs) {
    if (pairs[i] === '') {
      continue;
    }

    pair = pairs[i].split('=');
    obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return obj;
}
