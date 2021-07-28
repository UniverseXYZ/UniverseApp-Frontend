/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
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
import { getMetaForSavedNft, getMyNfts } from '../../utils/api/mintNFT';
import { chunkifyArray, formatRoyaltiesForMinting } from '../../utils/helpers/contractInteraction';
import CongratsProfilePopup from '../popups/CongratsProfilePopup';

const MyNFTs = () => {
  const {
    address,
    savedNfts,
    savedCollections,
    setSavedNfts,
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
  } = useContext(AppContext);
  const [selectedNFTIds, setSelectedNFTIds] = useState([]);
  const tabs = ['Wallet', 'Collections', 'Saved NFTs', 'Universe NFTs'];
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
    // TODO:: Find a way to determine which Contract should be used upon Mint Selected is executed
    // universeERC721CoreContract should be used for minting single NFT
    // auctionFactoryContract should be usef for minting Collectibles NFTS
    document.getElementById('loading-hidden-btn').click();
    const newMyNFTs = [...myNFTs];
    // Get the selected NFTS for mint
    const selectedNFTS = savedNfts.filter((nft) => nft.selected);
    const batchMintMetaArray = [];
    const batchMintFeesArray = [];

    console.log('generating meta data', selectedNFTS);

    for (let i = 0; i < selectedNFTS.length; i += 1) {
      const meta = await getMetaForSavedNft(selectedNFTS[i].id);

      batchMintMetaArray.push(meta[0]);
      batchMintFeesArray.push(
        selectedNFTS[i].royalties.length ? formatRoyaltiesForMinting(selectedNFTS[i].royalties) : []
      );
    }

    console.log(batchMintFeesArray);

    // get matrix of nft chunks [ [nft, nft], [nft, nft] ]
    const chunksOfMetaData = chunkifyArray(batchMintMetaArray, 40);
    const chunksOfFeeData = chunkifyArray(batchMintFeesArray, 40);

    // iterate chunks and deposit each one
    for (let chunk = 0; chunk < chunksOfMetaData.length; chunk += 1) {
      console.log(`minting chunk ${chunk + 1} / ${chunksOfMetaData.length} to the contract...`);
      console.log(chunksOfFeeData[chunk]);

      const mintTransaction = await universeERC721CoreContract.batchMintWithDifferentFees(
        address,
        chunksOfMetaData[chunk],
        chunksOfFeeData[chunk][0].length ? chunksOfFeeData[chunk] : [[]]
      );

      const mintReceipt = await mintTransaction.wait();

      console.log('printing receipt...', mintReceipt);
    }

    // Update the ui -> Fetch savedNfts and save them

    // TODO:: for now the BE is not ready with a field to distinguish if its a single or collection item

    // savedNfts.forEach((nft) => {
    // if (nft.selected) {
    // if (nft.type === 'single') {
    //   newMyNFTs.push({
    //     id: nft.id,
    //     type: nft.type,
    //     previewImage: nft.previewImage,
    //     name: nft.name,
    //     description: nft.description,
    //     numberOfEditions: Number(nft.numberOfEditions),
    //     generatedEditions: nft.generatedEditions,
    //     properties: nft.properties,
    //     percentAmount: nft.percentAmount || '',
    //   });
    // } else {
    //   newMyNFTs.push({
    //     id: nft.id,
    //     type: nft.type,
    //     collectionId: nft.collectionName,
    //     collectionName: nft.collectionName,
    //     collectionAvatar: nft.collectionAvatar,
    //     collectionDescription: nft.collectionDescription,
    //     shortURL: nft.shortURL,
    //     previewImage: nft.previewImage,
    //     name: nft.name,
    //     description: nft.description,
    //     numberOfEditions: Number(nft.numberOfEditions),
    //     generatedEditions: nft.generatedEditions,
    //     properties: nft.properties,
    //     percentAmount: nft.percentAmount || '',
    //   });
    // }
    // }
    // });
    const newSavedNFTs = savedNfts.filter((nft) => !nft.selected);
    setSavedNfts(newSavedNFTs);

    const mintedNfts = await getMyNfts();
    setMyNFTs(mintedNfts);

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
      <div className="mynfts__page">
        {existsNFTs() ? renderIfNFTsExist() : renderIfNFTsNotExist()}
      </div>
      {renderPopups()}
    </>
  );
};

export default MyNFTs;
