/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
import React, { useEffect, useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import { useHistory } from 'react-router-dom';
import './MyNFTs.scss';
import { Contract, utils } from 'ethers';
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
import { useThemeContext } from '../../contexts/ThemeContext';
import { useMyNftsContext } from '../../contexts/MyNFTsContext';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLobsterContext } from '../../contexts/LobsterContext';
import { usePolymorphContext } from '../../contexts/PolymorphContext';
import { useErrorContext } from '../../contexts/ErrorContext';
import { sendBatchMintRequest, sendMintRequest } from '../../userFlows/api/ContractInteraction';
import { createMintingNFT, getMetaForSavedNft } from '../../utils/api/mintNFT';
import { formatRoyaltiesForMinting } from '../../utils/helpers/contractInteraction';
import useStateIfMounted from '../../utils/hooks/useStateIfMounted';
import { getNftsPerAddress } from '../../utils/api/marketplace.ts';

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
    setNftSummary,
  } = useMyNftsContext();

  const { userLobsters } = useLobsterContext();
  const { userPolymorphs } = usePolymorphContext();

  const { universeERC721CoreContract, contracts, signer, address } = useAuthContext();

  const { setShowError, setErrorTitle, setErrorBody } = useErrorContext();

  const { setDarkMode } = useThemeContext();

  const scrollContainer = useRef(null);

  // State hooks
  const [showloading, setShowLoading] = useStateIfMounted(false);
  const [showCongratsMintedSavedForLater, setShowCongratsMintedSavedForLater] =
    useStateIfMounted(false);
  const [isDropdownOpened, setIsDropdownOpened] = useStateIfMounted(false);

  // NEW
  const [selectedSavedNfts, setSelectedSavedNfts] = useStateIfMounted([]);

  const [triggerRefetch, setTriggerRefetch] = useStateIfMounted(false);

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

  useEffect(async () => {
    if (address) {
      const summary = await fetchNftSummary();
      const { total: totalNFTs } = await getNftsPerAddress(utils.getAddress(address), 1, 1);
      const summaryCopy = { ...summary };

      // Update total NFTs with the new Scraper Data
      if (totalNFTs) {
        summaryCopy.nfts = totalNFTs;
      }

      setNftSummary(summaryCopy);
    }
  }, [address]);

  const handleMintSelected = async () => {
    setShowLoading(true);
    setActiveTxHashes([]);
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

      const requiredContracts = {};

      selectedSavedNfts.forEach((nft) => {
        const contractAddress = mintingFlowContext.collectionsIdAddressMapping[nft.collectionId];
        requiredContracts[nft.collectionId] = requiredContracts[nft.collectionId] || {};

        if (!contractAddress) {
          requiredContracts[nft.collectionId] = mintingFlowContext.universeERC721CoreContract;
        } else {
          requiredContracts[nft.collectionId] = new Contract(
            contractAddress,
            mintingFlowContext.contracts.UniverseERC721.abi,
            mintingFlowContext.signer
          );
        }
      });

      const formatNfts = selectedSavedNfts.map((nft) => ({
        collectionId: nft.collectionId ? nft.collectionId : 0,
        royalties: nft.royalties ? formatRoyaltiesForMinting(nft.royalties) : [],
        id: nft.id,
        numberOfEditions: nft.numberOfEditions,
        name: nft.name,
        description: nft.description,
      }));

      const tokenURIsPromises = formatNfts.map(async (nft) => {
        const meta = await getMetaForSavedNft(nft.id);
        return { ...meta, nftId: nft.id };
      });
      const tokenURIs = await Promise.all(tokenURIsPromises);

      if (!tokenURIs.length) {
        console.error('server error. cannot get meta data');
        setShowError(true);
        return;
      }

      const nftsAttachedTokenUri = formatNfts.map((nft) => {
        const tokenData = tokenURIs.find((data) => data.nftId === nft.id);

        return {
          ...nft,
          tokenUri: tokenData.tokenUris,
          mintingId: tokenData.mintingNft.id,
        };
      });

      const tokenURIsAndRoyaltiesObject = {};

      nftsAttachedTokenUri.forEach((nft) => {
        if (!tokenURIsAndRoyaltiesObject[nft.collectionId])
          tokenURIsAndRoyaltiesObject[nft.collectionId] = [];

        nft.tokenUri.forEach((token) => {
          tokenURIsAndRoyaltiesObject[nft.collectionId].push({
            token,
            royalties: nft.royalties,
            mintingId: nft.mintingId,
          });
        });
      });

      const isSingle =
        nftsAttachedTokenUri.length === 1 && nftsAttachedTokenUri[0].tokenUri.length === 1;

      const txDataArray = isSingle
        ? await sendMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, mintingFlowContext)
        : await sendBatchMintRequest(
            requiredContracts,
            tokenURIsAndRoyaltiesObject,
            mintingFlowContext
          );

      const totalMintedMapping = {};
      const mintingNftsPromises = txDataArray.map(async (data, i) => {
        const { transaction, mintingIds, status, tokens } = data;
        // transaction is undefined if tx has failed/was rejected by the user
        if (transaction) {
          const txHash = transaction.hash;
          const uniqueMintingIds = mintingIds.filter((c, index) => mintingIds.indexOf(c) === index);

          // Count the actual minted count and update using createMintingNFT()
          mintingIds.forEach((id) => {
            if (totalMintedMapping[id]) {
              totalMintedMapping[id] += 1;
            } else {
              totalMintedMapping[id] = 1;
            }
          });

          const mints = uniqueMintingIds.map((id) => {
            // Check if the count of the id in the mapping will increase
            const moreToGo = txDataArray
              .slice(i + 1)
              .some((tx) => tx.mintingIds && tx.mintingIds.includes(id));

            // Do not update minted count in BE if there's more to go
            if (moreToGo) {
              return createMintingNFT(txHash, id, 0);
            }
            return createMintingNFT(txHash, id, totalMintedMapping[id]);
          });

          await Promise.all(mints);
        }
      });

      await Promise.all(mintingNftsPromises);

      if (!txDataArray.some((data) => data.status !== 2)) {
        setShowLoading(false);
        return;
      }

      const hasSuccessfulTransaction = txDataArray.some((data) => data.status === 1);

      if (hasSuccessfulTransaction) {
        setShowLoading(false);
        setShowCongratsMintedSavedForLater(true);
        setTriggerRefetch(true);
        fetchNftSummary();
      } else {
        setShowLoading(false);
        setShowError(true);
      }
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
            ? nftSummary?.nfts || '0'
            : index === 1
            ? nftSummary?.collections || '0'
            : index === 2
            ? nftSummary?.savedNfts || '0'
            : index === 3
            ? (userLobsters.length || 0) + (userPolymorphs.length || 0) || '0'
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
      <Popup open={showCongratsMintedSavedForLater} closeOnDocumentClick={false}>
        <CongratsPopup
          showCreateMore
          onClose={() => {
            setMyNFTsSelectedTabIndex(0);
            setShowCongratsMintedSavedForLater(false);
          }}
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
