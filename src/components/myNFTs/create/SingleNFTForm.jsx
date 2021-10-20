/* eslint-disable no-debugger */
import React, { useRef, useState, useEffect, useMemo } from 'react';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import { useLocation } from 'react-router-dom';
import { Contract, utils } from 'ethers';
import './CreateSingleNft.scss';
import Button from '../../button/Button.jsx';
import Input from '../../input/Input.jsx';
import LoadingPopup from '../../popups/LoadingPopup.jsx';
import CongratsPopup from '../../popups/CongratsPopup.jsx';
import infoIcon from '../../../assets/images/icon.svg';
import deleteIcon from '../../../assets/images/delred-icon.svg';
import mp3Icon from '../../../assets/images/mp3-icon.png';
import addIcon from '../../../assets/images/Add.svg';
import cloudIcon from '../../../assets/images/gray_cloud.svg';
import closeIcon from '../../../assets/images/cross-sidebar.svg';
import redIcon from '../../../assets/images/red-msg.svg';
import {
  saveNftForLater,
  saveNftImage,
  getSavedNfts,
  updateSavedForLaterNft,
  getTokenURI,
  getMetaForSavedNft,
  getMyNfts,
  createMintingNFT,
  getMyMintingNfts,
} from '../../../utils/api/mintNFT';
import {
  parseRoyalties,
  parseProperties,
  parsePropertiesForFrontEnd,
  formatRoyaltiesForMinting,
} from '../../../utils/helpers/contractInteraction';
import { RouterPrompt } from '../../../utils/routerPrompt';
import { parseDataForBatchMint } from '../../../utils/helpers/pureFunctions/minting';
import { useMyNftsContext } from '../../../contexts/MyNFTsContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useErrorContext } from '../../../contexts/ErrorContext';
import CollectionChoice from './CollectionChoice';

const MAX_FIELD_CHARS_LENGTH = {
  name: 32,
  description: 1024,
  editions: 10000,
  propertyName: 50,
  propertyValue: 50,
  propertiesCount: 50,
  royaltiesCount: 5,
};

const COLLECTIONS_PER_ROW = 4;

