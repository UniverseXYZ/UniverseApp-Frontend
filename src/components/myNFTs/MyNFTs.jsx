import React, { useContext, useEffect, useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import { useLocation, useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import './MyNFTs.scss';
import { number } from 'prop-types';
import Wallet from './Wallet.jsx';
import SavedNFTs from './SavedNFTs.jsx';
import UniverseNFTs from './UniverseNFTs.jsx';
import Button from '../button/Button';
import AppContext from '../../ContextAPI';
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
import EmptyTabs from '../tabs/EmptyTabs';
import HiddenNFTs from './HiddenNFTs';
import plusIcon from '../../assets/images/plus.svg';
import NFTsActivity from './NFTsActivity';
import LikedNFTs from './LikedNFTs';
import { MintSavedNftsFlow } from '../../userFlows/MintSavedNftsFlow';
import { useThemeContext } from '../../contexts/ThemeContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLobsterContext } from '../../contexts/LobsterContext';
import { usePolymorphContext } from '../../contexts/PolymorphContext';
import { useErrorContext } from '../../contexts/ErrorContext';

import {
  getMyMintableCollections,
  getMyMintedCollections,
  getMyMintingCollections,
  getMyMintingCollectionsCount,
  getMyMintingNfts,
  getMyMintingNftsCount,
  getMyNfts,
  getNftSummary,
  getSavedNfts,
} from '../../utils/api/mintNFT';
import { useSearchMyNfts } from '../../utils/hooks/useMyNftsPageDebouncer';

const MyNFTs = () => {
  // Constants
  const nftPollInterval = null;
  const collPollInterval = null;
  const pollingInterval = 10000;

  const tabs = ['Wallet', 'Collections', 'Saved NFTs', 'Universe NFTs'];
  const history = useHistory();
  const createButtonRef = useRef(null);

  // Context hooks
  const {
    //   savedNfts,
    //   setSavedNfts,
    //   myNFTs,
    //   setMyNFTs,
    myNFTsSelectedTabIndex,
    setMyNFTsSelectedTabIndex,
    //   collectionsIdAddressMapping,
    activeTxHashes,
    setActiveTxHashes,
    //   mintingNftsCount,
    //   setMintingNftsCount,
    //   myMintableCollections,
  } = useMyNftsContext();

  const { userLobsters } = useLobsterContext();
  const { userPolymorphs } = usePolymorphContext();

  const {
    deployedCollections,
    universeERC721CoreContract,
    contracts,
    signer,
    address,
    loggedInArtist,
    isWalletConnected,
    setDeployedCollections,
    isAuthenticated,
  } = useAuthContext();

  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();

  const { setDarkMode } = useThemeContext();

  // State hooks
  const [selectedNFTIds, setSelectedNFTIds] = useState([]);
  const [showloading, setShowLoading] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showCongratsMintedSavedForLater, setShowCongratsMintedSavedForLater] = useState(false);
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  // NEW
  const [savedNfts, setSavedNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myMintingNFTs, setMyMintingNFTs] = useState([]);
  const [myMintableCollections, setMyMintableCollections] = useState([]);
  const [myMintingCollections, setMyMintingCollections] = useState([]);
  const [mintingNftsCount, setMintingNftsCount] = useState(0);
  const [mintingCollectionsCount, setMintingCollectionsCount] = useState(0);
  const [myNftsLoading, setMyNftsLoading] = useState(true);
  const [nftSummary, setNftSummary] = useState(null);

  const [distinctCollections, setDisinctCollections] = useState([
    ...new Map(
      [...deployedCollections, ...myMintableCollections].map((item) => [item.id, item])
    ).values(),
  ]);

  // END NEW

  // Load Nfts
  // const fetchNfts = async () => {
  //   try {
  //     setMyNftsLoading(true);
  //     const [
  //       savedNFTS,
  //       myNfts,
  //       mintingNfts,
  //       mintedCollectionsRequest,
  //       mintingcollectionsRequest,
  //       mintableCollections,
  //     ] = await Promise.all([
  //       getSavedNfts(),
  //       getMyNfts(),
  //       getMyMintingNfts(),
  //       getMyMintedCollections(),
  //       getMyMintingCollections(),
  //       getMyMintableCollections(0, 1000),
  //     ]);

  //     setSavedNfts(savedNFTS.nfts || []);

  //     setMyNFTs(myNfts || []);
  //     setMyNftsLoading(false);
  //     setMyMintingNFTs(mintingNfts || []);

  //     setDeployedCollections(mintedCollectionsRequest.collections || []);
  //     setMyMintableCollections(mintableCollections.collections || []);
  //     setMyMintingCollections(mintingcollectionsRequest.collections || []);

  //     if (mintingNfts.length) {
  //       setMintingNftsCount(mintingNfts.length);
  //     }

  //     if (mintingcollectionsRequest.collections.length) {
  //       setMintingCollectionsCount(mintingcollectionsRequest.collections.length);
  //     }
  //   } catch (err) {
  //     console.error(
  //       'Failed to fetch nfts. Most likely due to failed notifcation. Please sign out and sign in again.'
  //     );
  //     setMyNftsLoading(false);
  //   }
  //   setMyNftsLoading(false);
  // };

  // useEffect(() => {
  //   const canRequestData = loggedInArtist && isWalletConnected && isAuthenticated;
  //   if (canRequestData) {
  //     fetchNfts();
  //   } else {
  //     setSavedNfts([]);
  //     setMyNFTs([]);
  //     setDeployedCollections([]);
  //   }
  // }, [loggedInArtist, isWalletConnected]);

  // UseEffects
  useEffect(() => {
    const newDistinct = [
      ...new Map(
        [...deployedCollections, ...myMintableCollections].map((item) => [item.id, item])
      ).values(),
    ];
    setDisinctCollections(newDistinct);
  }, [deployedCollections, myMintableCollections]);

  const handleClickOutside = (event) => {
    if (createButtonRef.current && !createButtonRef.current.contains(event.target)) {
      setIsDropdownOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (!showloading) setActiveTxHashes([]);
  }, [showloading]);

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

  const fetchNftSummary = async () => {
    const summary = await getNftSummary();
    setNftSummary(summary);
  };
  useEffect(() => {
    fetchNftSummary();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (document.querySelector('.tab__right__arrow')) {
        if (window.innerWidth < 660) {
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

  const checkSelectedSavedNfts = () => {
    const res = savedNfts.filter((nft) => nft.selected);

    return !res.length;
  };

  const handleMintSelected = async () => {
    setShowLoading(true);
    try {
      const selectedNfts = savedNfts.filter((nft) => nft.selected);
      const mintingFlowContext = {
        collectionsIdAddressMapping,
        universeERC721CoreContract,
        contracts,
        signer,
        address,
        activeTxHashes,
        setActiveTxHashes,
      };

      await MintSavedNftsFlow({
        nfts: selectedNfts,
        helpers: mintingFlowContext,
      });

      const serverProcessTime = 5000; // The BE needs some time to catch the transaction
      setTimeout(async () => {
        const [mintedNFTS, savedNFTS] = await Promise.all([getMyNfts(), getSavedNfts()]);
        setMyNFTs(mintedNFTS || []);
        setSavedNfts(savedNFTS || []);

        setMintingNftsCount(mintingNftsCount + selectedNfts.length);
        setShowLoading(false);
        setShowCongratsMintedSavedForLater(true);
      }, serverProcessTime);
    } catch (e) {
      console.error(e, 'Error !');
      setShowLoading(false);
      if (e.code === 4001) {
        setErrorTitle('Failed to mint selected NFTs');
        setErrorBody('User denied transaction signature');
      }
      setShowError(true);
    }
  };

  const renderTabsWrapper = () => (
    <Tabs
      items={tabs.map((tab, index) => ({
        name: tab,
        active: myNFTsSelectedTabIndex === index,
        handler: setMyNFTsSelectedTabIndex.bind(this, index),
        length:
          index === 0
            ? nftSummary?.nfts || null
            : index === 1
            ? nftSummary?.collections || null
            : index === 2
            ? nftSummary?.savedNfts
            : index === 3
            ? (userLobsters.length || null) + (userPolymorphs.length || null) || null
            : null,
      }))}
    />
  );

  const renderPopups = () => (
    <>
      <Popup closeOnDocumentClick={false} open={showloading}>
        <LoadingPopup
          text="The transaction is in progress. Keep this window opened. Navigating away from the page will reset the current progress."
          onClose={() => setShowLoading(false)}
          contractInteraction
        />
      </Popup>
      <Popup closeOnDocumentClick={false} open={showCongrats}>
        <CongratsPopup onClose={() => setShowCongrats(false)} />
      </Popup>
      <Popup open={showCongratsMintedSavedForLater} closeOnDocumentClick={false}>
        <CongratsPopup
          showCreateMore
          onClose={() => setShowCongratsMintedSavedForLater(false)}
          message="Saved for later NFT was successfully minted and should be displayed in your wallet shortly"
        />
      </Popup>
    </>
  );

  const renderIfNFTsExist = () => (
    <>
      <div className="mynfts__page__gradient">
        <div className="container mynfts__page__header">
          <h1 className="title">My NFTs</h1>
          <div className="create__mint__btns">
            {myNFTsSelectedTabIndex === 2 && (
              <>
                <button
                  type="button"
                  className="mint__btn"
                  onClick={handleMintSelected}
                  disabled={checkSelectedSavedNfts()}
                >
                  Mint selected
                </button>
                <button
                  type="button"
                  ref={createButtonRef}
                  className={`create--nft--dropdown  ${
                    isDropdownOpened ? 'opened' : ''
                  } light-button`}
                  onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                  aria-hidden="true"
                >
                  Create
                  <img src={plusIcon} alt="icon" />
                  {isDropdownOpened && (
                    <div className="sort__share__dropdown">
                      <ul>
                        <li
                          aria-hidden="true"
                          onClick={() =>
                            history.push('/my-nfts/create', {
                              tabIndex: 1,
                              nftType: 'single',
                              backPath: 'myNFTs',
                            })
                          }
                        >
                          NFT
                        </li>
                        <li
                          aria-hidden="true"
                          onClick={() =>
                            history.push('/my-nfts/create', {
                              tabIndex: 1,
                              nftType: 'collection',
                              backPath: 'myNFTs',
                            })
                          }
                        >
                          Collection
                        </li>
                      </ul>
                    </div>
                  )}
                </button>
              </>
            )}
            {myNFTsSelectedTabIndex === 3 && (
              <button
                type="button"
                className="light-border-button light--button--mobile"
                onClick={() => history.push('/polymorph-rarity')}
              >
                Polymorph rarity chart
              </button>
            )}
            {myNFTsSelectedTabIndex !== 2 && (
              <button
                type="button"
                ref={createButtonRef}
                className={`create--nft--dropdown  ${
                  isDropdownOpened ? 'opened' : ''
                } light-button light--button--mobile`}
                onClick={() => setIsDropdownOpened(!isDropdownOpened)}
                aria-hidden="true"
              >
                Create
                <img src={plusIcon} alt="icon" />
                {isDropdownOpened && (
                  <div className="sort__share__dropdown">
                    <ul>
                      <li
                        aria-hidden="true"
                        onClick={() =>
                          history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
                        }
                      >
                        NFT
                      </li>
                      <li
                        aria-hidden="true"
                        onClick={() =>
                          history.push('/my-nfts/create', {
                            tabIndex: 1,
                            nftType: 'collection',
                          })
                        }
                      >
                        Collection
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
        {renderTabsWrapper()}
      </div>

      <div className="container mynfts__page__body">
        {myNFTsSelectedTabIndex === 0 && <Wallet />}
        {myNFTsSelectedTabIndex === 1 && <DeployedCollections />}
        {myNFTsSelectedTabIndex === 2 && <SavedNFTs />}
        {myNFTsSelectedTabIndex === 3 && <UniverseNFTs />}
        {myNFTsSelectedTabIndex === 4 && <HiddenNFTs />}
        {myNFTsSelectedTabIndex === 5 && <LikedNFTs />}
        {myNFTsSelectedTabIndex === 6 && <NFTsActivity />}
      </div>
    </>
  );

  return (
    <>
      <div className="mynfts__page">{renderIfNFTsExist()}</div>
      {renderPopups()}
    </>
  );
};

export default MyNFTs;
