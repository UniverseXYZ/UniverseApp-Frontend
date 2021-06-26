import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useLocation, useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import './MyNFTs.scss';
import Wallet from './Wallet.jsx';
import SavedNFTs from './SavedNFTs.jsx';
import UniverseNFTs from './UniverseNFTs.jsx';
import MintModal from '../mintModal/MintModal.jsx';
import AppContext from '../../ContextAPI';
import '../mintModal/Modals.scss';
import LoadingPopup from '../popups/LoadingPopup.jsx';
import CongratsPopup from '../popups/CongratsPopup.jsx';
import arrow from '../../assets/images/arrow.svg';
import union from '../../assets/images/Union.svg';
import tabArrow from '../../assets/images/tab-arrow.svg';
import DeployedCollections from './DeployedCollections.jsx';
import { handleTabRightScrolling, handleTabLeftScrolling } from '../../utils/scrollingHandlers';
import Tabs from '../tabs/Tabs';

const MyNFTs = () => {
  const {
    savedNfts,
    savedCollections,
    setSavedNfts,
    showModal,
    setShowModal,
    setActiveView,
    myNFTs,
    setMyNFTs,
    selectedNft,
    setWebsite,
    deployedCollections,
    myNFTsSelectedTabIndex,
    setMyNFTsSelectedTabIndex,
  } = useContext(AppContext);
  const [selectedNFTIds, setSelectedNFTIds] = useState([]);
  // const tabs = ['Wallet', 'Collections', 'Saved NFTs', 'Universe NFTs'];
  const tabs = ['Universe NFTs'];
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const location = useLocation();
  const isCreatingAction = location.pathname === '/select-nfts';
  const history = useHistory();

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

  useEffect(() => {
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

  const handleMintSelected = () => {
    document.getElementById('loading-hidden-btn').click();
    setTimeout(() => {
      document.getElementById('popup-root').remove();
      document.getElementById('congrats-hidden-btn').click();
      setTimeout(() => {
        const newMyNFTs = [...myNFTs];
        savedNfts.forEach((nft) => {
          if (nft.selected) {
            if (nft.type === 'single') {
              newMyNFTs.push({
                id: nft.id,
                type: nft.type,
                previewImage: nft.previewImage,
                name: nft.name,
                description: nft.description,
                numberOfEditions: Number(nft.numberOfEditions),
                generatedEditions: nft.generatedEditions,
                properties: nft.properties,
                percentAmount: nft.percentAmount || '',
              });
            } else {
              newMyNFTs.push({
                id: nft.id,
                type: nft.type,
                collectionId: nft.collectionName,
                collectionName: nft.collectionName,
                collectionAvatar: nft.collectionAvatar,
                collectionDescription: nft.collectionDescription,
                shortURL: nft.shortURL,
                previewImage: nft.previewImage,
                name: nft.name,
                description: nft.description,
                numberOfEditions: Number(nft.numberOfEditions),
                generatedEditions: nft.generatedEditions,
                properties: nft.properties,
                percentAmount: nft.percentAmount || '',
              });
            }
          }
        });
        setMyNFTs(newMyNFTs);
        const newSavedNFTs = savedNfts.filter((nft) => !nft.selected);
        setSavedNfts(newSavedNFTs);
      }, 2000);
    }, 3000);
  };

  useEffect(() => {
    setWebsite(false);
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
        label:
          index === 2 && savedNfts.length > 0
            ? savedNfts.length
            : index === 3 && savedCollections.length > 0
            ? savedCollections.length
            : null,
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
            <h1 className="title">Select NFTssss</h1>
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
              <button type="button" className="mint__btn" onClick={handleOpen}>
                Create NFT
              </button>
            </div>
            {showModal && <MintModal open={showModal} onClose={handleClose} />}
          </div>
        </div>
      ) : (
        <div className="mynfts__page__gradient">
          <div className="container mynfts__page__header">
            <h1 className="title">My NFTs</h1>
            {/* <div className="create__mint__btns">
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
              <button type="button" className="mint__btn" onClick={handleOpen}>
                Create NFT
              </button>
            </div>
            {showModal && <MintModal open={showModal} onClose={handleClose} />} */}
          </div>
          {renderTabsWrapper()}
        </div>
      )}

      <div className="container mynfts__page__body">
        {/* {myNFTsSelectedTabIndex === 0 && (
          <Wallet
            filteredNFTs={filteredNFTs}
            setFilteredNFTs={setFilteredNFTs}
            selectedNFTIds={selectedNFTIds}
            setSelectedNFTIds={setSelectedNFTIds}
          />
        )}
        {myNFTsSelectedTabIndex === 1 && <DeployedCollections />}
        {myNFTsSelectedTabIndex === 2 && <SavedNFTs />}
        {myNFTsSelectedTabIndex === 3 && <UniverseNFTs />} */}
        <UniverseNFTs />
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
      <div className="container empty__nfts">
        <h1 className="title">My NFTs</h1>
        <h3>No NFTs found</h3>
        <p className="desc">
          Create NFTs or NFT collections with our platform by clicking the button below
        </p>
        <button type="button" className="mint__btn" onClick={handleOpen}>
          Create NFT
        </button>
        {showModal && <MintModal open={showModal} onClose={handleClose} />}
      </div>
    );

  return (
    <>
      {renderPopups()}
      <div className="mynfts__page">
        {/* {existsNFTs() ? renderIfNFTsExist() : renderIfNFTsNotExist()} */}
        {renderIfNFTsExist()}
      </div>
    </>
  );
};

export default MyNFTs;
