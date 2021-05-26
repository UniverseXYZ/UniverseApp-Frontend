import React, { useState, useEffect } from 'react';
import { BrowserRouter as Routes, StaticRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Contract, providers, utils } from 'ethers';
import './assets/scss/normalize.scss';
import uuid from 'react-uuid';
import { handleClickOutside, handleScroll } from './utils/helpers';
import AppContext from './ContextAPI';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Auctions from './containers/auctions/Auction.jsx';
import RewardTiers from './components/rewardTiers/RewardTiers.jsx';
import CreateTiers from './components/createTiers/Create.jsx';
import ReviewReward from './components/reviewReward/ReviewReward.jsx';
import MyNFTs from './components/myNFTs/MyNFTs.jsx';
import Artist from './containers/artist/Artist.jsx';
import AuctionLandingPage from './containers/auctionLandingPage/AuctionLandingPage.jsx';
import Homepage from './containers/homepage/Homepage.jsx';
import About from './containers/mintingAndAuctions/about/About.jsx';
import Marketplace from './containers/mintingAndAuctions/marketplace/Marketplace.jsx';
import MyAccount from './containers/myAccount/MyAccount.jsx';
import CustomizeAuction from './containers/customizeAuction/CustomizeAuction.jsx';
import AuctionSettings from './components/auctions/Settings.jsx';
import Team from './containers/team/Team.jsx';
import AuctionReview from './components/auctions/AuctionReview.jsx';
import BidOptions from './utils/fixtures/BidOptions';
import { getEthPriceEtherscan, getWethBalanceEtherscan } from './utils/api/etherscan';
import Contracts from './contracts/contracts.json';
import { fetchUserNftIds, getUserNftsMetadata } from './utils/api/services';
import NotFound from './components/notFound/NotFound.jsx';

const App = () => {
  const [loggedInArtist, setLoggedInArtist] = useState({
    id: uuid(),
    name: 'Donald Duck',
    universePageAddress: '',
    avatar: null,
    about: '',
    personalLogo: null,
    instagramLink: '',
    twitterLink: '',
  });
  const [myBalance, setMyBalance] = useState(48.24);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeView, setActiveView] = useState(null);
  const [savedNFTsID, setSavedNFTsID] = useState(null);
  const [savedCollectionID, setSavedCollectionID] = useState(null);
  const [savedNfts, setSavedNfts] = useState([]);
  const [savedCollections, setSavedCollections] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [futureAuctions, setFutureAuctions] = useState([]);
  const [auction, setAuction] = useState({ tiers: [] });
  const [selectedNft, setSelectedNft] = useState([]);
  const [bidtype, setBidtype] = useState('eth');
  const [options, setOptions] = useState(BidOptions);
  const [website, setWebsite] = useState(true);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [address, setAddress] = useState('');
  const [signer, setSigner] = useState('');
  const [wethBalance, setWethBalance] = useState(0);
  const [usdEthBalance, setUsdEthBalance] = useState(0);
  const [usdWethBalance, setUsdWethBalance] = useState(0);
  const [auctionFactoryContract, setAuctionFactoryContract] = useState(null);
  const [universeERC721Contract, setUniverseERC721Contract] = useState(null);

  const connectWeb3 = async (ethereum, provider) => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const balance = await provider.getBalance(accounts[0]);
    const network = await provider.getNetwork();
    const ethPrice = await getEthPriceEtherscan();
    const wethBalanceResult = await getWethBalanceEtherscan(accounts[0], network.chainId);
    const signerResult = provider.getSigner(accounts[0]).connectUnchecked();

    const { contracts } = Contracts[network.chainId];
    const auctionFactoryContractResult = new Contract(
      contracts.AuctionFactory.address,
      contracts.AuctionFactory.abi,
      signerResult
    );
    const universeERC721ContractResult = new Contract(
      contracts.MockNFT.address,
      contracts.MockNFT.abi,
      signerResult
    );
    const userNftIds = await fetchUserNftIds(universeERC721Contract, accounts[0]);
    // const userNfsMetadata = await getUserNftsMetadata(universeERC721Contract, accounts[0]);

    setIsWalletConnected(true);
    setAddress(accounts[0]);
    setSigner(signerResult);
    setYourBalance(utils.formatEther(balance));
    setUsdEthBalance(ethPrice.result.ethusd * utils.formatEther(balance));
    setWethBalance(utils.formatEther(wethBalanceResult.result));
    setUsdWethBalance(ethPrice.result.ethusd * utils.formatEther(wethBalanceResult.result));
    setAuctionFactoryContract(auctionFactoryContractResult);
    setUniverseERC721Contract(universeERC721ContractResult);
  };

  const isMetaMaskConnected = async (provider) => {
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  };

  const authenticateWithSignedMessage = async () => {
    const challnegeUrl = `${process.env.REACT_APP_API_BASE_URL}/api/auth/getChallenge`;
    const challengeResult = await fetch(challnegeUrl, { credentials: 'include' }).then((res) =>
      res.text().then((data) => data)
    );
    const signedMessageResult = await signer.signMessage(challengeResult);

    console.log('address', address);
    console.log('challengeResult', challengeResult);
    console.log('signedMessageResult', signedMessageResult);

    const loginUrl = `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`;
    const authenticationResult = await fetch(loginUrl, {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: `${address}`, signature: signedMessageResult }),
    });

    if (authenticationResult.ok) {
      console.log('Authorization completed');
    } else {
      console.error('Authorization failed', authenticationResult);
    }
  };

  useEffect(async () => {
    if (typeof window.ethereum !== 'undefined') {
      const { ethereum } = window;

      const provider = new providers.Web3Provider(window.ethereum);
      const isConnected = await isMetaMaskConnected(provider);
      setWeb3Provider(provider);

      if (provider && isConnected) {
        await connectWeb3(ethereum, provider);
      } else {
        console.log('Please install/connect MetaMask!');
      }

      ethereum.on('accountsChanged', async ([account]) => {
        if (account) {
          await connectWeb3(ethereum, provider);
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

  useEffect(async () => {
    if (signer && address) authenticateWithSignedMessage();
  }, [signer, address]);

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
        myAuctions,
        setMyAuctions,
        activeAuctions,
        setActiveAuctions,
        futureAuctions,
        setFutureAuctions,
        auction,
        setAuction,
        selectedNft,
        setSelectedNft,
        bidtype,
        setBidtype,
        options,
        setOptions,
        website,
        setWebsite,
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
        authenticateWithSignedMessage,
      }}
    >
      <Header />
      <Switch>
        <Route exact path="/" component={() => <Homepage />} />
        <Route exact path="/about" component={() => <About />} />
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
        <Route path="*" component={() => <NotFound />} />
      </Switch>
      <Footer />
    </AppContext.Provider>
  );
};

export default App;
