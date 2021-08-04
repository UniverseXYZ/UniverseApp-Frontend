import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Slider from 'react-slick';
import Popup from 'reactjs-popup';
import { useHistory } from 'react-router-dom';
import Input from '../../input/Input.jsx';
import Button from '../../button/Button.jsx';
import AppContext from '../../../ContextAPI.js';
import NFTCollectible from './NFTCollectible.jsx';
import uploadIcon from '../../../assets/images/ion_cloud.svg';
import closeIcon from '../../../assets/images/close-menu.svg';
import plusIcon from '../../../assets/images/plus.svg';
import bigPlusGradientIcon from '../../../assets/images/Union.svg';
import errorIcon from '../../../assets/images/error-icon.svg';
import editIcon from '../../../assets/images/edit.svg';
import removeIcon from '../../../assets/images/remove.svg';
import videoIcon from '../../../assets/images/video-icon.svg';
import RemovePopup from '../../popups/RemoveNftPopup.jsx';
import testUserImage from '../../../assets/images/marketplace/users/user1.png';
import leftArrow from '../../../assets/images/marketplace/bundles-left-arrow.svg';
import rightArrow from '../../../assets/images/marketplace/bundles-right-arrow.svg';
import LoadingPopup from '../../popups/LoadingPopup.jsx';
import CongratsPopup from '../../popups/CongratsPopup.jsx';
import { defaultColors } from '../../../utils/helpers.js';
import Pagination from '../../pagination/Pagionation.jsx';

