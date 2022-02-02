import React, { useEffect, useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import { useHistory } from 'react-router-dom';
import './MyNFTs.scss';
import Wallet from './Wallet.jsx';
import SavedNFTs from './SavedNFTs.jsx';
import UniverseNFTs from './UniverseNFTs.jsx';
import LoadingPopup from '../popups/LoadingPopup.jsx';
import CongratsPopup from '../popups/CongratsPopup.jsx';
import DeployedCollections from './DeployedCollections.jsx';
import Tabs from '../tabs/Tabs';
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

const MyNFTs = () => {
  const tabs = ['Wallet', 'Collections', 'Saved NFTs', 'Universe NFTs'];
  const history = useHistory();
  const createButtonRef = useRef(null);

  // Context hooks
  const {
    myNFTsSelectedTabIndex,
    setMyNFTsSelectedTabIndex,
    activeTxHashes,
    setActiveTxHashes,
    nftSummary,
    fetchNftSummary,
  } = useMyNftsContext();

  const { userLobsters } = useLobsterContext();
  const { userPolymorphs } = usePolymorphContext();

  const { universeERC721CoreContract, contracts, signer, address } = useAuthContext();

  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();

  const { setDarkMode } = useThemeContext();

  const scrollContainer = useRef(null);

  // State hooks
  const [showloading, setShowLoading] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showCongratsMintedSavedForLater, setShowCongratsMintedSavedForLater] = useState(false);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  // NEW
  const [savedNfts, setSavedNfts] = useState([]);
  const [selectedSavedNfts, setSelectedSavedNfts] = useState([]);

  const [triggerRefetch, setTriggerRefetch] = useState(false);

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

  const handleMintSelected = async () => {
    setShowLoading(true);
    try {
      const nftCollections = selectedSavedNfts.map((nft) => nft.collection);
      const mapping = {};
      nftCollections.forEach((collection) => {
        mapping[collection.id] = collection.address;
      });

      const mintingFlowContext = {
        collectionsIdAddressMapping: mapping,
        universeERC721CoreContract,
        contracts,
        signer,
        address,
        activeTxHashes,
        setActiveTxHashes,
      };

      await MintSavedNftsFlow({
        nfts: selectedSavedNfts,
        helpers: mintingFlowContext,
      });

      setShowLoading(false);
      setShowCongratsMintedSavedForLater(true);
      setTriggerRefetch(true);
      fetchNftSummary();
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
      scrollContainer={scrollContainer}
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
                  disabled={!selectedSavedNfts.length}
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
        {myNFTsSelectedTabIndex === 0 && <Wallet scrollContainer={scrollContainer} />}
        {myNFTsSelectedTabIndex === 1 && <DeployedCollections scrollContainer={scrollContainer} />}
        {myNFTsSelectedTabIndex === 2 && (
          <SavedNFTs
            selectedSavedNfts={selectedSavedNfts}
            setSelectedSavedNfts={setSelectedSavedNfts}
            triggerRefetch={triggerRefetch}
            setTriggerRefetch={setTriggerRefetch}
            scrollContainer={scrollContainer}
          />
        )}
        {myNFTsSelectedTabIndex === 3 && <UniverseNFTs scrollContainer={scrollContainer} />}
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
