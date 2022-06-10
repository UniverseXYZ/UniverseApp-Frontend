import React, { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { useTitle } from 'react-use';

import useStateIfMounted from '../../../../../../../utils/hooks/useStateIfMounted';
import { getNftSummary } from '../../../../../../../utils/api/mintNFT';
import Tabs from '../../../../../../../components/tabs/Tabs';
import LoadingPopup from '../../../../../../../components/popups/LoadingPopup';
import CongratsPopup from '../../../../../../../components/popups/CongratsPopup';
import DeployedCollections from '../../../../../../../components/myNFTs/DeployedCollections';
import SavedNFTs from '../../../../../../../components/myNFTs/SavedNFTs';
import UniverseNFTs from '../../../../../../../components/myNFTs/UniverseNFTs';
import HiddenNFTs from '../../../../../../../components/myNFTs/HiddenNFTs';
import LikedNFTs from '../../../../../../../components/myNFTs/LikedNFTs';
import NFTsActivity from '../../../../../../../components/myNFTs/NFTsActivity';
import { WalletTab } from './components';
import FiltersContextProvider from './components/search-filters/search-filters.context';
import { useAuthStore } from '../../../../../../../stores/authStore';
import { useThemeStore } from 'src/stores/themeStore';
import { useLobsterStore } from 'src/stores/lobsterStore';
import { usePolymorphStore } from 'src/stores/polymorphStore';
import { useMyNftsStore } from 'src/stores/myNftsStore';
import { useQuery } from 'react-query';
import { nftKeys } from '@app/utils/query-keys';

export const MyNFTs = () => {
  // Context hooks
  const {
    myNFTsSelectedTabIndex,
    setMyNFTsSelectedTabIndex,
    setActiveTxHashes,
  } = useMyNftsStore(s => ({
    myNFTsSelectedTabIndex: s.myNFTsSelectedTabIndex,
    setMyNFTsSelectedTabIndex: s.setMyNFTsSelectedTabIndex,
    setActiveTxHashes: s.setActiveTxHashes,
  }))

  const userLobsters = useLobsterStore(s => s.userLobsters);
  const userPolymorphs = usePolymorphStore(s => s.userPolymorphs)

  const { address } = useAuthStore(state => ({
    address: state.address
  }));

  const setDarkMode = useThemeStore(s => s.setDarkMode);

  const {isAuthenticated, isAuthenticating} = useAuthStore(s => ({isAuthenticated: s.isAuthenticated, isAuthenticating: s.isAuthenticating}))

  const scrollContainer = useRef(null);

  const { data: nftSummary, refetch: refetchSummary } = useQuery(nftKeys.fetchNftSummary(address), getNftSummary, {
    enabled: !!address && isAuthenticated && !isAuthenticating,
  });

  // State hooks
  const [totalNfts, getTotalNfts] = useState<string | number>('-');
  const [showLoading, setShowLoading] = useStateIfMounted(false);
  const [showCongratsMintedSavedForLater, setShowCongratsMintedSavedForLater] = useStateIfMounted(false);

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

  useEffect(() => {
    if (!showLoading) {
      setActiveTxHashes([]);
    }
  }, [showLoading]);

  useEffect(() => {
    setDarkMode(false);
  }, []);

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
      <div>{renderTabsWrapper()}</div>
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
            onNFTRemoved={() => refetchSummary()}
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
