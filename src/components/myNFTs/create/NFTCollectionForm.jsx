/* eslint-disable no-await-in-loop */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { BigNumber } from 'ethers';
import Popup from 'reactjs-popup';
import { useHistory, useLocation } from 'react-router-dom';
import Input from '../../input/Input.jsx';
import Button from '../../button/Button.jsx';
import NFTCollectible from './NFTCollectible.jsx';
import uploadIcon from '../../../assets/images/ion_cloud.svg';
import closeIcon from '../../../assets/images/close-menu.svg';
import errorIcon from '../../../assets/images/error-icon.svg';
import leftArrow from '../../../assets/images/marketplace/bundles-left-arrow.svg';
import rightArrow from '../../../assets/images/marketplace/bundles-right-arrow.svg';
import LoadingPopup from '../../popups/LoadingPopup.jsx';
import CongratsPopup from '../../popups/CongratsPopup.jsx';
import { RouterPrompt } from '../../../utils/routerPrompt.js';
import {
  editCollection,
  editCollectionImage,
  saveCollection,
  attachTxHashToCollection,
} from '../../../utils/api/mintNFT';
import { useMyNftsContext } from '../../../contexts/MyNFTsContext.jsx';
import { useAuthContext } from '../../../contexts/AuthContext.jsx';
import { useErrorContext } from '../../../contexts/ErrorContext';
import RevenueSplits from '../revenueSplits/RevenueSplits.jsx';
import SocialConnections from '../socialConnections/SocialConnections.jsx';
import { formatRoyaltiesForMinting } from '../../../utils/helpers/contractInteraction.js';
import { fetchRoyalties } from '../../../utils/api/royaltyRegistry';

const MAX_FIELD_CHARS_LENGTH = {
  name: 32,
  description: 1024,
  token: 10,
};

