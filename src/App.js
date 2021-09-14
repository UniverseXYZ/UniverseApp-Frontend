import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Contract, providers, utils } from 'ethers';
import Popup from 'reactjs-popup';
import './assets/scss/normalize.scss';
import uuid from 'react-uuid';
import WalletConnectProvider from '@walletconnect/web3-provider';
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
import WrongNetworkPopup from './components/popups/WrongNetworkPopup';
import { CONNECTORS_NAMES } from './utils/dictionary';
import { getEthPriceCoingecko } from './utils/api/etherscan';
import { getProfileInfo, setChallenge, userAuthenticate } from './utils/api/profile';

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
  const [sortName, setSortName] = useState('Sort by');
  const [editProfileButtonClick, setEditProfileButtonClick] = useState(false);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState(0);
  const [stepsData, setStepsData] = useState({
    selectedMethod: null,
    settings: null,
    summary: null,
  });
  const [auctionSetupState, setAuctionSetupState] = useState(false);

  // Web3 local state
  const [providerName, setProviderName] = useState(localStorage.getItem('providerName') || '');
  const [web3Provider, setWeb3Provider] = useState(null);
  const [address, setAddress] = useState('');
  const [signer, setSigner] = useState('');
  const [yourBalance, setYourBalance] = useState(0);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [ethereumNetwork, setEthereumNetwork] = useState('');
  const [usdEthBalance, setUsdEthBalance] = useState(0);
  const [ethPrice, setEthPrice] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Popups
  const triggerWrongNetworkPopup = async () => {
    document.getElementById('wrong-network-hidden-btn').click();
  };

  // Getters
  const getEthPriceData = async (balance) => {
    const ethUsdPice = await getEthPriceCoingecko();
    setUsdEthBalance(ethUsdPice?.market_data?.current_price?.usd * balance);
    setEthPrice(ethUsdPice);
  };

  useEffect(() => {
    if (yourBalance) {
      getEthPriceData(yourBalance);
    }
  }, [yourBalance]);

  // HELPERS
  const clearStorageAuthData = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_address');
    localStorage.removeItem('providerName');
  };

  // Authentication and Web3
  const web3AuthenticationProccess = async (provider, network, accounts) => {
    const balance = await provider.getBalance(accounts[0]);
    const signerResult = provider.getSigner(accounts[0]).connectUnchecked();

    // TODO: Vik to check it
    // const polymContract =
    //   Contracts[network.chainId][network.name].contracts.PolymorphWithGeneChanger;

    // const polymorphContractInstance = new Contract(
    //   process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS,
    //   polymContract?.abi,
    //   signerResult
    // );

    // const lobsContract = Contracts[network.chainId][network.name].contracts.Lobster;
    // const lobsterContractInstance = new Contract(
    //   process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS,
    //   lobsContract?.abi,
    //   signerResult
    // );

    // const totalPolyMinted = await polymorphContractInstance.lastTokenId();
    // const polymorphBaseURIData = await polymorphContractInstance.baseURI();
    // const polymPrice = await polymorphContractInstance.polymorphPrice();

    // const totalLobsterMinted = await lobsterContractInstance.lastTokenId();
    // const lobsterBaseURIData = await lobsterContractInstance.baseURI();
    // const lobsPrice = await lobsterContractInstance.lobsterPrice();

    setWeb3Provider(provider);
    setAddress(accounts[0]);
    setSigner(signerResult);
    setYourBalance(utils.formatEther(balance));
    setIsWalletConnected(true);
    setEthereumNetwork(network);

    // setPolymorphContract(polymorphContractInstance);
    // setTotalPolymorphs(totalPolyMinted.toNumber());
    // setPolymorphBaseURI(polymorphBaseURIData);
    // setPolymorphPrice(utils.formatEther(polymPrice));

    // setLobsterContract(lobsterContractInstance);
    // setTotalLobsters(totalLobsterMinted);
    // setLobsterBaseURI(lobsterBaseURIData);
    // setLobsterPrice(lobsPrice);
  };

  const resetConnectionState = async (walletConnectEvent) => {
    if (providerName === CONNECTORS_NAMES.WalletConnect && !walletConnectEvent) {
      await providerObject.disconnect();
    }

    setWeb3Provider(null);
    setAddress(null);
    setSigner('');
    setYourBalance(0);
    setIsWalletConnected(false);
    setEthereumNetwork('');
    setUsdEthBalance(0);
    clearStorageAuthData();

    // TODO: Vik to check it
    // setUserPolymorphs([]);
    // setPolymorphContract(null);
    // setTotalPolymorphs(0);
    // setPolymorphBaseURI('');
    // setPolymorphPrice(0);
  };

  const connectWithMetaMask = async () => {
    const { ethereum } = window;

    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const network = await provider.getNetwork();

    if (network.chainId !== +process.env.REACT_APP_NETWORK_CHAIN_ID) {
      triggerWrongNetworkPopup();
    } else {
      await web3AuthenticationProccess(provider, network, accounts);
    }

    setProviderName(() => {
      const name = CONNECTORS_NAMES.MetaMask;
      localStorage.setItem('providerName', name);
      return name;
    });

    ethereum.on('accountsChanged', async ([account]) => {
      // IF ACCOUNT CHANGES, CLEAR TOKEN AND ADDRESS FROM LOCAL STORAGE
      clearStorageAuthData();
      if (account) {
        // await connectWithMetaMask();
        web3AuthenticationProccess(provider, network, [account]);
      } else {
        resetConnectionState();
      }
    });

    ethereum.on('chainChanged', async (networkId) => {
      clearStorageAuthData();
      window.location.reload();
    });

    ethereum.on('disconnect', async (error) => {
      resetConnectionState();
    });
  };

  const connectWithWalletConnect = async () => {
    const provider = new WalletConnectProvider({
      infuraId: '1745e014e2ed4047acdaa135e869a11b',
    });

    await provider.enable();

    const web3ProviderWrapper = new providers.Web3Provider(provider);
    const network = await web3ProviderWrapper.getNetwork();
    const { accounts: accountsWW } = web3ProviderWrapper.provider;

    if (network.chainId !== +process.env.REACT_APP_NETWORK_CHAIN_ID) {
      await provider.disconnect();
      triggerWrongNetworkPopup();
    } else {
      web3AuthenticationProccess(web3ProviderWrapper, network, accountsWW);
    }

    setProviderName(() => {
      const name = CONNECTORS_NAMES.WalletConnect;
      localStorage.setItem('providerName', name);
      return name;
    });
    setProviderObject(provider);

    // Subscribe to accounts change
    provider.on('accountsChanged', async (accounts) => {
      // IF ACCOUNT CHANGES, CLEAR TOKEN AND ADDRESS FROM LOCAL STORAGE
      clearStorageAuthData();
      web3AuthenticationProccess(web3ProviderWrapper, network, accounts);
    });

    // Subscribe to chainId change
    provider.on('chainChanged', async (chainId) => {
      clearStorageAuthData();
      window.location.reload();
    });

    // Subscribe to session disconnection
    provider.on('disconnect', (code, reason) => {
      resetConnectionState(true);
    });
  };

  const connectWeb3 = async () => {
    if (providerName === CONNECTORS_NAMES.MetaMask) connectWithMetaMask();
    if (providerName === CONNECTORS_NAMES.WalletConnect) connectWithWalletConnect();
  };

  useEffect(() => {
    if (
      !(providerName === CONNECTORS_NAMES.WalletConnect && !localStorage.getItem('walletconnect'))
    ) {
      connectWeb3();
    }
  }, []);

  // Sign message for BE authentication
  const signMessage = async () => {
    if (signer) {
      const sameUser = address === localStorage.getItem('user_address');
      const hasSigned = sameUser && localStorage.getItem('access_token');

      if (!hasSigned) {
        const chanllenge = uuid();
        const challengeResult = await setChallenge(chanllenge);
        const signedMessage = await signer?.signMessage(chanllenge);
        const authInfo = await userAuthenticate({
          address,
          signedMessage,
          uuid: challengeResult?.uuid,
        });

        if (!authInfo.error) {
          setIsAuthenticated(true);
          setLoggedInArtist({
            id: authInfo.user.id,
            name: authInfo.user.displayName,
            universePageAddress: authInfo.user.universePageUrl,
            avatar: authInfo.user.profileImageUrl,
            about: authInfo.user.about,
            personalLogo: authInfo.user.logoImageUrl,
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
            name: userInfo.displayName,
            universePageAddress: userInfo.universePageUrl,
            avatar: userInfo.profileImageUrl,
            about: userInfo.about,
            personalLogo: userInfo.logoImageUrl,
            instagramLink: userInfo.instagramUser,
            twitterLink: userInfo.twitterUser,
          });
        }
      }
    }
  };

  useEffect(async () => {
    if (signer) signMessage();
  }, [signer]);

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
        // Authentication and Web3
        connectWithMetaMask,
        connectWithWalletConnect,
        web3Provider,
        setWeb3Provider,
        address,
        setAddress,
        signer,
        setSigner,
        yourBalance,
        setYourBalance,
        usdEthBalance,
        setUsdEthBalance,
        ethPrice,
        setEthPrice,
        isAuthenticated,
        setIsAuthenticated,
        resetConnectionState,
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
      <Popup
        closeOnDocumentClick={false}
        trigger={
          <button
            type="button"
            id="wrong-network-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <WrongNetworkPopup close={close} />}
      </Popup>
    </AppContext.Provider>
  );
};

export default App;
