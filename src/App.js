import React, { useState, useEffect } from 'react';
import { Contract, providers, utils } from 'ethers';
import { Route, Switch, useLocation } from 'react-router-dom';
import axios from 'axios';
import './assets/scss/normalize.scss';
import uuid from 'react-uuid';
import Popup from 'reactjs-popup';
import { useQuery } from '@apollo/client';
import { handleClickOutside, handleScroll } from './utils/helpers';
import Contracts from './Contracts.json';
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
import { getEthPriceCoingecko } from './utils/api/etherscan';
import WrongNetworkPopup from './components/popups/WrongNetworkPopup';
import { transferPolymorphs, morphedPolymorphs } from './utils/graphql/queries';
import cover from './assets/images/cover.png';

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
  const [web3Provider, setWeb3Provider] = useState(null);
  const [address, setAddress] = useState('');
  const [signer, setSigner] = useState('');
  const [wethBalance, setWethBalance] = useState(0);
  const [usdEthBalance, setUsdEthBalance] = useState(0);
  const [usdWethBalance, setUsdWethBalance] = useState(0);
  const [auctionFactoryContract, setAuctionFactoryContract] = useState(null);
  const [universeERC721CoreContract, setUniverseERC721CoreContract] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [yourBalance, setYourBalance] = useState(0);

  const [userPolymorphs, setUserPolymorphs] = useState([]);
  const [payableAmount, setPayableAmount] = useState(0.1);
  const [totalPolymorphs, setTotalPolymorphs] = useState(0);
  const [polymorphBaseURI, setPolymorphBaseURI] = useState('');
  const [polymorphPrice, setPolymorphPrice] = useState(0);
  const [ethereumNetwork, setEthereumNetwork] = useState('');
  const [polymorphContract, setPolymorphContract] = useState(null);
  const { data } = useQuery(transferPolymorphs(address));
  const POLYMORPH_BASE_URI =
    'https://us-central1-polymorphmetadata.cloudfunctions.net/images-function?id=';

  const triggerWrongNetworkPopup = async () => {
    document.getElementById('wrong-network-hidden-btn').click();
  };

  const connectWeb3 = async () => {
    const { ethereum } = window;

    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const balance = await provider.getBalance(accounts[0]);
    const network = await provider.getNetwork();
    const signerResult = provider.getSigner(accounts[0]).connectUnchecked();

    if (network.chainId !== 3) {
      triggerWrongNetworkPopup();
    } else {
      const polymContract =
        Contracts[network.chainId][network.name].contracts.PolymorphWithGeneChanger;

      const polymorphContractInstance = new Contract(
        polymContract?.address,
        polymContract?.abi,
        signerResult
      );

      const totalMinted = await polymorphContractInstance.lastTokenId();
      const polymorphBaseURIData = await polymorphContractInstance.baseURI();
      const polymPrice = await polymorphContractInstance.polymorphPrice();

      setWeb3Provider(provider);
      setAddress(accounts[0]);
      setSigner(signerResult);
      setYourBalance(utils.formatEther(balance));
      setIsWalletConnected(true);
      setEthereumNetwork(network);

      setPolymorphContract(polymorphContractInstance);
      setTotalPolymorphs(totalMinted.toNumber());
      setPolymorphBaseURI(polymorphBaseURIData);
      setPolymorphPrice(utils.formatEther(polymPrice));
    }
  };

  const extractTokenIdFromURI = (tokenURI) =>
    tokenURI.substring(POLYMORPH_BASE_URI.length, tokenURI.length);

  const fetchTokensMetadataJson = async (metadataURIs) => {
    const metadataPromises = [];
    for (let i = 0; i < metadataURIs?.length; i += 1) {
      metadataPromises.push(axios(metadataURIs[i]));
    }
    return Promise.all(metadataPromises);
  };

  const convertPolymorphObjects = (nftMetadataObjects) =>
    nftMetadataObjects.map((nft) => ({
      id: extractTokenIdFromURI(nft?.config?.url),
      type: 'collection',
      previewImage: {
        type: 'image/jpg',
        url: nft?.data?.image,
      },
      name: nft?.data?.name,
      collectionAvatar: cover,
      collectionName: 'Universe Polymorphs',
    }));

  const fetchUserPolymorphsTheGraph = async (theGraphData) => {
    const userNftIds = theGraphData?.transferEntities?.map((nft) => nft.tokenId);
    const metadataURIs = userNftIds?.map((id) => `${POLYMORPH_BASE_URI}${id}`);
    const nftMetadataObjects = await fetchTokensMetadataJson(metadataURIs);
    const polymorphNFTs = convertPolymorphObjects(nftMetadataObjects);
    if (polymorphNFTs) {
      setUserPolymorphs(polymorphNFTs);
    }
  };

  const getEthPriceData = async (balance) => {
    const ethUsdPice = await getEthPriceCoingecko();
    setUsdEthBalance(ethUsdPice?.market_data?.current_price?.usd * balance);
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

  useEffect(() => {
    if (data) {
      fetchUserPolymorphsTheGraph(data);
    }
    if (yourBalance) {
      getEthPriceData(yourBalance);
    }
  }, [data, yourBalance]);

  useEffect(async () => {
    if (typeof window.ethereum !== 'undefined') {
      const { ethereum } = window;

      await connectWeb3();

      const provider = new providers.Web3Provider(ethereum);

      if (!provider) {
        console.log('Please install/connect MetaMask!');
      }
      ethereum.on('accountsChanged', async ([account]) => {
        if (account) {
          await connectWeb3();
          await fetchUserPolymorphsTheGraph(data);
        } else {
          setIsWalletConnected(false);
        }
      });
      ethereum.on('chainChanged', async (networkId) => {
        window.location.reload();
      });
    } else {
      console.log('Please install/connect MetaMask!');
    }
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
        isWalletConnected,
        setIsWalletConnected,
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
        <Route exact path="/mint-polymorph" component={() => <MintPolymorph />} />
        <Route exact path="/polymorphs/:id">
          <PolymorphScramblePage />
        </Route>

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
        <Route exact path="/my-nfts">
          <MyNFTs />
        </Route>
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
