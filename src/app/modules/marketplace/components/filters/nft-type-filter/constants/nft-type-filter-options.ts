import { INftTypeFilterOptions } from '../types';

export const NftTypeFilterOptions: INftTypeFilterOptions[] = [
  {
    name: 'NFT type',
    options: [
      {
        key: 'singleItem',
        label: 'Single item',
      },
      {
        key: 'bundle',
        label: 'Bundle',
      },
      {
        key: 'composition',
        label: 'Composition',
      },
    ],
  },
  {
    name: 'File format',
    options: [
      {
        key: 'stillImage',
        label: 'Still image',
      },
      {
        key: 'gif',
        label: 'GIF',
      },
      {
        key: 'audio',
        label: 'Audio',
      },
      {
        key: 'video',
        label: 'Video',
      },
    ],
  },
];
