import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import { useLocation } from 'react-router-dom';
import './CreateSingleNft.scss';
import EthereumAddress from 'ethereum-address';
import Button from '../../button/Button.jsx';
import Input from '../../input/Input.jsx';
import AppContext from '../../../ContextAPI';
import LoadingPopup from '../../popups/LoadingPopup.jsx';
import CongratsPopup from '../../popups/CongratsPopup.jsx';
import arrow from '../../../assets/images/arrow.svg';
import infoIcon from '../../../assets/images/icon.svg';
import defaultImage from '../../../assets/images/default-img.svg';
import deleteIcon from '../../../assets/images/delred-icon.svg';
import mp3Icon from '../../../assets/images/mp3-icon.png';
import addIcon from '../../../assets/images/Add.svg';
import cloudIcon from '../../../assets/images/gray_cloud.svg';
import createIcon from '../../../assets/images/create.svg';
import delIcon from '../../../assets/images/red-delete.svg';
import closeIcon from '../../../assets/images/cross-sidebar.svg';
import redIcon from '../../../assets/images/red-msg.svg';
import CreateCollectionPopup from '../../popups/CreateCollectionPopup.jsx';

const SingleNFTSettings = () => {
  const {
    savedNfts,
    setSavedNfts,
    setShowModal,
    savedNFTsID,
    myNFTs,
    setMyNFTs,
    deployedCollections,
  } = useContext(AppContext);
  const [errors, setErrors] = useState({
    name: '',
    edition: '',
    previewImage: '',
  });
  const location = useLocation();

  const [saveForLateClick, setSaveForLateClick] = useState(false);
  const [mintNowClick, setMintNowClick] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editions, setEditions] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [hideIcon, setHideIcon] = useState(false);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideRoyalitiesInfo, setHideRoyalitiesInfo] = useState(false);
  const [percentAmount, setPercentAmount] = useState('');
  const [royalities, setRoyalities] = useState(true);
  const [propertyCheck, setPropertyCheck] = useState(true);
  const inputFile = useRef(null);
  const [properties, setProperties] = useState([{ name: '', value: '' }]);
  const [royaltyAddress, setRoyaltyAddress] = useState([{ address: '', amount: '' }]);

  const [royaltyValidAddress, setRoyaltyValidAddress] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [amountSum, setAmountSum] = useState(0);
  const [showCongratsPopup, setShowCongratsPopup] = useState(false);

  const handleInputChange = (val) => {
    if (!val || val.match(/^\d{1,}(\.\d{0,4})?$/)) {
      if (val <= 100) {
        setPercentAmount(val);
      }
    }
  };

  const removeProperty = (index) => {
    const temp = [...properties];
    temp.splice(index, 1);
    setProperties(temp);
  };

  const removeRoyaltyAddress = (index) => {
    const temp = [...royaltyAddress];
    temp.splice(index, 1);
    setRoyaltyAddress(temp);
  };

  const addProperty = () => {
    const newProperties = [...properties];
    const temp = { name: '', value: '' };
    newProperties.push(temp);
    setProperties(newProperties);
  };

  const addRoyaltyAddress = () => {
    const newProperties = [...royaltyAddress];
    const temp = { address: '', amount: '' };
    newProperties.push(temp);
    setRoyaltyAddress(newProperties);
  };

  const propertyChangesAddress = (index, val) => {
    const prevProperties = [...royaltyAddress];
    prevProperties[index].address = val;
    setRoyaltyAddress(prevProperties);
  };

  const propertyChangesAmount = (index, val, inp) => {
    if (val) {
      inp.classList.add('withsign');
    } else {
      inp.classList.remove('withsign');
    }
    const result = royaltyAddress.reduce(
      (accumulator, current) => accumulator + Number(current.amount),
      0
    );
    if (result + Number(val) <= 100 && val >= 0) {
      const newProperties = royaltyAddress.map((property, propertyIndex) => {
        if (propertyIndex === index) {
          return {
            ...property,
            amount: val,
          };
        }

        return property;
      });
      setRoyaltyAddress(newProperties);
    }
  };

  const propertyChangesName = (index, val) => {
    const newProperties = [...properties];
    newProperties[index].name = val;
    setProperties(newProperties);
  };

  const propertyChangesValue = (index, value) => {
    const newProperties = [...properties];
    newProperties[index].value = value;
    setProperties(newProperties);
  };

  const handleSaveForLater = () => {
    setMintNowClick(false);
    setSaveForLateClick(true);
    setErrors({
      name: !name ? '“Name” is not allowed to be empty' : '',
      edition: !editions ? '“Number of editions” is required' : '',
      previewImage: !previewImage ? '“File” is required' : null,
    });
  };

  const handleMinting = () => {
    setSaveForLateClick(false);
    setMintNowClick(true);
    setErrors({
      name: !name ? '“Name” is not allowed to be empty' : '',
      edition: !editions ? '“Number of editions” is required' : '',
      previewImage: !previewImage ? '“File” is required' : null,
    });
  };

  const validateFile = (file) => {
    setSaveForLateClick(false);
    setMintNowClick(false);
    if (!file) {
      setPreviewImage(null);
      setErrors({
        ...errors,
        previewImage: 'File format must be PNG, GIF, WEBP, MP4 or MP3 (Max Size: 30mb)',
      });
    } else if (
      (file.type === 'audio/mpeg' ||
        file.type === 'video/mp4' ||
        file.type === 'image/webp' ||
        file.type === 'image/gif' ||
        file.type === 'image/png') &&
      file.size / 1048576 < 30
    ) {
      setPreviewImage(file);
      setErrors({ ...errors, previewImage: '' });
    } else {
      setPreviewImage(null);
      setErrors({
        ...errors,
        previewImage: 'File format must be PNG, GIF, WEBP, MP4 or MP3 (Max Size: 30mb)',
      });
    }
  };

  const validateEdition = (e) => {
    const value = e.target.value.replace(/[^\d]/, '');
    if (parseInt(value, 10) !== 0) {
      setEditions(value);
    }
  };

  // useEffect(() => {
  //   console.log([...royaltyAddress]);
  //   const result = [...royaltyAddress].reduce(
  //     (accumulator, current) => accumulator + Number(current.amount),
  //     0
  //   );
  //   setAmountSum(result);
  // }, [propertyChangesAmount]);

  const closeCongratsPopupEvent = () => {
    const mintingGeneratedEditions = [];

    for (let i = 0; i < editions; i += 1) {
      mintingGeneratedEditions.push(uuid().split('-')[0]);
    }
    if (selectedCollection) {
      setMyNFTs([
        ...myNFTs,
        {
          id: uuid(),
          type: 'collection',
          collectionId: selectedCollection.id,
          collectionName: selectedCollection.name,
          collectionAvatar: selectedCollection.previewImage,
          collectionDescription: selectedCollection.description,
          shortURL: selectedCollection.shortURL,
          tokenName: selectedCollection.tokenName,
          previewImage,
          name,
          description,
          numberOfEditions: Number(editions),
          generatedEditions: mintingGeneratedEditions,
          properties,
          percentAmount,
          releasedDate: new Date(),
        },
      ]);
    } else {
      setMyNFTs([
        ...myNFTs,
        {
          id: uuid(),
          type: 'single',
          previewImage,
          name,
          description,
          numberOfEditions: Number(editions),
          generatedEditions: mintingGeneratedEditions,
          properties,
          percentAmount,
          releasedDate: new Date(),
        },
      ]);
    }
    setShowModal(false);
    document.body.classList.remove('no__scroll');
  };

  useEffect(() => {
    if (savedNFTsID) {
      const res = savedNfts.filter((item) => item.id === savedNFTsID);
      setName(res[0].name);
      setDescription(res[0].description);
      setEditions(res[0].numberOfEditions);
      setPreviewImage(res[0].previewImage);
      setPercentAmount(res[0].percentAmount);
      setProperties(res[0].properties);
      if (res.length && res[0].collectionId) {
        const getCollection = deployedCollections.filter((col) => col.id === res[0].collectionId);
        if (getCollection.length) {
          setSelectedCollection(getCollection[0]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (saveForLateClick) {
      if (!errors.name && !errors.edition && !errors.previewImage) {
        const generatedEditions = [];

        for (let i = 0; i < editions; i += 1) {
          generatedEditions.push(uuid().split('-')[0]);
        }
        if (!savedNFTsID) {
          if (selectedCollection) {
            setSavedNfts([
              ...savedNfts,
              {
                id: uuid(),
                type: 'collection',
                collectionId: selectedCollection.id,
                collectionName: selectedCollection.name,
                collectionAvatar: selectedCollection.previewImage,
                collectionDescription: selectedCollection.description,
                shortURL: selectedCollection.shortURL,
                tokenName: selectedCollection.tokenName,
                previewImage,
                name,
                description,
                numberOfEditions: Number(editions),
                generatedEditions,
                properties,
                percentAmount,
                selected: false,
              },
            ]);
          } else {
            setSavedNfts([
              ...savedNfts,
              {
                id: uuid(),
                type: 'single',
                previewImage,
                name,
                description,
                numberOfEditions: editions,
                generatedEditions,
                properties,
                percentAmount,
                selected: false,
              },
            ]);
          }
        } else if (selectedCollection) {
          setSavedNfts(
            savedNfts.map((item) =>
              item.id === savedNFTsID
                ? {
                    ...item,
                    type: 'collection',
                    collectionId: selectedCollection.id,
                    collectionName: selectedCollection.name,
                    collectionAvatar: selectedCollection.previewImage,
                    collectionDescription: selectedCollection.description,
                    shortURL: selectedCollection.shortURL,
                    tokenName: selectedCollection.tokenName,
                    previewImage,
                    name,
                    description,
                    numberOfEditions: editions,
                    generatedEditions,
                    properties,
                    percentAmount,
                  }
                : item
            )
          );
        } else {
          setSavedNfts(
            savedNfts.map((item) =>
              item.id === savedNFTsID
                ? {
                    id: uuid(),
                    type: 'single',
                    previewImage,
                    name,
                    description,
                    numberOfEditions: editions,
                    generatedEditions,
                    properties,
                    percentAmount,
                  }
                : item
            )
          );
        }
        setShowModal(false);
        document.body.classList.remove('no__scroll');
      }
    }
    if (mintNowClick) {
      if (!errors.name && !errors.edition && !errors.previewImage && royaltyValidAddress) {
        document.getElementById('loading-hidden-btn').click();
        if (location.pathname === '/create-tiers/my-nfts/create') {
          setShowModal(false);
          document.body.classList.remove('no__scroll');
        } else {
          setTimeout(() => {
            document.getElementById('popup-root').remove();
            document.getElementById('congrats-hidden-btn').click();
            setTimeout(() => {
              closeCongratsPopupEvent();
            }, 2000);
          }, 3000);
        }
      }
    }
  }, [errors, saveForLateClick, savedNfts]);

  useEffect(() => {
    const notValidAddress = royaltyAddress.find(
      (el) => el.address.trim().length !== 0 && EthereumAddress.isAddress(el.address) === false
    );
    if (notValidAddress) {
      setRoyaltyValidAddress(false);
    } else {
      setRoyaltyValidAddress(true);
    }
  }, [propertyChangesAddress]);

  const handleCloseLoadingPopup = (close) => {
    if (location.pathname === '/create-tiers/my-nfts/create') {
      document.getElementById('popup-root').remove();
      document.getElementById('congrats-hidden-btn').click();
      setShowCongratsPopup(true);
    } else {
      close();
    }
  };

  const handleCloseCongratsPopup = (close) => {
    if (location.pathname === '/create-tiers/my-nfts/create') {
      closeCongratsPopupEvent();
    } else {
      close();
    }
  };

  return (
    <div className="single__nft">
      <div className="mintNftCollection-div">
        <Popup
          trigger={
            <button
              type="button"
              id="loading-hidden-btn"
              aria-label="hidden"
              style={{ display: 'none' }}
            />
          }
        >
          {(close) =>
            showCongratsPopup ? '' : <LoadingPopup onClose={() => handleCloseLoadingPopup(close)} />
          }
        </Popup>
        <Popup
          trigger={
            <button
              type="button"
              id="congrats-hidden-btn"
              aria-label="hidden"
              style={{ display: 'none' }}
            />
          }
        >
          {(close) => (
            <CongratsPopup
              onClose={() => handleCloseCongratsPopup(close)}
              backButtonText={
                location.pathname === '/create-tiers/my-nfts/create'
                  ? 'Go to reward tier settings'
                  : 'Go to my NFTs'
              }
            />
          )}
        </Popup>
        {/* <div className="back-nft" onClick={() => onClick(null)} aria-hidden="true">
        <img src={arrow} alt="back" />
        <span>Create NFT</span>
      </div> */}
        <h2 className="single-nft-title">{!savedNFTsID ? 'Single NFT settings' : 'Edit NFT'}</h2>
        <div className="single-nft-content">
          <div className="single-nft-upload">
            <h5>Upload file</h5>
            {previewImage ? (
              <div className="single-nft-preview">
                <img
                  className="close"
                  src={closeIcon}
                  alt="Close"
                  onClick={() => setPreviewImage(null)}
                  aria-hidden="true"
                />
                <div className="single-nft-picture">
                  <div className="preview__image">
                    {previewImage.type === 'video/mp4' && (
                      <video>
                        <source src={URL.createObjectURL(previewImage)} type="video/mp4" />
                        <track kind="captions" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {previewImage.type === 'audio/mpeg' && (
                      <img className="preview-image" src={mp3Icon} alt="Preview" />
                    )}
                    {previewImage.type !== 'audio/mpeg' && previewImage.type !== 'video/mp4' && (
                      <img
                        className="preview-image"
                        src={URL.createObjectURL(previewImage)}
                        alt="Preview"
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={
                  errors.previewImage ? 'single-nft-upload-file error' : 'single-nft-upload-file'
                }
              >
                <div className="single-nft-drop-file">
                  <img src={cloudIcon} alt="Cloud" />
                  <h5>Drop your file here</h5>
                  <p>
                    <span>( min 800x800px, PNG/JPEG/GIF/WEBP/MP4,</span> <span>max 30mb)</span>
                  </p>
                  <Button className="light-button" onClick={() => inputFile.current.click()}>
                    Choose file
                  </Button>
                  <input
                    type="file"
                    className="inp-disable"
                    ref={inputFile}
                    onChange={(e) => validateFile(e.target.files[0])}
                  />
                </div>
              </div>
            )}
          </div>
          {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}
          <div className="single-nft-name">
            <h5>Name</h5>
            <Input
              className="inp"
              error={errors.name}
              placeholder="Enter NFT name"
              onChange={(e) => {
                setName(e.target.value);
                setErrors({
                  ...errors,
                  name: !e.target.value ? '“Name” is not allowed to be empty' : '',
                });
                setMintNowClick(false);
                setSaveForLateClick(false);
              }}
              value={name}
            />
          </div>
          <div className="single-nft-description">
            <h5>Description (optional)</h5>
            <textarea
              rows="5"
              placeholder="Example copy"
              className="inp"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className="single-nft-editions">
            <div className="single-nft-edition-header">
              <h5 onMouseEnter={() => setHideIcon(true)} onMouseLeave={() => setHideIcon(false)}>
                Number of editions <img src={infoIcon} alt="Info Icon" />
              </h5>
              {hideIcon && (
                <div className="info-text">
                  <p>
                    NFTs are minted to our auction contract by default. Turn the toggle on if you
                    want them to be minted to your wallet instead.
                  </p>
                </div>
              )}
            </div>
            <Input
              className="inp"
              error={errors.edition}
              placeholder="Enter Number of Editions"
              onChange={validateEdition}
              value={editions}
            />
          </div>
          <div className="single-nft-choose-collection">
            {deployedCollections.length ? <h4>Choose collection</h4> : <></>}
            {!deployedCollections.length && !savedNFTsID ? <h4>Choose collection</h4> : <></>}
            <div className="choose__collection">
              {!savedNFTsID && (
                <Popup
                  trigger={
                    <div className="create">
                      <img aria-hidden="true" src={createIcon} alt="Create Icon" />
                      <h5>Create</h5>
                      <p>ERC-721</p>
                    </div>
                  }
                >
                  {(close) => <CreateCollectionPopup onClose={close} />}
                </Popup>
              )}

              {deployedCollections.map((col) => (
                <div
                  key={uuid()}
                  className={`universe${
                    selectedCollection && selectedCollection.id === col.id ? ' selected' : ''
                  }`}
                  aria-hidden="true"
                  onClick={() =>
                    selectedCollection && selectedCollection.id === col.id
                      ? setSelectedCollection(null)
                      : setSelectedCollection(col)
                  }
                >
                  {typeof col.previewImage === 'string' && col.previewImage.startsWith('#') ? (
                    <div
                      className="random__bg__color"
                      style={{ backgroundColor: col.previewImage }}
                    >
                      {col.name.charAt(0)}
                    </div>
                  ) : (
                    <div>
                      <img src={URL.createObjectURL(col.previewImage)} alt={col.name} />
                    </div>
                  )}
                  <h5>{col.name}</h5>
                  <p>{col.tokenName}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hr-div" />
          <div className="single-nft-properties">
            <div className="single-nft-properties-header">
              <h4
                onMouseOver={() => setHideIcon1(true)}
                onFocus={() => setHideIcon1(true)}
                onMouseLeave={() => setHideIcon1(false)}
                onBlur={() => setHideIcon1(false)}
              >
                Properties <img src={infoIcon} alt="Info Icon" />
              </h4>
              {hideIcon1 && (
                <div className="properties-info-text">
                  <p>
                    Adding properties allows you to specify the character NFT traits, the goods NFT
                    sizes, or any other details you would like to specify.
                  </p>
                </div>
              )}
              <label className="switch">
                <input
                  type="checkbox"
                  checked={propertyCheck}
                  onChange={(e) => setPropertyCheck(e.target.checked)}
                />
                <span className="slider round" />
              </label>
            </div>
            {properties.map(
              (elm, i) =>
                propertyCheck && (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={i} className="properties">
                    <div className="property-name">
                      <h5>Property name</h5>
                      <Input
                        className="inp"
                        placeholder="Colour"
                        value={elm.name}
                        onChange={(e) => propertyChangesName(i, e.target.value)}
                      />
                    </div>
                    <div className="property-value">
                      <h5>Value</h5>
                      <Input
                        className="inp"
                        placeholder="Red"
                        value={elm.value}
                        onChange={(e) => propertyChangesValue(i, e.target.value)}
                      />
                    </div>
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      className="delete-img"
                      onClick={() => removeProperty(i)}
                      aria-hidden="true"
                    />
                    <Button className="light-border-button red" onClick={() => removeProperty(i)}>
                      <img src={delIcon} className="del-icon" alt="Delete" aria-hidden="true" />
                      Remove
                    </Button>
                  </div>
                )
            )}
            <div
              hidden={!propertyCheck}
              className="property-add"
              onClick={() => addProperty()}
              aria-hidden="true"
            >
              <h5>
                <img src={addIcon} alt="Add" />
                Add property
              </h5>
            </div>
            {/* {editableNFTType !== 'collection' && ( */}
            <div className="royalities">
              <div className="title">
                <h4
                  onMouseOver={() => setHideRoyalitiesInfo(true)}
                  onFocus={() => setHideRoyalitiesInfo(true)}
                  onMouseLeave={() => setHideRoyalitiesInfo(false)}
                  onBlur={() => setHideRoyalitiesInfo(false)}
                >
                  Royalty splits <img src={infoIcon} alt="Info Icon" />
                </h4>
                {hideRoyalitiesInfo && (
                  <div className="royalities-info-text">
                    <p>
                      Add addresses you want resale royalties to go to. Each address receives the
                      percent you choose. Suggested percent amount: 2.5%.
                    </p>
                  </div>
                )}
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={royalities}
                    onChange={(e) => setRoyalities(e.target.checked)}
                  />
                  <span className="slider round" />
                </label>
              </div>
              {royalities &&
                royaltyAddress.map((elm, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={i} className="royalty properties">
                    <div className="property-address">
                      <h5>Wallet address</h5>
                      <Input
                        className="inp"
                        placeholder="0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
                        value={elm.address}
                        onChange={(e) => propertyChangesAddress(i, e.target.value)}
                      />
                    </div>
                    <div className="property-amount">
                      <span className="percent-sign">%</span>
                      <h5>Percent amount</h5>
                      <Input
                        className="percent-inp"
                        type="number"
                        placeholder="5%"
                        value={elm.amount}
                        onChange={(e) => propertyChangesAmount(i, e.target.value, e.target)}
                      />
                    </div>
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      className="delete-img"
                      onClick={() => removeRoyaltyAddress(i)}
                      aria-hidden="true"
                    />
                    <Button
                      className="light-border-button red"
                      onClick={() => removeRoyaltyAddress(i)}
                    >
                      <img src={delIcon} className="del-icon" alt="Delete" aria-hidden="true" />
                      Remove
                    </Button>
                  </div>
                ))}
              {royalities && (
                <div
                  className="property-add"
                  onClick={() => addRoyaltyAddress()}
                  aria-hidden="true"
                >
                  <h5>
                    <img src={addIcon} alt="Add" />
                    Add the address
                  </h5>
                </div>
              )}
            </div>
          </div>
          {errors.name || errors.edition || errors.previewImage ? (
            <div className="single__final__error">
              <img src={redIcon} alt="icon" />
              <p className="error-message">
                Something went wrong. Please fix the errors in the fields above and try again. The
                buttons will be enabled after information has been entered into the fields.
              </p>
            </div>
          ) : (
            !errors.name &&
            !errors.edition &&
            !errors.previewImage &&
            !royaltyValidAddress && (
              <div className="single__final__error">
                <img src={redIcon} alt="icon" />
                <p className="error-message">Something went wrong. Wallet address is not valid.</p>
              </div>
            )
          )}
          <div className="single-nft-buttons">
            {!savedNFTsID ? (
              <>
                <Button
                  className="light-button"
                  onClick={handleMinting}
                  disabled={errors.name || errors.edition || errors.previewImage}
                >
                  Mint now
                </Button>
                <Button
                  className="light-border-button"
                  onClick={handleSaveForLater}
                  disabled={errors.name || errors.edition || errors.previewImage}
                >
                  Save for later
                </Button>
              </>
            ) : (
              <Button
                className="light-button"
                onClick={handleSaveForLater}
                disabled={errors.name || errors.edition || errors.previewImage}
              >
                Save changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNFTSettings;