const NFTCollectionSettings = ({ showCollectible, setShowCollectible }) => {
  const {
    savedNfts,
    savedCollectionID,
    myNFTs,
    setMyNFTs,
    deployedCollections,
    setDeployedCollections,
  } = useContext(AppContext);

  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(6);

  const ref = useRef(null);
  const inputFile = useRef(null);
  const history = useHistory();

  const [coverImage, setCoverImage] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [description, setDescription] = useState('');
  const [shortURL, setShortURL] = useState('universe.xyz/c/shorturl');
  const [inputClass, setInputClass] = useState('inp empty');
  const [collectionNFTs, setCollectionNFTs] = useState([]);
  const [collectionNFTsID, setCollectionNFTsID] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const [mintNowClick, setMintNowClick] = useState(false);

  const [errors, setErrors] = useState({
    coverImage: '',
    collectionName: '',
    tokenName: '',
    collectible: '',
    shorturl: '',
  });

  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

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

  const handleMinting = () => {
    setMintNowClick(true);
    if (
      !collectionName ||
      !tokenName ||
      !collectionNFTs.length ||
      shortURL.length <= 15 ||
      shortURL === 'universe.xyz/c/shorturl'
    ) {
      setErrors({
        collectionName: !collectionName ? '“Collection name” is not allowed to be empty' : '',
        tokenName: !tokenName ? '“Token name” is not allowed to be empty' : '',
        collectible: !collectionNFTs.length ? '“NFT collectible” is required' : '',
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
      if ((collectionNameExists.length || existsInMyNfts.length) && !savedCollectionID) {
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
      }
    }
  };

  const handleEdit = (id) => {
    setCollectionNFTsID(id);
    setShowCollectible(true);
  };

  const handleClickOutside = (event) => {
    if (!event.target.classList.contains('three__dots')) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (document.getElementById('popup-root')) {
          if (!document.getElementById('popup-root').hasChildNodes()) {
            setShowDropdown(false);
          }
        } else {
          setShowDropdown(false);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    // Prev Icon
    const prev = document.querySelectorAll('.slick-prev');
    if (prev) {
      prev.forEach((el) => {
        const prevIcon = document.createElement('img');
        prevIcon.src = leftArrow;
        el.innerHTML = '';
        el.appendChild(prevIcon);
      });
    }

    // Next icon
    const next = document.querySelectorAll('.slick-next');
    if (next) {
      next.forEach((el) => {
        const nextIcon = document.createElement('img');
        nextIcon.src = rightArrow;
        el.innerHTML = '';
        el.appendChild(nextIcon);
      });
    }
  });

  useEffect(() => {
    if (mintNowClick) {
      if (!errors.collectionName && !errors.tokenName && !errors.shorturl && !errors.collectible) {
        document.getElementById('loading-hidden-btn').click();
        setTimeout(() => {
          document.getElementById('popup-root').remove();
          document.getElementById('congrats-hidden-btn').click();
          setTimeout(() => {
            if (collectionNFTs.length) {
              const newMyNFTs = [...myNFTs];
              collectionNFTs.forEach((nft) => {
                newMyNFTs.push({
                  id: uuid(),
                  type: 'collection',
                  collectionId: collectionName,
                  collectionName,
                  collectionAvatar:
                    coverImage || defaultColors[Math.floor(Math.random() * defaultColors.length)],
                  tokenName,
                  collectionDescription: description,
                  shortURL,
                  previewImage: nft.previewImage,
                  name: nft.name,
                  description: nft.description,
                  numberOfEditions: Number(nft.editions),
                  generatedEditions: nft.generatedEditions,
                  releasedDate: new Date(),
                  properties: nft.properties,
                  royaltySplits: nft.royaltySplits,
                });
              });
              setMyNFTs(newMyNFTs);
            }
            setDeployedCollections([
              ...deployedCollections,
              {
                id: collectionName,
                previewImage:
                  coverImage || defaultColors[Math.floor(Math.random() * defaultColors.length)],
                name: collectionName,
                tokenName,
                description,
                shortURL,
              },
            ]);
          }, 2000);
        }, 3000);
      }
    }
  }, [errors]);

  useEffect(() => {
    console.log('collectionNFTs', collectionNFTs);
  }, [collectionNFTs]);

  return !showCollectible ? (
    <div className="nft--collection--settings--page">
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
        <div className="show--on--mobile--only">
          <h3>
            Cover image <span>(opt)</span>
          </h3>
          <p>(min 200x200px, PNG/JPEG/GIF, max 1mb)</p>
          <Button className="light-border-button" onClick={() => inputFile.current.click()}>
            Choose file
          </Button>
          <input type="file" ref={inputFile} onChange={(e) => validateFile(e.target.files[0])} />
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
            <Button className="light-border-button" onClick={handleShowCollectible}>
              Create NFT
              <img src={plusIcon} alt="Plus" />
            </Button>
          ) : (
            <></>
          )}
        </div>
        {!collectionNFTs.length ? (
          <div className="create--nft--special--btn--box">
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
            <div className="gradient--shadow" />
          </div>
        ) : (
          <></>
        )}
        <div className="browse--nft--list">
          {collectionNFTs.slice(offset, offset + perPage).map((nft) => (
            <div className="nft--box" key={uuid()}>
              <div className="nft--box--header">
                <div className="three--images">
                  <div className="creator--details">
                    <img
                      src={nft.creator.avatar ? nft.creator.avatar : testUserImage}
                      alt={nft.creator.name ? nft.creator.name : 'Test'}
                    />
                    <span className="tooltiptext">{`Creator: ${
                      nft.creator.name ? nft.creator.name : 'Test'
                    }`}</span>
                  </div>
                  <div className="collection--details">
                    {typeof nft.collection.avatar === 'string' &&
                    nft.collection.avatar.startsWith('#') ? (
                      <div
                        className="random--bg--color"
                        style={{ backgroundColor: nft.collection.avatar }}
                      >
                        {nft.collection.name.charAt(0)}
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(nft.collection.avatar)}
                        alt={nft.collection.name}
                      />
                    )}
                    <span className="tooltiptext">{`Collection: ${nft.collection.name}`}</span>
                  </div>
                  <div className="owner--details">
                    <img
                      src={nft.owner.avatar ? nft.owner.avatar : testUserImage}
                      alt={nft.owner.name ? nft.owner.name : 'Test'}
                    />
                    <span className="tooltiptext">{`Owner: ${
                      nft.owner.name ? nft.owner.name : 'Test'
                    }`}</span>
                  </div>
                </div>
                <div className="three--dots">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                      setDropdownID(nft.id);
                    }}
                  >
                    <span />
                    <span />
                    <span />
                    {dropdownID === nft.id && showDropdown && (
                      <ul ref={ref} className="edit__remove">
                        <li className="edit" onClick={() => handleEdit(nft.id)} aria-hidden="true">
                          <img src={editIcon} alt="Edit Icon" />
                          <p>Edit</p>
                        </li>
                        <Popup
                          trigger={
                            <li className="remove">
                              <img src={removeIcon} alt="Remove Icon" />
                              <p>Remove</p>
                            </li>
                          }
                        >
                          {(close) => (
                            <RemovePopup
                              close={close}
                              nftID={nft.id}
                              removedItemName={nft.name}
                              removeFrom="collection"
                              collectionNFTs={collectionNFTs}
                              setCollectionNFTs={setCollectionNFTs}
                            />
                          )}
                        </Popup>
                      </ul>
                    )}
                  </button>
                </div>
              </div>
              <div className="nft--box--body" aria-hidden="true">
                {!nft.allItems.length ? (
                  <div>
                    {nft.previewImage.type !== 'video/mp4' && (
                      <img
                        className="nft--image"
                        src={URL.createObjectURL(nft.previewImage)}
                        alt={nft.name}
                      />
                    )}
                    {nft.previewImage.type === 'video/mp4' && (
                      <video
                        onMouseOver={(event) => event.target.play()}
                        onFocus={(event) => event.target.play()}
                        onMouseOut={(event) => event.target.pause()}
                        onBlur={(event) => event.target.pause()}
                        muted
                      >
                        <source src={URL.createObjectURL(nft.previewImage)} type="video/mp4" />
                        <track kind="captions" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {nft.previewImage.type === 'video/mp4' && (
                      <div className="video__icon">
                        <img src={videoIcon} alt="Video Icon" />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Slider {...sliderSettings}>
                      {nft.allItems.map(
                        (item, index) =>
                          index < 7 && (
                            <div className="slider--box" key={uuid()}>
                              {item.type !== 'video/mp4' && (
                                <img className="nft--image" src={item.url} alt={nft.name} />
                              )}
                              {item.type === 'video/mp4' && (
                                <video
                                  onMouseOver={(event) => event.target.play()}
                                  onFocus={(event) => event.target.play()}
                                  onMouseOut={(event) => event.target.pause()}
                                  onBlur={(event) => event.target.pause()}
                                  muted
                                >
                                  <source src={item.url} type="video/mp4" />
                                  <track kind="captions" />
                                  Your browser does not support the video tag.
                                </video>
                              )}
                              {item.type === 'video/mp4' && (
                                <div className="video__icon">
                                  <img src={videoIcon} alt="Video Icon" />
                                </div>
                              )}
                            </div>
                          )
                      )}
                    </Slider>
                  </>
                )}
              </div>
              <div className="nft--box--footer">
                <div className="name--and--price">
                  <h4>{nft.name}</h4>
                </div>
                <div className="quantity--and--offer">
                  <p>{`${nft.numberOfEditions}/${nft.numberOfEditions}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {collectionNFTs.length > 6 ? (
          <div className="pagination__container">
            <Pagination data={collectionNFTs} perPage={perPage} setOffset={setOffset} />
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
          onClick={handleMinting}
          disabled={!collectionName || !tokenName || !shortURL || !collectionNFTs.length}
        >
          Create collection
        </Button>
      </div>
    </div>
  ) : (
    <NFTCollectible
      setShowCollectible={setShowCollectible}
      collectionName={collectionName}
      coverImage={coverImage}
      collectionNFTs={collectionNFTs}
      setCollectionNFTs={setCollectionNFTs}
      collectionNFTsID={collectionNFTsID}
      setCollectionNFTsID={setCollectionNFTsID}
    />
  );
};

NFTCollectionSettings.propTypes = {
  showCollectible: PropTypes.bool.isRequired,
  setShowCollectible: PropTypes.func.isRequired,
};

export default NFTCollectionSettings;
