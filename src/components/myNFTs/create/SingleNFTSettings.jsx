/* eslint-disable no-debugger */
import React, { useRef, useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import { useLocation } from 'react-router-dom';
import { Contract } from 'ethers';
import './CreateSingleNft.scss';
import EthereumAddress from 'ethereum-address';
import Button from '../../button/Button.jsx';
import Input from '../../input/Input.jsx';
import AppContext from '../../../ContextAPI';
import LoadingPopup from '../../popups/LoadingPopup.jsx';
import CongratsPopup from '../../popups/CongratsPopup.jsx';
import AreYouSurePopup from '../../popups/AreYouSurePopup';
import arrow from '../../../assets/images/arrow.svg';
import infoIcon from '../../../assets/images/icon.svg';
import defaultImage from '../../../assets/images/default-img.svg';
import deleteIcon from '../../../assets/images/delred-icon.svg';
import mp3Icon from '../../../assets/images/mp3-icon.png';
import addIcon from '../../../assets/images/Add.svg';
import cloudIcon from '../../../assets/images/gray_cloud.svg';
import createIcon from '../../../assets/images/create.svg';
import delIcon from '../../../assets/images/delete-red.svg';
import closeIcon from '../../../assets/images/cross-sidebar.svg';
import redIcon from '../../../assets/images/red-msg.svg';
import CreateCollectionPopup from '../../popups/CreateCollectionPopup.jsx';
import {
  saveNftForLater,
  saveNftImage,
  getSavedNfts,
  updateSavedForLaterNft,
  getTokenURI,
  getMetaForSavedNft,
  getMyNfts,
} from '../../../utils/api/mintNFT';
import {
  parseRoyalties,
  parseProperties,
  parsePropertiesForFrontEnd,
  formatRoyaltiesForMinting,
} from '../../../utils/helpers/contractInteraction';
import SuccessPopup from '../../popups/SuccessPopup.jsx';
import { RouterPrompt } from '../../../utils/routerPrompt';
import { parseDataForBatchMint } from '../../../utils/helpers/pureFunctions/minting';
import { useMyNftsContext } from '../../../contexts/MyNFTsContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useErrorContext } from '../../../contexts/ErrorContext';

const SingleNFTSettings = () => {
  const {
    savedNfts,
    setSavedNfts,
    setShowModal,
    savedNFTsID,
    setSavedNFTsID,
    myNFTs,
    setMyNFTs,
    collectionsIdAddressMapping,
  } = useMyNftsContext();

  const { deployedCollections, universeERC721CoreContract, address, contracts, signer } =
    useAuthContext();
  const { setShowError } = useErrorContext();
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
  const [editions, setEditions] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [hideIcon, setHideIcon] = useState(false);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideRoyalitiesInfo, setHideRoyalitiesInfo] = useState(false);
  const [percentAmount, setPercentAmount] = useState('');
  const [royalities, setRoyalities] = useState(true);
  const [propertyCheck, setPropertyCheck] = useState(true);
  const inputFile = useRef(null);
  const [properties, setProperties] = useState([
    { name: '', value: '', errors: { name: '', value: '' } },
  ]);
  const [royaltyAddress, setRoyaltyAddress] = useState([{ address: '', amount: '' }]);

  const [royaltyValidAddress, setRoyaltyValidAddress] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [amountSum, setAmountSum] = useState(0);
  const [showCongratsPopup, setShowCongratsPopup] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [border, setBorder] = useState(false);

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
    const temp = { name: '', value: '', errors: { name: '', value: '' } };
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
    const newProperties = royaltyAddress.map((royalty, royaltyIndex) => {
      if (royaltyIndex === index) {
        return {
          ...royalty,
          amount: val,
        };
      }
      return royalty;
    });
    const result = newProperties.reduce(
      (accumulator, current) => accumulator + Number(current.amount),
      0
    );
    if (result <= 100 && val >= 0) {
      setRoyaltyAddress(newProperties);
    }
  };

  const handleCloseCongratsPopup = (close) => {
    if (location.pathname === '/create-tiers/my-nfts/create') {
      closeCongratsPopupEvent();
    } else {
      close();
    }
  };

  const propertyChangesName = (index, val) => {
    const newProperties = [...properties];
    newProperties[index].name = val;

    // In case the data is fetched from the server it wont have the custom state defiend in this component, so we need to add it
    if (!newProperties[index].errors) {
      newProperties[index].errors = { name: '', value: '' };
    }

    newProperties[index].errors.name = !val ? '“Property name” is not allowed to be empty' : '';
    setProperties(newProperties);
  };

  const propertyChangesValue = (index, value) => {
    const newProperties = [...properties];
    newProperties[index].value = value;
    newProperties[index].errors.value = !value ? '“Property value” is not allowed to be empty' : '';
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
      setPreviewImage('');
      setErrors({
        ...errors,
        previewImage: 'File format must be PNG, JPEG, MP3, GIF, WEBP or MP4 (Max Size: 30mb)',
      });
    } else if (
      (file.type === 'audio/mpeg' ||
        file.type === 'video/mp4' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/webp' ||
        file.type === 'audio/mpeg' ||
        file.type === 'image/gif' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png') &&
      file.size / 1048576 < 30
    ) {
      setPreviewImage(file);
      setErrors({ ...errors, previewImage: '' });
    } else {
      setPreviewImage('');
      setErrors({
        ...errors,
        previewImage: 'File format must be PNG, JPEG, MP3, GIF, WEBP or MP4 (Max Size: 30mb)',
      });
    }
  };

  const closeLoadingModal = () => {
    setShowModal(false);
    document.body.classList.remove('no__scroll');
  };

  const onMintNft = async () => {
    document.getElementById('loading-hidden-btn').click();
    document.body.classList.add('no__scroll');

    // NFT data to generate token URI
    const data = {
      file: previewImage,
      name,
      description,
      editions,
      propertiesParsed: propertyCheck ? parseProperties(properties) : [],
      royaltiesParsed: royalities ? parseRoyalties(royaltyAddress) : [],
    };

    // Get the contract instance to mint from
    const collectionContract =
      selectedCollection && selectedCollection.address
        ? new Contract(selectedCollection.address, contracts.UniverseERC721.abi, signer)
        : universeERC721CoreContract;

    // Update saved NFT data, before getting the TokenURI
    if (savedNFTsID) {
      // Attach the needed data to identify the NFT and its Collection
      data.id = savedNFTsID;
      data.collectionId = selectedCollection?.id;

      let result = await updateSavedForLaterNft(data);

      if (!result.message) {
        const updateNFTImage = result.id && typeof previewImage === 'object';
        if (updateNFTImage) {
          const saveImageRes = await saveNftImage(previewImage, result.id);
          result = saveImageRes;
        }
      }

      if (result?.error) {
        showErrorModal(true);
        return;
      }
    }

    // Get the Token URIs from the BE
    const tokenURIs = savedNFTsID ? await getMetaForSavedNft(savedNFTsID) : await getTokenURI(data);

    // Prepare the data for the smart contract
    const parsedRoyalties = formatRoyaltiesForMinting(data.royaltiesParsed);
    const tokenURIsAndRoyalties = tokenURIs.map((token) => ({
      token,
      royalties: parsedRoyalties,
    }));
    const { tokensChunks, royaltiesChunks } = parseDataForBatchMint(tokenURIsAndRoyalties);

    // Mint the data on Chunks
    const mintPromises = tokensChunks.map(async (chunk, i) => {
      const mintTransaction = await collectionContract.batchMintWithDifferentFees(
        address,
        chunk,
        royaltiesChunks[i]
      );
      const mintReceipt = await mintTransaction.wait();
      return mintReceipt.status;
    });

    const res = await Promise.all(mintPromises);

    const hasFailedTransaction = res.includes(0);
    if (!hasFailedTransaction) {
      try {
        const serverProcessTime = 5000; // The BE needs some time to catch the transaction
        setTimeout(async () => {
          const [mintedNFTS, savedNFTS] = await Promise.all([getMyNfts(), getSavedNfts()]);
          setMyNFTs(mintedNFTS || []);

          setSavedNfts(savedNFTS || []);

          document.getElementById('loading-hidden-btn').click();
          document.getElementById('popup-root').remove();
          document.getElementById('congrats-hidden-btn').click();

          closeLoadingModal();
          setName('');
          setDescription('');
          setEditions('');
          setPreviewImage('');
          setProperties([{ name: '', value: '', errors: { name: '', value: '' } }]);
          setRoyaltyAddress([{ address: '', amount: '' }]);
        }, serverProcessTime);
      } catch (e) {
        // TODO:: Add modal with the error text
        console.error(e, 'Error !');
        setShowError(true);
      }
    } else {
      // TODO:: Add Error Handling
      console.error(e, 'Error !');
      setShowError(true);
    }
  };

  const onSaveNftForLaterMinting = async () => {
    document.getElementById('loading-hidden-btn').click();

    const royaltiesParsed = royalities ? parseRoyalties(royaltyAddress) : [];
    const propertiesParsed = propertyCheck ? parseProperties(properties) : [];

    const nftData = {
      name,
      description,
      editions,
      propertiesParsed,
      royaltiesParsed,
      collectionId: selectedCollection?.id,
    };

    const result = await saveNftForLater(nftData);
    let saveImageResult;

    if (result.savedNft) saveImageResult = await saveNftImage(previewImage, result.savedNft.id);

    // failed to upload image, but saved nft
    if (!saveImageResult) {
      console.error('server error. cant get meta data');
      // showErrorModal(true);
    }

    const savedNFTS = await getSavedNfts();
    setSavedNfts(savedNFTS || []);

    document.getElementById('congrats-hidden-btn').click();
    closeLoadingModal();
    setName('');
    setDescription('');
    setEditions('');
    setPreviewImage('');
    setProperties([{ name: '', value: '', errors: { name: '', value: '' } }]);
    setRoyaltyAddress([{ address: '', amount: '' }]);
  };

  const validateEdition = (e) => {
    const value = e.target.value.replace(/[^\d]/, '');
    if (parseInt(value, 10) !== 0) {
      setEditions(value);
      setErrors({
        ...errors,
        edition: !e.target.value ? '“Number of editions” is not allowed to be empty' : '',
      });
      setMintNowClick(false);
      setSaveForLateClick(false);
    }
  };

  const onEditSavedNft = async () => {
    document.getElementById('loading-hidden-btn').click();

    const royaltiesParsed = royalities ? parseRoyalties(royaltyAddress) : [];
    const propertiesParsed = propertyCheck ? parseProperties(properties) : [];

    const nftData = {
      name,
      description,
      editions,
      propertiesParsed,
      royaltiesParsed,
      id: savedNFTsID,
      collectionId: selectedCollection?.id,
    };

    let result = await updateSavedForLaterNft(nftData);

    if (!result.message) {
      const updateNFTImage = result.id && typeof previewImage === 'object';
      if (updateNFTImage) {
        const saveImageRes = await saveNftImage(previewImage, result.id);
        result = saveImageRes;
      }
    }

    if (result?.error) {
      showErrorModal(true);
      return;
    }

    const savedNFTS = await getSavedNfts();
    setSavedNfts(savedNFTS || []);

    document.getElementById('congrats-hidden-btn').click();
    closeLoadingModal();
    setName('');
    setDescription('');
    setEditions('');
    setPreviewImage('');
    setProperties([{ name: '', value: '', errors: { name: '', value: '' } }]);
    setRoyaltyAddress([{ address: '', amount: '' }]);
  };

  const getPreviewImageSource = useMemo(() => {
    if (typeof previewImage === 'string') {
      return previewImage;
    }
    return URL.createObjectURL(previewImage);
  }, [previewImage]);

  const previewVideoSource = typeof previewImage === 'string' && previewImage.endsWith('.mp4');

  // DRAG functionality
  const onDrop = (e) => {
    e.preventDefault();
    const {
      dataTransfer: { files },
    } = e;
    validateFile(files[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setBorder(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setBorder(false);
  };

  useEffect(async () => {
    if (saveForLateClick) {
      if (!errors.name && !errors.edition && !errors.previewImage) {
        if (!savedNFTsID) {
          onSaveNftForLaterMinting();
        } else {
          onEditSavedNft();
        }
      }
    }
    if (mintNowClick) {
      if (!errors.name && !errors.edition && !errors.previewImage && royaltyValidAddress) {
        onMintNft();
      }
    }
  }, [errors, saveForLateClick]);

  useEffect(() => {
    // This means it's editing an saved nft
    if (savedNFTsID) {
      const res = savedNfts.filter((item) => item.id === savedNFTsID)[0];
      if (res) {
        const parsedProperties = res.properties
          ? parsePropertiesForFrontEnd(res.properties)
          : [{ name: '', value: '', errors: { name: '', value: '' } }];
        setName(res.name);
        setDescription(res.description);
        setEditions(res.numberOfEditions);
        setPreviewImage(res.url);
        setRoyaltyAddress(res.royalties);
        setRoyaltyAddress(res.royalties || [{ name: '', value: '' }]);
        setProperties(parsedProperties);
        if (res.collectionId) {
          const getCollection = deployedCollections.filter((col) => col.id === res.collectionId)[0];
          if (getCollection) {
            setSelectedCollection(getCollection);
          }
        }
      }
    }

    return function resetSavedNFTsID() {
      setSavedNFTsID(null);
    };
  }, []);

  useEffect(() => {
    setShowPrompt(true);
  }, [location.pathname]);

  return (
    <div className="single__nft">
      <div className="mintNftCollection-div">
        <RouterPrompt
          when={showPrompt}
          onOK={() => true}
          editing={
            !!(
              name ||
              editions ||
              previewImage ||
              description ||
              properties[0].name ||
              properties[0].value ||
              properties[1] ||
              royaltyAddress[0].address ||
              royaltyAddress[0].amount ||
              royaltyAddress[1]
            )
          }
        />
        <Popup
          trigger={
            <button
              type="button"
              id="loading-hidden-btn"
              aria-label="hidden"
              style={{ display: 'none' }}
            />
          }
          closeOnDocumentClick={false}
        >
          {(close) =>
            showCongratsPopup ? (
              ''
            ) : (
              <LoadingPopup
                text="The NFT will appear, after the transaction finishes. Please wait..."
                onClose={close}
              />
            )
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
          closeOnDocumentClick={false}
        >
          {(close) => (
            <CongratsPopup
              onClose={() => handleCloseCongratsPopup(close)}
              backButtonText={
                location.pathname === '/create-tiers/my-nfts/create'
                  ? 'Go to reward tier settings'
                  : 'Go to my NFTs'
              }
              message="NFT was successfully created and should be displayed in your wallet shortly"
            />
          )}
        </Popup>
        <Popup
          trigger={
            <button
              type="button"
              id="success-hidden-btn"
              aria-label="hidden"
              style={{ display: 'none' }}
            />
          }
        >
          {(close) => (
            <CongratsPopup
              onClose={close}
              title="Success!"
              message="NFT was successfully saved for later"
            />
          )}
        </Popup>
        {/* <div className="back-nft" onClick={() => onClick(null)} aria-hidden="true">
        <img src={arrow} alt="back" />
        <span>Create NFT</span>
      </div> */}
        {/* <h2 className="single-nft-title">{!savedNFTsID ? 'Single NFT settings' : 'Edit NFT'}</h2> */}
        <div className="single-nft-content">
          <div className="single-nft-upload">
            <h5>Upload file</h5>
            <div
              className={`dropzone ${errors.previewImage ? 'error' : ''}`}
              onDrop={(e) => onDrop(e)}
              onDragOver={(e) => onDragOver(e)}
              onDragLeave={(e) => onDragLeave(e)}
            >
              {previewImage ? (
                <div className="single-nft-preview">
                  <img
                    className="close"
                    src={closeIcon}
                    alt="Close"
                    onClick={() => {
                      setPreviewImage('');
                      setBorder(false);
                    }}
                    aria-hidden="true"
                  />
                  <div className="single-nft-picture">
                    <div className="preview__image">
                      {previewImage.type === 'video/mp4' && (
                        <video
                          onMouseOver={(event) => event.target.play()}
                          onFocus={(event) => event.target.play()}
                          onMouseOut={(event) => event.target.pause()}
                          onBlur={(event) => event.target.pause()}
                        >
                          <source src={getPreviewImageSource} type="video/mp4" />
                          <track kind="captions" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {previewImage.type === 'audio/mpeg' && (
                        <img className="preview-image" src={mp3Icon} alt="Preview" />
                      )}
                      {previewImage.type !== 'audio/mpeg' &&
                        previewImage.type !== 'video/mp4' &&
                        !previewVideoSource && (
                          <img
                            className="preview-image"
                            src={getPreviewImageSource}
                            alt="Preview"
                          />
                        )}
                      {previewVideoSource && (
                        <video
                          onMouseOver={(event) => event.target.play()}
                          onFocus={(event) => event.target.play()}
                          onMouseOut={(event) => event.target.pause()}
                          onBlur={(event) => event.target.pause()}
                        >
                          <source src={getPreviewImageSource} type="video/mp4" />
                          <track kind="captions" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={
                    errors.previewImage
                      ? 'single-nft-upload-file error'
                      : `single-nft-upload-file ${border ? 'single-nft-upload-file-border' : ''}`
                  }
                >
                  <div className="single-nft-drop-file">
                    <img src={cloudIcon} alt="Cloud" />
                    <h5>Drop your file here</h5>
                    <p>
                      <span>( min 800x800px, PNG/JPEG/MP3/GIF/WEBP/MP4,</span>
                      <span>max 30mb)</span>
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
            {/* {previewImage ? (
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
                        <source src={getPreviewImageSource(previewImage)} type="video/mp4" />
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
                        src={getPreviewImageSource(previewImage)}
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
            )} */}
          </div>
          {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}
          <div className="single-nft-name">
            <h5>Name</h5>
            <Input
              className="inp"
              error={errors.name}
              placeholder="Enter NFT name"
              hoverBoxShadowGradient
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
              placeholder="Spread some words about your NFT"
              className="inp"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <div className="box--shadow--effect--block" />
          </div>
          <div className="single-nft-editions">
            <div className="single-nft-edition-header">
              <h5 onMouseEnter={() => setHideIcon(true)} onMouseLeave={() => setHideIcon(false)}>
                Number of editions <img src={infoIcon} alt="Info Icon" />
              </h5>
              {hideIcon && (
                <div className="info-text">
                  <p>The number of copies that can be minted.</p>
                </div>
              )}
            </div>
            <Input
              className="inp"
              error={errors.edition}
              hoverBoxShadowGradient
              placeholder="Enter Number of Editions"
              onChange={validateEdition}
              value={editions}
            />
          </div>
          {deployedCollections.length ? (
            <div className="single-nft-choose-collection">
              <h4>Choose collection</h4>
              {/* {deployedCollections.length ? <h4>Choose collection</h4> : <></>} */}
              {/* {!deployedCollections.length && !savedNFTsID ? <h4>Choose collection</h4> : <></>} */}
              <div className="choose__collection">
                {/* {!savedNFTsID && ( */}
                {/* <Popup
                  trigger={
                    <div className="collection-box">
                      <div className="create">
                        <img aria-hidden="true" src={createIcon} alt="Create Icon" />
                        <h5>Create</h5>
                        <p>ERC-721</p>
                      </div>
                      <div className="box--shadow--effect--block" />
                    </div>
                  }
                >
                  {(close) => <CreateCollectionPopup onClose={close} />}
                </Popup> */}
                {/* )} */}
                {deployedCollections.map((col) => (
                  <div className="collection-box" key={uuid()}>
                    <div
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
                      {typeof col.coverUrl === 'string' && col?.coverUrl?.startsWith('#') ? (
                        <div
                          className="random__bg__color"
                          style={{ backgroundColor: col.coverUrl }}
                        >
                          {col.name.charAt(0)}
                        </div>
                      ) : (
                        <div>
                          <img src={col.coverUrl} alt={col.name} />
                        </div>
                      )}
                      <h5 className="collection-name">{col.name}</h5>
                      <p>{col.tokenName}</p>
                    </div>
                    <div className="box--shadow--effect--block" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
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
            {properties?.map(
              (elm, i) =>
                propertyCheck && (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={i} className="properties">
                    <div className="property-name">
                      <h5>Property name</h5>
                      <Input
                        className="inp"
                        error={elm.errors?.name}
                        placeholder="Colour"
                        value={elm.name}
                        onChange={(e) => propertyChangesName(i, e.target.value)}
                      />
                    </div>
                    <div className="property-value">
                      <h5>Value</h5>
                      <Input
                        className="inp"
                        error={elm.errors?.value}
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
                  className="light-border-button"
                  onClick={handleSaveForLater}
                  disabled={errors.name || errors.edition || errors.previewImage}
                >
                  Save for later
                </Button>
                <Button
                  className="light-button"
                  onClick={handleMinting}
                  disabled={
                    !name ||
                    !editions ||
                    !previewImage ||
                    (propertyCheck &&
                      properties.find((property) => property.name === '' || property.value === ''))
                  }
                >
                  Mint now
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="light-border-button"
                  onClick={handleSaveForLater}
                  disabled={errors.name || errors.edition || errors.previewImage}
                >
                  Save
                </Button>
                <Button
                  className="light-button"
                  onClick={handleMinting}
                  disabled={
                    !name ||
                    !editions ||
                    !previewImage ||
                    (propertyCheck &&
                      properties.find((property) => property.name === '' || property.value === ''))
                  }
                >
                  Mint now
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNFTSettings;
