/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useLocation, useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import './MyNFTs.scss';
import { number } from 'prop-types';
import Wallet from './Wallet.jsx';
import SavedNFTs from './SavedNFTs.jsx';
import UniverseNFTs from './UniverseNFTs.jsx';
import MintModal from '../mintModal/MintModal.jsx';
import Button from '../button/Button';
import AppContext from '../../ContextAPI';
import '../mintModal/Modals.scss';
import LoadingPopup from '../popups/LoadingPopup.jsx';
import CongratsPopup from '../popups/CongratsPopup.jsx';
import arrow from '../../assets/images/arrow.svg';
import union from '../../assets/images/Union.svg';
import bubbleIcon from '../../assets/images/text-bubble.png';
import tabArrow from '../../assets/images/tab-arrow.svg';
import DeployedCollections from './DeployedCollections.jsx';
import { handleTabRightScrolling, handleTabLeftScrolling } from '../../utils/scrollingHandlers';
import { UNIVERSE_NFTS } from '../../utils/fixtures/NFTsUniverseDummyData';
import Tabs from '../tabs/Tabs';
import { getMyNfts, updateSavedNft } from '../../utils/api/mintNFT';
import {
  getCollectionsAdddresses,
  createContractInstancesFromAddresses,
  extractRequiredDataForMinting,
  generateTokenURIs,
  returnTokenURIsAndRoyalties,
  formatRoyalties,
  getBatchMintingData,
  mintChunkToContract,
} from '../../utils/helpers/pureFunctions/batchMinting';
import {
  chunkifyArray,
  formatRoyaltiesForMinting,
  parseRoyalties,
} from '../../utils/helpers/contractInteraction';
import CongratsProfilePopup from '../popups/CongratsProfilePopup';
import { asyncPipe, pipe } from '../../utils/helpers/pureFunctions/pipe';

