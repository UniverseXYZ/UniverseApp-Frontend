import React, { useState, useEffect } from 'react';
import { Contract, providers, utils } from 'ethers';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import './assets/scss/normalize.scss';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import { useQuery } from '@apollo/client';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { handleClickOutside, handleScroll } from './utils/helpers';
import Contracts from './Contracts.json';
import AppContext from './ContextAPI';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import MyNFTs from './components/myNFTs/MyNFTs.jsx';
import Homepage from './containers/homepage/Homepage.jsx';
import About from './containers/mintingAndAuctions/about/About.jsx';
import Team from './containers/team/Team.jsx';
import BidOptions from './utils/fixtures/BidOptions';
import NotFound from './components/notFound/NotFound.jsx';
import Polymorphs from './containers/polymorphs/Polymorphs.jsx';
import MintPolymorph from './containers/polymorphs/MintPolymorph.jsx';
import PolymorphScramblePage from './components/polymorphs/scramble/PolymorphScramblePage.jsx';
import RarityCharts from './containers/rarityCharts/RarityCharts';
import WrongNetworkPopup from './components/popups/WrongNetworkPopup';
import { transferPolymorphs } from './utils/graphql/queries';
import { transferLobsters, queryLobstersGraph } from './utils/graphql/lobsterQueries';
import { convertPolymorphObjects } from './utils/helpers/polymorphs';
import { CONNECTORS_NAMES } from './utils/dictionary';
import { fetchTokensMetadataJson } from './utils/api/polymorphs';
import { getEthPriceCoingecko } from './utils/api/etherscan';
import LobbyLobsters from './containers/lobbyLobsters/LobbyLobsters';
import { convertLobsterObjects } from './utils/helpers/lobsters';
import LobsterInfoPage from './components/lobbyLobsters/info/LobstersInfoPage';

