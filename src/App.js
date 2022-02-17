import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
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
import Marketplace from './containers/products/marketplace/Marketplace.jsx';
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
import { App as NewApp } from './app/App';
import { SellPage, BrowseNFTsPage } from './app/modules/marketplace/pages';
import { LayoutProvider } from './app/providers';
import { BundlePage, NFTPage } from './app/modules/nft';

class UniverseRoute {
  constructor(
    component,
    isPrivate = false,
    isRewritten = false,
    routeProps = { exact: true },
    componentProps = {}
  ) {
    this.Component = component;
    this.isPrivate = isPrivate;
    this.isRewritten = isRewritten;
    this.routeProps = routeProps;
    this.componentProps = componentProps;
  }
}

const routes = {
  '/': new UniverseRoute(Homepage),
  '/about': new UniverseRoute(About),
  '/team': new UniverseRoute(Team),
  '/minting': new UniverseRoute(Minting),
  '/polymorphs': new UniverseRoute(Polymorphs),
  '/polymorph-universe': new UniverseRoute(PolymorphUniverse),
  // '/mint-polymorph': new UniverseRoute(MintPolymorph),
  // '/burn-to-mint': new UniverseRoute(BurnToMint),
  // '/planets/adaka': new UniverseRoute(Planet1),
  // '/planets/prosopon': new UniverseRoute(Planet2),
  // '/planets/kuapo': new UniverseRoute(Planet3),
  '/polymorphs/:id': new UniverseRoute(PolymorphScramblePage),
  '/lobsters/:id': new UniverseRoute(LobsterInfoPage),
  '/nft/:collectionAddress/:tokenId': new UniverseRoute(MarketplaceNFT),
  // '/character-page': new UniverseRoute(CharacterPage),
  '/marketplace': new UniverseRoute(BrowseNFT),
  '/v2/marketplace/browse': new UniverseRoute(BrowseNFTsPage, false, true),
  '/v2/marketplace/sell': new UniverseRoute(SellPage, false, true),
  '/v2/nft/:collectionAddress/:tokenId': new UniverseRoute(NFTPage, false, true),
  '/v2/bundle/:hash': new UniverseRoute(BundlePage, false, true),
  '/nft-marketplace/:steps': new UniverseRoute(NFTMarketplace),
  // '/search': new UniverseRoute(Search),
  // '/core-drops': new UniverseRoute(CharectersDrop),
  '/lobby-lobsters': new UniverseRoute(LobbyLobsters),
  '/polymorph-rarity': new UniverseRoute(RarityCharts),
  '/my-profile': new UniverseRoute(MyProfile, true),
  // '/setup-auction': new UniverseRoute(SetupAuction, true, false, { exact: false }),
  // '/minting-and-auctions/marketplace/active-auctions': new UniverseRoute(Marketplace),
  // '/minting-and-auctions/marketplace/future-auctions': new UniverseRoute(Marketplace),
  '/my-nfts': new UniverseRoute(MyNFTs, true),
  '/my-nfts/create': new UniverseRoute(CreateNFT, true),
  '/my-account': new UniverseRoute(MyAccount, true),
  // '/my-auctions': new UniverseRoute(Auctions, true),
  // '/create-tiers': new UniverseRoute(CreateTiers, true),
  // '/create-tiers/my-nfts/create': new UniverseRoute(CreateNFT, true),
  // '/finalize-auction': new UniverseRoute(FinalizeAuction, true),
  // '/customize-auction-landing-page': new UniverseRoute(CustomizeAuction, true),
  // '/auction-review': new UniverseRoute(AuctionReview, true),
  '/:artistUsername': new UniverseRoute(Artist),
  '/collection/:collectionAddress': new UniverseRoute(Collection),
  // '/:artist/:auction': new UniverseRoute(AuctionLandingPage),
  '*': new UniverseRoute(NotFound, false, false, { exact: false }),
};

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const { showWrongNetworkPopup, setShowWrongNetworkPopup } = useAuthContext();
  const { showError, closeError } = useErrorContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <PolymorphContextProvider>
        <LobsterContextProvider>
          <MyNFTsContextProvider>
            <AuctionContextProvider>
              <MarketplaceContextProvider>
                <LayoutProvider>
                  <Header />
                  <Switch>
                    {Object.keys(routes).map((key) => {
                      const { Component, isPrivate, isRewritten, routeProps, componentProps } =
                        routes[key];

                      const RouteComponent = isPrivate ? AuthenticatedRoute : Route;

                      return (
                        <RouteComponent key={key} path={key} {...routeProps}>
                          {!isRewritten ? (
                            <Component {...componentProps} />
                          ) : (
                            <NewApp>
                              <Component {...componentProps} />
                            </NewApp>
                          )}
                        </RouteComponent>
                      );
                    })}
                  </Switch>
                  <Footer />
                  <Popup closeOnDocumentClick={false} open={showWrongNetworkPopup}>
                    <WrongNetworkPopup close={() => setShowWrongNetworkPopup(false)} />
                  </Popup>
                  <Popup closeOnDocumentClick={false} open={showError}>
                    <ErrorPopup close={closeError} />
                  </Popup>
                </LayoutProvider>
              </MarketplaceContextProvider>
            </AuctionContextProvider>
          </MyNFTsContextProvider>
        </LobsterContextProvider>
      </PolymorphContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
