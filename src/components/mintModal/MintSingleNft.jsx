import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import EthereumAddress from 'ethereum-address';
import Button from '../button/Button.jsx';
import Input from '../input/Input.jsx';
import AppContext from '../../ContextAPI';
import LoadingPopup from '../popups/LoadingPopup.jsx';
import CongratsPopup from '../popups/CongratsPopup.jsx';
import arrow from '../../assets/images/arrow.svg';
import infoIcon from '../../assets/images/icon.svg';
import defaultImage from '../../assets/images/default-img.svg';
import sizeDownIcon from '../../assets/images/size-down.svg';
import sizeUpIcon from '../../assets/images/size-up.svg';
import deleteIcon from '../../assets/images/inactive.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import addIcon from '../../assets/images/Add.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import createIcon from '../../assets/images/create.svg';
import delIcon from '../../assets/images/del-icon.svg';
import CreateCollectionPopup from '../popups/CreateCollectionPopup.jsx';
import {
  updateSavedForLaterNft,
  saveNftImage,
  saveNftForLater,
  getTokenURI,
  getSavedNfts,
  getMyNfts,
} from '../../utils/api/mintNFT';
import {
  parseRoyalties,
  formatRoyaltiesForMinting,
  parseProperties,
  parsePropertiesForFrontEnd,
} from '../../utils/helpers/contractInteraction';
import ServerErrorPopup from '../popups/ServerErrorPopup';

