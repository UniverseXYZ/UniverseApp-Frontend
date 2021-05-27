import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
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
import delateIcon from '../../assets/images/inactive.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import addIcon from '../../assets/images/Add.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import createIcon from '../../assets/images/create.svg';
import universeImage from '../../assets/images/universe-img.svg';
import CreateCollectionPopup from '../popups/CreateCollectionPopup.jsx';

const MintSingleNft = ({ onClick }) => {
  const { savedNfts, setSavedNfts, setShowModal, savedNFTsID, myNFTs, setMyNFTs } = useContext(
    AppContext
  );
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
  const [royalities, setRoyalities] = useState(true);
  const [hideProperties, setHideProperties] = useState(false);
  const [propertyCheck, setPropertyCheck] = useState(true);
  const inputFile = useRef(null);
  const [properties, setProperties] = useState([{ name: '', value: '' }]);
  const [editableNFTType, setEditableNFTType] = useState('');

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

  const location = useLocation();
  const isCreatingAction = location.pathname === '/select-nfts';

  useEffect(() => {
    if (savedNFTsID) {
      const res = savedNfts.filter((item) => item.id === savedNFTsID);
      setName(res[0].name);
      setDescription(res[0].description);
      setEditions(res[0].numberOfEditions);
      setPreviewImage(res[0].previewImage);
      setPercentAmount(res[0].percentAmount);
      setProperties(res[0].properties);
      setEditableNFTType(res[0].type);
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
          setSavedNfts([
            ...savedNfts,
            {
              id: uuid(),
              previewImage,
              name,
              description,
              numberOfEditions: editions,
              generatedEditions,
              properties,
              percentAmount,
              type: 'single',
              selected: false,
            },
          ]);
        } else {
          setSavedNfts(
            savedNfts.map((item) =>
              item.id === savedNFTsID
                ? {
                    ...item,
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
      if (!errors.name && !errors.edition && !errors.previewImage) {
        document.getElementById('loading-hidden-btn').click();
        setTimeout(() => {
          document.getElementById('popup-root').remove();
          document.getElementById('congrats-hidden-btn').click();
          setTimeout(() => {
            const mintingGeneratedEditions = [];

            for (let i = 0; i < editions; i += 1) {
              mintingGeneratedEditions.push(uuid().split('-')[0]);
            }
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
            setShowModal(false);
            document.body.classList.remove('no__scroll');
          }, 2000);
        }, 3000);
      }
    }
  }, [errors, saveForLateClick, savedNfts]);

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
              <Animated animationIn="zoomIn">
                <div className="info-text">
                  <p>
                    NFTs are minted to our auction contract by default. Turn the toggle on if you
                    want them to be minted to your wallet instead.
                  </p>
                </div>
              </Animated>
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
          <h4>Choose collection</h4>
          <div className="choose__collection">
            <div className="create">
              <Popup trigger={<img aria-hidden="true" src={createIcon} alt="Create Icon" />}>
                {(close) => <CreateCollectionPopup onClose={close} />}
              </Popup>

              <h5>Create</h5>
              <p>ERC-721</p>
            </div>
            <div className="universe">
              <img src={universeImage} alt="Universe" />
              <h5>Universe</h5>
              <p>XYZ</p>
            </div>
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
              <Animated animationIn="zoomIn">
                <div className="properties-info-text">
                  <p>
                    Adding properties allows you to specify the character traits. This will allow
                    users to easily search for your NFT.
                  </p>
                </div>
              </Animated>
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
              // eslint-disable-next-line react/no-array-index-key
              propertyCheck && (
                <div className="properties">
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
                    src={delateIcon}
                    alt="Delete"
                    onClick={() => removeProperty(i)}
                    aria-hidden="true"
                  />
                  <Button className="light-border-button" onClick={() => removeProperty(i)}>
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
          {editableNFTType !== 'collection' && (
            <div className="royalities">
              <div className="title">
                <h4
                  onMouseOver={() => setHideRoyalitiesInfo(true)}
                  onFocus={() => setHideRoyalitiesInfo(true)}
                  onMouseLeave={() => setHideRoyalitiesInfo(false)}
                  onBlur={() => setHideRoyalitiesInfo(false)}
                >
                  Royalties <img src={infoIcon} alt="Info Icon" />
                </h4>
                {hideRoyalitiesInfo && (
                  <Animated animationIn="zoomIn" style={{ position: 'relative' }}>
                    <div className="royalities-info-text">
                      <p>
                        Royalties determines the percentage you, as a creator, will get from sales
                        of this NFT on the secondary markets.
                      </p>
                    </div>
                  </Animated>
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
              {royalities && (
                <Animated animationIn="fadeIn">
                  <div className="percent__amount">
                    <div className="inp__container">
                      <Input
                        type="text"
                        label="Percent amount"
                        inputMode="numeric"
                        pattern="[0-9]"
                        placeholder="Enter percent amount"
                        value={percentAmount}
                        onChange={(e) => handleInputChange(e.target.value)}
                      />
                      <span>%</span>
                    </div>
                    <span className="suggested">Suggested: 10%, 20%, 30%</span>
                  </div>
                </Animated>
              )}
            </div>
          )}
        </div>
        {(errors.name || errors.edition || errors.previewImage) && (
          <div className="single__final__error">
            <p className="error-message">
              Something went wrong. Please fix the errors in the fields above and try again. The
              buttons will be enabled after the information has been entered.
            </p>
          </div>
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
  );
};

MintSingleNft.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MintSingleNft;
