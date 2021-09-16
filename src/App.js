import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './assets/scss/normalize.scss';
import uuid from 'react-uuid';
import { handleClickOutside, handleScroll } from './utils/helpers';
import AppContext from './ContextAPI';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Auctions from './containers/auctions/Auction.jsx';
import SetupAuction from './components/setupAuction/SetupAuction';
import CreateTiers from './components/createTiers/Create.jsx';
import MyNFTs from './components/myNFTs/MyNFTs.jsx';
import Artist from './containers/artist/Artist.jsx';
import AuctionLandingPage from './containers/auctionLandingPage/AuctionLandingPage.jsx';
import Homepage from './containers/homepage/Homepage.jsx';
import About from './containers/mintingAndAuctions/about/About.jsx';
import Marketplace from './containers/mintingAndAuctions/marketplace/Marketplace.jsx';
import MyAccount from './containers/myAccount/MyAccount.jsx';
import CustomizeAuction from './containers/customizeAuction/CustomizeAuction.jsx';
import Team from './containers/team/Team.jsx';
import AuctionReview from './components/auctions/AuctionReview.jsx';
import BidOptions from './utils/fixtures/BidOptions';
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

const App = () => {
  const location = useLocation();
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [loggedInArtist, setLoggedInArtist] = useState({
    id: uuid(),
    name: '',
    universePageAddress: '',
    avatar: null,
    about: '',
    personalLogo: null,
    instagramLink: '',
    twitterLink: '',
    social: true,
  });
  const [myBalance, setMyBalance] = useState(48.24);
  const [showModal, setShowModal] = useState(false);
  const [myNFTsSelectedTabIndex, setMyNFTsSelectedTabIndex] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [activeView, setActiveView] = useState(null);
  const [savedNFTsID, setSavedNFTsID] = useState(null);
  const [savedCollectionID, setSavedCollectionID] = useState(null);
  const [myCollectionID, setMyCollectionID] = useState(null);
  const [savedNfts, setSavedNfts] = useState([]);
  const [universeNFTs, setUniverseNFTs] = useState([]);
  const [savedCollections, setSavedCollections] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [deployedCollections, setDeployedCollections] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [futureAuctions, setFutureAuctions] = useState([]);
  const [auction, setAuction] = useState({ tiers: [] });
  const [selectedNftForScramble, setSelectedNftForScramble] = useState({});
  const [bidtype, setBidtype] = useState('eth');
  const [options, setOptions] = useState(BidOptions);
  const [darkMode, setDarkMode] = useState(true);
  const [sortName, setSortName] = useState('Sort by');
  const [editProfileButtonClick, setEditProfileButtonClick] = useState(false);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [stepsData, setStepsData] = useState({
    selectedItem: null,
    selectedMethod: null,
    settings: null,
    summary: null,
  });
  const [auctionSetupState, setAuctionSetupState] = useState(false);
  const [sellNFTSingleFixedListingData, setSellNFTSingleFixedListingData] = useState({
    startPrice: null,
    priceType: 'eth',
    switch: [],
    buyerAddress: null,
  });
  const [sellNFTBundleFixedListingData, setSellNFTBundleFixedListingData] = useState({
    startPrice: null,
    priceType: 'eth',
    bundleName: null,
    bundleDescription: null,
    switch: [],
    buyerAddress: null,
  });

  useEffect(() => {
    if (!darkMode) {
      window.document.querySelector('header').classList.remove('dark');
    }
    handleScroll(darkMode);

    window.addEventListener('scroll', () => handleScroll(darkMode));

    return () => {
      window.removeEventListener('scroll', () => handleScroll(darkMode));
    };
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (
    //   (location.pathname === '/nft-marketplace/settings' &&
    //     stepsData.selectedMethod === 'bundle') ||
    //   location.pathname === '/marketplace'
    // ) {
    //   document.querySelector('header').style.position = 'absolute';
    // } else {
    //   document.querySelector('header').style.position = 'fixed';
    // }
  }, [location]);

  return (
    <AppContext.Provider
      value={{
        stepsData,
        setStepsData,
        isWalletConnected,
        setIsWalletConnected,
        loggedInArtist,
        setLoggedInArtist,
        myBalance,
        setMyBalance,
        handleClickOutside,
        savedNfts,
        setSavedNfts,
        universeNFTs,
        setUniverseNFTs,
        showModal,
        setShowModal,
        myNFTsSelectedTabIndex,
        setMyNFTsSelectedTabIndex,
        selectedTabIndex,
        setSelectedTabIndex,
        savedCollections,
        setSavedCollections,
        activeView,
        setActiveView,
        savedNFTsID,
        setSavedNFTsID,
        savedCollectionID,
        setSavedCollectionID,
        myCollectionID,
        setMyCollectionID,
        myNFTs,
        setMyNFTs,
        deployedCollections,
        setDeployedCollections,
        myAuctions,
        setMyAuctions,
        activeAuctions,
        setActiveAuctions,
        futureAuctions,
        setFutureAuctions,
        auction,
        setAuction,
        selectedNftForScramble,
        setSelectedNftForScramble,
        bidtype,
        setBidtype,
        options,
        setOptions,
        darkMode,
        setDarkMode,
        editProfileButtonClick,
        setEditProfileButtonClick,
        sortName,
        setSortName,
        selectedTokenIndex,
        setSelectedTokenIndex,
        auctionSetupState,
        setAuctionSetupState,
        sellNFTSingleFixedListingData,
        setSellNFTSingleFixedListingData,
        sellNFTBundleFixedListingData,
        setSellNFTBundleFixedListingData,
      }}
    >
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Homepage />} />
        <Route exact path="/about" component={() => <About />} />
        <Route exact path="/team" component={() => <Team />} />
        <Route exact path="/polymorphs" component={() => <Polymorphs />} />
        <Route exact path="/polymorph-universe" component={() => <PolymorphUniverse />} />
        <Route exact path="/mint-polymorph" component={() => <MintPolymorph />} />
        <Route exact path="/burn-to-mint" component={() => <BurnToMint />} />
        <Route exact path="/planets/adaka" component={() => <Planet1 />} />
        <Route exact path="/planets/prosopon" component={() => <Planet2 />} />
        <Route exact path="/planets/kuapo" component={() => <Planet3 />} />
        <Route exact path="/polymorphs/:id" component={() => <PolymorphScramblePage />} />
        <Route exact path="/lobsters/:id" component={() => <PolymorphScramblePage />} />
        <Route exact path="/marketplace/nft/:id" component={() => <MarketplaceNFT />} />
        <Route exact path="/character-page" component={() => <CharacterPage />} />
        <Route exact path="/marketplace" component={() => <BrowseNFT />} />
        <Route exact path="/nft-marketplace/:steps" component={() => <NFTMarketplace />} />
        <Route exact path="/search" component={() => <Search />} />
        <Route exact path="/core-drops" component={() => <CharectersDrop />} />
        <Route exact path="/lobby-lobsters" component={() => <LobbyLobsters />} />
        <Route exact path="/polymorph-rarity" component={() => <RarityCharts />} />
        <Route exact path="/my-profile" component={() => <MyProfile />} />
        <Route path="/setup-auction" component={() => <SetupAuction />} />
        <Route
          exact
          path="/minting-and-auctions/marketplace/active-auctions"
          component={() => <Marketplace />}
        />
        <Route
          exact
          path="/minting-and-auctions/marketplace/future-auctions"
          component={() => <Marketplace />}
        />
        <Route exact path="/my-nfts" component={() => <MyNFTs />} />
        <Route exact path="/my-nfts/create" component={CreateNFT} />
        <Route exact path="/my-account" component={() => <MyAccount />} />
        <Route exact path="/my-auctions" component={() => <Auctions />} />
        <Route exact path="/create-tiers" component={() => <CreateTiers />} />
        <Route exact path="/create-tiers/my-nfts/create" component={() => <CreateNFT />} />
        <Route exact path="/finalize-auction" component={() => <FinalizeAuction />} />
        <Route
          exact
          path="/customize-auction-landing-page"
          component={() => <CustomizeAuction />}
        />
        <Route exact path="/auction-review" component={() => <AuctionReview />} />
        <Route exact path="/:artist">
          <Artist />
        </Route>
        <Route exact path="/c/:collectionId">
          <Collection />
        </Route>
        <Route exact path="/:artist/:auction">
          <AuctionLandingPage />
        </Route>

        <Route path="*" component={() => <NotFound />} />
      </Switch>
      <Footer />
    </AppContext.Provider>
  );
};

export default App;
