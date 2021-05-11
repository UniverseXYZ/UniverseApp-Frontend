import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useLocation, useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import Wallet from './Wallet';
import SavedNFTs from './SavedNFTs';
import SavedCollections from './SavedCollections';
import MintModal from '../mintModal/MintModal';
import AppContext from '../../ContextAPI';
import '../mintModal/Modals.scss';
import LoadingPopup from '../popups/LoadingPopup';
import CongratsPopup from '../popups/CongratsPopup';
import arrow from '../../assets/images/arrow.svg';
import union from '../../assets/images/Union.svg';

const MyNFTs = () => {
  const {
    savedNfts,
    savedCollections,
    setSavedNfts,
    selectedTabIndex,
    setSelectedTabIndex,
    showModal,
    setShowModal,
    setActiveView,
    myNFTs,
    setMyNFTs,
    selectedNft,
    auction,
    setAuction,
  } = useContext(AppContext);
  const tabs = ['Wallet', 'Saved NFTs', 'Saved Collections'];
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
              });
            } else {
              newMyNFTs.push({
                id: nft.id,
                type: nft.type,
                collectionId: nft.collectionName,
                collectionName: nft.collectionName,
                collectionAvatar: nft.collectionAvatar,
                previewImage: nft.previewImage,
                name: nft.name,
                description: nft.description,
                numberOfEditions: Number(nft.numberOfEditions),
                generatedEditions: nft.generatedEditions,
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
    window.scrollTo(0, 0);
    document.title = 'Universe Minting - My NFTs';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  useEffect(() => {
    setFilteredNFTs(myNFTs);
  }, []);

  return (
    <div className="container mynfts__page">
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
      {myNFTs.length || savedNfts.length || savedCollections.length ? (
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
                <h1 className="title">Select NFT</h1>
                <div className="create__mint__btns">
                  {selectedTabIndex === 1 && (
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
            <div className="mynfts__page__header">
              <h1 className="title">My NFTs</h1>
              <div className="create__mint__btns">
                {selectedTabIndex === 1 && (
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
          )}

          <div className="mynfts__page__body">
            <ul className="tabs">
              {tabs.map((tab, index) => (
                <li
                  key={uuid()}
                  className={selectedTabIndex === index ? 'active' : ''}
                  onClick={() => setSelectedTabIndex(index)}
                  aria-hidden="true"
                >
                  {tab}
                </li>
              ))}
            </ul>
            {selectedTabIndex === 0 && (
              <Wallet filteredNFTs={filteredNFTs} setFilteredNFTs={setFilteredNFTs} />
            )}
            {selectedTabIndex === 1 && <SavedNFTs />}
            {selectedTabIndex === 2 && <SavedCollections />}
          </div>
        </>
      ) : isCreatingAction ? (
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
        <div className="empty__nfts">
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
      )}
    </div>
  );
};

export default MyNFTs;