const SingleNFTForm = () => {
  const {
    savedNfts,
    setSavedNfts,
    savedNFTsID,
    setSavedNFTsID,
    myNFTs,
    setMyNFTs,
    setMyMintingNFTs,
    activeTxHashes,
    setActiveTxHashes,
    mintingNftsCount,
    setMintingNftsCount,
    universeCollection,
  } = useMyNftsContext();

  const { deployedCollections, universeERC721CoreContract, address, contracts, signer } =
    useAuthContext();

  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();

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
  const [showCreateMoreButton, setShowCreateMoreButton] = useState(true);
  const [editions, setEditions] = useState(1);
  const [previewImage, setPreviewImage] = useState('');
  const [hideIcon, setHideIcon] = useState(false);
  const [hideIcon1, setHideIcon1] = useState(false);
  const [hideRoyalitiesInfo, setHideRoyalitiesInfo] = useState(false);
  const [royalities, setRoyalities] = useState(true);
  const [propertyCheck, setPropertyCheck] = useState(true);
  const inputFile = useRef(null);
  const [properties, setProperties] = useState([
    { name: '', value: '', errors: { name: '', value: '' } },
  ]);
  const [royaltyAddress, setRoyaltyAddress] = useState([{ address, amount: '10' }]);

  const [royaltyValidAddress, setRoyaltyValidAddress] = useState(true);
  const [royaltiesMapIndexes, setRoyaltiesMapIndexes] = useState({});
  const [propertiesIndexes, setPropertiesMapIndexes] = useState({});
  const [selectedCollection, setSelectedCollection] = useState(universeCollection);
  const [showCongratsPopup, setShowCongratsPopup] = useState(false);
  const [showCongratsMintedSavedForLater, setShowCongratsMintedSavedForLater] = useState(false);
  const [showCongratsPopupOnSaveForLaterClick, setShowCongratsPopupOnSaveForLaterClick] =
    useState(false);
  const [showLoadingPopup, setShowLoadingPopup] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [border, setBorder] = useState(false);

  useEffect(() => {
    setSelectedCollection(universeCollection);
  }, [universeCollection]);

  const hasAddressError = (royalty, index) => {
    if (royalty && royaltiesMapIndexes[royalty]) {
      const isRepeated = royaltiesMapIndexes[royalty].length > 1;
      if (!isRepeated) return false;
      const firstAppearenceIndex = royaltiesMapIndexes[royalty][0];
      if (index !== firstAppearenceIndex) return 'Duplicated address';
    }
    return false;
  };

  const hasPropError = (value, index) => {
    if (value && propertiesIndexes[value]) {
      const isRepeated = propertiesIndexes[value].length > 1;
      if (!isRepeated) return false;
      const firstAppearenceIndex = propertiesIndexes[value][0];
      if (index !== firstAppearenceIndex) return 'Duplicated property name';
    }
    return false;
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

    const addressErrors = temp.filter((prop) => prop.error !== '');
    setRoyaltyValidAddress(!addressErrors.length);
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
    prevProperties[index].error = !utils.isAddress(val) ? 'Please enter valid address' : '';
    const addressErrors = prevProperties.filter((prop) => prop.error !== '');

    const lastAddress = prevProperties[index].address;

    // eslint-disable-next-line no-restricted-syntax
    for (const r in royaltiesMapIndexes) {
      if (royaltiesMapIndexes[r].includes(index)) {
        if (royaltiesMapIndexes[r].length > 1) {
          royaltiesMapIndexes[r].splice(royaltiesMapIndexes[r].indexOf(index), 1);
        } else {
          delete royaltiesMapIndexes[r];
        }
      }
    }

    if (royaltiesMapIndexes[lastAddress] && royaltiesMapIndexes[lastAddress].includes(index)) {
      if (royaltiesMapIndexes.length === 1) {
        delete royaltiesMapIndexes[lastAddress];
      } else {
        royaltiesMapIndexes[lastAddress].splice(royaltiesMapIndexes[r].indexOf(index), 1);
      }
    }
    if (royaltiesMapIndexes[val] && !royaltiesMapIndexes[val].includes(index)) {
      royaltiesMapIndexes[val].push(index);
    } else {
      royaltiesMapIndexes[val] = [];
      royaltiesMapIndexes[val].push(index);
    }

    setRoyaltiesMapIndexes(royaltiesMapIndexes);
    setRoyaltyAddress(prevProperties);
    setRoyaltyValidAddress(!addressErrors.length);
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

  const propertyChangesName = (index, val) => {
    const newProperties = [...properties];
    newProperties[index].name = val;

    // In case the data is fetched from the server it wont have the custom state defiend in this component, so we need to add it
    if (!newProperties[index].errors) {
      newProperties[index].errors = { name: '', value: '' };
    }

    newProperties[index].errors.name = !val ? '“Property name” is not allowed to be empty' : '';

    const lastAddress = newProperties[index].name;
    // eslint-disable-next-line no-restricted-syntax
    for (const r in propertiesIndexes) {
      if (propertiesIndexes[r].includes(index)) {
        if (propertiesIndexes[r].length > 1) {
          propertiesIndexes[r].splice(propertiesIndexes[r].indexOf(index), 1);
        } else {
          delete propertiesIndexes[r];
        }
      }
    }

    if (propertiesIndexes[lastAddress] && propertiesIndexes[lastAddress].includes(index)) {
      if (propertiesIndexes.length === 1) {
        delete propertiesIndexes[lastAddress];
      } else {
        propertiesIndexes[lastAddress].splice(propertiesIndexes[r].indexOf(index), 1);
      }
    }
    if (propertiesIndexes[val] && !propertiesIndexes[val].includes(index)) {
      propertiesIndexes[val].push(index);
    } else {
      propertiesIndexes[val] = [];
      propertiesIndexes[val].push(index);
    }

    setPropertiesMapIndexes(propertiesIndexes);

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

  const onMintNft = async () => {
    try {
      setShowLoadingPopup(true);
      // document.body.classList.add('no__scroll');

      // NFT data to generate token URI
      const data = {
        file: previewImage,
        name,
        description,
        editions,
        propertiesParsed: propertyCheck ? parseProperties(properties) : [],
        royaltiesParsed: royalities ? parseRoyalties(royaltyAddress) : [],
        collectionId: selectedCollection?.id,
      };

      // Get the contract instance to mint from
      const collectionContract =
        selectedCollection && selectedCollection.address !== universeCollection.address
          ? new Contract(selectedCollection.address, contracts.UniverseERC721.abi, signer)
          : universeERC721CoreContract;

      // Update saved NFT data, before getting the TokenURI
      if (savedNFTsID) {
        // Attach the needed data to identify the NFT and its Collection
        data.id = savedNFTsID;

        let result = await updateSavedForLaterNft(data);

        if (!result.message) {
          const updateNFTImage = result.id && typeof previewImage === 'object';
          if (updateNFTImage) {
            const saveImageRes = await saveNftImage(previewImage, result.id);
            result = saveImageRes;
          }
        }

        if (result?.error) {
          setShowLoadingPopup(false);
          showErrorModal(true);
          return;
        }
      }

      // Get the Token URIs from the BE
      // TODO: Test this: We have to send collection id to get collection id appended
      const mintInfo = savedNFTsID
        ? await getMetaForSavedNft(savedNFTsID)
        : await getTokenURI(data);

      // Prepare the data for the smart contract
      const parsedRoyalties = formatRoyaltiesForMinting(data.royaltiesParsed);
      const tokenURIsAndRoyalties = mintInfo.tokenUris.map((token) => ({
        token,
        royalties: parsedRoyalties,
      }));
      const { tokensChunks, royaltiesChunks } = parseDataForBatchMint(tokenURIsAndRoyalties);

      // Mint the data on Chunks
      const txHashes = [];
      const mintPromises = tokensChunks.map(async (chunk, i) => {
        const mintTransaction = await collectionContract.batchMintWithDifferentFees(
          address,
          chunk,
          royaltiesChunks[i]
        );

        txHashes.push(mintTransaction.hash);
        setActiveTxHashes([...txHashes]);
        const mintReceipt = await mintTransaction.wait();
        return mintReceipt.status;
      });

      // setActiveTxHashes(txHashesArray);
      const res = await Promise.all(mintPromises);
      const mintNftPromises = [];

      for (let i = 0; i < txHashes.length; i += 1) {
        const txHash = txHashes[i];
        mintNftPromises.push(createMintingNFT(txHash, mintInfo.mintingNft.id));
      }

      const hasFailedTransaction = res.includes(0);
      if (!hasFailedTransaction) {
        const [myNfts, mintingNfts, savedNFTS] = await Promise.all([
          getMyNfts(),
          getMyMintingNfts(),
          getSavedNfts(),
        ]);
        setMyNFTs(myNfts || []);
        setMyMintingNFTs(mintingNfts || []);
        setSavedNfts(savedNFTS || []);

        setMintingNftsCount(mintingNftsCount + 1);
        setShowLoadingPopup(false);
        if (savedNFTsID) {
          setShowCongratsMintedSavedForLater(true);
        } else {
          setShowCongratsPopup(true);
        }

        setName('');
        setDescription('');
        setEditions('');
        setPreviewImage('');
        setProperties([{ name: '', value: '', errors: { name: '', value: '' } }]);
        setRoyaltyAddress([{ address: '', amount: '' }]);
      } else {
        setShowLoadingPopup(false);
        console.error(e, 'Error !');
        setShowError(true);
      }
    } catch (err) {
      console.error(err, 'Error !');
      setShowLoadingPopup(false);
      if (err.code === 4001) {
        setErrorTitle('Failed to mint NFT');
        setErrorBody('User denied transaction signature');
      }
      setShowError(true);
    }
  };

  const onSaveNftForLaterMinting = async () => {
    setShowLoadingPopup(true);

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

    setShowLoadingPopup(false);
    setShowCongratsPopupOnSaveForLaterClick(true);
    setName('');
    setDescription('');
    setEditions('');
    setPreviewImage('');
    setProperties([{ name: '', value: '', errors: { name: '', value: '' } }]);
    setRoyaltyAddress([{ address: '', amount: '' }]);
  };

  const validateEdition = (e) => {
    const value = e.target.value.replace(/[^\d]/, '');
    if (parseInt(value, 10) !== 0 && value <= MAX_FIELD_CHARS_LENGTH.editions) {
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
    setShowLoadingPopup(true);
    setShowCreateMoreButton(false);
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
    setShowLoadingPopup(false);
    setShowCongratsPopup(true);
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

  useEffect(() => {
    if (!showLoadingPopup) setActiveTxHashes([]);
  }, [showLoadingPopup]);

  const emptyForm = !name && !previewImage && !description;

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
              properties[0]?.name ||
              properties[0]?.value ||
              properties[1] ||
              royaltyAddress[0]?.address ||
              royaltyAddress[0]?.amount ||
              royaltyAddress[1]
            )
          }
        />
        <Popup open={showLoadingPopup} closeOnDocumentClick={false}>
          <LoadingPopup
            text="The transaction is in progress. Keep this window opened. Navigating away from the page will reset the curent progress."
            onClose={() => setShowLoadingPopup(false)}
            contractInteraction={mintNowClick}
          />
        </Popup>
        <Popup open={showCongratsPopup} closeOnDocumentClick={false}>
          <CongratsPopup
            showCreateMore={showCreateMoreButton}
            onClose={() => setShowCongratsPopup(false)}
            message="NFT was successfully created and should be displayed in your wallet shortly"
          />
        </Popup>
        <Popup open={showCongratsPopupOnSaveForLaterClick} closeOnDocumentClick={false}>
          <CongratsPopup
            showCreateMore={showCreateMoreButton}
            onClose={() => setShowCongratsPopupOnSaveForLaterClick(false)}
            message="NFT was successfully saved for later"
          />
        </Popup>
        <Popup open={showCongratsMintedSavedForLater} closeOnDocumentClick={false}>
          <CongratsPopup
            showCreateMore={showCreateMoreButton}
            onClose={() => setShowCongratsMintedSavedForLater(false)}
            message="Saved for later NFT was successfully minted and should be displayed in your wallet shortly"
          />
        </Popup>
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
                      <span>( min 800x800px, PNG/JPEG/GIF/WEBP/MP4,</span>
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
          </div>
          {errors.previewImage && <p className="error-message">{errors.previewImage}</p>}
          <div className="single-nft-name">
            <h5>
              <span>Name</span>
              <p className="input-max-chars">
                {name.length}/{MAX_FIELD_CHARS_LENGTH.name}
              </p>
            </h5>
            <Input
              className="inp"
              error={errors.name}
              placeholder="Enter NFT name"
              hoverBoxShadowGradient
              onChange={(e) => {
                if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.name) return;
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
            <h5>
              <span>Description (optional)</span>
              <p className="input-max-chars">
                {description.length}/{MAX_FIELD_CHARS_LENGTH.description}
              </p>
            </h5>
            <textarea
              rows="5"
              placeholder="Spread some words about your NFT"
              className="inp"
              onChange={(e) => {
                if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.description) return;
                setDescription(e.target.value);
              }}
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
                  <p>
                    The number of copies that can be minted is {MAX_FIELD_CHARS_LENGTH.editions}.
                  </p>
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
          <div
            className={`banner ${
              deployedCollections.length >= COLLECTIONS_PER_ROW ? 'scroll-box' : ''
            } single-nft-choose-collection`}
          >
            <h4>Choose collection</h4>
            <div className="choose__collection">
              {universeCollection && (
                <CollectionChoice
                  selectedCollection={selectedCollection}
                  setSelectedCollection={setSelectedCollection}
                  col={universeCollection}
                />
              )}
              {deployedCollections.map((col) => (
                <CollectionChoice
                  key={uuid()}
                  selectedCollection={selectedCollection}
                  setSelectedCollection={setSelectedCollection}
                  col={col}
                />
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
            {properties?.map(
              (property, i) =>
                propertyCheck && (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={i} className="properties">
                    <div className="property-name">
                      <h5>
                        <span>Property name</span>
                        <p className="input-max-chars">
                          {property.name.length}/{MAX_FIELD_CHARS_LENGTH.propertyName}
                        </p>
                      </h5>
                      <Input
                        className="inp"
                        error={property.errors?.name || hasPropError(property.name, i)}
                        placeholder="Colour"
                        value={property.name}
                        onChange={(e) => {
                          if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.propertyName) return;
                          propertyChangesName(i, e.target.value);
                        }}
                        hoverBoxShadowGradient
                      />
                    </div>
                    <div className="property-value">
                      <h5>
                        <span>Value</span>
                        <p className="input-max-chars">
                          {property.value.length}/{MAX_FIELD_CHARS_LENGTH.propertyValue}
                        </p>
                      </h5>
                      <Input
                        className="inp"
                        error={property.errors?.value}
                        placeholder="Red"
                        value={property.value}
                        onChange={(e) => {
                          if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.propertyValue) return;
                          propertyChangesValue(i, e.target.value);
                        }}
                        hoverBoxShadowGradient
                      />
                    </div>
                    {i > 0 ? (
                      <>
                        <img
                          src={deleteIcon}
                          alt="Delete"
                          className="delete-img"
                          onClick={() => removeProperty(i)}
                          aria-hidden="true"
                        />
                        <Button
                          className="light-border-button red"
                          onClick={() => removeProperty(i)}
                        >
                          <img
                            src={deleteIcon}
                            className="del-icon"
                            alt="Delete"
                            aria-hidden="true"
                          />
                          Remove
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                )
            )}
            <div
              hidden={!propertyCheck}
              className="property-add"
              onClick={() => {
                if (properties.length >= MAX_FIELD_CHARS_LENGTH.propertiesCount) return;
                addProperty();
              }}
              aria-hidden="true"
            >
              <h5>
                <img src={addIcon} alt="Add" />
                Add property
              </h5>
            </div>
            {/* {editableNFTType !== 'collection' && ( */}
            <div className="hr-div" />
            <div className="royalities">
              <div className="title">
                <h4
                  onMouseOver={() => setHideRoyalitiesInfo(true)}
                  onFocus={() => setHideRoyalitiesInfo(true)}
                  onMouseLeave={() => setHideRoyalitiesInfo(false)}
                  onBlur={() => setHideRoyalitiesInfo(false)}
                >
                  Revenue splits <img src={infoIcon} alt="Info Icon" />
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
                        error={elm.error || hasAddressError(elm.address, i)}
                        onChange={(e) => propertyChangesAddress(i, e.target.value)}
                        hoverBoxShadowGradient
                      />
                    </div>
                    <div className="property-amount">
                      <h5>Percent amount</h5>
                      <Input
                        className="percent-inp"
                        type="number"
                        placeholder="5"
                        value={elm.amount}
                        onChange={(e) => propertyChangesAmount(i, e.target.value, e.target)}
                        onWheel={(e) => e.target.blur()}
                        hoverBoxShadowGradient
                      />
                      <span className="percent-sign">%</span>
                    </div>
                    {i > 0 && (
                      <>
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
                          <img
                            src={deleteIcon}
                            className="del-icon"
                            alt="Delete"
                            aria-hidden="true"
                          />
                          Remove
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              {royalities && (
                <div
                  className="property-add"
                  onClick={() => {
                    if (royaltyAddress.length >= MAX_FIELD_CHARS_LENGTH.royaltiesCount) return;
                    addRoyaltyAddress();
                  }}
                  aria-hidden="true"
                >
                  <h5>
                    <img src={addIcon} alt="Add" />
                    Add address
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
                  disabled={errors.name || errors.edition || errors.previewImage || emptyForm}
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
                    !selectedCollection ||
                    (propertyCheck &&
                      properties.find(
                        (property) => property.name === '' || property.value === ''
                      )) ||
                    (royalities &&
                      royaltyAddress.find(
                        (royalty) => royalty.address === '' || royalty.amount === ''
                      )) ||
                    (propertyCheck && !properties.length) ||
                    (royalities && !royaltyAddress.length)
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

export default SingleNFTForm;