const NFTCollectionForm = ({ showCollectible, setShowCollectible, scrollToTop }) => {
  const {
    myNFTs,
    activeTxHashes,
    setActiveTxHashes,
    setMyNFTsSelectedTabIndex,
    myMintableCollections,
  } = useMyNftsContext();
  const { universeERC721FactoryContract, signer } = useAuthContext();
  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();
  const [showPrompt, setShowPrompt] = useState(false);
  const location = useLocation();

  const inputFile = useRef(null);
  const history = useHistory();

  const [coverImage, setCoverImage] = useState('');
  const [bgImage, setBgImage] = useState(null);
  const [collectionName, setCollectionName] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [description, setDescription] = useState('');
  const [collectionNFTs, setCollectionNFTs] = useState([]);
  const [collectionNFTsID, setCollectionNFTsID] = useState(null);
  const [mintNowClick, setMintNowClick] = useState(false);
  const [border, setBorder] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [errors, setErrors] = useState({
    coverImage: '',
    collectionName: '',
    tokenName: '',
    collectible: '',
    shorturl: '',
  });
  const [showRevenueSplits, setShowRevenueSplits] = useState(true);
  const [revenueSplits, setRevenueSplits] = useState([{ address: '', amount: '' }]);
  const [initialRevenueSplits, setInitialsRevenueSplits] = useState([{ address: '', amount: '' }]);
  const [revenueSplitsValidAddress, setRevenueSplitsValidAddress] = useState(true);
  const [siteLink, setSiteLink] = useState('');
  const [discordLink, setDiscordLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [mediumLink, setMediumLink] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [registryContract, setRegistryContract] = useState(null);

  const validateFile = (file) => {
    setMintNowClick(false);
    if (!file) {
      setCoverImage('');
      setErrors({
        ...errors,
        coverImage: 'Collection image is required.',
      });
    } else if (
      (file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/png') &&
      file.size / 1048576 < 1
    ) {
      setCoverImage(file);
      setErrors({ ...errors, coverImage: '' });
    } else {
      setCoverImage('');
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

  const handleMinting = () => {
    setMintNowClick(true);
    if (!collectionName || !tokenName || !coverImage) {
      setErrors({
        collectionName: !collectionName ? '“Collection name” is not allowed to be empty' : '',
        tokenName: !tokenName ? '“Token name” is not allowed to be empty' : '',
        collectible: '',
        coverImage: 'File format must be PNG, JPEG, GIF (Max Size: 1mb)',
      });
    } else {
      const collectionNameExists = myMintableCollections.length
        ? myMintableCollections.filter(
            (collection) => collection.name.toLowerCase() === collectionName.toLowerCase()
          )
        : [];
      const existsInMyNfts = myNFTs.length
        ? myNFTs.filter((nft) => nft.collectionName?.toLowerCase() === collectionName.toLowerCase())
        : [];
      if (
        (collectionNameExists.length || existsInMyNfts.length) &&
        !location.state?.collection?.id
      ) {
        setErrors({
          ...errors,
          collectionName: '“Collection name” already exists',
        });
      } else {
        setErrors({
          collectionName: '',
          tokenName: '',
          collectible: '',
        });
      }
    }
  };

  const onMintCollection = async () => {
    try {
      setShowLoading(true);

      const collectionData = {
        file: coverImage,
        name: collectionName,
        symbol: tokenName,
        description,
        tokenName,
        siteLink,
        discordLink,
        instagramLink,
        mediumLink,
        telegramLink,
      };

      let res;
      // If is editing
      if (location.state?.collection?.id) {
        res = await editCollection({
          id: location.state?.collection?.id,
          description,
          siteLink,
          discordLink,
          instagramLink,
          mediumLink,
          telegramLink,
        });

        if (res.message) {
          // there is an error while updating the collection
        } else {
          const updateCoverImage = typeof coverImage === 'object';
          if (updateCoverImage) {
            res = await editCollectionImage(coverImage, location.state?.collection?.id);
          }
        }

        // Compare new and existing royalties for changes
        // This can be improved to be case and order insensitive
        const areRevenueSplitsDifferent =
          JSON.stringify(revenueSplits) !== JSON.stringify(initialRevenueSplits);
        if (areRevenueSplitsDifferent && registryContract) {
          const formattedRoyalties = formatRoyaltiesForMinting(revenueSplits);
          const royaltyTx = await registryContract.setRoyaltiesByToken(
            location.state?.collection?.address,
            formattedRoyalties
          );
          const txReceipt = await royaltyTx.wait();
        }
      } else {
        // Create the collection
        const saveRequestPromise = saveCollection(collectionData);
        const txReqPromise = await universeERC721FactoryContract.deployUniverseERC721(
          collectionData.name,
          collectionData.symbol
        );

        setActiveTxHashes([...activeTxHashes, txReqPromise.hash]);
        const txhash = await txReqPromise.wait();

        const [save, tx] = await Promise.all([saveRequestPromise, txReqPromise]);
        res = await attachTxHashToCollection(tx.hash, save.id);
      }
      setShowLoading(false);
      setShowPrompt(false);
      if (res) {
        setShowCongrats(true);
      } else {
        setShowError(true);
      }
    } catch (err) {
      console.error(err, 'Error !');
      setShowLoading(false);
      if (err.code === 4001) {
        setErrorTitle('Failed to mint collection');
        setErrorBody('User denied transaction signature');
      }
      setShowError(true);
    }
  };

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

  useEffect(() => {
    if (!showLoading) setActiveTxHashes([]);
  }, [showLoading]);

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
    if (mintNowClick && !errors.collectionName && !errors.tokenName && !errors.coverImage) {
      onMintCollection();
    }
  }, [errors]);

  const fetchRoyaltyRegistry = async () => {
    try {
      const [contract, royalties] = await fetchRoyalties(location.state.collection.address, signer);
      setRegistryContract(contract);
      // Index 1 is collection royalties
      if (royalties.length && royalties[1].length) {
        const collectionRoyalties = royalties[1].map((royalty) => ({
          address: royalty[0],
          amount: BigNumber.from(royalty[1]).div(100).toString(),
        }));
        setRevenueSplits(collectionRoyalties);
        setInitialsRevenueSplits(collectionRoyalties);
      }
      console.log(royalties);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (signer && location.state.collection && location.state.collection.address) {
      fetchRoyaltyRegistry();
    }
  }, [signer, location.state?.collection?.address]);

  useEffect(() => {
    // It means we have opened a collection for EDIT
    if (location.state?.collection?.id) {
      if (location.state.collection.address) {
        fetchRoyaltyRegistry();
      }
      const res = location.state?.collection;
      setCollectionName(res.name);
      // An already deployed collection should have a coverUrl
      setCoverImage(res.coverUrl);
      setTokenName(res.symbol);
      setDescription(res.description);
      setSiteLink(res.siteLink);
      setDiscordLink(res.discordLink);
      setMediumLink(res.mediumLink);
      setInstagramLink(res.instagramLink);
      setTelegramLink(res.telegramLink);
      setBgImage(res.bgImage || null);
    }
  }, [location.state?.collection]);

  const imageSrc = useMemo(
    () =>
      coverImage
        ? typeof coverImage === 'object'
          ? URL.createObjectURL(coverImage)
          : coverImage
        : '',
    [coverImage]
  );
  return !showCollectible ? (
    <div className="nft--collection--settings--page">
      <RouterPrompt
        when={!!showPrompt && !!location.state?.collection?.id}
        onOK={() => true}
        editing={!!location.state?.collection?.id}
      />
      <Popup closeOnDocumentClick={false} open={showLoading}>
        <LoadingPopup
          text="The transaction is in progress. Keep this window opened. Navigating away from the page will reset the current progress."
          onClose={() => setShowLoading(false)}
          contractInteraction
        />
      </Popup>
      <Popup open={showCongrats} closeOnDocumentClick={false}>
        <CongratsPopup
          onClose={() => {
            setShowCongrats(false);
            setDescription('');
            setTokenName('');
            setCollectionName('');
            setCoverImage(null);
            setMyNFTsSelectedTabIndex(1);
            scrollToTop();
          }}
          backButtonText="Go to my Collections"
          message="NFT collection was successfully created/updated and should be displayed in your wallet shortly"
        />
      </Popup>
      <div className={`image--name--token${location.state?.collection?.id ? ' align-center' : ''}`}>
        <div className="collection--cover--image">
          <div
            className={`dropzone collection--cover--image--circle
              ${coverImage ? 'border--none' : ''}`}
            onDrop={(e) => onDrop(e)}
            onDragOver={(e) => onDragOver(e)}
            onDragLeave={(e) => onDragLeave(e)}
          >
            {!coverImage ? (
              <div
                className={`image--not--selected ${border ? 'image--not--selected--border' : ''}`}
                onClick={() => inputFile.current.click()}
                aria-hidden="true"
              >
                <img src={uploadIcon} alt="Upload" />
                <p>Cover image</p>
                <p className="second-p"> (min 200x200px,</p>
                <p className="third-p">PNG/JPEG/GIF,</p>
                <p className="fourth-p">max 1mb)</p>
                <input
                  type="file"
                  ref={inputFile}
                  onChange={(e) => validateFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="image--selected">
                <img className="cover" src={imageSrc} alt="Collection cover" />
                <div
                  className="remove--selected--image"
                  onClick={() => {
                    setCoverImage('');
                    setBorder(false);
                  }}
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
              onChange={(e) => {
                if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.name) return;
                handleCollectionName(e.target.value);
                setShowPrompt(true);
              }}
              value={collectionName}
              hoverBoxShadowGradient
            />
            <p className="input-max-chars">
              {collectionName?.length}/{MAX_FIELD_CHARS_LENGTH.name}
            </p>
          </div>
          {!location.state?.collection?.id ? (
            <div className="collection--token">
              <Input
                label="Token name"
                error={errors.tokenName}
                placeholder="$ART"
                onChange={(e) => {
                  if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.token) return;
                  handleTokenName(e.target.value);
                  setShowPrompt(true);
                }}
                value={tokenName}
                hoverBoxShadowGradient
              />
              <p className="input-max-chars">
                {tokenName?.length}/{MAX_FIELD_CHARS_LENGTH.token}
              </p>
              {!errors.tokenName && (
                <p className="warning">Token name cannot be changed in future</p>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="collection--description">
        <label>
          Description <span>(optional)</span>
        </label>
        <div>
          <textarea
            placeholder="Spread some words about your collection"
            value={description}
            onChange={(e) => {
              if (e.target.value.length > MAX_FIELD_CHARS_LENGTH.description) return;
              setDescription(e.target.value);
              setShowPrompt(true);
            }}
          />
          <div className="box--shadow--effect--block" />
        </div>
        <p className="input-max-chars">
          {description ? description.length : 0}/{MAX_FIELD_CHARS_LENGTH.description}
        </p>
      </div>
      {location.state.collection && location.state.collection.id && (
        <RevenueSplits
          showRevenueSplits={showRevenueSplits}
          setShowRevenueSplits={setShowRevenueSplits}
          revenueSplits={revenueSplits}
          setRevenueSplits={setRevenueSplits}
          revenueSplitsValidAddress={revenueSplitsValidAddress}
          setRevenueSplitsValidAddress={setRevenueSplitsValidAddress}
          maxRevenueSplitsPercent={100}
        />
      )}
      <SocialConnections
        siteLink={siteLink}
        setSiteLink={setSiteLink}
        discordLink={discordLink}
        setDiscordLink={setDiscordLink}
        instagramLink={instagramLink}
        setInstagramLink={setInstagramLink}
        mediumLink={mediumLink}
        setMediumLink={setMediumLink}
        telegramLink={telegramLink}
        setTelegramLink={setTelegramLink}
      />
      <div className="collection--nfts">
        {(errors.collectionName || errors.tokenName) && (
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
        {!location.state?.collection?.id ? (
          <Button
            className="light-button"
            onClick={handleMinting}
            disabled={!collectionName || !tokenName}
          >
            Create collection
          </Button>
        ) : (
          <>
            <Button className="light-border-button" onClick={() => history.push('/my-nfts')}>
              Cancel
            </Button>
            <Button
              className="light-button"
              onClick={handleMinting}
              disabled={!collectionName || !tokenName || !revenueSplitsValidAddress}
            >
              Submit changes
            </Button>
          </>
        )}
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

NFTCollectionForm.propTypes = {
  showCollectible: PropTypes.bool.isRequired,
  setShowCollectible: PropTypes.func.isRequired,
  scrollToTop: PropTypes.func.isRequired,
};

export default NFTCollectionForm;
