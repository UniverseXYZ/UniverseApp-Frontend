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
import Polymorphs from './containers/polymorphs/Polymorphs';
import MintPolymorph from './containers/polymorphs/MintPolymorph';
import PolymorphScramblePage from './components/polymorphs/scramble/PolymorphScramblePage';
import { getEthPriceEtherscan } from './utils/api/etherscan';

const App = () => {
  const location = useLocation();
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
  const [website, setWebsite] = useState(true);
  const [editProfileButtonClick, setEditProfileButtonClick] = useState(false);
  const [ethPrice, setEthPrice] = useState({});

  const getEthPrice = async () => {
    const ethUsdPice = await getEthPriceEtherscan();
    setEthPrice(ethUsdPice);
  };

  useEffect(() => {
    if (!website) {
      window.document.querySelector('header').classList.remove('dark');
    }

    handleScroll(website);

    window.addEventListener('scroll', () => handleScroll(website));

    return () => {
      window.removeEventListener('scroll', () => handleScroll(website));
    };
  }, [website]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(async () => {
    getEthPrice();
  }, []);

  return (
    <AppContext.Provider
      value={{
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
        website,
        setWebsite,
        editProfileButtonClick,
        setEditProfileButtonClick,
        ethPrice,
        setEthPrice,
      }}
    >
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Homepage />} />
        <Route exact path="/about" component={() => <About />} />
        <Route exact path="/team" component={() => <Team />} />
        <Route exact path="/polymorphs" component={() => <Polymorphs />} />
        <Route exact path="/mint-polymorph" component={() => <MintPolymorph />} />
        <Route exact path="/polymorphs/:id" component={() => <PolymorphScramblePage />} />

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
        <Route exact path="/my-account" component={() => <MyAccount />} />
        <Route exact path="/my-auctions" component={() => <Auctions />} />
        <Route exact path="/create-tiers" component={() => <CreateTiers />} />
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