const App = () => {
  const allCharactersFilter = 'All Characters';
  const polymorphsFilter = 'Polymorphs';
  const lobstersFilter = 'Lobby Lobsters';

  const location = useLocation();
  const history = useHistory();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
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
  const [darkMode, setDarkMode] = useState(true);
  const [editProfileButtonClick, setEditProfileButtonClick] = useState(false);
  const [ethPrice, setEthPrice] = useState({});
  const [web3Provider, setWeb3Provider] = useState(null);
  const [address, setAddress] = useState('');
  const [signer, setSigner] = useState('');
  const [wethBalance, setWethBalance] = useState(0);
  const [usdEthBalance, setUsdEthBalance] = useState(0);
  const [usdWethBalance, setUsdWethBalance] = useState(0);
  const [auctionFactoryContract, setAuctionFactoryContract] = useState(null);
  const [universeERC721CoreContract, setUniverseERC721CoreContract] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [yourBalance, setYourBalance] = useState(0);

  const [userPolymorphs, setUserPolymorphs] = useState([]);
  const [userPolymorphsLoaded, setUserPolymorphsLoaded] = useState(false);
  const [payableAmount, setPayableAmount] = useState(0.1);
  const [totalPolymorphs, setTotalPolymorphs] = useState(0);
  const [polymorphBaseURI, setPolymorphBaseURI] = useState('');
  const [polymorphPrice, setPolymorphPrice] = useState(0);

  const [userLobsters, setUserLobsters] = useState([]);
  const [userLobstersLoaded, setUserLobstersLoaded] = useState(false);
  const [totalLobsters, setTotalLobsters] = useState(0);
  const [lobsterBaseURI, setLobsterBaseURI] = useState('');
  const [lobsterPrice, setLobsterPrice] = useState(0);
  const [lobsterContract, setLobsterContract] = useState(null);

  const [ethereumNetwork, setEthereumNetwork] = useState('');
  const [polymorphContract, setPolymorphContract] = useState(null);
  const { data } = useQuery(transferPolymorphs(address));
  const [myUniversNFTsSearchPhrase, setMyUniversNFTsSearchPhrase] = useState('');
  const [myUniverseNFTsperPage, setMyUniverseNFTsPerPage] = useState(12);
  const [myUniverseNFTsActiverPage, setMyUniverseNFTsActiverPage] = useState(0);
  const [myUniverseNFTsOffset, setMyUniverseNFTsOffset] = useState(0);
  const [providerName, setProviderName] = useState(localStorage.getItem('providerName') || '');
  const [providerObject, setProviderObject] = useState('');

  const [collectionFilter, setCollectionFilter] = useState(allCharactersFilter);

  const triggerWrongNetworkPopup = async () => {
    document.getElementById('wrong-network-hidden-btn').click();
  };

  const fetchUserPolymorphsTheGraph = async (theGraphData) => {
    setUserPolymorphsLoaded(false);

    const userNftIds = theGraphData?.transferEntities?.map((nft) => nft.tokenId);
    const metadataURIs = userNftIds?.map(
      (id) => `${process.env.REACT_APP_POLYMORPHS_IMAGES_URL}${id}`
    );
    const nftMetadataObjects = await fetchTokensMetadataJson(metadataURIs);
    const polymorphNFTs = convertPolymorphObjects(nftMetadataObjects);
    if (polymorphNFTs) {
      setUserPolymorphs(polymorphNFTs);
    }
    setUserPolymorphsLoaded(true);
  };

  const fetchUserLobstersTheGraph = async (newAddress) => {
    setUserLobstersLoaded(false);

    const lobsters = await queryLobstersGraph(transferLobsters(newAddress));
    const userNftIds = lobsters?.transferEntities?.map((nft) => nft.tokenId);
    const metadataURIs = userNftIds?.map(
      (id) => `${process.env.REACT_APP_LOBSTER_IMAGES_URL}${id}`
    );
    const nftMetadataObjects = await fetchTokensMetadataJson(metadataURIs);
    const lobsterNFTs = convertLobsterObjects(nftMetadataObjects);
    if (lobsterNFTs) {
      setUserLobsters(lobsterNFTs);
    }
    setUserLobstersLoaded(true);
  };

  const getEthPriceData = async (balance) => {
    const ethUsdPice = await getEthPriceCoingecko();
    setUsdEthBalance(ethUsdPice?.market_data?.current_price?.usd * balance);
    setEthPrice(ethUsdPice);
  };

  const web3AuthenticationProccess = async (provider, network, accounts) => {
    const balance = await provider.getBalance(accounts[0]);
    const signerResult = provider.getSigner(accounts[0]).connectUnchecked();

    const polymContract =
      Contracts[network.chainId][network.name].contracts.PolymorphWithGeneChanger;

    const polymorphContractInstance = new Contract(
      process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS,
      polymContract?.abi,
      signerResult
    );

    const lobsContract = Contracts[network.chainId][network.name].contracts.Lobster;
    const lobsterContractInstance = new Contract(
      process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS,
      lobsContract?.abi,
      signerResult
    );

    const totalPolyMinted = await polymorphContractInstance.lastTokenId();
    const polymorphBaseURIData = await polymorphContractInstance.baseURI();
    const polymPrice = await polymorphContractInstance.polymorphPrice();

    const totalLobsterMinted = await lobsterContractInstance.lastTokenId();
    const lobsterBaseURIData = await lobsterContractInstance.baseURI();
    const lobsPrice = await lobsterContractInstance.lobsterPrice();

    setWeb3Provider(provider);
    setAddress(accounts[0]);
    setSigner(signerResult);
    setYourBalance(utils.formatEther(balance));
    setIsWalletConnected(true);
    setEthereumNetwork(network);

    setPolymorphContract(polymorphContractInstance);
    setTotalPolymorphs(totalPolyMinted.toNumber());
    setPolymorphBaseURI(polymorphBaseURIData);
    setPolymorphPrice(utils.formatEther(polymPrice));

    setLobsterContract(lobsterContractInstance);
    setTotalLobsters(totalLobsterMinted);
    setLobsterBaseURI(lobsterBaseURIData);
    setLobsterPrice(lobsPrice);
  };

  const resetConnectionState = async (walletConnectEvent) => {
    if (providerName === CONNECTORS_NAMES.WalletConnect && !walletConnectEvent) {
      console.log('disconnect', providerObject);
      await providerObject.disconnect();
    }
    setWeb3Provider(null);
    setAddress(null);
    setSigner('');
    setYourBalance(0);
    setIsWalletConnected(false);
    setEthereumNetwork('');
    setUsdEthBalance(0);

    setUserPolymorphs([]);
    setPolymorphContract(null);
    setTotalPolymorphs(0);
    setPolymorphBaseURI('');
    setPolymorphPrice(0);
  };

  const connectWithWalletConnect = async () => {
    console.log('wallet connect');
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
      console.log('Accounts changed', accounts);
      web3AuthenticationProccess(web3ProviderWrapper, network, accounts);
    });

    // Subscribe to chainId change
    provider.on('chainChanged', async (chainId) => {
      console.log('Chain changed');
      window.location.reload();
    });

    // Subscribe to session disconnection
    provider.on('disconnect', (code, reason) => {
      console.log('disconnected');
      resetConnectionState(true);
    });
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
      web3AuthenticationProccess(provider, network, accounts);
    }

    setProviderName(() => {
      const name = CONNECTORS_NAMES.MetaMask;
      localStorage.setItem('providerName', name);
      return name;
    });

    ethereum.on('accountsChanged', async ([account]) => {
      if (account) {
        // await connectWithMetaMask();
        web3AuthenticationProccess(provider, network, [account]);
      } else {
        resetConnectionState();
      }
    });
    ethereum.on('chainChanged', async (networkId) => {
      window.location.reload();
    });
    ethereum.on('disconnect', async (error) => {
      console.log('disconnected');
      resetConnectionState();
    });
  };

  const connectWeb3 = async () => {
    if (providerName === CONNECTORS_NAMES.MetaMask) connectWithMetaMask();
    if (providerName === CONNECTORS_NAMES.WalletConnect) connectWithWalletConnect();
  };

  const navigateToMyNFTsPage = (characterFilter) => {
    setCollectionFilter(characterFilter);
    setMyUniverseNFTsActiverPage(0);
    setMyUniverseNFTsOffset(0);

    history.push('/my-nfts');
  };

  useEffect(async () => {
    setUserLobsters([]);
    setUserPolymorphs([]);
    fetchUserPolymorphsTheGraph(data);
    fetchUserLobstersTheGraph(address);
  }, [address]);

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
  }, [location]);

  useEffect(() => {
    if (data) {
      fetchUserPolymorphsTheGraph(data);
    }
    if (yourBalance) {
      getEthPriceData(yourBalance);
    }
  }, [data, yourBalance]);

  useEffect(() => {
    if (yourBalance) {
      getEthPriceData(yourBalance);
    }
  }, [yourBalance]);

  useEffect(() => {
    if (
      !(providerName === CONNECTORS_NAMES.WalletConnect && !localStorage.getItem('walletconnect'))
    ) {
      connectWeb3();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
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
        ethPrice,
        setEthPrice,
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
        universeERC721CoreContract,
        setUniverseERC721CoreContract,
        signer,
        setSigner,
        connectWeb3,
        isAuthenticated,
        setIsAuthenticated,
        yourBalance,
        setYourBalance,
        totalPolymorphs,
        setTotalPolymorphs,
        polymorphContract,
        setPolymorphContract,
        polymorphBaseURI,
        setPolymorphBaseURI,
        userPolymorphs,
        setUserPolymorphs,
        fetchUserPolymorphsTheGraph,
        convertPolymorphObjects,
        myUniversNFTsSearchPhrase,
        setMyUniversNFTsSearchPhrase,
        myUniverseNFTsperPage,
        setMyUniverseNFTsPerPage,
        myUniverseNFTsActiverPage,
        setMyUniverseNFTsActiverPage,
        myUniverseNFTsOffset,
        setMyUniverseNFTsOffset,
        connectWithWalletConnect,
        connectWithMetaMask,
        resetConnectionState,
        lobsterContract,
        userLobsters,
        lobsterPrice,
        lobsterBaseURI,
        totalLobsters,
        userLobstersLoaded,
        userPolymorphsLoaded,
        setUserLobsters,
        collectionFilter,
        setCollectionFilter,
        polymorphsFilter,
        lobstersFilter,
        allCharactersFilter,
        navigateToMyNFTsPage,
      }}
    >
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/about" component={() => <About />} />
        <Route exact path="/team" component={() => <Team />} />
        <Route exact path="/polymorphs">
          <Polymorphs />
        </Route>
        <Route exact path="/mint-polymorph">
          <MintPolymorph />
        </Route>
        <Route exact path="/polymorphs/:id">
          <PolymorphScramblePage />
        </Route>
        <Route exact path="/lobsters/:id">
          <LobsterInfoPage />
        </Route>
        <Route exact path="/my-nfts">
          <MyNFTs />
        </Route>
        <Route exact path="/polymorph-rarity">
          <RarityCharts />
        </Route>
        <Route exact path="/lobby-lobsters">
          <LobbyLobsters />
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
