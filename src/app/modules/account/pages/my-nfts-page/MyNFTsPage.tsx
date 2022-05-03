import { Contract, utils } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { useClickAway, useTitle } from 'react-use';
import { useRouter } from 'next/router';

import { useMyNftsContext } from '../../../../../contexts/MyNFTsContext';
import { useLobsterContext } from '../../../../../contexts/LobsterContext';
import { usePolymorphContext } from '../../../../../contexts/PolymorphContext';
import { useThemeContext } from '../../../../../contexts/ThemeContext';
import useStateIfMounted from '../../../../../utils/hooks/useStateIfMounted';
import { formatRoyaltiesForMinting } from '../../../../../utils/helpers/contractInteraction';
import { createMintingNFT, getMetaForSavedNft } from '../../../../../utils/api/mintNFT';
import { sendBatchMintRequest, sendMintRequest } from '../../../../../userFlows/api/ContractInteraction';
import Tabs from '../../../../../components/tabs/Tabs';
import LoadingPopup from '../../../../../components/popups/LoadingPopup';
import CongratsPopup from '../../../../../components/popups/CongratsPopup';
import plusIcon from '../../../../../assets/images/plus.svg';
import Wallet from '../../../../../components/myNFTs/Wallet';
import DeployedCollections from '../../../../../components/myNFTs/DeployedCollections';
import SavedNFTs from '../../../../../components/myNFTs/SavedNFTs';
import UniverseNFTs from '../../../../../components/myNFTs/UniverseNFTs';
import HiddenNFTs from '../../../../../components/myNFTs/HiddenNFTs';
import LikedNFTs from '../../../../../components/myNFTs/LikedNFTs';
import NFTsActivity from '../../../../../components/myNFTs/NFTsActivity';
import { WalletTab } from './components';
import FiltersContextProvider from '../../../account/pages/my-nfts-page/components/search-filters/search-filters.context';
import { useAuthStore } from '../../../../../stores/authStore';
import Contracts from '../../../../../contracts/contracts.json';
import { useErrorStore } from '../../../../../stores/errorStore';
 
// @ts-ignore
const { contracts } = Contracts[process.env.REACT_APP_NETWORK_CHAIN_ID];

