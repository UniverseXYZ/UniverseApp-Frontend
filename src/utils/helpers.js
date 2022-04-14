import { useThemeStore } from "src/stores/themeStore";

export const handleClickOutside = (event, className, ref, cb) => {
  if (!event.target.classList.contains(className)) {
    if (ref.current && !ref.current.contains(event.target)) {
      cb(false);
    }
  }
};

export const handleScroll = () => {
  const darkMode = useThemeStore.getState().darkMode;

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

const getRandomInt = (max) => Math.floor(Math.random() * max);

export const getCollectionBackgroundColor = (collection) => {
  if (!collection?.address) {
    const r = getRandomInt(defaultColors.length);
    return defaultColors[r];
  }

  return defaultColors[
    Math.floor(
      (collection?.id * collection?.address.charCodeAt(collection?.address.length - 1)) %
        defaultColors.length
    )
  ];
};

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

export const sanitizeUrlString = (url) => url.toLowerCase().replace(/[^._a-z0-9]+/g, '-');

export const getEtherscanContractUrl = (address) =>
  `${process.env.REACT_APP_ETHERSCAN_URL}/address/${address}`;

export const getEtherscanTxUrl = (txHash) => `${process.env.REACT_APP_ETHERSCAN_URL}/tx/${txHash}`;
