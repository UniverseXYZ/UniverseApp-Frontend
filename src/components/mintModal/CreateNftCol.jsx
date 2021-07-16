import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import { defaultColors } from '../../utils/helpers';
import AppContext from '../../ContextAPI';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import defaultImage from '../../assets/images/default-img.svg';
import sizeDownIcon from '../../assets/images/size-down.svg';
import sizeUpIcon from '../../assets/images/size-up.svg';
import infoIcon from '../../assets/images/icon.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import deleteIcon from '../../assets/images/inactive.svg';
import addIcon from '../../assets/images/Add.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import delIcon from '../../assets/images/del-icon.svg';
import arrow from '../../assets/images/arrow.svg';

const CreateNftCol = (props) => {
  const { savedNfts, setSavedNfts } = useContext(AppContext);
  const {
    setShowCollectible,
    collectionName,
    coverImage,
    collectionNFTs,
    setCollectionNFTs,
    collectionNFTsID,
    setCollectionNFTsID,
  } = props;

  const [errors, setErrors] = useState({
    name: '',
    edition: '',
    previewImage: '',
  });

  const [addToCollectionClick, setAddToCollectionClick] = useState(false);
  const [addAndCreateNewClick, setAddAndCreateNewClick] = useState(false);
  const [clicked, setClicked] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editions, setEditions] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [hideIcon, setHideIcon] = useState(false);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideRoyalitiesInfo, setHideRoyalitiesInfo] = useState(false);
  const [royalities, setRoyalities] = useState(true);
  const [percentAmount, setPercentAmount] = useState('');
  const inputFile = useRef(null);

  const [royaltyAddress, setRoyaltyAddress] = useState([{ address: '', amount: '' }]);
  const [properties, setProperties] = useState([{ name: '', value: '' }]);

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
    const temp = [...properties];
    temp.splice(index, 1);
    setRoyaltyAddress(temp);
  };

  const addRoyaltyAddress = () => {
    const newProperties = [...properties];
    const temp = { address: '', amount: '' };
    newProperties.push(temp);
    setRoyaltyAddress(newProperties);
  };

  const propertyChangesAddress = (index, val) => {
    const prevProperties = [...royaltyAddress];
    prevProperties[index].address = val;
    setRoyaltyAddress(prevProperties);
  };

  const propertyChangesAmount = (index, val) => {
    const prevProperties = [...royaltyAddress];
    prevProperties[index].amount = val;
    setRoyaltyAddress(prevProperties);
  };

  const addProperty = () => {
    const prevProperties = [...properties];
    const temp = { name: '', value: '' };
    prevProperties.push(temp);
    setProperties(prevProperties);
  };

  const propertyChangesName = (index, val) => {
    const prevProperties = [...properties];
    prevProperties[index].name = val;
    setProperties(prevProperties);
  };

  const propertyChangesValue = (index, value) => {
    const prevProperties = [...properties];
    prevProperties[index].value = value;
    setProperties(prevProperties);
  };

  const handleAddToCollection = () => {
    setClicked(true);
    setAddAndCreateNewClick(false);
    setAddToCollectionClick(true);
    setErrors({
      name: !name ? '“Name” is not allowed to be empty' : '',
      edition: !editions ? '“Number of editions” is required' : '',
      previewImage: !previewImage ? '“File” is required' : null,
    });
  };

  const handleAddAndCreateNew = () => {
    setClicked(true);
    setAddToCollectionClick(false);
    setAddAndCreateNewClick(true);
    setErrors({
      name: !name ? '“Name” is not allowed to be empty' : '',
      edition: !editions ? '“Number of editions” is required' : '',
      previewImage: !previewImage ? '“File” is required' : null,
    });
  };

  const validateFile = (file) => {
    setClicked(false);
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

  useEffect(() => {
    if (collectionNFTsID) {
      const getCollectionNFT = collectionNFTs.filter((item) => item.id === collectionNFTsID);
      if (getCollectionNFT.length) {
        setName(getCollectionNFT[0].name);
        setDescription(getCollectionNFT[0].description);
        setEditions(getCollectionNFT[0].numberOfEditions);
        setPreviewImage(getCollectionNFT[0].previewImage);
        setProperties(getCollectionNFT[0].properties);
        setPercentAmount(getCollectionNFT[0].percentAmount);
      }
      const getSavedNFT = savedNfts.filter((item) => item.id === collectionNFTsID);
      if (getSavedNFT.length) {
        setName(getSavedNFT[0].name);
        setDescription(getSavedNFT[0].description);
        setEditions(getSavedNFT[0].numberOfEditions);
        setPreviewImage(getSavedNFT[0].previewImage);
        setProperties(getSavedNFT[0].properties);
        setPercentAmount(getSavedNFT[0].percentAmount);
      }
    }
  }, []);

  useEffect(() => {
    if (clicked) {
      if (!errors.name && !errors.edition && !errors.previewImage) {
        const generatedEditions = [];

        for (let i = 0; i < editions; i += 1) {
          generatedEditions.push(uuid().split('-')[0]);
        }
        if (!collectionNFTsID) {
          setCollectionNFTs([
            ...collectionNFTs,
            {
              id: uuid(),
              type: 'collection',
              collectionId: collectionName,
              collectionName,
              collectionAvatar:
                coverImage || defaultColors[Math.floor(Math.random() * defaultColors.length)],
              previewImage,
              name,
              description,
              numberOfEditions: Number(editions),
              generatedEditions,
              properties,
              selected: false,
            },
          ]);
        } else {
          const getSavedNFT = savedNfts.filter((item) => item.id === collectionNFTsID);
          if (getSavedNFT.length) {
            setSavedNfts(
              savedNfts.map((item) =>
                item.id === collectionNFTsID
                  ? {
                      ...item,
                      previewImage,
                      name,
                      description,
                      numberOfEditions: Number(editions),
                      generatedEditions,
                      properties,
                    }
                  : item
              )
            );
          } else {
            const newSavedNFTs = [...savedNfts];
            collectionNFTs.forEach((nft) => {
              if (nft.id === collectionNFTsID) {
                newSavedNFTs.push({
                  id: nft.id,
                  type: 'collection',
                  collectionId: nft.collectionId,
                  collectionName: nft.collectionName,
                  collectionAvatar: nft.collectionAvatar,
                  previewImage,
                  name,
                  description,
                  numberOfEditions: Number(editions),
                  generatedEditions,
                  properties,
                  selected: false,
                });
              } else {
                newSavedNFTs.push({
                  id: nft.id,
                  type: 'collection',
                  collectionId: nft.collectionId,
                  collectionName: nft.collectionName,
                  collectionAvatar: nft.collectionAvatar,
                  previewImage: nft.previewImage,
                  name: nft.name,
                  description: nft.description,
                  numberOfEditions: Number(nft.editions),
                  generatedEditions: nft.generatedEditions,
                  properties,
                  selected: false,
                });
              }
            });
            setSavedNfts(newSavedNFTs);
          }
          setCollectionNFTsID(null);
        }
        if (addToCollectionClick) {
          setShowCollectible(false);
        }
        if (addAndCreateNewClick) {
          setName('');
          setDescription('');
          setEditions(1);
          setPreviewImage(null);
          setPercentAmount('');
          setProperties([{ name: '', value: '' }]);
        }
        setClicked(false);
      }
    }
  }, [errors]);

  return (
    <div className="mintNftCollection-div">
      <div
        className="back-nft"
        onClick={() => {
          setShowCollectible(false);
          setCollectionNFTsID(null);
        }}
        aria-hidden="true"
      >
        <img src={arrow} alt="back" />
        <span>Create NFT Collection</span>
      </div>
      <div className="nft-collectible">
        <h2 className="nft-coll-title">
          {!collectionNFTsID ? 'Create NFT collectible' : 'Edit NFT collectible'}
        </h2>
        <div className="nft-coll-content">
          <div className="nft-coll-upload">
            <h5>Upload file</h5>
            <div className="nft-coll-upload-file">
              <div className="nft-coll-drop-file">
                <img src={cloudIcon} alt="Cloud" />
                <h5>Drop your file here</h5>
                <p>
                  <span>(min 800x800px, PNG/JPEG/GIF/WEBP/MP4,</span> <span>max 30mb)</span>
                </p>
                <Button className="light-border-button" onClick={() => inputFile.current.click()}>
                  Choose file
                </Button>
                <input
                  type="file"
                  className="inp-disable"
                  ref={inputFile}
                  onChange={(e) => validateFile(e.target.files[0])}
                />
              </div>
              <div className="nft-coll-preview">
                <h5>Preview</h5>
                <div className="nft-coll-picture">
                  {previewImage ? (
                    <Popup
                      trigger={
                        <div className="preview__image">
                          <img className="size__up" src={sizeUpIcon} alt="Size Up" />
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
                          {previewImage.type !== 'audio/mpeg' &&
                            previewImage.type !== 'video/mp4' && (
                              <img
                                className="preview-image"
                                src={URL.createObjectURL(previewImage)}
                                alt="Preview"
                              />
                            )}
                        </div>
                      }
                    >
                      {(close) => (
                        <div className="preview__image__popup">
                          <img
                            className="size__down"
                            src={sizeDownIcon}
                            onClick={close}
                            alt="Size Down"
                            aria-hidden="true"
                          />
                          {previewImage.type === 'video/mp4' && (
                            <video controls autoPlay>
                              <source src={URL.createObjectURL(previewImage)} type="video/mp4" />
                              <track kind="captions" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          {previewImage.type === 'audio/mpeg' && (
                            <audio controls autoPlay>
                              <source src={URL.createObjectURL(previewImage)} type="audio/mpeg" />
                              <track kind="captions" />
                              Your browser does not support the audio element.
                            </audio>
                          )}
                          {previewImage.type !== 'audio/mpeg' &&
                            previewImage.type !== 'video/mp4' && (
                              <img
                                className="preview-image"
                                src={URL.createObjectURL(previewImage)}
                                alt="Preview"
                              />
                            )}
                        </div>
                      )}
                    </Popup>
                  ) : (
                    <img className="default-image" src={defaultImage} alt="Cover" />
                  )}
                </div>
              </div>
            </div>
            {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}
            <div className="nft-coll-name">
              <h5>Name</h5>
              <Input
                className="inp"
                error={errors.name}
                placeholder="Enter NFT name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="nft-coll-description">
              <h5>Description (optional)</h5>
              <textarea
                rows="5"
                placeholder="Example copy"
                className="inp"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="nft-coll-editions">
              <div className="nft-coll-editions-header">
                <h5
                  onMouseOver={() => setHideIcon(true)}
                  onFocus={() => setHideIcon(true)}
                  onMouseLeave={() => setHideIcon(false)}
                  onBlur={() => setHideIcon(false)}
                >
                  Number of editions <img src={infoIcon} alt="Info Icon" />
                </h5>
                {hideIcon && (
                  <div className="info-text">
                    <p>
                      Total amount of NFTs that will be distributed to the current reward tier
                      winners.
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
            <div className="nft-coll-properties">
              <div className="nft-coll-properties-header">
                <h4
                  onMouseOver={() => setHideIcon1(true)}
                  onFocus={() => setHideIcon1(true)}
                  onMouseLeave={() => setHideIcon1(false)}
                  onBlur={() => setHideIcon1(false)}
                >
                  Properties (optional) <img src={infoIcon} alt="Info Icon" />
                </h4>
                {hideIcon1 && (
                  <div className="properties-info-text">
                    <p>
                      Adding properties allows you to specify the character NFT traits, the goods
                      NFT sizes, or any other details you would like to specify.
                    </p>
                  </div>
                )}
              </div>

              {properties.map((elm, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className="properties" key={i}>
                  <div className="property-name">
                    <h5>Property name</h5>
                    <Input
                      className="inp"
                      placeholder="Enter NFT property"
                      value={elm.name}
                      onChange={(e) => propertyChangesName(i, e.target.value)}
                    />
                  </div>
                  <div className="property-value">
                    <h5>Value</h5>
                    <Input
                      className="inp"
                      placeholder="Enter value"
                      value={elm.value}
                      onChange={(e) => propertyChangesValue(i, e.target.value)}
                    />
                  </div>
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    onClick={() => removeProperty(i)}
                    aria-hidden="true"
                  />
                  <Button className="light-border-button" onClick={() => removeProperty(i)}>
                    Remove
                    <img src={delIcon} className="del-icon" alt="Delete" aria-hidden="true" />
                  </Button>
                </div>
              ))}
              <div className="property-add" onClick={() => addProperty()} aria-hidden="true">
                <h5>
                  <img src={addIcon} alt="Add" />
                  Add property
                </h5>
              </div>
            </div>
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
                      Royalties determines the percentage you, as a creator, will get from sales of
                      this NFT on the secondary markets.
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
                      <h5>Percent amount</h5>
                      <Input
                        className="inp"
                        type="number"
                        placeholder="5%"
                        value={elm.amount}
                        onChange={(e) => propertyChangesAmount(i, e.target.value)}
                      />
                    </div>
                    <img
                      src={deleteIcon}
                      alt="Delete"
                      className="delete-img"
                      onClick={() => removeRoyaltyAddress(i)}
                      aria-hidden="true"
                    />
                    <Button className="light-border-button" onClick={() => removeRoyaltyAddress(i)}>
                      Remove
                      <img src={delIcon} className="del-icon" alt="Delete" aria-hidden="true" />
                    </Button>
                  </div>
                ))}
              <div className="property-add" onClick={() => addRoyaltyAddress()} aria-hidden="true">
                <h5>
                  <img src={addIcon} alt="Add" />
                  Add the address
                </h5>
              </div>
            </div>
            <div className="nft-coll-buttons">
              {!collectionNFTsID ? (
                <>
                  <Button className="light-button" onClick={handleAddToCollection}>
                    Add to collection
                  </Button>
                  <Button className="light-border-button" onClick={handleAddAndCreateNew}>
                    Add and create new
                  </Button>
                </>
              ) : (
                <Button className="light-button" onClick={handleAddToCollection}>
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateNftCol.propTypes = {
  setShowCollectible: PropTypes.func.isRequired,
  collectionName: PropTypes.string,
  coverImage: PropTypes.oneOfType([PropTypes.object]),
  collectionNFTs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCollectionNFTs: PropTypes.func.isRequired,
  collectionNFTsID: PropTypes.oneOfType([PropTypes.object]),
  setCollectionNFTsID: PropTypes.func.isRequired,
};

CreateNftCol.defaultProps = {
  collectionName: '',
  coverImage: '',
  collectionNFTsID: '',
};

export default CreateNftCol;