export const MyNFTsPage = () => {
  const router = useRouter();
  const createButtonRef = useRef<HTMLButtonElement>(null);

  // Context hooks
  const {
    myNFTsSelectedTabIndex,
    setMyNFTsSelectedTabIndex,
    activeTxHashes,
    setActiveTxHashes,
    nftSummary
  } = useMyNftsContext() as any;

  const { userLobsters } = useLobsterContext() as any;
  const { userPolymorphs } = usePolymorphContext() as any;

  const { signer, address } = useAuthStore(state => ({
    signer: state.signer,
    address: state.address
  }));

  const { setShowError, setErrorTitle, setErrorBody } = useErrorStore(s => ({setShowError: s.setShowError, setErrorTitle: s.setErrorTitle, setErrorBody: s.setErrorBody}))

  const { setDarkMode } = useThemeContext() as any;

  const scrollContainer = useRef(null);

  // State hooks
  const [totalNfts, getTotalNfts] = useState<string | number>('-');
  const [showLoading, setShowLoading] = useStateIfMounted(false);
  const [showCongratsMintedSavedForLater, setShowCongratsMintedSavedForLater] = useStateIfMounted(false);
  const [isDropdownOpened, setIsDropdownOpened] = useStateIfMounted(false);

  const tabs = [
    { name: 'Wallet', amount: totalNfts },
    { name: 'Universe Collections', amount: nftSummary?.collections },
    { name: 'Saved NFTs', amount: nftSummary?.savedNfts },
    { name: 'Universe NFTs', amount: (userLobsters.length || 0) + (userPolymorphs.length || 0) },
  ];

  // NEW
  const [selectedSavedNfts, setSelectedSavedNfts] = useStateIfMounted([]);

  const [triggerRefetch, setTriggerRefetch] = useStateIfMounted(false);

  useTitle('Universe - My NFTs', { restoreOnUnmount: true });

  useClickAway(createButtonRef, () => {
    setIsDropdownOpened(false);
  });

  useEffect(() => {
    if (!showLoading) {
      setActiveTxHashes([]);
    }
  }, [showLoading]);

  useEffect(() => {
    setDarkMode(false);
  }, []);

  const handleMintSelected = async () => {
    setShowLoading(true);
    setActiveTxHashes([]);
    try {
      const nftCollections = selectedSavedNfts.map((nft: any) => nft.collection);
      const mapping: any = {};
      nftCollections.forEach((collection: any) => {
        mapping[collection.id] = collection.address;
      });

      const mintingFlowContext = {
        collectionsIdAddressMapping: mapping,
        contracts,
        signer,
        address,
        activeTxHashes,
        setActiveTxHashes,
      };

      const requiredContracts: any = {};

      selectedSavedNfts.forEach((nft: any) => {
        const contractAddress = mintingFlowContext.collectionsIdAddressMapping[nft.collectionId];
        requiredContracts[nft.collectionId] = requiredContracts[nft.collectionId] || {};

        if (!contractAddress || !mintingFlowContext.signer) {
          requiredContracts[nft.collectionId] = mintingFlowContext.contracts.UniverseERC721Core;
        } else {
          requiredContracts[nft.collectionId] = new Contract(
            contractAddress,
            mintingFlowContext.contracts.UniverseERC721Core.abi,
            mintingFlowContext.signer
          );
        }
      });

      const formatNfts = selectedSavedNfts.map((nft: any) => ({
        collectionId: nft.collectionId ? nft.collectionId : 0,
        royalties: nft.royalties ? formatRoyaltiesForMinting(nft.royalties) : [],
        id: nft.id,
        numberOfEditions: nft.numberOfEditions,
        name: nft.name,
        description: nft.description,
      }));

      const tokenURIsPromises = formatNfts.map(async (nft: any) => {
        const meta = await getMetaForSavedNft(nft.id);
        return { ...meta, nftId: nft.id };
      });
      const tokenURIs = await Promise.all(tokenURIsPromises);

      if (!tokenURIs.length) {
        console.error('server error. cannot get meta data');
        setShowError(true);
        return;
      }

      const nftsAttachedTokenUri = formatNfts.map((nft: any) => {
        const tokenData = tokenURIs.find((data: any) => data.nftId === nft.id) as any;

        return {
          ...nft,
          tokenUri: tokenData?.tokenUris,
          mintingId: tokenData?.mintingNft.id,
        };
      });

      const tokenURIsAndRoyaltiesObject: any = {};

      nftsAttachedTokenUri.forEach((nft: any) => {
        if (!tokenURIsAndRoyaltiesObject[nft.collectionId]) tokenURIsAndRoyaltiesObject[nft.collectionId] = [];

        nft.tokenUri.forEach((token: any) => {
          tokenURIsAndRoyaltiesObject[nft.collectionId].push({
            token,
            royalties: nft.royalties,
            mintingId: nft.mintingId,
          });
        });
      });

      const isSingle = nftsAttachedTokenUri.length === 1 && nftsAttachedTokenUri[0].tokenUri.length === 1;

      const txDataArray: any = isSingle
        ? await sendMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, mintingFlowContext)
        : await sendBatchMintRequest(requiredContracts, tokenURIsAndRoyaltiesObject, mintingFlowContext);

      const totalMintedMapping: any = {};
      const mintingNftsPromises = txDataArray.map(async (data: any, i: number) => {
        const { transaction, mintingIds, status, tokens } = data;
        // transaction is undefined if tx has failed/was rejected by the user
        if (transaction) {
          const txHash = transaction.hash;
          const uniqueMintingIds = mintingIds.filter((c: any, index: number) => mintingIds.indexOf(c) === index);

          // Count the actual minted count and update using createMintingNFT()
          mintingIds.forEach((id: any) => {
            if (totalMintedMapping[id]) {
              totalMintedMapping[id] += 1;
            } else {
              totalMintedMapping[id] = 1;
            }
          });

          const mints = uniqueMintingIds.map((id: any) => {
            // Check if the count of the id in the mapping will increase
            const moreToGo = txDataArray.slice(i + 1).some((tx: any) => tx.mintingIds && tx.mintingIds.includes(id));

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

      if (!txDataArray.some((data: any) => data.status !== 2)) {
        setShowLoading(false);
        return;
      }

      const hasSuccessfulTransaction = txDataArray.some((data: any) => data.status === 1);

      if (hasSuccessfulTransaction) {
        setShowLoading(false);
        setShowCongratsMintedSavedForLater(true);
        setTriggerRefetch(true);
      } else {
        setShowLoading(false);
        setShowError(true);
      }
    } catch (e: any) {
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
      items={tabs.map(({ name, amount }, index) => ({
        name,
        active: myNFTsSelectedTabIndex === index,
        handler: setMyNFTsSelectedTabIndex.bind(this, index),
        length: amount,
      }))}
    />
  );

  const renderPopups = () => (
    <>
      <Popup closeOnDocumentClick={false} open={showLoading}>
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
                  className={`create--nft--dropdown  ${isDropdownOpened ? 'opened' : ''} light-button`}
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
                          onClick={() => router.push('/my-nfts/create?tabIndex=1&nftType=single&backPath=myNFTs')}
                        >
                          NFT
                        </li>
                        <li
                          aria-hidden="true"
                          onClick={() => router.push('/my-nfts/create?tabIndex=1&nftType=collection&backPath=myNFTs')}
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
                onClick={() => router.push('/polymorph-rarity')}
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
                        onClick={() => router.push('/my-nfts/create?tabIndex=1&nftType=single')}
                      >
                        NFT
                      </li>
                      <li
                        aria-hidden="true"
                        onClick={() => router.push('/my-nfts/create?tabIndex=1&nftType=collection')}
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

      {myNFTsSelectedTabIndex === 0 && (
        <FiltersContextProvider defaultSorting={0} >
          <WalletTab getTotalNfts={getTotalNfts} />
        </FiltersContextProvider>
      )}
      <div className="container mynfts__page__body">
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
