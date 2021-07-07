import uuid from 'react-uuid';
import image1 from '../../assets/images/Ellipse 1144.svg';
import image2 from '../../assets/images/Ellipse 1145.svg';
import image3 from '../../assets/images/Ellipse 1146.svg';
import image4 from '../../assets/images/Ellipse 1147.svg';

export const shareFriends = [
  {
    id: uuid(),
    userAvatar: {
      type: 'image/svg',
      url: image1,
    },
    name: 'Friend Name',
  },
  {
    id: uuid(),
    userAvatar: {
      type: 'image/svg',
      url: image2,
    },
    name: 'Friend Name',
  },
  {
    id: uuid(),
    userAvatar: {
      type: 'image/svg',
      url: image3,
    },
    name: 'Friend Name',
  },
  {
    id: uuid(),
    userAvatar: {
      type: 'image/svg',
      url: image4,
    },
    name: 'Friend Name',
  },
  {
    id: uuid(),
    userAvatar: {
      type: 'image/svg',
      url: image4,
    },
    name: 'Friend Name',
  },
  {
    id: uuid(),
    userAvatar: {
      type: 'image/svg',
      url: image4,
    },
    name: 'Friend Name',
  },
];
