import { useState } from 'react';
import './assets/scss/normalize.scss';
import { BrowserRouter as Routes, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MyNFTs from './components/myNFTs/Ntfs';
import MyAccount from './components/myAccount/Account'
import Auctions from './components/auctions/Auction';
import AppContext from './ContextAPI';

const App = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
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
                    <Route exact path="/" component={() => <MyNFTs />} />
                    <Route exact path="/my-account" component={() => <MyAccount />} />
                    <Route exact path="/my-auctions" component={() => <Auctions />} />
                    <Route path="*" component={() => <Redirect to='/' />} />
                </Switch>
                <Footer />
            </Routes>
        </AppContext.Provider>
    );
}

export default App;