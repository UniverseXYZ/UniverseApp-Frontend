/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import EthereumAddress from 'ethereum-address';
import uuid from 'react-uuid';
import Button from '../../button/Button.jsx';
import Input from '../../input/Input.jsx';
import { defaultColors } from '../../../utils/helpers.js';
import AppContext from '../../../ContextAPI.js';
import uploadIcon from '../../../assets/images/ion_cloud.svg';
import closeIcon from '../../../assets/images/close-menu.svg';
import infoIcon from '../../../assets/images/icon.svg';
import deleteIcon from '../../../assets/images/delred-icon.svg';
import delIcon from '../../../assets/images/red-delete.svg';
import addIcon from '../../../assets/images/Add.svg';
import testNFTImage from '../../../assets/images/marketplace/nfts/nft1.png';

const NFTCollectible = (props) => {
  const { savedNfts, setSavedNfts, loggedInArtist } = useContext(AppContext);
  const {
    setShowCollectible,
    collectionName,
    coverImage,
    collectionNFTs,
    setCollectionNFTs,
    collectionNFTsID,
    setCollectionNFTsID,
  } = props;

  const inputFile = useRef(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editions, setEditions] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);

  const [clicked, setClicked] = useState(false);
  const [addToCollectionClick, setAddToCollectionClick] = useState(false);
  const [addAndCreateNewClick, setAddAndCreateNewClick] = useState(false);

  const [showEditionsInfoBox, setShowEditionsInfoBox] = useState(false);
  const [showPropertiesInfoBox, setShowPropertiesInfoBox] = useState(false);
  const [toggleProperties, setToggleProperties] = useState(true);
  const [properties, setProperties] = useState([{ name: '', value: '' }]);
  const [showRoyaltySplitsInfoBox, setShowRoyaltySplitsInfoBox] = useState(false);
  const [royalties, setRoyaltySplits] = useState([{ address: '', amount: '' }]);
  const [toggleRoyaltySplits, setToggleRoyaltySplits] = useState(true);
  const [royaltyValidAddress, setRoyaltyValidAddress] = useState(true);

  const [errors, setErrors] = useState({
    name: '',
    edition: '',
    previewImage: '',
  });

  const validateFile = (file) => {
    setClicked(false);
    if (!file) {
      setPreviewImage(null);
      setErrors({
        ...errors,
        previewImage: 'File format must be PNG, JPEG, GIF, WEBP or MP4 (Max Size: 30mb)',
      });
    } else if (
      (file.type === 'video/mp4' ||
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
        previewImage: 'File format must be PNG, JPEG, GIF, WEBP or MP4 (Max Size: 30mb)',
      });
    }
  };

  const validateEdition = (e) => {
    const value = e.target.value.replace(/[^\d]/, '');
    if (parseInt(value, 10) !== 0) {
      setEditions(value);
    }
  };

  const handlePropertyNameChange = (index, val) => {
    const newProperties = [...properties];
    newProperties[index].name = val;
    setProperties(newProperties);
  };

  const handlePropertyValueChange = (index, value) => {
    const newProperties = [...properties];
    newProperties[index].value = value;
    setProperties(newProperties);
  };

  const removeProperty = (index) => {
    const newProperties = [...properties];
    newProperties.splice(index, 1);
    setProperties(newProperties);
  };

  const addProperty = () => {
    const newProperties = [...properties];
    const temp = { name: '', value: '' };
    newProperties.push(temp);
    setProperties(newProperties);
  };

  const handleAddressChange = (index, val) => {
    const newRoyaltySplits = [...royalties];
    newRoyaltySplits[index].address = val;
    setRoyaltySplits(newRoyaltySplits);
  };

  const handleAmountChange = (index, val) => {
    const re = /^(100(\.0{0,2})?|(\d|[1-9]\d)(\.\d{0,2})?)$/;
    if (re.test(val)) {
      const newRoyaltySplits = [...royalties];
      newRoyaltySplits[index].amount = val;
      setRoyaltySplits(newRoyaltySplits);
    }
  };

  const addRoyaltySplit = () => {
    const newRoyaltySplits = [...royalties];
    const temp = { address: '', amount: '' };
    newRoyaltySplits.push(temp);
    setRoyaltySplits(newRoyaltySplits);
  };

  const removeRoyaltySplit = (index) => {
    const newRoyaltySplits = [...royalties];
    newRoyaltySplits.splice(index, 1);
    setRoyaltySplits(newRoyaltySplits);
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

  useEffect(() => {
    if (collectionNFTsID) {
      const getCollectionNFT = collectionNFTs.filter((item) => item.id === collectionNFTsID);
      if (getCollectionNFT.length) {
        setName(getCollectionNFT[0].name);
        setDescription(getCollectionNFT[0].description);
        setEditions(getCollectionNFT[0].numberOfEditions);
        setPreviewImage(getCollectionNFT[0].previewImage);
        setProperties(getCollectionNFT[0].properties);
        setRoyaltySplits(getCollectionNFT[0].royalties);
      }
      const getSavedNFT = savedNfts.filter((item) => item.id === collectionNFTsID);
      if (getSavedNFT.length) {
        setName(getSavedNFT[0].name);
        setDescription(getSavedNFT[0].description);
        setEditions(getSavedNFT[0].numberOfEditions);
        setPreviewImage(getSavedNFT[0].previewImage);
        setProperties(getSavedNFT[0].properties);
        setRoyaltySplits(getCollectionNFT[0].royalties);
      }
    }
  }, []);

  useEffect(() => {
    if (clicked) {
      if (!errors.name && !errors.edition && !errors.previewImage && royaltyValidAddress) {
        const generatedEditions = [];
        const generatedNFTs = [];

        for (let i = 0; i < editions; i += 1) {
          generatedEditions.push(uuid().split('-')[0]);
        }
        for (let i = 1; i < editions; i += 1) {
          generatedNFTs.push({ url: testNFTImage, type: 'image/png' });
        }
        if (!collectionNFTsID) {
          setCollectionNFTs([
            ...collectionNFTs,
            {
              id: uuid(),
              type: 'collection',
              collection: {
                id: collectionName,
                name: collectionName,
                avatar:
                  coverImage || defaultColors[Math.floor(Math.random() * defaultColors.length)],
              },
              creator: {
                name: loggedInArtist.name,
                avatar: loggedInArtist.avatar,
              },
              owner: {
                name: loggedInArtist.name,
                avatar: loggedInArtist.avatar,
              },
              previewImage,
              allItems: generatedNFTs,
              name,
              description,
              numberOfEditions: Number(editions),
              generatedEditions,
              properties,
              royalties,
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
                      allItems: generatedNFTs,
                      previewImage,
                      name,
                      description,
                      numberOfEditions: Number(editions),
                      generatedEditions,
                      properties,
                      royalties,
                    }
                  : item
              ) || []
            );
          } else {
            setCollectionNFTs(
              collectionNFTs.map((item) =>
                item.id === collectionNFTsID
                  ? {
                      ...item,
                      allItems: generatedNFTs,
                      previewImage,
                      name,
                      description,
                      numberOfEditions: Number(editions),
                      generatedEditions,
                      properties,
                      royalties,
                    }
                  : item
              )
            );
            // const newSavedNFTs = [...savedNfts];
            // collectionNFTs.forEach((nft) => {
            //   if (nft.id === collectionNFTsID) {
            //     newSavedNFTs.push({
            //       id: nft.id,
            //       type: 'collection',
            //       collection: nft.collection,
            //       creator: nft.creator,
            //       owner: nft.owner,
            //       allItems: generatedNFTs,
            //       previewImage,
            //       name,
            //       description,
            //       numberOfEditions: Number(editions),
            //       generatedEditions,
            //       properties,
            //       royalties,
            //       selected: false,
            //     });
            //   } else {
            //     newSavedNFTs.push({
            //       id: nft.id,
            //       type: 'collection',
            //       collection: nft.collection,
            //       creator: nft.creator,
            //       owner: nft.owner,
            //       allItems: nft.generatedNFTs,
            //       previewImage: nft.previewImage,
            //       name: nft.name,
            //       description: nft.description,
            //       numberOfEditions: Number(nft.editions),
            //       generatedEditions: nft.generatedEditions,
            //       properties,
            //       royalties,
            //       selected: false,
            //     });
            //   }
            // });
            // setSavedNfts(newSavedNFTs);
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
          setProperties([{ name: '', value: '' }]);
          setRoyaltySplits([{ address: '', amount: '' }]);
        }
        setClicked(false);
      }
    }
  }, [errors]);

  useEffect(() => {
    const notValidAddress = royalties.find(
      (el) => el.address.trim().length !== 0 && !EthereumAddress.isAddress(el.address)
    );
    if (notValidAddress) {
      setRoyaltyValidAddress(false);
    } else {
      setRoyaltyValidAddress(true);
    }
  }, [handleAddressChange]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    validateFile(files[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create--nft--for--collection--page">
      <div className="upload--file--section">
        <h3>Upload file</h3>
        <div
          className={`dropzone ${errors.previewImage ? 'error' : ''}`}
          onDrop={(e) => onDrop(e)}
          onDragOver={(e) => onDragOver(e)}
        >
          {!previewImage ? (
            <div className="image--not--selected">
              <img src={uploadIcon} alt="Upload" />
              <p>
                Drop your file here <br /> (min 800x800px, PNG/JPEG/GIF/WEBP/MP4, max 30mb)
              </p>
              <Button className="light-button" onClick={() => inputFile.current.click()}>
                Choose file
              </Button>
              <input
                type="file"
                ref={inputFile}
                onChange={(e) => validateFile(e.target.files[0])}
              />
            </div>
          ) : (
            <div className="image--selected">
              {previewImage.type === 'video/mp4' && (
                <video>
                  <source src={URL.createObjectURL(previewImage)} type="video/mp4" />
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              )}
              {previewImage.type !== 'video/mp4' && (
                <img className="cover" src={URL.createObjectURL(previewImage)} alt="NFT" />
              )}
              <div
                className="remove--selected--image"
                onClick={() => setPreviewImage(null)}
                aria-hidden="true"
              >
                <img src={closeIcon} alt="Close" />
              </div>
            </div>
          )}
        </div>
        {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}
        <div className="nft--name">
          <Input
            label="Name"
            className="inp"
            error={errors.name}
            placeholder="Enter NFT name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="nft--description">
          <label>Description (optional)</label>
          <textarea
            placeholder="Spread some words about your NFT"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="nft-coll-editions">
          <div className="nft-coll-editions-header">
            <label
              onMouseOver={() => setShowEditionsInfoBox(true)}
              onFocus={() => setShowEditionsInfoBox(true)}
              onMouseLeave={() => setShowEditionsInfoBox(false)}
              onBlur={() => setShowEditionsInfoBox(false)}
            >
              Number of Editions <img src={infoIcon} alt="Info Icon" />
            </label>
            {showEditionsInfoBox && (
              <div className="info-text">
                <p>
                  Total amount of NFTs that will be distributed to the current reward tier winners.
                </p>
              </div>
            )}
          </div>
          <Input
            error={errors.edition}
            placeholder="Enter Number of Editions"
            onChange={validateEdition}
            value={editions}
          />
        </div>
        <hr />
        <div className="properties--section">
          <div className="properties--header">
            <h4
              onMouseOver={() => setShowPropertiesInfoBox(true)}
              onFocus={() => setShowPropertiesInfoBox(true)}
              onMouseLeave={() => setShowPropertiesInfoBox(false)}
              onBlur={() => setShowPropertiesInfoBox(false)}
            >
              Properties <img src={infoIcon} alt="Info Icon" />
            </h4>
            {showPropertiesInfoBox && (
              <div className="properties--info--text">
                <p>
                  Adding properties allows you to specify the character NFT traits, the goods NFT
                  sizes, or any other details you would like to specify.
                </p>
              </div>
            )}
            <label className="switch">
              <input
                type="checkbox"
                checked={toggleProperties}
                onChange={(e) => setToggleProperties(e.target.checked)}
              />
              <span className="slider round" />
            </label>
          </div>
          {properties.map(
            (elm, i) =>
              toggleProperties && (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="properties">
                  <div className="property--name">
                    <h5>Property name</h5>
                    <Input
                      placeholder="Enter NFT property"
                      value={elm.name}
                      onChange={(e) => handlePropertyNameChange(i, e.target.value)}
                    />
                  </div>
                  <div className="property--value">
                    <h5>Value</h5>
                    <Input
                      placeholder="Enter value"
                      value={elm.value}
                      onChange={(e) => handlePropertyValueChange(i, e.target.value)}
                    />
                  </div>
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    className="delete--img"
                    onClick={() => removeProperty(i)}
                    aria-hidden="true"
                  />
                  <Button className="light-border-button red" onClick={() => removeProperty(i)}>
                    <img src={delIcon} className="del--icon" alt="Delete" aria-hidden="true" />
                    Remove
                  </Button>
                </div>
              )
          )}
          <div
            hidden={!toggleProperties}
            className="property--add"
            onClick={() => addProperty()}
            aria-hidden="true"
          >
            <h5>
              <img src={addIcon} alt="Add" />
              Add Property
            </h5>
          </div>
          <hr />
        </div>
        <div className="royalty--splits--section">
          <div className="royalty--splits--header">
            <h4
              onMouseOver={() => setShowRoyaltySplitsInfoBox(true)}
              onFocus={() => setShowRoyaltySplitsInfoBox(true)}
              onMouseLeave={() => setShowRoyaltySplitsInfoBox(false)}
              onBlur={() => setShowRoyaltySplitsInfoBox(false)}
            >
              Royalty splits <img src={infoIcon} alt="Info Icon" />
            </h4>
            {showRoyaltySplitsInfoBox && (
              <div className="royalty--splits--info--text">
                <p>
                  Royalties determines the percentage you, as a creator, will get from sales of this
                  NFT on the secondary markets.
                </p>
              </div>
            )}
            <label className="switch">
              <input
                type="checkbox"
                checked={toggleRoyaltySplits}
                onChange={(e) => setToggleRoyaltySplits(e.target.checked)}
              />
              <span className="slider round" />
            </label>
          </div>
          {toggleRoyaltySplits &&
            royalties.map((elm, i) => (
              <div key={i} className="royalty--splits">
                <div className="royalty--splits--item">
                  <div className="royalty--split--address">
                    <h5>Wallet address</h5>
                    <Input
                      placeholder="0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
                      value={elm.address}
                      onChange={(e) => handleAddressChange(i, e.target.value)}
                    />
                  </div>
                  <div className="royalty--split--amount">
                    <span className="percent--sign">%</span>
                    <h5>Percent amount</h5>
                    <Input
                      className="percent--inp"
                      type="number"
                      placeholder="5%"
                      value={elm.amount}
                      onChange={(e) => handleAmountChange(i, e.target.value, e.target)}
                    />
                  </div>
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    className="delete--img"
                    onClick={() => removeRoyaltySplit(i)}
                    aria-hidden="true"
                  />
                  <Button className="light-border-button red" onClick={() => removeRoyaltySplit(i)}>
                    <img src={delIcon} className="del--icon" alt="Delete" aria-hidden="true" />
                    Remove
                  </Button>
                </div>
                {elm.address.trim().length !== 0 && !EthereumAddress.isAddress(elm.address) && (
                  <div className="single__final__error">
                    <p className="error-message">Wallet address is not valid.</p>
                  </div>
                )}
              </div>
            ))}
          {toggleRoyaltySplits && (
            <div
              className="add--royalty--split"
              onClick={() => addRoyaltySplit()}
              aria-hidden="true"
            >
              <h5>
                <img src={addIcon} alt="Add" />
                Add the address
              </h5>
            </div>
          )}
        </div>
        <div className="nft--actions">
          {!collectionNFTsID ? (
            <>
              <Button className="light-border-button" onClick={handleAddAndCreateNew}>
                Add and create new
              </Button>
              <Button className="light-button" onClick={handleAddToCollection}>
                Add to collection
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
  );
};

NFTCollectible.propTypes = {
  setShowCollectible: PropTypes.func.isRequired,
  collectionName: PropTypes.string,
  coverImage: PropTypes.oneOfType([PropTypes.object]),
  collectionNFTs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setCollectionNFTs: PropTypes.func.isRequired,
  collectionNFTsID: PropTypes.oneOfType([PropTypes.object]),
  setCollectionNFTsID: PropTypes.func.isRequired,
};

NFTCollectible.defaultProps = {
  collectionName: '',
  coverImage: '',
  collectionNFTsID: '',
};

export default NFTCollectible;
