import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import Input from '../../input/Input.jsx';
import Button from '../../button/Button.jsx';
import uploadIcon from '../../../assets/images/ion_cloud.svg';
import closeIcon from '../../../assets/images/close-menu.svg';
import plusIcon from '../../../assets/images/plus.svg';
import bigPlusGradientIcon from '../../../assets/images/Union.svg';
import errorIcon from '../../../assets/images/error-icon.svg';
import AppContext from '../../../ContextAPI.js';
import NFTCollectible from './NFTCollectible.jsx';

const NFTCollectionSettings = ({ showCollectible, setShowCollectible }) => {
  const {
    setShowModal,
    savedCollections,
    savedNfts,
    savedCollectionID,
    myNFTs,
    setMyNFTs,
    deployedCollections,
    setDeployedCollections,
  } = useContext(AppContext);

  const inputFile = useRef(null);

  const [coverImage, setCoverImage] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [description, setDescription] = useState('');
  const [shortURL, setShortURL] = useState('universe.xyz/c/shorturl');
  const [inputClass, setInputClass] = useState('inp empty');
  const [collectionNFTs, setCollectionNFTs] = useState([]);

  const [errors, setErrors] = useState({
    coverImage: '',
    collectionName: '',
    tokenName: '',
    collectible: '',
    shorturl: '',
  });

  const [mintNowClick, setMintNowClick] = useState(false);

  const validateFile = (file) => {
    setMintNowClick(false);
    if (!file) {
      setCoverImage(null);
      setErrors({
        ...errors,
        coverImage: 'File format must be PNG, JPEG, GIF (Max Size: 1mb)',
      });
    } else if (
      (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png') &&
      file.size / 1048576 < 1
    ) {
      setCoverImage(file);
      setErrors({ ...errors, coverImage: '' });
    } else {
      setCoverImage(null);
      setErrors({
        ...errors,
        coverImage: 'File format must be PNG, JPEG, GIF (Max Size: 1mb)',
      });
    }
  };

  const handleCollectionName = (value) => {
    setMintNowClick(false);
    setCollectionName(value);
    setErrors({
      ...errors,
      collectionName: !value ? '“Collection name” is not allowed to be empty' : '',
    });
  };

  const handleTokenName = (value) => {
    setMintNowClick(false);
    setTokenName(value);
    setErrors({
      ...errors,
      tokenName: !value ? '“Token name” is not allowed to be empty' : '',
    });
  };

  const handleShortUrl = (value) => {
    setMintNowClick(false);
    setShortURL(value);
    setErrors({
      ...errors,
      shorturl: value.length <= 15 ? '“Short URL” is not allowed to be empty' : '',
    });
    if (value.length <= 15 || value === 'universe.xyz/c/shorturl') {
      setInputClass('empty__error');
    } else {
      setInputClass('inp');
    }
  };

  const handleOnFocus = () => {
    if (shortURL === 'universe.xyz/c/shorturl') {
      setShortURL('universe.xyz/c/');
      setInputClass('inp');
    }
  };

  const handleOnBlur = () => {
    if (shortURL === 'universe.xyz/c/') {
      setShortURL('universe.xyz/c/shorturl');
      setInputClass('error-inp empty__error');
      setErrors({
        ...errors,
        shorturl: '“Short URL” is not allowed to be empty',
      });
    }
  };

  const handleShowCollectible = () => {
    setMintNowClick(false);
    if (
      !collectionName ||
      !tokenName ||
      shortURL.length <= 15 ||
      shortURL === 'universe.xyz/c/shorturl'
    ) {
      setErrors({
        collectionName: !collectionName ? '“Collection name” is not allowed to be empty' : '',
        tokenName: !tokenName ? '“Token name” is not allowed to be empty' : '',
        collectible: '',
        shorturl:
          shortURL.length <= 15 || shortURL === 'universe.xyz/c/shorturl'
            ? '“Short URL” is not allowed to be empty'
            : '',
      });
      if (errors.shorturl.length > 0 || shortURL === 'universe.xyz/c/shorturl') {
        setInputClass('empty__error');
      } else {
        setInputClass('inp');
      }
    } else {
      const collectionNameExists = deployedCollections.filter(
        (collection) => collection.name.toLowerCase() === collectionName.toLowerCase()
      );
      if (collectionNameExists.length && !savedCollectionID) {
        setErrors({
          ...errors,
          collectionName: '“Collection name” already exists',
        });
      } else {
        setErrors({
          collectionName: '',
          tokenName: '',
          collectible: '',
          shorturl: '',
        });
        setShowCollectible(true);
      }
    }
  };

  return !showCollectible ? (
    <div className="nft--collection--settings--page">
      <h1 className="nft--collection--settings--page--title">NFT collection settings</h1>
      <div className="image--name--token">
        <div className="collection--cover--image">
          <div className={`collection--cover--image--circle ${coverImage ? 'border--none' : ''}`}>
            {!coverImage ? (
              <div
                className="image--not--selected"
                onClick={() => inputFile.current.click()}
                aria-hidden="true"
              >
                <img src={uploadIcon} alt="Upload" />
                <p>Cover image(min 200x200px,PNG/JPEG/GIF,max 1mb)</p>
                <input
                  type="file"
                  ref={inputFile}
                  onChange={(e) => validateFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="image--selected">
                <img
                  className="cover"
                  src={URL.createObjectURL(coverImage)}
                  alt="Collection cover"
                />
                <div
                  className="remove--selected--image"
                  onClick={() => setCoverImage(null)}
                  aria-hidden="true"
                >
                  <img src={closeIcon} alt="Close" />
                </div>
              </div>
            )}
          </div>
          {errors.coverImage && <p className="error-message">{errors.coverImage}</p>}
        </div>
        <div className="collection--name--and--token">
          <div className="collection--name">
            <Input
              label="Collection name"
              error={errors.collectionName}
              placeholder="Enter the collection name"
              onChange={(e) => handleCollectionName(e.target.value)}
              value={collectionName}
            />
          </div>
          <div className="collection--token">
            <Input
              label="Token name"
              error={errors.tokenName}
              placeholder="$ART"
              onChange={(e) => handleTokenName(e.target.value)}
              value={tokenName}
            />
            {!errors.tokenName && <p className="warning">Token name cannot be changed in future</p>}
          </div>
        </div>
      </div>
      <div className="collection--description">
        <label>
          Description <span>(optional)</span>
        </label>
        <textarea
          placeholder="Spread some words about your collection"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="collection--short--url">
        <Input
          label="Short URL"
          className={inputClass}
          error={errors.shorturl}
          placeholder="universe.xyz/c/shorturl"
          value={shortURL}
          onChange={(e) =>
            e.target.value.startsWith('universe.xyz/c/') && handleShortUrl(e.target.value)
          }
          onFocus={() => handleOnFocus()}
          onBlur={() => handleOnBlur()}
        />
      </div>
      <div className="collection--nfts">
        <div className="collection--nfts--title">
          <h1>NFTs</h1>
          {collectionNFTs.length ? (
            <Button className="light-border-button">
              Create NFT
              <img src={plusIcon} alt="Plus" />
            </Button>
          ) : (
            <></>
          )}
        </div>
        {!collectionNFTs.length ? (
          <div
            className="create--nft--special--btn"
            onClick={handleShowCollectible}
            aria-hidden="true"
          >
            <div className="plus-icon">
              <img src={bigPlusGradientIcon} alt="Big gradient plus" />
            </div>
            <div className="collection-t">
              <p>Create NFT</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        {errors.collectible && <p className="error-message">{errors.collectible}</p>}
        {(errors.collectionName || errors.tokenName || errors.tokenName || errors.shorturl) && (
          <div className="collection--final--error">
            <img src={errorIcon} alt="error" />
            <p>
              Something went wrong. Please fix the errors in the fields above and try again. The
              button will be enabled after information has been entered into the fields.
            </p>
          </div>
        )}
      </div>
      <div className="create--collection--btn">
        <Button
          className="light-button"
          disabled={!collectionName || !tokenName || !shortURL || !collectionNFTs.length}
        >
          Create collection
        </Button>
      </div>
    </div>
  ) : (
    <NFTCollectible />
  );
};

NFTCollectionSettings.propTypes = {
  showCollectible: PropTypes.bool.isRequired,
  setShowCollectible: PropTypes.func.isRequired,
};

export default NFTCollectionSettings;
