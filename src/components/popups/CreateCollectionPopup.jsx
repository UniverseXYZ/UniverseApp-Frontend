import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/cross.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import AppContext from '../../ContextAPI';
import { defaultColors } from '../../utils/helpers';
import { generateTokenURIForCollection } from '../../utils/api/mintNFT';

const CreateCollectionPopup = ({ onClose }) => {
  const inputFile = useRef(null);
  const [coverImage, setCoverImage] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [description, setDescription] = useState('');
  const [inputClass, setInputClass] = useState('inp empty');
  const [shortURL, setShortURL] = useState('universe.xyz/c/shorturl');

  const [errors, setErrors] = useState({ collectionName: '', tokenName: '', shorturl: '' });
  const [mintNowClick, setMintNowClick] = useState(false);

  const { deployedCollections, setDeployedCollections, myNFTs } = useContext(AppContext);

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
    }
  };

  const handleShortUrl = (value) => {
    setMintNowClick(false);
    setShortURL(value);
    setInputClass('inp');
    setErrors({
      ...errors,
      shorturl: value.length <= 15 ? '“Short URL” is not allowed to be empty' : '',
    });
    if (value.length <= 15 || value === 'universe.xyz/c/shorturl') {
      setInputClass('error-inp empty__error');
    } else {
      setInputClass('inp');
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

  const handleMinting = () => {
    setMintNowClick(true);
    if (
      !collectionName ||
      !tokenName ||
      shortURL.length <= 15 ||
      shortURL === 'universe.xyz/c/shorturl'
    ) {
      setErrors({
        collectionName: !collectionName ? '“Collection name” is not allowed to be empty' : '',
        tokenName: !tokenName ? '“Token name” is not allowed to be empty' : '',
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
      const collectionNameExists = deployedCollections.length
        ? deployedCollections.filter(
            (collection) => collection.name.toLowerCase() === collectionName.toLowerCase()
          )
        : [];
      const existsInMyNfts = myNFTs.length
        ? myNFTs.filter((nft) => nft.collectionName?.toLowerCase() === collectionName.toLowerCase())
        : [];
      if (collectionNameExists.length || existsInMyNfts.length) {
        setErrors({
          ...errors,
          collectionName: '“Collection name” already exists',
        });
      } else {
        setErrors({
          collectionName: '',
          tokenName: '',
          shorturl: '',
        });
      }
    }
  };

  useEffect(async () => {
    if (mintNowClick) {
      if (!errors.collectionName && !errors.tokenName && !errors.shorturl) {
        document.getElementById('loading-hidden-btn').click();

        const collectionURIResult = await generateTokenURIForCollection({
          file: coverImage,
          name: collectionName,
          symbol: tokenName,
          description,
          shortUrl: shortURL,
        });

        console.log(collectionURIResult);

        if (collectionURIResult?.id) {
          setDeployedCollections([
            ...deployedCollections,
            {
              id: collectionURIResult.id,
              previewImage:
                coverImage || defaultColors[Math.floor(Math.random() * defaultColors.length)],
              name: collectionName,
              tokenName,
              description,
              shortURL,
            },
          ]);
        } else {
          console.error('There was an error');
        }
      }
    }
  }, [errors]);

  return (
    <div className="create__collection">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h1>Create Collection</h1>
      <div className="collection__cover__image">
        <div className="cover__picture">
          {coverImage && typeof coverImage === 'object' ? (
            <img className="cover__image" src={URL.createObjectURL(coverImage)} alt="Cover" />
          ) : (
            <img className="cloud__icon" src={cloudIcon} alt="Cloud Icon" />
          )}
          <input
            type="file"
            hidden
            className="inp-disable"
            ref={inputFile}
            onChange={(e) => e.target.files[0] && setCoverImage(e.target.files[0])}
          />
        </div>
        <div className="cover__description">
          <h4>Cover image (opt)</h4>
          <p>min 200x200px, PNG/JPEG/GIF, max 1mb</p>
          <Button className="light-border-button" onClick={() => inputFile.current.click()}>
            Choose file
          </Button>
        </div>
      </div>
      <Input
        label="Collection name"
        className="inp"
        placeholder="Enter the collection name"
        value={collectionName}
        error={errors.collectionName}
        onChange={(e) => handleCollectionName(e.target.value)}
      />
      <div className="token__name">
        <Input
          label="Token name"
          className="inp"
          placeholder="$ART"
          value={tokenName}
          error={errors.tokenName}
          onChange={(e) => handleTokenName(e.target.value)}
        />
        {!errors.tokenName && <p className="token-text">Token name cannot be changed in future</p>}
      </div>
      <label>Description (optional)</label>
      <textarea
        className="inp"
        placeholder="Spread some words about your token collection"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        className={inputClass}
        label="Short URL"
        placeholder="universe.xyz/c/shorturl"
        value={shortURL}
        error={errors.shorturl}
        onFocus={() => handleOnFocus()}
        onBlur={() => handleOnBlur()}
        onChange={(e) =>
          e.target.value.startsWith('universe.xyz/c/') && handleShortUrl(e.target.value)
        }
      />
      <div className="button__div">
        <Button className="light-button" onClick={() => handleMinting()}>
          Create now
        </Button>
      </div>
    </div>
  );
};

CreateCollectionPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateCollectionPopup;
