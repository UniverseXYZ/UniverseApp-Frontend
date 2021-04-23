import uuid from 'react-uuid';
import testVideo from '../../assets/images/file_example_MP4_480_1_5MG.mp4';
import testImage from '../../assets/images/ntf3.svg';
import testCollectionAvatar from '../../assets/images/test-collection-avatar.svg';

export const PLACEHOLDER_NFTS = [
  {
    id: uuid(),
    type: 'single',
    previewImage: {
      type: 'image/png',
      url: testImage,
    },
    name: 'Single NFT 1',
    description: '',
    numberOfEditions: 4,
    generatedEditions: ['d185321', '0dba1ca', '1ae4abe', '7ced408'],
  },
  {
    id: uuid(),
    type: 'single',
    previewImage: {
      type: 'video/mp4',
      url: testVideo,
    },
    name: 'Single NFT 2',
    description: '',
    numberOfEditions: 1,
    generatedEditions: ['1da2cd7'],
  },
  {
    id: uuid(),
    type: 'collection',
    collectionId: 'Collection1',
    collectionName: 'Collection1',
    collectionAvatar: testCollectionAvatar,
    previewImage: {
      type: 'image/png',
      url: testImage,
    },
    name: 'Collection1 NFT 1',
    description: '',
    numberOfEditions: 7,
    generatedEditions: ['113277', 'bbb7c61', 'eb74cc', '5e5f2d', 'd00816', '2e1c1f0', '38d1874'],
  },
  {
    id: uuid(),
    type: 'collection',
    collectionId: 'Collection1',
    collectionName: 'Collection1',
    collectionAvatar: testCollectionAvatar,
    previewImage: {
      type: 'video/mp4',
      url: testVideo,
    },
    name: 'Collection1 NFT 2',
    description: '',
    numberOfEditions: 1,
    generatedEditions: ['7cf8e10'],
  },
  {
    id: uuid(),
    type: 'collection',
    collectionId: 'Collection1',
    collectionName: 'Collection1',
    collectionAvatar: testCollectionAvatar,
    previewImage: {
      type: 'image/png',
      url: testImage,
    },
    name: 'Collection1 NFT 3',
    description: '',
    numberOfEditions: 3,
    generatedEditions: ['58befd', 'f47a0fa', '036bef8'],
  },
];
