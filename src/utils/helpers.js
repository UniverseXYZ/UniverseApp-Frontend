export const handleClickOutside = (event, className, ref, cb) => {
  if (!event.target.classList.contains(className)) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb(false);
    }
  }
};

export const handleScroll = (darkMode) => {
  if (window.scrollY > 0) {
    if (document.querySelector('header')) {
      // document.querySelector('header').style.position = 'fixed';
      document.querySelector('header').classList.remove('dark');
    }
  } else if (window.scrollY <= 0) {
    if (document.querySelector('header')) {
      // document.querySelector('header').style.position = 'relative';
      if (darkMode) {
        document.querySelector('header').classList.add('dark');
      } else {
        document.querySelector('header').classList.remove('dark');
      }
    }
  }
};

export const isEmpty = (obj) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export const defaultColors = [
  '#FFCCBC',
  '#FFCDD2',
  '#F8BBD0',
  '#E1BEE7',
  '#D1C4E9',
  '#C5CAE9',
  '#BBDEFB',
  '#B3E5FC',
  '#B3E5FC',
  '#B2DFDB',
  '#C8E6C9',
  '#DCEDC8',
  '#F0F4C3',
  '#FFF9C4',
  '#FFECB3',
  '#FFE0B2',
  '#FFCCBC',
  '#D7CCC8',
];

export const getCollectionBackgroundColor = (collection) =>
  defaultColors[
    Math.floor((collection?.id * collection?.name.charCodeAt(0)) % defaultColors.length)
  ];

export const mapUserData = (userInfo) => {
  const map = {
    id: userInfo.id,
    name: userInfo.displayName,
    universePageAddress: userInfo.universePageUrl,
    avatar: userInfo.profileImageUrl,
    about: userInfo.about,
    personalLogo: userInfo.logoImageUrl,
    instagramLink: userInfo.instagramUser,
    twitterLink: userInfo.twitterUser,
  };
  return map;
};

export const auctionPageTierImageErrorMessage =
  'File format must be PNG or JPEG (Max Size: 30mb) and at least 800X800px ';
export const auctionPageBackgroundImageErrorMessage =
  'File format must be PNG or JPEG (Max Size: 30mb) and at least 1280X720px ';
export const auctionPagePromoImageErrorMessage =
  'File format must be PNG or JPEG (Max Size: 30mb) and at least 1080X1080px ';
export const whitepaperUrl = 'https://github.com/UniverseXYZ/UniverseXYZ-Whitepaper';
