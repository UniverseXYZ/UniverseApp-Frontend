import '../styles/globals.css'

import '../src/assets/scss/normalize.scss';

import '../src/components/header/dimensions/desktop/DesktopView.scss';
import '../src/components/header/dimensions/mobile/MobileView.scss';
import '../src/components/header/dimensions/tablet/TabletView.scss';
import '../src/components/input/Inputs.scss';
import '../src/components/header/Header.scss';
import '../src/components/footer/Footer.scss';
import '../src/components/button/Button.scss';
import '../src/components/polymorphs/styles/About.scss';
import '../src/components/polymorphs/styles/Characters.scss';
import '../src/components/polymorphs/styles/PolymorphsActivity.scss';
import '../src/components/polymorphs/styles/PolymorphsActivityTableRow.scss';
import '../src/components/polymorphs/styles/PolymorphsActivityTableRowMobile.scss';
import '../src/components/polymorphs/styles/Section4.scss';
import '../src/components/polymorphs/styles/Section6.scss';
import '../src/components/polymorphs/styles/WrapperCenter.scss';
import '../src/components/polymorphs/styles/WrapperCenterTwoColumns.scss';
import '../src/components/ui-elements/styles/WelcomeWrapper.scss';
import '../src/components/pagination/Pagination.scss';
import '../src/components/polymorphUniverse/aboutSection/AboutSection.scss';
import '../src/components/polymorphUniverse/battlePolymorphSection/BattlePolymorphSection.scss';
import '../src/components/polymorphUniverse/heroSection/HeroSection.scss';
import '../src/components/polymorphUniverse/latestFeaturesSection/LatestFeaturesSection.scss';
import '../src/components/notFound/NotFound.scss';
import '../src/components/input/SearchField.scss';
import '../src/components/input/RaritySortByOrder.scss';
import '../src/components/input/RaritySortBySelect.scss';
import '../src/components/rarityCharts/filters/RarityFilters.scss';
import '../src/components/rarityCharts/list/RarityList.scss';
import '../src/components/rarityCharts/welcome/Welcome.scss';
import '../src/components/myProfile/styles/CommunitieItem.scss';
import '../src/components/myProfile/styles/CoverPhoto.scss';
import '../src/components/myProfile/styles/GalleryPhotoItem.scss';
import '../src/components/myProfile/styles/GallerySection.scss';
import '../src/components/myProfile/styles/MyCommunities.scss';
import '../src/components/myProfile/styles/MyProfileContainer.scss';
import '../src/components/myProfile/styles/RecentActivity.scss';
import '../src/components/myProfile/styles/RightBlockTopLinks.scss';
import '../src/components/myProfile/styles/Tabs.scss';
import '../src/components/myProfile/styles/Transactions.scss';
import '../src/components/myProfile/styles/UserDataBlock.scss';
import '../src/components/popups/PopupStyle.scss';
import '../src/components/myNFTs/MyNFTs.scss';
import '../src/components/products/minting/Minting.scss';
import '../src/components/general/LoadingImage.scss';
import '../src/components/input/SearchField.scss';
import '../src/components/input/SearchTokenIdField.scss';
import '../src/components/marketplace/browseNFT/NFTsList.scss';
import '../src/components/marketplaceNFT/BrokenNFT.scss';
import '../src/components/myNFTs/UniverseNFTs.scss';
import '../src/components/myNFTs/pendingDropdown/pendingAccordion/PendingAccordion.scss';
import '../src/components/myNFTs/pendingDropdown/pendingCollections/PendingCollections.scss';
import '../src/components/myNFTs/pendingDropdown/pendingNFTs/PendingNFTs.scss';
import '../src/components/nft/NFTCard.scss';
import '../src/components/nft/SearchFilters.scss';
import '../src/components/rarityCharts/filters/LobsterRarityFilters.scss';

