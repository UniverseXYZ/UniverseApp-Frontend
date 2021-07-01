import { BigNumber } from 'ethers';
import cover from '../../assets/images/cover.png';

export const POLYMORPH_BASE_URI =
  'https://us-central1-polymorphmetadata.cloudfunctions.net/images-function?id=';

export const getScrambleStatus = (scrambleEvents) => {
  // Check if there is only one event - this means the badge is Virgin
  if (scrambleEvents.length === 1 && scrambleEvents[0].oldGene === '0') {
    return 'never';
  }
  // Check if we have more than 1 morph events
  if (scrambleEvents.length > 1) {
    // if we have two events and the second one is full scramble, there is no badge
    if (
      scrambleEvents.length === 2 &&
      scrambleEvents[1].oldGene.substring(0, 58) !== scrambleEvents[1].newGene.substring(0, 58)
    ) {
      return 'none';
    }
    let singleScramble = true;
    for (let i = 2; i < scrambleEvents.length; i += 1) {
      // Otherwise check every next event price - if it is bigger, this means this is a single trait morph
      // If we reach an event where the price is equal or smaller, this means it was a full scramble, so there is no S badge
      if (BigNumber.from(scrambleEvents[i - 1].price) >= BigNumber.from(scrambleEvents[i].price)) {
        singleScramble = false;
      }
    }
    if (singleScramble) {
      return 'single';
    }
  }
  return 'none';
};
const extractTokenIdFromURI = (tokenURI) =>
  tokenURI.substring(POLYMORPH_BASE_URI.length, tokenURI.length);

export const convertPolymorphObjects = (nftMetadataObjects) =>
  nftMetadataObjects.map((nft) => ({
    id: extractTokenIdFromURI(nft?.config?.url),
    type: 'collection',
    previewImage: {
      type: 'image/jpg',
      url: nft?.data?.image,
    },
    name: nft?.data?.name,
    collectionAvatar: cover,
    collectionName: 'Universe Polymorphs',
  }));
