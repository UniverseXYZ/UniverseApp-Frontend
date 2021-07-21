import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './assets/scss/normalize.scss';
import uuid from 'react-uuid';
import { Contract, providers, utils } from 'ethers';
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
import {
  // getEthPriceCoingecko,
  getWethBalanceEtherscan,
  getEthPriceEtherscan,
} from './utils/api/etherscan.js';
// import { fetchUserNftIds, getUserNftsMetadata } from './utils/api/services';
import Contracts from './contracts/contracts.json';
import { getProfileInfo, userAuthenticate, getChallenge } from './utils/api/profile';
import { getSavedNfts } from './utils/api/mintNFT';
import CreateNFT from './components/myNFTs/create/CreateNFT';
import RarityCharts from './containers/rarityCharts/RarityCharts';
// import { fetchUserNftIds, getUserNftsMetadata } from './utils/api/services';

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
  const [editProfileButtonClick, setEditProfileButtonClick] = useState(false);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [stepsData, setStepsData] = useState({
    selectedMethod: null,
    settings: null,
    summary: null,
  });
  const [web3Provider, setWeb3Provider] = useState(null);
  const [address, setAddress] = useState('');
  const [signer, setSigner] = useState('');
  const [wethBalance, setWethBalance] = useState(0);
  const [usdEthBalance, setUsdEthBalance] = useState(0);
  const [usdWethBalance, setUsdWethBalance] = useState(0);
  const [auctionFactoryContract, setAuctionFactoryContract] = useState(null);
  const [universeERC721CoreContract, setUniverseERC721CoreContract] = useState(null);
  const [universeERC721FactoryContract, setUniverseERC721FactoryContract] = useState(null);
  const [universeERC721Contract, setUniverseERC721Contract] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [yourBalance, setYourBalance] = useState(0);

  const connectWeb3 = async () => {
    const { ethereum } = window;

    await ethereum.enable();
    const provider = new providers.Web3Provider(ethereum);
    setWeb3Provider(provider);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const balance = await provider.getBalance(accounts[0]);
    const network = await provider.getNetwork();
    const ethPrice = await getEthPriceEtherscan();
    const wethBalanceResult = await getWethBalanceEtherscan(accounts[0], network.chainId);
    const signerResult = provider.getSigner(accounts[0]).connectUnchecked();

    const { contracts } = Contracts[network.chainId];
    // const auctionFactoryContractResult = new Contract(
    //   contracts.AuctionFactory.address,
    //   contracts.AuctionFactory.abi,
    //   signerResult
    // );

    const universeERC721CoreContractResult = new Contract(
      contracts.UniverseERC721Core.address,
      contracts.UniverseERC721Core.abi,
      signerResult
    );

    const universeERC721FactoryContractResult = new Contract(
      contracts.UniverseERC721Factory.address,
      contracts.UniverseERC721Factory.abi,
      signerResult
    );

    const universeERC721ContractResult = new Contract(
      contracts.UniverseERC721.address,
      contracts.UniverseERC721.abi,
      signerResult
    );
    // const userNftIds = await fetchUserNftIds(universeERC721Contract, accounts[0]);
    // const userNfsMetadata = await getUserNftsMetadata(universeERC721Contract, accounts[0]);

    setAddress(accounts[0]);
    setSigner(signerResult);
    setYourBalance(utils.formatEther(balance));
    setUsdEthBalance(ethPrice.ethereum.usd * utils.formatEther(balance));
    setWethBalance(utils.formatEther(wethBalanceResult.result));
    setUsdWethBalance(ethPrice.ethereum.usd * utils.formatEther(wethBalanceResult.result));
    // setAuctionFactoryContract(auctionFactoryContractResult);
    setUniverseERC721CoreContract(universeERC721CoreContractResult);
    setUniverseERC721FactoryContract(universeERC721FactoryContractResult);
    setUsdEthBalance(ethPrice.result.ethusd * utils.formatEther(balance));
    setWethBalance(utils.formatEther(wethBalanceResult.result));
    setUsdWethBalance(ethPrice.result.ethusd * utils.formatEther(wethBalanceResult.result));
    // setAuctionFactoryContract(auctionFactoryContractResult);
    setUniverseERC721Contract(universeERC721ContractResult);
    setIsWalletConnected(true);
  };

  const clearStorageAuthData = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_address');
  };

  const signMessage = async () => {
    if (signer) {
      const sameUser = address === localStorage.getItem('user_address');
      const hasSigned = sameUser && localStorage.getItem('access_token');

      if (!hasSigned) {
        const challenge = await getChallenge();
        const signedMessage = await signer?.signMessage(challenge);
        const authInfo = await userAuthenticate({ address, signedMessage });

        if (!authInfo.error) {
          setIsAuthenticated(true);
          setLoggedInArtist({
            id: authInfo.user.id,
            name: authInfo.user.displayName,
            universePageAddress: authInfo.user.universePageUrl,
            avatar: authInfo.user.profileImageName,
            about: authInfo.user.about,
            personalLogo: authInfo.user.logoImageName,
            instagramLink: authInfo.user.instagramUser,
            twitterLink: authInfo.user.twitterUser,
          });

          // Save access_token into the local storage for later API requests usage
          localStorage.setItem('access_token', authInfo.token);
          localStorage.setItem('user_address', address);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        // THE USER ALREADY HAS SIGNED
        const userInfo = await getProfileInfo({ address });

        if (!userInfo.error) {
          setIsAuthenticated(true);

          setLoggedInArtist({
            // id: authInfo.user.id, TODO:: this is not returned in this request, do we need it ?
            name: userInfo.displayName,
            universePageAddress: userInfo.universePageUrl,
            avatar: userInfo.profileImageName,
            about: userInfo.about,
            personalLogo: userInfo.logoImageName,
            instagramLink: userInfo.instagramUser,
            twitterLink: userInfo.twitterUser,
          });
        }
      }

      // Fetch the saved NFTS for that addres
      const savedNFTS = await getSavedNfts();
      setSavedNfts(savedNFTS);
    }
  };

  useEffect(async () => {
    if (typeof window.ethereum !== 'undefined') {
      const { ethereum } = window;

      await connectWeb3();

      const provider = new providers.Web3Provider(ethereum);

      if (!provider) {
        console.log('Please install/connect MetaMask!');
      }
      ethereum.on('accountsChanged', async ([account]) => {
        // IF ACCOUNT CHANGES, CLEAR TOKEN AND ADDRESS FROM LOCAL STORAGE
        clearStorageAuthData();
        if (account) {
          await connectWeb3();
        } else {
          setIsWalletConnected(false);
        }
      });
      ethereum.on('chainChanged', async (networkId) => {
        clearStorageAuthData();
        window.location.reload();
      });
    } else {
      console.log('Please install/connect MetaMask!');
    }
  }, []);

  useEffect(async () => {
    if (signer) signMessage();
  }, [signer]);

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
    if (
      (location.pathname === '/nft-marketplace/settings' &&
        stepsData.selectedMethod === 'bundle') ||
      location.pathname === '/marketplace'
    ) {
      document.querySelector('header').style.position = 'absolute';
    } else {
      document.querySelector('header').style.position = 'fixed';
    }
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
        selectedTabIndex,
        setSelectedTabIndex,
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
        darkMode,
        setDarkMode,
        editProfileButtonClick,
        setEditProfileButtonClick,
        selectedTokenIndex,
        setSelectedTokenIndex,
        address,
        setAddress,
        usdEthBalance,
        setUsdEthBalance,
        wethBalance,
        setWethBalance,
        usdWethBalance,
        setUsdWethBalance,
        web3Provider,
        setWeb3Provider,
        auctionFactoryContract,
        setAuctionFactoryContract,
        universeERC721Contract,
        setUniverseERC721Contract,
        signer,
        setSigner,
        connectWeb3,
        isAuthenticated,
        setIsAuthenticated,
        yourBalance,
      }}
    >
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Homepage />} />
        <Route exact path="/about" component={() => <About />} />
        <Route exact path="/team" component={() => <Team />} />
        <Route exact path="/polymorphs" component={() => <Polymorphs />} />
        <Route exact path="/mint-polymorph" component={() => <MintPolymorph />} />
        <Route exact path="/planets/adaka" component={() => <Planet1 />} />
        <Route exact path="/planets/prosopon" component={() => <Planet2 />} />
        <Route exact path="/planets/kuapo" component={() => <Planet3 />} />
        <Route exact path="/polymorphs/:id" component={() => <PolymorphScramblePage />} />
        <Route exact path="/marketplace/nft/:id" component={() => <MarketplaceNFT />} />
        <Route path="/character-page" component={() => <CharacterPage />} />
        <Route exact path="/marketplace" component={() => <BrowseNFT />} />
        <Route exact path="/nft-marketplace/:steps" component={() => <NFTMarketplace />} />
        <Route exact path="/search" component={() => <Search />} />
        <Route exact path="/core-drops" component={() => <CharectersDrop />} />
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
        <Route exact path="/my-nfts/create" component={() => <CreateNFT />} />
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
