import { useState, useEffect, React } from 'react';
import { BrowserRouter as Routes, Redirect, Route, Switch } from 'react-router-dom';
import './assets/scss/normalize.scss';
import uuid from 'react-uuid';
import { providers } from 'ethers';
import { handleClickOutside } from './utils/helpers';
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
import BidOptions from './utils/fixtures/BidOptions';

const App = () => {
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
  const [myAuctions, setMyAuctions] = useState([]);
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [futureAuctions, setFutureAuctions] = useState([]);
  const [auction, setAuction] = useState({ tiers: [] });
  const [selectedNft, setSelectedNft] = useState([]);
  const [selectedNFTIds, setSelectedNFTIds] = useState([]);
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
    setSigner(provider.getSigner(accounts[0]).connectUnchecked());
    setYourBalance(utils.formatEther(balance));
    setUsdEthBalance(ethPrice.result.ethusd * utils.formatEther(balance));
    setWethBalance(utils.formatEther(wethBalanceResult.result));
    setUsdWethBalance(ethPrice.result.ethusd * utils.formatEther(wethBalance.result));
    setAuctionFactoryContract(auctionFactoryContractResult);
    setUniverseERC721Contract(universeERC721ContractResult);
  };

  const isMetaMaskConnected = async (provider) => {
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  };

  useEffect(async () => {
    if (typeof window.ethereum !== 'undefined') {
      const { ethereum } = window;

      const provider = new providers.Web3Provider(window.ethereum);
      const isConnected = await isMetaMaskConnected(provider);
      setWeb3Provider(provider);

      console.log(provider);
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

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    if (!website) {
      document.querySelector('header').classList.remove('dark');
    }
    function handleScroll() {
      if (window.scrollY > 0) {
        if (document.querySelector('header')) {
          document.querySelector('header').style.position = 'fixed';
          if (website) {
            document.querySelector('header').classList.remove('dark');
          }
        }
        if (document.querySelector('.artist__personal__logo')) {
          document.querySelector('.artist__personal__logo').style.position = 'fixed';
        }
      } else if (window.scrollY <= 0) {
        if (document.querySelector('header')) {
          document.querySelector('header').style.position = 'relative';
          if (website) {
            document.querySelector('header').classList.add('dark');
          }
        }
        if (document.querySelector('.artist__personal__logo')) {
          document.querySelector('.artist__personal__logo').style.position = 'absolute';
        }
      }
    }

    // window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    handleResize();
    handleScroll();

    return () => {
      // window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [website]);

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
        myAuctions,
        setMyAuctions,
        activeAuctions,
        setActiveAuctions,
        futureAuctions,
        setFutureAuctions,
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
      }}
    >
      <Routes>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Homepage />} />
          <Route exact path="/about" component={() => <About />} />
          {/* <Route
            exact
            path="/minting-and-auctions/marketplace/active-auctions"
            component={() => <Marketplace />}
          /> */}
          {/* <Route
            exact
            path="/minting-and-auctions/marketplace/future-auctions"
            component={() => <Marketplace />}
          /> */}
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
