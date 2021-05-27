import React, { useState, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../assets/images/cross.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import AppContext from '../../ContextAPI';

const CreateCollectionPopup = ({ onClose }) => {
  const inputFile = useRef(null);
  const [coverImage, setCoverImage] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [description, setDescription] = useState('');
  const [inputClass, setInputClass] = useState('inp empty');
  const [shortURL, setShortURL] = useState('');

  const handleOnFocus = () => {
    setShortURL('universe.xyz/c/');
    setInputClass('inp');
  };

  const handleShortUrl = (value) => {
    setShortURL(value);
    setInputClass('inp');
  };
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
        placeholder="Enter the Collection name"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />
      <div className="token__name">
        <Input
          label="Token name"
          className="inp"
          placeholder="$ART"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <p className="token-text">Token name cannot be changed in future</p>
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
        onChange={(e) =>
          e.target.value.startsWith('universe.xyz/c/') && handleShortUrl(e.target.value)
        }
        onFocus={() => handleOnFocus()}
      />
      <div className="button__div">
        <Button className="light-button">Mint now</Button>
        <Button className="light-border-button">Save for later</Button>
      </div>
    </div>
  );
};

CreateCollectionPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateCollectionPopup;
