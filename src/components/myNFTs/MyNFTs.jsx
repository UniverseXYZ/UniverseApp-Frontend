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

import { getMyNfts, getSavedNfts } from '../../utils/api/mintNFT';

const MyNFTs = () => {
  const {
    savedNfts,
    savedCollections,
    setSavedNfts,
    savedNFTsID,
    setSavedNFTsID,
    setActiveView,
    myNFTs,
    setMyNFTs,
    selectedNft,
    myNFTsSelectedTabIndex,
    setMyNFTsSelectedTabIndex,
    collectionsIdAddressMapping,
    activeTxHashes,
    setActiveTxHashes,
    mintingNftsCount,
    setMintingNftsCount,
    myMintableCollections,
  } = useMyNftsContext();

  const { userLobsters } = useLobsterContext();
  const { userPolymorphs } = usePolymorphContext();

  const { deployedCollections, universeERC721CoreContract, contracts, signer, address } =
    useAuthContext();

  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();

  const { setDarkMode } = useThemeContext();
  const [selectedNFTIds, setSelectedNFTIds] = useState([]);
  const [showloading, setShowLoading] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showCongratsMintedSavedForLater, setShowCongratsMintedSavedForLater] = useState(false);
  const [distinctCollections, setDisinctCollections] = useState([
    ...new Map(
      [...deployedCollections, ...myMintableCollections].map((item) => [item.id, item])
    ).values(),
  ]);

  useEffect(() => {
    const newDistinct = [
      ...new Map(
        [...deployedCollections, ...myMintableCollections].map((item) => [item.id, item])
      ).values(),
    ];
    setDisinctCollections(newDistinct);
  }, [deployedCollections, myMintableCollections]);

  const tabs = [
    'Wallet',
    'Collections',
    'Saved NFTs',
    'Universe NFTs',
    // 'Hidden',
    // 'Liked',
    // 'Activity',
  ];
  const emptyTabs = ['Wallet', 'Collections'];
  const [filteredNFTs, setFilteredNFTs] = useState([]);
  const location = useLocation();
  const isCreatingAction = location.pathname === '/select-nfts';
  const history = useHistory();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const refMobile = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleClickOutside = (event) => {
    if (ref2.current && !ref2.current.contains(event.target)) {
      setIsDropdownOpened(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const checkSelectedSavedNfts = () => {
    const res = savedNfts.filter((nft) => nft.selected);

    return !res.length;
  };

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

  const existsNFTs = () =>
    myNFTs.length ||
    deployedCollections.length ||
    savedNfts.length ||
    savedCollections.length ||
    userPolymorphs.length ||
    userLobsters.length;

  const renderTabsWrapper = () => (
    <Tabs
      items={tabs.map((tab, index) => ({
        name: tab,
        active: myNFTsSelectedTabIndex === index,
        handler: setMyNFTsSelectedTabIndex.bind(this, index),
        length:
          index === 0 && myNFTs.filter((nft) => !nft?.hidden).length > 0
            ? myNFTs.filter((nft) => !nft?.hidden).length
            : index === 1 && distinctCollections.length > 0
            ? distinctCollections.length
            : index === 2 && savedNfts.length > 0
            ? savedNfts.length
            : index === 3 && (userLobsters.length || userPolymorphs.length)
            ? userLobsters.length + userPolymorphs.length
            : index === 4 && myNFTs.filter((nft) => nft.hidden).length > 0,
        // ? myNFTs.filter((nft) => nft.hidden).length
        // : index === 5 && myNFTs.filter((nft) => nft.likers.length).length > 0
        // ? myNFTs.filter((nft) => nft.likers.length).length
        // : null,
      }))}
    />
  );

  const renderEmptyTabsWrapper = () => (
    <EmptyTabs
      items={tabs.map((tab, index) => ({
        name: tab,
        active: myNFTsSelectedTabIndex === index,
        handler: setMyNFTsSelectedTabIndex.bind(this, index),
        length:
          index === 0 && myNFTs.filter((nft) => !nft?.hidden).length > 0
            ? myNFTs.filter((nft) => !nft?.hidden).length
            : index === 1 && deployedCollections.length > 0
            ? deployedCollections.length
            : index === 2 && savedNfts.length > 0
            ? savedNfts.length
            : index === 3 && (userLobsters.length || userPolymorphs.length)
            ? userLobsters.length + userPolymorphs.length
            : index === 4 && myNFTs.filter((nft) => nft.hidden).length > 0,
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
                <Button
                  ref={ref}
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
                            history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
                          }
                        >
                          NFT
                        </li>
                        <li
                          aria-hidden="true"
                          onClick={() =>
                            history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' })
                          }
                        >
                          Collection
                        </li>
                      </ul>
                    </div>
                  )}
                </Button>
              ) : (
                <Button
                  ref={ref}
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
                            history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
                          }
                        >
                          NFT
                        </li>
                        <li
                          aria-hidden="true"
                          onClick={() =>
                            history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' })
                          }
                        >
                          Collection
                        </li>
                      </ul>
                    </div>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
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
                    ref={ref2}
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
                  ref={ref2}
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
        {myNFTsSelectedTabIndex === 4 && <HiddenNFTs />}
        {myNFTsSelectedTabIndex === 5 && <LikedNFTs />}
        {myNFTsSelectedTabIndex === 6 && <NFTsActivity />}
      </div>
    </>
  );

  // const renderIfNFTsNotExist = () =>
  //   isCreatingAction ? (
  //     <div className="container select-nfts">
  //       <div
  //         className="back-rew"
  //         onClick={() => {
  //           history.push('/reward-tiers');
  //         }}
  //         aria-hidden="true"
  //       >
  //         <img src={arrow} alt="back" />
  //         <span>Create reward tier</span>
  //       </div>
  //       <div>
  //         <div className="head-part">
  //           <h2 className="tier-title">Select NFTs</h2>
  //         </div>
  //         <div className="space-tier-div">
  //           {selectedNft.length > 0 ? '' : <p>No NFTs found in your wallet</p>}
  //         </div>
  //         <div className="create-rew-tier select-ntfs" onClick={handleOpen} aria-hidden="true">
  //           <div className="plus-icon">
  //             <img src={union} alt="create" />
  //           </div>
  //           <div className="create-rew-text">
  //             <p>Create NFT</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   ) : (
  //     <>
  //       <div className="mynfts__page__gradient">
  //         <div className="container mynfts__page__header">
  //           <h1 className="title">My NFTs</h1>
  //         </div>
  //         {renderEmptyTabsWrapper()}
  //       </div>
  //       <div className="container mynfts__page__body">
  //         {myNFTsSelectedTabIndex === 0 && (
  //           <>
  //             <div className="empty__nfts">
  //               <div className="tabs-empty">
  //                 <div className="image-bubble">
  //                   <img src={bubbleIcon} alt="bubble-icon" />
  //                 </div>
  //                 <h3>No NFTs found</h3>
  //                 <p>
  //                   Create NFTs or NFT collections with our platform by clicking the button below
  //                 </p>
  //                 <button
  //                   type="button"
  //                   ref={ref2}
  //                   className={`create--nft--dropdown  ${
  //                     isDropdownOpened ? 'opened' : ''
  //                   } light-button`}
  //                   onClick={() => setIsDropdownOpened(!isDropdownOpened)}
  //                   aria-hidden="true"
  //                 >
  //                   Create
  //                   <img src={plusIcon} alt="icon" />
  //                   {isDropdownOpened && (
  //                     <div className="sort__share__dropdown">
  //                       <ul>
  //                         <li
  //                           aria-hidden="true"
  //                           onClick={() =>
  //                             history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
  //                           }
  //                         >
  //                           NFT
  //                         </li>
  //                         <li
  //                           aria-hidden="true"
  //                           onClick={() =>
  //                             history.push('/my-nfts/create', {
  //                               tabIndex: 1,
  //                               nftType: 'collection',
  //                             })
  //                           }
  //                         >
  //                           Collection
  //                         </li>
  //                       </ul>
  //                     </div>
  //                   )}
  //                 </button>
  //               </div>
  //             </div>
  //           </>
  //         )}
  //         {myNFTsSelectedTabIndex === 1 && (
  //           <>
  //             <div className="empty__nfts">
  //               <div className="tabs-empty">
  //                 <div className="image-bubble">
  //                   <img src={bubbleIcon} alt="bubble-icon" />
  //                 </div>
  //                 <h3>No collections found</h3>
  //                 <p>
  //                   Create NFTs or NFT collections with our platform by clicking the button below
  //                 </p>
  //                 <button
  //                   type="button"
  //                   ref={ref2}
  //                   className={`create--nft--dropdown  ${
  //                     isDropdownOpened ? 'opened' : ''
  //                   } light-button`}
  //                   onClick={() => setIsDropdownOpened(!isDropdownOpened)}
  //                   aria-hidden="true"
  //                 >
  //                   Create
  //                   <img src={plusIcon} alt="icon" />
  //                   {isDropdownOpened && (
  //                     <div className="sort__share__dropdown">
  //                       <ul>
  //                         <li
  //                           aria-hidden="true"
  //                           onClick={() =>
  //                             history.push('/my-nfts/create', { tabIndex: 1, nftType: 'single' })
  //                           }
  //                         >
  //                           NFT
  //                         </li>
  //                         <li
  //                           aria-hidden="true"
  //                           onClick={() =>
  //                             history.push('/my-nfts/create', {
  //                               tabIndex: 1,
  //                               nftType: 'collection',
  //                             })
  //                           }
  //                         >
  //                           Collection
  //                         </li>
  //                       </ul>
  //                     </div>
  //                   )}
  //                 </button>
  //               </div>
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     </>
  //   );

  return (
    <>
      <div className="mynfts__page">
        {/* {existsNFTs() ? renderIfNFTsExist() : renderIfNFTsNotExist()} */}
        {renderIfNFTsExist()}
      </div>
      {renderPopups()}
    </>
  );
};

export default MyNFTs;
