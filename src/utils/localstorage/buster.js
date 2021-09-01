/* eslint-disable no-debugger */
const defaultVersion = 1.0;
const currentStorageVersion =
  parseFloat(process.env.REACT_APP_LOCALSTORAGE_VERSION) || defaultVersion;

const busterLevel = {
  ANY: 'any',
  MAJOR: 'major',
};

const storages = [
  {
    name: 'nftsPlaceholdersBuster',
    version: busterLevel.ANY,
  },
  {
    name: 'nftsPlaceholders',
    version: busterLevel.ANY,
  },
];

const setVersion = (v) => localStorage.setItem('localstorageVersion', JSON.stringify(v));
const getversion = () => parseFloat(localStorage.getItem('localstorageVersion'));

const getUpdateType = (v1, v2) =>
  parseInt(v2, 10) - parseInt(v1, 10) > 0 ? busterLevel.MAJOR : busterLevel.ANY;

export const storageBuster = () => {
  const appStorageVersion = getversion() || defaultVersion;

  if (appStorageVersion < currentStorageVersion) {
    const updateType = getUpdateType(appStorageVersion, currentStorageVersion);

    const storageMustBeUpdated = (ver) => ver === updateType || ver === busterLevel.ANY;

    storages.forEach(
      (storage) => storageMustBeUpdated(storage.version) && localStorage.removeItem(storage.name)
    );

    setVersion(currentStorageVersion);
  }
};
