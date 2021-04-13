import { useState } from 'react';
import './assets/scss/normalize.scss';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import { BrowserRouter as Routes, Redirect, Route, Switch } from 'react-router-dom';
import AppContext from './ContextAPI';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import Auctions from './components/auctions/Auction';
import RewardTiers from './components/auctions/tiers/RewardTiers';
import CreateTiers from './components/auctions/tiers/CreateTiers';

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
    const [savedNfts, setSavedNfts] = useState([]);
    const [savedCollections, setSavedCollections] = useState([]);
    const [myNFTs, setMyNFTs] = useState([]);

    const handleClickOutside = (event, className, ref, cb) => {
        if (!event.target.classList.contains(className)) {
            if (ref.current && !ref.current.contains(event.target)) {
                cb(false);
            }
        }
    };

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


                    <Route exact path="/my-auctions" component={() => <Auctions />} />
                    <Route exact path="/reward-tiers" component={() => <RewardTiers />} />
                    <Route exact path="/create-tiers" component={() => <CreateTiers />} />

                    
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