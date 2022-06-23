import React, { useEffect, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import { useTitle } from 'react-use';

import useStateIfMounted from 'src/utils/hooks/useStateIfMounted';
import { getNftSummary } from 'src/utils/api/mintNFT';
import Tabs from 'src/components/tabs/Tabs';
import LoadingPopup from 'src/components/popups/LoadingPopup';
import CongratsPopup from 'src/components/popups/CongratsPopup';
import DeployedCollections from 'src/components/myNFTs/DeployedCollections';
import SavedNFTs from 'src/components/myNFTs/SavedNFTs';
import UniverseNFTs from 'src/components/myNFTs/UniverseNFTs';
import HiddenNFTs from 'src/components/myNFTs/HiddenNFTs';
import LikedNFTs from 'src/components/myNFTs/LikedNFTs';
import NFTsActivity from 'src/components/myNFTs/NFTsActivity';
import { WalletTab } from './components';
import { useAuthStore } from 'src/stores/authStore';
import { useThemeStore } from 'src/stores/themeStore';
import { useLobsterStore } from 'src/stores/lobsterStore';
import { usePolymorphStore } from 'src/stores/polymorphStore';
import { useMyNftsStore } from 'src/stores/myNftsStore';
import { useQuery } from 'react-query';
import { nftKeys } from '@app/utils/query-keys';
import { useStaticHeader } from '@app/hooks';

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
    { name: 'Draft NFTs', amount: nftSummary?.savedNfts },
    { name: 'Universe NFTs', amount: (userLobsters.length || 0) + (userPolymorphs.length || 0) },
  ];

  // NEW
  const [selectedSavedNfts, setSelectedSavedNfts] = useStateIfMounted([]);

  const [triggerRefetch, setTriggerRefetch] = useStateIfMounted(false);

  useTitle('Universe - My NFTs', { restoreOnUnmount: true });

  useStaticHeader();

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
      <div>
        {renderTabsWrapper()}
      </div>

      {myNFTsSelectedTabIndex === 0 && (
        <WalletTab getTotalNfts={getTotalNfts} />
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