import '../src/containers/homepage/Homepage.scss';
import '../src/containers/products/about/About.scss';
import '../src/containers/team/Team.scss'
import '../src/containers/polymorphs/Polymorphs.scss';
import '../src/containers/polymorphUniverse/PolymorphUniverse.scss';
import '../src/containers/rarityCharts/RarityCharts.scss';
import '../src/containers/rarityCharts/RarityCharsLoader.scss';
import '../src/containers/myProfile/MyProfile';
import '../src/containers/myAccount/MyAccount.scss';
import '../src/containers/rarityCharts/PolymorphRarityCharts.scss';
import '../src/containers/rarityCharts/LobsterRarityCharts.scss';

import '../src/components/rarityCharts/list/RarityLobsterList.scss';
import '../src/components/skeletons/nftCardSkeleton/NftCardSkeleton.scss';
import '../src/components/tabs/Tabs.scss';
import '../src/containers/rarityCharts/RarityCharts.scss';
import '../src/containers/rarityCharts/RarityChartsLoader';
import '../src/containers/marketplaceNFT/MarketplaceNFT.scss';
import '../src/components/myNFTs/create/CreateNFT.scss';
import '../src/components/myNFTs/create/CreateSingleNft.scss';
import '../src/components/nft/SearchFilters.scss';
import '../src/containers/collection/Collection.scss';
import '../src/components/lobbyLobsters/donate/Donate.scss';
import '../src/components/lobbyLobsters/helpUs/HelpUsBeHeard.scss';
import '../src/components/lobbyLobsters/heroSection/HeroSection.scss';
import '../src/components/lobbyLobsters/mintSection/MintLobbyLobsterSection.scss';
import '../src/components/lobbyLobsters/sliderSection/SliderSection.scss';
import '../src/components/polymorphs/mint-polymorph/styles/BondingCurve.scss';
import '../src/components/popups/PopupStyle.scss';
import '../src/components/popups/LobsterLoader.scss';
import '../src/components/ui-elements/styles/HorizontalSlider.scss';
import '../src/components/ui-elements/styles/QuantityUpDownGroup.scss';
import '../src/components/auctionsCard/ActiveAuctionsCard.scss';
import '../src/components/auctionsCard/FutureAuctionsCard.scss';
import '../src/containers/artist/Artist.scss';
import '../src/components/polymorphs/scramble/styles/PolymorphScramblePage.scss';
import '../src/components/polymorphs/scramble/styles/PolymorphScrambleProp.scss';
import '../src/components/select/SelectComponent.scss';
import '../src/components/lobbyLobsters/info/styles/LobstersInfoPage.scss';

import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthContextProvider } from '../src/contexts/AuthContext';
import { ThemeContextProvider } from '../src/contexts/ThemeContext';
import { ErrorContextProvider } from '../src/contexts/ErrorContext';
import { LobsterContextProvider } from '../src/contexts/LobsterContext';
import { MyNFTsContextProvider } from '../src/contexts/MyNFTsContext';
import { AuctionContextProvider } from '../src/contexts/AuctionContext';
import { MarketplaceContextProvider } from '../src/contexts/MarketplaceContext';
import Header from '../src/components/header/Header';
import Footer from '../src/components/footer/Footer';
import { PolymorphContextProvider } from '../src/contexts/PolymorphContext';
import { Popups } from '../src/app/components/AppPopups';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <ErrorContextProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ThemeContextProvider>
            {/*<Component {...pageProps} />*/}
            <PolymorphContextProvider>
              <LobsterContextProvider>
                <MyNFTsContextProvider>
                  <AuctionContextProvider>
                    <MarketplaceContextProvider>
                      <Header />
                      <Component {...pageProps} />
                      <Footer />
                      <Popups />
                    </MarketplaceContextProvider>
                  </AuctionContextProvider>
                </MyNFTsContextProvider>
              </LobsterContextProvider>
            </PolymorphContextProvider>
          </ThemeContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </ErrorContextProvider>
  );
}

export default MyApp
