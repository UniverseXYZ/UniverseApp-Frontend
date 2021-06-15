import uuid from 'react-uuid';
import testImage from '../../assets/images/ntf3.svg';

export const UNIVERSE_NFTS = [
  {
    id: uuid(),
    type: 'single',
    previewImage: {
      type: 'image/png',
      url: testImage,
    },
    name: 'Polymorph',
    description: '',
    numberOfEditions: 4,
  },
  {
    id: uuid(),
    type: 'single',
    previewImage: {
      type: 'image/png',
      url: testImage,
    },
    name: 'Polymorph',
    description: '',
    numberOfEditions: 1,
  },
];
