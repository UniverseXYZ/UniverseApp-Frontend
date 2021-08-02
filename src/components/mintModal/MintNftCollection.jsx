/* eslint-disable consistent-return */
import React, { useContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import { defaultColors } from '../../utils/helpers.js';
import Input from '../input/Input.jsx';
import Button from '../button/Button.jsx';
import AppContext from '../../ContextAPI';
import CreateNftCol from './CreateNftCol.jsx';
import LoadingPopup from '../popups/LoadingPopup.jsx';
import CongratsPopup from '../popups/CongratsPopup.jsx';
import RemovePopup from '../popups/RemoveNftPopup.jsx';
import arrow from '../../assets/images/arrow.svg';
import union from '../../assets/images/Union.svg';
import editIcon from '../../assets/images/edit.svg';
import removeIcon from '../../assets/images/remove.svg';
import cloudIcon from '../../assets/images/ion_cloud.svg';
import mp3Icon from '../../assets/images/mp3-icon.png';
import videoIcon from '../../assets/images/video-icon.svg';
import {
  getTokenURI,
  saveCollection,
  attachTxHashToCollection,
  getMyCollections,
} from '../../utils/api/mintNFT';
import { chunkifyArray, formatRoyaltiesForMinting } from '../../utils/helpers/contractInteraction';

const MintNftCollection = ({ onClick }) => {
  const {
    setShowModal,
    savedCollections,
    savedNfts,
    savedCollectionID,
    myNFTs,
    setMyNFTs,
    deployedCollections,
    universeERC721CoreContract,
    universeERC721FactoryContract,
    setDeployedCollections,
  } = useContext(AppContext);

  const [collectionNFTs, setCollectionNFTs] = useState([]);
  const [collectionNFTsID, setCollectionNFTsID] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownID, setDropdownID] = useState(0);
  const [showCollectible, setShowCollectible] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [description, setDescription] = useState('');
  const [shortURL, setShortURL] = useState('universe.xyz/c/shorturl');
  const [inputClass, setInputClass] = useState('inp empty');
  const [coverImage, setCoverImage] = useState(null);
  const inputFile = useRef(null);
  const ref = useRef(null);

  const [errors, setErrors] = useState({
    collectionName: '',
    tokenName: '',
    collectible: '',
    shorturl: '',
  });

  const [mintNowClick, setMintNowClick] = useState(false);

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

  const handleEdit = (id) => {
    document.body.classList.add('no__scroll');
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
    if (savedCollectionID) {
      const res = savedCollections.filter((item) => item.id === savedCollectionID);
      setCollectionName(res[0].name);
      setCoverImage(res[0].previewImage);
      setTokenName(res[0].tokenName);
      setDescription(res[0].description);
      setShortURL(res[0].shortURL);
    }
  }, [collectionNFTs]);

  useEffect(async () => {
    if (mintNowClick) {
      if (!errors.collectionName && !errors.tokenName && !errors.shorturl && !errors.collectible) {
        document.getElementById('loading-hidden-btn').click();

        const collectionCreationResult = await saveCollection({
          file: coverImage,
          name: collectionName,
          symbol: tokenName,
          description,
          shortUrl: shortURL,
        });

        if (collectionCreationResult?.id) {
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
                numberOfEditions: Number(nft.numberOfEditions),
                generatedEditions: nft.generatedEditions,
                releasedDate: new Date(),
                royalities: nft.royalities,
                properties: nft.properties,
              });
            });

            const requestData = {
              file: coverImage,
              name: collectionName,
              symbol: tokenName,
              description,
              shortUrl: shortURL,
            };

            const unsignedMintCollectionTx =
              await universeERC721FactoryContract.deployUniverseERC721(collectionName, tokenName);
            const { transactionHash, from } = await unsignedMintCollectionTx.wait();

            const response = await attachTxHashToCollection(
              transactionHash,
              collectionCreationResult.id
            );
            console.log('res', transactionHash, response);
            if (!response.ok && response.status !== 201) {
              console.error(`Error while trying to save a new collection: ${response.statusText}`);
              return;
            }

            const mintFees = [];
            const tokenUriList = [];
            let tokenURIResult;
            let currentNft;
            /* eslint-disable no-await-in-loop */
            for (let i = 0; i < collectionNFTs.length; i += 1) {
              currentNft = collectionNFTs[i];

              tokenURIResult = await getTokenURI({
                file: currentNft.previewImage,
                name: currentNft.name,
                description: currentNft.description,
                editions: currentNft.numberOfEditions,
                properties: currentNft.properties,
                royaltiesParsed: currentNft.royalities,
              });

              tokenUriList.push(tokenURIResult[0]);

              mintFees.push(
                collectionNFTs[i].royalities
                  ? formatRoyaltiesForMinting(collectionNFTs[i].royalities)
                  : []
              );
            }

            const chunksOfMetaData = chunkifyArray(tokenUriList, 40);
            const chunksOfFeeData = chunkifyArray(mintFees, 40);

            for (let chunk = 0; chunk < chunksOfMetaData.length; chunk += 1) {
              console.log(chunksOfFeeData[chunk]);
              const mintTransaction = await universeERC721CoreContract.batchMintWithDifferentFees(
                from,
                chunksOfMetaData[chunk],
                chunksOfFeeData[chunk][0][0] ? chunksOfFeeData[chunk] : [[]]
              );

              const mintReceipt = await mintTransaction.wait();

              console.log('printing receipt...', mintReceipt);
            }
            /* eslint-enable no-await-in-loop */

            setMyNFTs(newMyNFTs);
          }

          const collectionsReturned = await getMyCollections();
          setDeployedCollections(collectionsReturned);

          // setDeployedCollections([
          //   ...deployedCollections,
          //   {
          //     id: collectionCreationResult.id,
          //     previewImage:
          //       coverImage || defaultColors[Math.floor(Math.random() * defaultColors.length)],
          //     name: collectionName,
          //     tokenName,
          //     description,
          //     shortURL,
          //   },
          // ]);

          document.getElementById('popup-root').remove();
          document.getElementById('congrats-hidden-btn').click();

          setTimeout(() => {
            setShowModal(false);
            document.body.classList.remove('no__scroll');
          }, 2000);
        } else {
          console.error('There was an error');
        }
      }
    }
  }, [errors]);

  return !showCollectible ? (
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
      <h2>{!savedCollectionID ? 'Create NFT collection' : 'Edit NFT collection'}</h2>
      <div className="name-image">
        <div className="name-input">
          <div style={{ marginBottom: '10px' }}>
            <Input
              label="Collection name"
              className="inp"
              error={errors.collectionName}
              placeholder="Enter the collection name"
              onChange={(e) => handleCollectionName(e.target.value)}
              value={collectionName}
            />
          </div>
          <Input
            label="Token Name"
            className="inp"
            error={errors.tokenName}
            placeholder="$ART"
            onChange={(e) => handleTokenName(e.target.value)}
            value={tokenName}
          />
          {errors.tokenName === '' && (
            <p className="token-text">Token name cannot be changed in future</p>
          )}
        </div>
        <div className="input-cover">
          <p>Cover image (opt)</p>
          <div className="inp-picture">
            {coverImage && typeof coverImage === 'object' ? (
              <div className="cover-preview">
                <img className="cover-img" src={URL.createObjectURL(coverImage)} alt="Cover" />
                <div>
                  <img
                    className="upload-img"
                    src={cloudIcon}
                    alt="Cloud Icon"
                    onClick={() => inputFile.current.click()}
                    aria-hidden="true"
                  />
                  <p>(min 200x200px, PNG/JPEG/GIF, max 1mb)</p>
                  <Button className="light-border-button" onClick={() => setCoverImage(null)}>
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="icon-div"
                onClick={() => inputFile.current.click()}
                aria-hidden="true"
              >
                <img className="upload-img" src={cloudIcon} alt="Cloud Icon" />
                <p>(min 200x200px, PNG/JPEG/GIF, max 1mb)</p>
              </div>
            )}
          </div>
          <input
            type="file"
            hidden
            className="inp-disable"
            ref={inputFile}
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>
      </div>
      <div className="collection__description">
        <label>Description (optional)</label>
        <textarea
          label="Description (optional)"
          className="inp"
          placeholder="Spread some words about your token collection"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
      <div className="collection__nfts">
        {collectionNFTs.map((nft) => (
          <div className="saved__nft__box" key={uuid()}>
            <div className="saved__nft__box__image">
              {nft.previewImage.type === 'video/mp4' && (
                <video
                  onMouseOver={(event) => event.target.play()}
                  onFocus={(event) => event.target.play()}
                  onMouseOut={(event) => event.target.pause()}
                  onBlur={(event) => event.target.pause()}
                >
                  <source src={URL.createObjectURL(nft.previewImage)} type="video/mp4" />
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              )}
              {nft.previewImage.type === 'audio/mpeg' && (
                <img className="preview-image" src={mp3Icon} alt={nft.name} />
              )}
              {nft.previewImage.type !== 'audio/mpeg' && nft.previewImage.type !== 'video/mp4' && (
                <img
                  className="preview-image"
                  src={URL.createObjectURL(nft.previewImage)}
                  alt={nft.name}
                />
              )}
              {nft.previewImage.type === 'video/mp4' && (
                <img className="video__icon" src={videoIcon} alt="Video Icon" />
              )}
            </div>
            <div className="saved__nft__box__name">
              <h3>{nft.name}</h3>
              <button
                type="button"
                className="three__dots"
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
                      <p>Edit</p>
                      <img src={editIcon} alt="Edit Icon" />
                    </li>
                    <Popup
                      trigger={
                        <li className="remove">
                          <p>Remove</p>
                          <img src={removeIcon} alt="Remove Icon" />
                        </li>
                      }
                    >
                      {(close) => (
                        <RemovePopup
                          close={close}
                          nftID={Number(nft.id)}
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
            <div className="saved__nft__box__footer">
              <div className="collection__details">
                {nft.type === 'collection' && (
                  <>
                    {typeof nft.collectionAvatar === 'string' &&
                    nft.collectionAvatar.startsWith('#') ? (
                      <div
                        className="random__bg__color"
                        style={{ backgroundColor: nft.collectionAvatar }}
                      >
                        {nft.collectionName.charAt(0)}
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(nft.collectionAvatar)}
                        alt={nft.collectionName}
                      />
                    )}
                    <span title={nft.collectionName}>
                      {nft.collectionName.length > 13
                        ? `${nft.collectionName.substring(0, 13)}...`
                        : nft.collectionName}
                    </span>
                  </>
                )}
              </div>
              {nft.generatedEditions.length > 1 ? (
                <div className="collection__count">
                  {`x${nft.generatedEditions.length}`}
                  <div
                    className="generatedEditions"
                    style={{
                      gridTemplateColumns: `repeat(${Math.ceil(
                        nft.generatedEditions.length / 10
                      )}, auto)`,
                    }}
                  >
                    {nft.generatedEditions.map((edition) => (
                      <div key={edition}>{`#${edition}`}</div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="collection__count">{`#${nft.generatedEditions[0]}`}</p>
              )}
            </div>
            {nft.generatedEditions.length > 1 && (
              <>
                <div className="saved__nft__box__highlight__one" />
                <div className="saved__nft__box__highlight__two" />
              </>
            )}
          </div>
        ))}
        {savedCollectionID ? (
          savedNfts.map((nft) =>
            nft.collectionId === savedCollectionID ? (
              <div className="saved__nft__box" key={uuid()}>
                <div className="saved__nft__box__image">
                  {nft.previewImage.type === 'video/mp4' && (
                    <video
                      onMouseOver={(event) => event.target.play()}
                      onFocus={(event) => event.target.play()}
                      onMouseOut={(event) => event.target.pause()}
                      onBlur={(event) => event.target.pause()}
                    >
                      <source src={URL.createObjectURL(nft.previewImage)} type="video/mp4" />
                      <track kind="captions" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {nft.previewImage.type === 'audio/mpeg' && (
                    <img className="preview-image" src={mp3Icon} alt={nft.name} />
                  )}
                  {nft.previewImage.type !== 'audio/mpeg' &&
                    nft.previewImage.type !== 'video/mp4' && (
                      <img
                        className="preview-image"
                        src={URL.createObjectURL(nft.previewImage)}
                        alt={nft.name}
                      />
                    )}
                  {nft.previewImage.type === 'video/mp4' && (
                    <img className="video__icon" src={videoIcon} alt="Video Icon" />
                  )}
                </div>
                <div className="saved__nft__box__name">
                  <h3>{nft.name}</h3>
                  <button
                    type="button"
                    className="three__dots"
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
                          <p>Edit</p>
                          <img src={editIcon} alt="Edit Icon" />
                        </li>
                        <Popup
                          trigger={
                            <li className="remove">
                              <p>Remove</p>
                              <img src={removeIcon} alt="Remove Icon" />
                            </li>
                          }
                        >
                          {(close) => (
                            <RemovePopup
                              close={close}
                              nftID={Number(nft.id)}
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
                <div className="saved__nft__box__footer">
                  <div className="collection__details">
                    {nft.type === 'collection' && (
                      <>
                        {typeof nft.collectionAvatar === 'string' &&
                        nft.collectionAvatar.startsWith('#') ? (
                          <div
                            className="random__bg__color"
                            style={{ backgroundColor: nft.collectionAvatar }}
                          >
                            {nft.collectionName.charAt(0)}
                          </div>
                        ) : (
                          <img
                            src={URL.createObjectURL(nft.collectionAvatar)}
                            alt={nft.collectionName}
                          />
                        )}
                        <span title={nft.collectionName}>
                          {nft.collectionName.length > 13
                            ? `${nft.collectionName.substring(0, 13)}...`
                            : nft.collectionName}
                        </span>
                      </>
                    )}
                  </div>
                  {nft.generatedEditions.length > 1 ? (
                    <div className="collection__count">
                      {`x${nft.generatedEditions.length}`}
                      <div
                        className="generatedEditions"
                        style={{
                          gridTemplateColumns: `repeat(${Math.ceil(
                            nft.generatedEditions.length / 10
                          )}, auto)`,
                        }}
                      >
                        {nft.generatedEditions.map((edition) => (
                          <div key={edition}>{`#${edition}`}</div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="collection__count">{`#${nft.generatedEditions[0]}`}</p>
                  )}
                </div>
                {nft.generatedEditions.length > 1 && (
                  <>
                    <div className="saved__nft__box__highlight__one" />
                    <div className="saved__nft__box__highlight__two" />
                  </>
                )}
              </div>
            ) : (
              <></>
            )
          )
        ) : (
          <></>
        )}
        <div className="create-col" onClick={handleShowCollectible} aria-hidden="true">
          <div className="plus-icon">
            <img src={union} alt="create" />
          </div>
          <div className="collection-t">
            <p>Create NFT collectible</p>
          </div>
        </div>
      </div>
      {errors.collectible && <p className="error-message">{errors.collectible}</p>}
      {(errors.collectionName || errors.tokenName || errors.collectible) && (
        <div className="collection__final__error">
          <p className="error-message">
            Something went wrong. Please fix the errors in the fields above and try again. The
            button will be enabled after fixes.
          </p>
        </div>
      )}

      <div className="collection-buttons">
        {!savedCollectionID ? (
          <>
            <Button
              className="light-button"
              onClick={handleMinting}
              disabled={!collectionName || !tokenName || !shortURL || !collectionNFTs.length}
            >
              Create now
            </Button>
          </>
        ) : (
          <Button
            className="light-button"
            onClick={handleSaveForLater}
            disabled={!collectionName || !tokenName || !shortURL || !collectionNFTs.length}
          >
            Save changes
          </Button>
        )}
      </div>
    </div>
  ) : (
    <CreateNftCol
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

MintNftCollection.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MintNftCollection;
