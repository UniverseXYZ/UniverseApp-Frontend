export const Bids: Array<{
  user: {
    name: string;
    photo: string;
  },
  price: number;
  addedAt: Date;
  expiredAt: Date;
}> = [
  {
    user: {
      name: 'dominixz',
      photo: 'https://universeapp-assets-dev.s3.amazonaws.com/profiles/e9abc7b23adb37e6de8c1c3c10539f41a49e5bed6e1bf36a.jpeg',
    },
    price: 0.6,
    addedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    expiredAt: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  {
    user: {
      name: 'Collector',
      photo: 'https://universeapp-assets-dev.s3.amazonaws.com/profiles/aa20d18b696ce559e9525176bece189c4777118f2afe8d31.jpeg',
    },
    price: 0.9,
    addedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    expiredAt: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    user: {
      name: 'Roger Kilimanjaro',
      photo: 'https://universeapp-assets-dev.s3.amazonaws.com/profiles/61a619a534c063a2ad4b3fad3fdacd7a99a7a2773cbefb03.jpeg',
    },
    price: 0.37,
    addedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    expiredAt: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  {
    user: {
      name: 'RedPixelOrganicholas',
      photo: 'https://universeapp-assets-dev.s3.amazonaws.com/profiles/e9abc7b23adb37e6de8c1c3c10539f41a49e5bed6e1bf36a.jpeg',
    },
    price: 0.8,
    addedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    expiredAt: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
];
