import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './assets/scss/normalize.scss';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Auctions from './containers/auctions/Auction.jsx';
import SetupAuction from './components/setupAuction/SetupAuction';
import CreateTiers from './components/createTiers/Create.jsx';
import MyNFTs from './components/myNFTs/MyNFTs.jsx';
import Artist from './containers/artist/Artist.jsx';
import AuctionLandingPage from './containers/auctionLandingPage/AuctionLandingPage.jsx';
import Homepage from './containers/homepage/Homepage.jsx';
import About from './containers/products/about/About.jsx';
import AuctionHouse from './containers/products/auctionHouse/AuctionHouse.jsx';
import MyAccount from './containers/myAccount/MyAccount.jsx';
import CustomizeAuction from './containers/customizeAuction/CustomizeAuction.jsx';
import Team from './containers/team/Team.jsx';
import AuctionReview from './components/auctions/AuctionReview.jsx';
import NotFound from './components/notFound/NotFound.jsx';
import Collection from './containers/collection/Collection.jsx';
import FinalizeAuction from './components/finalizeAuction/FinalizeAuction.jsx';
import Polymorphs from './containers/polymorphs/Polymorphs.jsx';
import MintPolymorph from './containers/polymorphs/MintPolymorph.jsx';
import BurnToMint from './containers/polymorphs/BurnToMint.jsx';
import PolymorphScramblePage from './components/polymorphs/scramble/PolymorphScramblePage.jsx';
import MarketplaceNFT from './containers/marketplaceNFT/MarketplaceNFT';
import Planet1 from './containers/planets/Planet1.jsx';
import Planet2 from './containers/planets/Planet2.jsx';
import Planet3 from './containers/planets/Planet3.jsx';
import BrowseNFT from './containers/marketplace/browseNFT/BrowseNFT.jsx';
import CharectersDrop from './containers/charactersDrop/CharactersDrop.jsx';
import CharacterPage from './containers/characterPage/CharacterPage.jsx';
import Search from './containers/search/Search.jsx';
import NFTMarketplace from './containers/sellNFT/NFTMarketplace';
import MyProfile from './containers/myProfile/MyProfile';
import CreateNFT from './components/myNFTs/create/CreateNFT';
import RarityCharts from './containers/rarityCharts/RarityCharts';
import PolymorphUniverse from './containers/polymorphUniverse/PolymorphUniverse';
import LobbyLobsters from './containers/lobbyLobsters/LobbyLobsters';
import WrongNetworkPopup from './components/popups/WrongNetworkPopup';
import LobsterInfoPage from './components/lobbyLobsters/info/LobstersInfoPage';
import AuthenticatedRoute from './components/authenticatedRoute/AuthenticatedRoute';
import { AuctionContextProvider } from './contexts/AuctionContext';
import { MyNFTsContextProvider } from './contexts/MyNFTsContext';
import { PolymorphContextProvider } from './contexts/PolymorphContext';
import { LobsterContextProvider } from './contexts/LobsterContext';
import { MarketplaceContextProvider } from './contexts/MarketplaceContext';
import { useAuthContext } from './contexts/AuthContext';
import ErrorPopup from './components/popups/ErrorPopup';
import { useErrorContext } from './contexts/ErrorContext';
import Minting from './components/products/minting/Minting';
import ReleaseRewards from './components/releaseRewards/ReleaseRewards';
import SelectWalletPopup from './components/popups/SelectWalletPopup';

