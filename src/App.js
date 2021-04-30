import { useState, useEffect, React } from 'react';
import { BrowserRouter as Routes, Redirect, Route, Switch } from 'react-router-dom';
import './assets/scss/normalize.scss';
import uuid from 'react-uuid';
import AppContext from './ContextAPI';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Auctions from './containers/auctions/Auction';
import RewardTiers from './containers/rewardTiers/RewardTiers';
import CreateTiers from './containers/createTiers/CreateTiers';
import ReviewReward from './containers/reviewReward/ReviewReward';
import MyNFTs from './containers/myNFTs/MyNFTs';
import Artist from './containers/artist/Artist';
import AuctionLandingPage from './containers/auctionLandingPage/AuctionLandingPage';
import Homepage from './containers/homepage/Homepage';
import About from './containers/mintingAndAuctions/about/About';
import Marketplace from './containers/mintingAndAuctions/marketplace/Marketplace';
import MyAccount from './containers/myAccount/MyAccount';
import CustomizeAuction from './containers/customizeAuction/CustomizeAuction';
import AuctionDetails from './components/auctionLandingPage/AuctionDetails';
import AuctionSettings from './containers/auctionSettings/AuctionSettings';
import Team from './containers/team/Team';
import AuctionReview from './containers/auctionReview/AuctionReview';

const App = () => {
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
  });
  const [yourBalance, setYourBalance] = useState(48.24);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectAllIsChecked, setSelectAllIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeView, setActiveView] = useState(null);
  const [savedNFTsID, setSavedNFTsID] = useState(null);
  const [savedCollectionID, setSavedCollectionID] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [savedNfts, setSavedNfts] = useState([]);
  const [savedCollections, setSavedCollections] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);

  const [auction, setAuction] = useState({ tiers: [] });
  const [selectedNft, setSelectedNft] = useState([]);
  const [selectedNFTIds, setSelectedNFTIds] = useState([]);
  const [bidtype, setBidtype] = useState('eth');

  const handleClickOutside = (event, className, ref, cb) => {
    if (!event.target.classList.contains(className)) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb(false);
      }
    }
  };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    function handleScroll() {
      if (window.scrollY > 400) {
        if (document.querySelector('header')) {
          document.querySelector('header').style.position = 'fixed';
        }
        if (document.querySelector('.artist__personal__logo')) {
          document.querySelector('.artist__personal__logo').style.position = 'fixed';
        }
      } else {
        if (document.querySelector('header')) {
          document.querySelector('header').style.position = 'relative';
        }
        if (document.querySelector('.artist__personal__logo')) {
          document.querySelector('.artist__personal__logo').style.position = 'absolute';
        }
      }
    }

    // window.addEventListener("resize", handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize();
    handleScroll();

    return () => {
      // window.removeEventListener("resize", handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isWalletConnected,
        setIsWalletConnected,
        loggedInArtist,
        setLoggedInArtist,
        yourBalance,
        setYourBalance,
        handleClickOutside,
        savedNfts,
        setSavedNfts,
        selectedTabIndex,
        setSelectedTabIndex,
        showModal,
        setShowModal,
        savedCollections,
        setSavedCollections,
        activeView,
        setActiveView,
        savedNFTsID,
        setSavedNFTsID,
        savedCollectionID,
        setSavedCollectionID,
        myNFTs,
        setMyNFTs,
        selectAllIsChecked,
        setSelectAllIsChecked,
        auction,
        setAuction,
        windowSize,
        setWindowSize,
        selectedNft,
        setSelectedNft,
        selectedNFTIds,
        setSelectedNFTIds,
        bidtype,
        setBidtype,
      }}
    >
      <Routes>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Homepage />} />
          <Route exact path="/minting-and-auctions/about" component={() => <About />} />
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
          <Route exact path="/reward-tiers" component={() => <RewardTiers />} />
          <Route exact path="/create-tiers" component={() => <CreateTiers />} />
          <Route exact path="/review-reward" component={() => <ReviewReward />} />
          <Route exact path="/select-nfts" component={() => <MyNFTs />} />
          <Route
            exact
            path="/customize-auction-landing-page"
            component={() => <CustomizeAuction />}
          />
          <Route exact path="/team" component={() => <Team />} />

          <Route exact path="/auction-settings" component={() => <AuctionSettings />} />
          <Route exact path="/auction-review" component={() => <AuctionReview />} />
          <Route exact path="/:artist">
            <Artist />
          </Route>
          <Route exact path="/:artist/:auction">
            <AuctionLandingPage />
          </Route>
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
        <Footer />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
