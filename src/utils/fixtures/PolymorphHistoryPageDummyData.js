import uuid from 'react-uuid';
import character2 from '../../assets/images/historycharacter2.png';

export const History = [
  {
    id: uuid(),
    previewImage: {
      type: 'image/png',
      url: character2,
    },
    name: 'Charles #23',
    price: 0.01,
    data: 'Jan 30, 2021',
    time: '12:00 EST',
    firstMetadata: {
      trait: 'Headwear',
      name: 'Blue Beanie',
      chance: '30% have this trait',
    },
    lastMetadata: {
      trait: 'Headwear',
      name: 'Marine Helmet',
      chance: '58% have this trait',
    },
    morphed: true,
  },
  {
    id: uuid(),
    previewImage: {
      type: 'image/png',
      url: character2,
    },
    name: 'Charles #23',
    price: 0.01,
    data: 'Jan 30, 2021',
    time: '12:00 EST',
    firstMetadata: {
      trait: 'EYEWEAR',
      name: 'No Eyewear',
      chance: '30% have this trait',
    },
    lastMetadata: {
      trait: 'Headwear',
      name: 'Orange Sunglasses',
      chance: '58% have this trait',
    },
    morphed: true,
  },
  {
    id: uuid(),
    previewImage: {
      type: 'image/png',
      url: character2,
    },
    name: 'Charles #23',
    price: 0.01,
    data: 'Jan 30, 2021',
    time: '12:00 EST',
    firstMetadata: {
      trait: 'Headwear',
      name: 'Blue Beanie',
      chance: '30% have this trait',
    },
    lastMetadata: {
      trait: 'Headwear',
      name: 'Marine Helmet',
      chance: '58% have this trait',
    },
    morphed: false,
  },
  {
    id: uuid(),
    previewImage: {
      type: 'image/png',
      url: character2,
    },
    name: 'Goldtooth #23',
    price: 0.07,
    data: 'Jan 30, 2021',
    time: '12:00 EST',
    firstMetadata: {
      trait: 'Headwear',
      name: 'Blue Beanie',
      chance: '30% have this trait',
    },
    lastMetadata: {
      trait: 'Headwear',
      name: 'Marine Helmet',
      chance: '58% have this trait',
    },
    morphed: false,
  },
];