const MintSingleNft = ({ onClick }) => {
  const {
    savedNfts,
    setSavedNfts,
    setShowModal,
    savedNFTsID,
    myNFTs,
    setMyNFTs,
    deployedCollections,
    universeERC721CoreContract,
    auctionFactoryContract,
  } = useContext(AppContext);
  const [errors, setErrors] = useState({
    name: '',
    edition: '',
    previewImage: '',
  });

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
  const [artWorkType, setArtworkType] = useState('');
  const [royalities, setRoyalities] = useState(true);
  const [propertyCheck, setPropertyCheck] = useState(true);
  const inputFile = useRef(null);
  const [properties, setProperties] = useState([{ name: '', value: '' }]);
  const [royaltyAddress, setRoyaltyAddress] = useState([{ address: '', amount: '' }]);

  const [royaltyValidAddress, setRoyaltyValidAddress] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [errorModal, showErrorModal] = useState(false);

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

  const addProperty = () => {
    const newProperties = [...properties];
    const temp = { name: '', value: '' };
    newProperties.push(temp);
    setProperties(newProperties);
  };

  const removeRoyaltyAddress = (index) => {
    const temp = royaltyAddress ? [...royaltyAddress] : [];
    temp.splice(index, 1);
    setRoyaltyAddress(temp);
  };

  const addRoyaltyAddress = () => {
    const newProperties = royaltyAddress ? [...royaltyAddress] : [];
    const temp = { address: '', amount: '' };
    newProperties.push(temp);
    setRoyaltyAddress(newProperties);
  };

  const propertyChangesAddress = (index, val) => {
    const prevProperties = [...properties];
    prevProperties[index].address = val;
    setRoyaltyAddress(prevProperties);
  };

  const propertyChangesAmount = (index, val) => {
    const prevProperties = [...properties];
    prevProperties[index].amount = val;
    setRoyaltyAddress(prevProperties);
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
        file.type === 'image/jpeg' ||
        file.type === 'image/png') &&
      file.size / 1048576 < 30
    ) {
      setPreviewImage(file);
      // Reset the currently opened NFT ArtWorkType
      setArtworkType(file.type);
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

  const closeLoadingModal = () => {
    setShowModal(false);
    document.body.classList.remove('no__scroll');
  };

  const onEditSavedNft = async () => {
    document.getElementById('loading-hidden-btn').click();

    const royaltiesParsed = royalities ? parseRoyalties(royaltyAddress) : [];
    const propertiesParsed = propertyCheck ? parseProperties(properties) : [];

    const result = await updateSavedForLaterNft({
      name,
      description,
      editions,
      propertiesParsed,
      royaltiesParsed,
      id: savedNFTsID,
      collectionId: selectedCollection.id,
    });

    let saveImageResult = null;
    if (!result.message) {
      // There is no error message
      const updateNFTImage = result.id && typeof previewImage === 'object';
      if (updateNFTImage) {
        saveImageResult = await saveNftImage(previewImage, result.id);
        if (saveImageResult.error) {
          // Error with saving the image, show modal
          showErrorModal(true);
          return;
        }
      }
    }

    const data = saveImageResult || result;
    if (!data) {
      document.getElementById('congrats-hidden-btn').click();
      showErrorModal(true);
      return;
    }

    const savedNFTS = await getSavedNfts();
    setSavedNfts(savedNFTS);

    document.getElementById('congrats-hidden-btn').click();
    closeLoadingModal();
  };

  useEffect(() => {
    if (savedNFTsID) {
      const res = savedNfts.filter((item) => item.id === savedNFTsID);
      const parsedProperties = res[0].properties
        ? parsePropertiesForFrontEnd(res[0].properties)
        : [{ name: '', value: '' }];
      setName(res[0].name);
      setDescription(res[0].description);
      setEditions(res[0].numberOfEditions);
      setPreviewImage(res[0].url);
      setRoyaltyAddress(res[0].royalties);
      setProperties(parsedProperties);
      setArtworkType(res[0].artworkType);
      if (res.length && res[0].collectionId) {
        const getCollection = deployedCollections.filter((col) => col.id === res[0].collectionId);
        if (getCollection.length) {
          setSelectedCollection(getCollection[0]);
        }
      }
    }
  }, []);

  useEffect(async () => {
    if (saveForLateClick) {
      if (!errors.name && !errors.edition && !errors.previewImage) {
        if (!savedNFTsID) {
          document.getElementById('loading-hidden-btn').click();

          const royaltiesParsed = royalities ? parseRoyalties(royaltyAddress) : [];

          const result = await saveNftForLater({
            name,
            description,
            editions,
            properties,
            royaltiesParsed,
            collectionId: selectedCollection ? selectedCollection.id : 1,
          });

          let saveImageResult = null;

          if (result.savedNft) {
            // Update the NFT image
            saveImageResult = await saveNftImage(previewImage, result.savedNft.id);
            if (saveImageResult.error) {
              // Error with saving the image, show modal
              showErrorModal(true);
              return;
            }
          }

          if (!saveImageResult) return;

          const savedNFTS = await getSavedNfts();
          setSavedNfts(savedNFTS);

          document.getElementById('congrats-hidden-btn').click();
        } else {
          onEditSavedNft();
        }
        setShowModal(false);
        document.body.classList.remove('no__scroll');
      }
    }
    if (mintNowClick) {
      console.log('MINTING..........');
      if (!errors.name && !errors.edition && !errors.previewImage && royaltyValidAddress) {
        const userAddress = localStorage.getItem('user_address');

        const royaltiesParsed = royalities ? parseRoyalties(royaltyAddress) : [];
        const royaltiesFormated = royaltiesParsed.length
          ? formatRoyaltiesForMinting(royaltiesParsed)
          : [];

        console.log(selectedCollection.id);

        const tokenURIResult = await getTokenURI({
          file: previewImage,
          name,
          description,
          editions,
          properties,
          royaltiesParsed,
          selectedCollection: selectedCollection.id,
        });

        console.log('sending request to contract...', tokenURIResult);

        // call contract
        const mintTx = await universeERC721CoreContract.mint(
          userAddress,
          tokenURIResult[0],
          royaltiesFormated
        );

        const receipt = await mintTx.wait();

        console.log('printing receipt...', receipt);

        const mintedNfts = await getMyNfts();
        setMyNFTs(mintedNfts);

        document.getElementById('popup-root').remove();
        document.getElementById('congrats-hidden-btn').click();

        setShowModal(false);
        document.body.classList.remove('no__scroll');
      }
    }
  }, [errors, saveForLateClick, savedNfts]);

  useEffect(() => {
    const notValidAddress =
      royaltyAddress?.length &&
      royaltyAddress.find(
        (el) => el.address?.trim().length !== 0 && EthereumAddress.isAddress(el.address) === false
      );
    if (notValidAddress) {
      setRoyaltyValidAddress(false);
    } else {
      setRoyaltyValidAddress(true);
    }
  }, [propertyChangesAddress]);

  return (
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
        {(close) => <LoadingPopup onClose={close} />}
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
        {(close) => <CongratsPopup onClose={close} />}
      </Popup>
      <div className="back-nft" onClick={() => onClick(null)} aria-hidden="true">
        <img src={arrow} alt="back" />
        <span>Create NFT</span>
      </div>
      <h2 className="single-nft-title">{!savedNFTsID ? 'Create single NFT' : 'Edit NFT'}</h2>
      <div className="single-nft-content">
        <div className="single-nft-upload">
          <h5>Upload file</h5>
          <div className="single-nft-upload-file">
            <div className="single-nft-drop-file">
              <img src={cloudIcon} alt="Cloud" />
              <h5>Drop your file here</h5>
              <p>
                <span>( min 800x800px, PNG/JPEG/GIF/WEBP/MP4,</span> <span>max 30mb)</span>
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
            <div className="single-nft-preview">
              <h5>Preview</h5>
              <div className="single-nft-picture">
                {/* It does matter if we show a preview for currently selected file from the pc, or we are going to display the url string from the BE */}
                {previewImage || artWorkType ? (
                  <Popup
                    trigger={
                      <div className="preview__image">
                        <img className="size__up" src={sizeUpIcon} alt="Size Up" />
                        {(previewImage.type === 'video/mp4' || artWorkType === 'mp4') && (
                          <video key={artWorkType}>
                            <source
                              src={
                                artWorkType === 'mp4'
                                  ? previewImage
                                  : URL.createObjectURL(previewImage)
                              }
                              type="video/mp4"
                            />
                            <track kind="captions" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        {previewImage.type === 'audio/mpeg' && (
                          <img className="preview-image" src={mp3Icon} alt="Preview" />
                        )}
                        {previewImage.type !== 'audio/mpeg' &&
                          previewImage.type !== 'video/mp4' &&
                          artWorkType !== 'mp4' && (
                            <img
                              className="preview-image"
                              src={
                                typeof previewImage === 'object'
                                  ? URL.createObjectURL(previewImage)
                                  : previewImage
                              }
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
                        {(previewImage.type === 'video/mp4' || artWorkType === 'mp4') && (
                          <video controls autoPlay>
                            <source
                              src={
                                artWorkType === 'mp4'
                                  ? previewImage
                                  : URL.createObjectURL(previewImage)
                              }
                              type="video/mp4"
                            />
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
                          previewImage.type !== 'video/mp4' &&
                          artWorkType !== 'mp4' && (
                            <img
                              className="preview-image"
                              src={
                                typeof previewImage === 'object'
                                  ? URL.createObjectURL(previewImage)
                                  : previewImage
                              }
                              alt="Preview"
                            />
                          )}
                      </div>
                    )}
                  </Popup>
                ) : (
                  <img className="default-image" src={defaultImage} alt="Preview" />
                )}
              </div>
            </div>
          </div>
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
                  NFTs are minted to our auction contract by default. Turn the toggle on if you want
                  them to be minted to your wallet instead.
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
                {typeof col.coverUrl === 'string' && col.coverUrl.startsWith('#') ? (
                  <div className="random__bg__color" style={{ backgroundColor: col.coverUrl }}>
                    {col.name.charAt(0)}
                  </div>
                ) : (
                  <div>
                    <img src={col.coverUrl} alt={col.name} />
                  </div>
                )}
                <h5>{col.name}</h5>
                <p>{col.tokenName}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="single-nft-properties">
          <div className="single-nft-properties-header">
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
                  Adding properties allows you to specify the character traits. This will allow
                  users to easily search for your NFT.
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
                    className="delete-img"
                    onClick={() => removeProperty(i)}
                    aria-hidden="true"
                  />
                  <Button className="light-border-button" onClick={() => removeProperty(i)}>
                    Remove
                    <img src={delIcon} className="del-icon" alt="Delete" aria-hidden="true" />
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
            {royaltyAddress?.length &&
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
          {/* )} */}
        </div>
        {errors.name || errors.edition || errors.previewImage ? (
          <div className="single__final__error">
            <p className="error-message">
              Something went wrong. Please fix the errors in the fields above and try again. The
              buttons will be enabled after the information has been entered.
            </p>
          </div>
        ) : (
          !errors.name &&
          !errors.edition &&
          !errors.previewImage &&
          !royaltyValidAddress && (
            <div className="single__final__error">
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
      {errorModal && <ServerErrorPopup close={() => showErrorModal(false)} />}
    </div>
  );
};

MintSingleNft.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MintSingleNft;