const MyNFTs = () => {
  const {
    address,
    signer,
    savedNfts,
    savedCollections,
    setSavedNfts,
    savedNFTsID,
    setSavedNFTsID,
    showModal,
    setShowModal,
    setActiveView,
    myNFTs,
    setMyNFTs,
    selectedNft,
    setDarkMode,
    deployedCollections,
    myNFTsSelectedTabIndex,
    setMyNFTsSelectedTabIndex,
    universeERC721CoreContract,
    collectionsIdAddressMapping,
    contracts,
  } = useContext(AppContext);
  const [selectedNFTIds, setSelectedNFTIds] = useState([]);
  const tabs = ['Wallet', 'Collections', 'Saved NFTs', 'Universe NFTs'];
  const emptyTabs = ['Wallet', 'Collections'];
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const location = useLocation();
  const isCreatingAction = location.pathname === '/select-nfts';
  const history = useHistory();
  console.log(myNFTsSelectedTabIndex);
  const handleClose = () => {
    document.body.classList.remove('no__scroll');
    setShowModal(false);
  };

  const handleOpen = () => {
    setActiveView(null);
    setShowModal(true);
    document.body.classList.add('no__scroll');
  };

  const checkSelectedSavedNfts = () => {
    const res = savedNfts.filter((nft) => nft.selected);

    return !res.length;
  };

  useEffect(async () => {
    function handleResize() {
      if (document.querySelector('.tab__right__arrow')) {
        if (window.innerWidth < 530) {
          document.querySelector('.tab__right__arrow').style.display = 'flex';
        } else {
          document.querySelector('.tab__right__arrow').style.display = 'none';
          document.querySelector('.tab__left__arrow').style.display = 'none';
        }
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMintSelected = async () => {
    document.getElementById('loading-hidden-btn').click();
    const selectedNfts = savedNfts.filter((nft) => nft.selected);

    const { data: requiredContracts } = pipe(
      getCollectionsAdddresses,
      createContractInstancesFromAddresses
    )({
      data: selectedNfts,
      context: { collectionsIdAddressMapping, universeERC721CoreContract, contracts, signer },
    });

    const tokenURIsAndRoyaltiesObject = await asyncPipe(
      extractRequiredDataForMinting,
      generateTokenURIs,
      formatRoyalties,
      returnTokenURIsAndRoyalties
    )(selectedNfts);

    const collectionsIdsArray = Object.keys(requiredContracts);

    console.log(`calling ${collectionsIdsArray.length} contracts`);

    for (let index = 0; index < collectionsIdsArray.length; index += 1) {
      const collectionId = collectionsIdsArray[index];

      const { tokensChunks, royaltiesChunks, chunksCount } = getBatchMintingData(
        tokenURIsAndRoyaltiesObject[collectionId]
      );

      for (let chunk = 0; chunk < chunksCount; chunk += 1) {
        console.log(
          `minting chunk ${chunk + 1} / ${royaltiesChunks.length} to contract number ${
            index + 1
          }: ${requiredContracts[collectionId].address}`
        );

        await mintChunkToContract({
          address,
          tokens: tokensChunks[chunk],
          royalties: royaltiesChunks[chunk],
          contract: requiredContracts[collectionId],
        });
      }
    }

    console.log('minting completed!');

    // TODO temporarily use this
    const newSavedNFTs = savedNfts.filter((nft) => !nft.selected);
    setSavedNfts(newSavedNFTs);

    document.getElementById('popup-root').remove();
    document.getElementById('congrats-hidden-btn').click();
  };

  useEffect(() => {
    setDarkMode(false);
    document.title = 'Universe Minting - My NFTs';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  useEffect(() => {
    setFilteredNFTs(myNFTs);
  }, []);

  const existsNFTs = () =>
    myNFTs.length || deployedCollections.length || savedNfts.length || savedCollections.length;

  const renderTabsWrapper = () => (
    <Tabs
      items={tabs.map((tab, index) => ({
        name: tab,
        active: myNFTsSelectedTabIndex === index,
        handler: setMyNFTsSelectedTabIndex.bind(this, index),
        length:
          index === 0 && myNFTs.length > 0
            ? myNFTs.length
            : index === 1 && deployedCollections.length > 0
            ? deployedCollections.length
            : index === 2 && savedNfts.length > 0
            ? savedNfts.length
            : // printing dummyData length
            index === 3 && UNIVERSE_NFTS.length > 0
            ? UNIVERSE_NFTS.length
            : null,
        // label:
        //   index === 2 && savedNfts.length > 0
        //     ? savedNfts.length
        //     : index === 3 && savedCollections.length > 0
        //     ? savedCollections.length
        //     : null,
      }))}
    />
  );

  const renderEmptyTabsWrapper = () => (
    <EmptyTabs
      items={emptyTabs.map((tab, index) => ({
        name: tab,
        active: myNFTsSelectedTabIndex === index,
        handler: setMyNFTsSelectedTabIndex.bind(this, index),
        length:
          index === 0 && myNFTs.length > 0
            ? myNFTs.length
            : index === 1 && deployedCollections.length > 0
            ? deployedCollections.length
            : null,
        // label:
        //   index === 2 && savedNfts.length > 0
        //     ? savedNfts.length
        //     : index === 3 && savedCollections.length > 0
        //     ? savedCollections.length
        //     : null,
      }))}
    />
  );

  const renderPopups = () => (
    <>
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
    </>
  );

  const renderIfNFTsExist = () => (
    <>
      {isCreatingAction ? (
        <div className="select-nfts">
          <div
            className="back-rew"
            onClick={() => {
              history.push('/reward-tiers');
            }}
            aria-hidden="true"
          >
            <img src={arrow} alt="back" />
            <span>Create reward tier</span>
          </div>

          <div className="mynfts__page__header" style={{ marginTop: '20px' }}>
            <h1 className="title">Select NFTs</h1>
            <div className="create__mint__btns">
              {myNFTsSelectedTabIndex === 2 && (
                <button
                  type="button"
                  className="mint__btn"
                  onClick={handleMintSelected}
                  disabled={checkSelectedSavedNfts()}
                >
                  Mint selected
                </button>
              )}
              {myNFTsSelectedTabIndex === 3 && (
                <button
                  type="button"
                  className="light-border-button"
                  onClick={() => history.push('/polymorph-rarity')}
                >
                  Polymorph rarity chart
                </button>
              )}
              {myNFTsSelectedTabIndex === 1 ? (
                <button
                  type="button"
                  className="mint__btn"
                  onClick={() => {
                    setSavedNFTsID(null);
                    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' });
                  }}
                >
                  Create Collection
                </button>
              ) : (
                <button
                  type="button"
                  className="mint__btn"
                  onClick={() => {
                    setSavedNFTsID(null);
                    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' });
                  }}
                >
                  Create NFT
                </button>
              )}
            </div>
            {showModal && <MintModal open={showModal} onClose={handleClose} />}
          </div>
        </div>
      ) : (
        <div className="mynfts__page__gradient">
          <div className="container mynfts__page__header">
            <h1 className="title">My NFTs</h1>
            <div className="create__mint__btns">
              {myNFTsSelectedTabIndex === 2 && (
                <button
                  type="button"
                  className="mint__btn"
                  onClick={handleMintSelected}
                  disabled={checkSelectedSavedNfts()}
                >
                  Mint selected
                </button>
              )}
              {myNFTsSelectedTabIndex === 3 && (
                <button
                  type="button"
                  className="light-border-button"
                  onClick={() => history.push('/polymorph-rarity')}
                >
                  Polymorph rarity chart
                </button>
              )}
              {myNFTsSelectedTabIndex === 1 ? (
                <button
                  type="button"
                  className="mint__btn"
                  onClick={() => {
                    setSavedNFTsID(null);
                    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' });
                  }}
                >
                  Create Collection
                </button>
              ) : (
                <button
                  type="button"
                  className="mint__btn"
                  onClick={() => {
                    setSavedNFTsID(null);
                    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' });
                  }}
                >
                  Create NFT
                </button>
              )}
            </div>
            {showModal && <MintModal open={showModal} onClose={handleClose} />}
          </div>
          {renderTabsWrapper()}
        </div>
      )}

      <div className="container mynfts__page__body">
        {myNFTsSelectedTabIndex === 0 && (
          <Wallet
            filteredNFTs={filteredNFTs}
            setFilteredNFTs={setFilteredNFTs}
            selectedNFTIds={selectedNFTIds}
            setSelectedNFTIds={setSelectedNFTIds}
          />
        )}
        {myNFTsSelectedTabIndex === 1 && <DeployedCollections />}
        {myNFTsSelectedTabIndex === 2 && <SavedNFTs />}
        {myNFTsSelectedTabIndex === 3 && <UniverseNFTs />}
      </div>
    </>
  );

  const renderIfNFTsNotExist = () =>
    isCreatingAction ? (
      <div className="container select-nfts">
        <div
          className="back-rew"
          onClick={() => {
            history.push('/reward-tiers');
          }}
          aria-hidden="true"
        >
          <img src={arrow} alt="back" />
          <span>Create reward tier</span>
        </div>
        {showModal && <MintModal open={showModal} onClose={handleClose} />}
        <div>
          <div className="head-part">
            <h2 className="tier-title">Select NFTs</h2>
          </div>
          <div className="space-tier-div">
            {selectedNft.length > 0 ? '' : <p>No NFTs found in your wallet</p>}
          </div>
          <div className="create-rew-tier select-ntfs" onClick={handleOpen} aria-hidden="true">
            <div className="plus-icon">
              <img src={union} alt="create" />
            </div>
            <div className="create-rew-text">
              <p>Create NFT</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <>
        <div className="mynfts__page__gradient">
          <div className="container mynfts__page__header">
            <h1 className="title">My NFTs</h1>
            {showModal && <MintModal open={showModal} onClose={handleClose} />}
          </div>
          {renderEmptyTabsWrapper()}
        </div>
        <div className="container mynfts__page__body">
          {myNFTsSelectedTabIndex === 0 && (
            <>
              <div className="empty__nfts">
                <div className="tabs-empty">
                  <div className="image-bubble">
                    <img src={bubbleIcon} alt="bubble-icon" />
                  </div>
                  <h3>No NFTs found</h3>
                  <p>
                    Create NFTs or NFT collections with our platform by clicking the button below
                  </p>
                  <Button
                    className="light-button"
                    onClick={() =>
                      history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
                    }
                  >
                    Create NFT
                  </Button>
                </div>
              </div>
            </>
          )}
          {myNFTsSelectedTabIndex === 1 && (
            <>
              <div className="empty__nfts">
                <div className="tabs-empty">
                  <div className="image-bubble">
                    <img src={bubbleIcon} alt="bubble-icon" />
                  </div>
                  <h3>No collections found</h3>
                  <p>
                    Create NFTs or NFT collections with our platform by clicking the button below
                  </p>
                  <Button
                    className="light-button"
                    onClick={() =>
                      history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' })
                    }
                  >
                    Create Collection
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );

  return (
    <>
      <div className="mynfts__page">
        {existsNFTs() ? renderIfNFTsExist() : renderIfNFTsNotExist()}
      </div>
      {renderPopups()}
    </>
  );
};

export default MyNFTs;