const App = () => {
  const location = useLocation();
  const {
    showWrongNetworkPopup,
    setShowWrongNetworkPopup,
    handleConnectWallet,
    showInstallWalletPopup,
    setShowInstallWalletPopup,
    selectedWallet,
    setSelectedWallet,
    showWalletPopup,
    setshowWalletPopup,
  } = useAuthContext();
  const { showError, closeError } = useErrorContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <PolymorphContextProvider>
      <LobsterContextProvider>
        <MyNFTsContextProvider>
          <AuctionContextProvider>
            <MarketplaceContextProvider>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/team">
                  <Team />
                </Route>
                <AuthenticatedRoute exact path="/minting">
                  <Minting />
                </AuthenticatedRoute>
                <Route exact path="/polymorphs">
                  <Polymorphs />
                </Route>
                <Route exact path="/polymorph-universe">
                  <PolymorphUniverse />
                </Route>
                <Route exact path="/mint-polymorph">
                  <MintPolymorph />
                </Route>
                <Route exact path="/burn-to-mint">
                  <BurnToMint />
                </Route>
                <Route exact path="/planets/adaka">
                  <Planet1 />
                </Route>
                <Route exact path="/planets/prosopon">
                  <Planet2 />
                </Route>
                <Route exact path="/planets/kuapo">
                  <Planet3 />
                </Route>
                <Route exact path="/polymorphs/:id">
                  <PolymorphScramblePage />
                </Route>
                <Route exact path="/lobsters/:id">
                  <LobsterInfoPage />
                </Route>
                <Route exact path="/nft/:collectionAddress/:tokenId">
                  <MarketplaceNFT />
                </Route>
                <Route exact path="/character-page">
                  <CharacterPage />
                </Route>
                <Route exact path="/marketplace">
                  <BrowseNFT />
                </Route>
                <Route exact path="/nft-marketplace/:steps">
                  <NFTMarketplace />
                </Route>
                <Route exact path="/search">
                  <Search />
                </Route>
                <Route exact path="/core-drops">
                  <CharectersDrop />
                </Route>
                <Route exact path="/lobby-lobsters">
                  <LobbyLobsters />
                </Route>
                <Route exact path="/polymorph-rarity">
                  <RarityCharts />
                </Route>
                <AuthenticatedRoute exact path="/my-profile">
                  <MyProfile />
                </AuthenticatedRoute>
                <AuthenticatedRoute requireProfile path="/setup-auction">
                  <SetupAuction />
                </AuthenticatedRoute>
                <Route exact path="/products/auction-house">
                  <AuctionHouse />
                </Route>
                <AuthenticatedRoute exact path="/my-nfts">
                  <MyNFTs />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/my-nfts/create">
                  <CreateNFT />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/my-account">
                  <MyAccount />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/my-auctions">
                  <Auctions />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/create-tiers">
                  <CreateTiers />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/create-tiers/my-nfts/create">
                  <CreateNFT />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/finalize-auction">
                  <FinalizeAuction />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/customize-auction-landing-page">
                  <CustomizeAuction />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/release-rewards">
                  <ReleaseRewards />
                </AuthenticatedRoute>
                <AuthenticatedRoute exact path="/auction-review">
                  <AuctionReview />
                </AuthenticatedRoute>
                <Route exact path="/:artistUsername">
                  <Artist />
                </Route>
                <Route exact path="/collection/:collectionAddress">
                  <Collection />
                </Route>
                <Route exact path="/:artistUsername/:auctionName">
                  <AuctionLandingPage />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
              <Footer />
              <Popup closeOnDocumentClick={false} open={showWrongNetworkPopup}>
                <WrongNetworkPopup close={() => setShowWrongNetworkPopup(false)} />
              </Popup>
              <Popup closeOnDocumentClick={false} open={showError}>
                <ErrorPopup close={closeError} />
              </Popup>
              <Popup closeOnDocumentClick={false} open={showWalletPopup}>
                <SelectWalletPopup
                  close={() => setshowWalletPopup(false)}
                  handleConnectWallet={handleConnectWallet}
                  showInstallWalletPopup={showInstallWalletPopup}
                  setShowInstallWalletPopup={setShowInstallWalletPopup}
                  selectedWallet={selectedWallet}
                  setSelectedWallet={setSelectedWallet}
                />
              </Popup>
            </MarketplaceContextProvider>
          </AuctionContextProvider>
        </MyNFTsContextProvider>
      </LobsterContextProvider>
    </PolymorphContextProvider>
  );
};

export default App;
