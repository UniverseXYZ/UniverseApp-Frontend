import { useState, useEffect } from 'react';
import './assets/scss/normalize.scss';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import { BrowserRouter as Routes, Redirect, Route, Switch } from 'react-router-dom';
import AppContext from './ContextAPI';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import AuctionsContainer from './containers/auctionsContainer/Auction';
import RewardTiersContainer from './containers/rewardTiersContainer/RewardTiers';
import CreateTiersContainer from './containers/createTiersContainer/CreateTiers';
import MyNFTsContainer from './containers/myNFTsContainer/MyNFTsContainer';
import ArtistContainer from './containers/artistContainer/ArtistContainer';
import AuctionLandingPageContainer from './containers/auctionLandingPageContainer/AuctionLandingPageContainer';
import HomepageContainer from './containers/homepageContainer/HomepageContainer';
import AboutContainer from './containers/mintingAndAuctions/aboutContainer/AboutContainer';
import MarketplaceContainer from './containers/mintingAndAuctions/marketplaceContainer/MarketplaceContainer';
import MyAccountContainer from './containers/myAccountContainer/MyAccountContainer';


const App = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(true);
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
    const [auction, setAuction] = useState({ tier: {} });
    const [selectedNft,setSelectedNft] =useState([]);

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
            if(window.scrollY > 100) {
                document.querySelector('header').style.position = 'fixed';
            } else {
                document.querySelector('header').style.position = 'relative';
            }
        }

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        handleResize();
        handleScroll();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                isWalletConnected,
                setIsWalletConnected,
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
                setSelectedNft
            }}
        >
            <Routes>
                <Header />
                <Switch>
                    <Route exact path="/" component={() => <HomepageContainer />} />
                    <Route exact path="/minting-and-auctions/about" component={() => <AboutContainer />} />
                    <Route exact path="/minting-and-auctions/marketplace" component={() => <MarketplaceContainer />} />
                    <Route exact path="/my-nfts" component={() => <MyNFTsContainer />} />
                    <Route exact path="/my-account" component={() => <MyAccountContainer />} />

                    <Route exact path="/my-auctions" component={() => <AuctionsContainer />}     />
                    <Route exact path="/reward-tiers" component={() => <RewardTiersContainer />} />
                    <Route exact path="/create-tiers" component={() => <CreateTiersContainer />} />
                    <Route exact path="/select-nfts" component={() => <MyNFTsContainer />} />
                    {/* <Route exact path="/select-action-nfts" component={() => <MyNFTsContainer />} /> */}

                    <Route exact path="/:artist" children={<ArtistContainer />} />
                    <Route exact path="/:artist/:auction" children={<AuctionLandingPageContainer />} />
                    
                    <Route path="*" component={() => <Redirect to='/' />} />
                </Switch>
                <NotificationContainer/>
                <Footer />
            </Routes>
        </AppContext.Provider>
    );
}

export default App;