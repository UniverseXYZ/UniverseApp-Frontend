import { useState, useEffect } from 'react';
import { BrowserRouter as Routes, Redirect, Route, Switch } from 'react-router-dom';
import './assets/scss/normalize.scss';
import AppContext from './ContextAPI';
import uuid from 'react-uuid';
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
import { Contract, providers, utils } from 'ethers';
import { getEthPriceEtherscan, getWethBalanceEtherscan } from './utils/api/etherscan'
import Contracts from './contracts/contracts.json';
import { fetchUserNftIds, getUserNftsMetadata } from './utils/api/services'

const App = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
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
    // const tiers  = useState({ tiers: [ { nfts: [], name: '', winner: '', nftsPerWinner:'' } ] });
    // const [auction, setAuction] = useState({ tier: {nfts:{}} });

    const [auction, setAuction] = useState({ tiers: [] });
    const [selectedNft,setSelectedNft] =useState([]);
    const [selectedNFTIds,setSelectedNFTIds] =useState([]);
    const [web3Provider, setWeb3Provider] = useState(null);
    const [address, setAddress] = useState("");
    const [signer, setSigner] = useState("");
    const [wethBalance, setWethBalance] = useState(0);
    const [usdEthBalance, setUsdEthBalance] = useState(0);
    const [usdWethBalance, setUsdWethBalance] = useState(0);
    const [auctionFactoryContract, setAuctionFactoryContract] = useState(null);
    const [universeERC721Contract, setUniverseERC721Contract] = useState(null);
    
    const handleClickOutside = (event, className, ref, cb) => {
        if (!event.target.classList.contains(className)) {
            if (ref.current && !ref.current.contains(event.target)) {
                cb(false);
            }
        }
    };
  
    const connectMetamask = async (ethereum, provider) => {

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const balance = await provider.getBalance(accounts[0]);
      const network = await provider.getNetwork();
      const ethPrice = await getEthPriceEtherscan();
      const wethBalance = await getWethBalanceEtherscan(accounts[0], network.chainId);
      const signer = provider.getSigner(accounts[0]).connectUnchecked();

      const contracts = Contracts[network.chainId].contracts;
      const auctionFactoryContract = new Contract(contracts.AuctionFactory.address, contracts.AuctionFactory.abi, signer);
      const universeERC721Contract = new Contract(contracts.MockNFT.address, contracts.MockNFT.abi, signer);
      const userNftIds = await fetchUserNftIds(universeERC721Contract, accounts[0]);
      //const userNfsMetadata = await getUserNftsMetadata(universeERC721Contract, accounts[0]);
  
      setIsWalletConnected(true);
      setAddress(accounts[0]);
      setSigner(provider.getSigner(accounts[0]).connectUnchecked());
      setYourBalance(utils.formatEther(balance))
      setUsdEthBalance(ethPrice.result.ethusd * utils.formatEther(balance));
      setWethBalance(utils.formatEther(wethBalance.result));
      setUsdWethBalance(ethPrice.result.ethusd * utils.formatEther(wethBalance.result));
      setAuctionFactoryContract(auctionFactoryContract);
      setUniverseERC721Contract(universeERC721Contract);

    };

    const connectWalletConnect = async (provider) => {
      const {
        accounts: [account]
      } = provider;
  
      const web3Provider = new providers.Web3Provider(provider);
      const network = await web3Provider.getNetwork();
      const balance = await web3Provider.getBalance(account);
      const ethPrice = await getEthPriceEtherscan();
      const wethBalance = await getWethBalanceEtherscan(account, provider.chainId);
      const signer = web3Provider.getSigner(account).connectUnchecked();
  
      // TODO:  Uncomment for mainnet, ConnectWallet do not support rinkeby
  
      // const contracts = Contracts[network.chainId].contracts;
      // const auctionFactoryContract = new Contract(contracts.AuctionFactory.address, contracts.AuctionFactory.abi, signer);
      // const universeERC721Contract = new Contract(contracts.MockNFT.address, contracts.MockNFT.abi, signer);
      // const userNftIds = await fetchUserNfts(universeERC721Contract, account);
  
      setIsWalletConnected(true);
      setAddress(account);
      setYourBalance(utils.formatEther(balance));
      setUsdEthBalance(ethPrice.result.ethusd * utils.formatEther(balance));
      setWethBalance(utils.formatEther(wethBalance.result));
      setUsdWethBalance(ethPrice.result.ethusd * utils.formatEther(wethBalance.result));
      // setAuctionFactoryContract(auctionFactoryContract);
      // setUniverseERC721Contract(universeERC721Contract);
    };
  
    const isMetaMaskConnected = async (provider) => {
      const accounts = await provider.listAccounts();
      return accounts.length > 0;
    };

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        function handleScroll() {
            if(window.scrollY > 400) {
                document.querySelector('header').style.position = 'fixed';
            } else {
                document.querySelector('header').style.position = 'relative';
            }
        }
        // window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        handleResize();
        handleScroll();

        return () => {
            // window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(async()=> {
        if (typeof window.ethereum !== "undefined") {
          const { ethereum } = window;
    
          const provider = new providers.Web3Provider(window.ethereum);
          const isConnected = await isMetaMaskConnected(provider);
          setWeb3Provider(provider)
          if (provider && isConnected) {
            await connectMetamask(ethereum, provider);
          } else {
            console.log("Please install/connect MetaMask!");
          }
    
          ethereum.on("accountsChanged", async ([account]) => {
            if (account) {
              await connectMetamask(ethereum, provider);
            } else {
              setIsWalletConnected(false);
            }
          });
    
          ethereum.on("chainChanged", async (networkId) => {
            window.location.reload();
          });
        } else {
          console.log("Please install/connect MetaMask!");
        }

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
                connectMetamask,
                connectWalletConnect
            }}
        >
            <Routes>
                <Header />
                <Switch>
                    <Route exact path="/" component={() => <Homepage />} />
                    <Route exact path="/minting-and-auctions/about" component={() => <About />} />
                    <Route exact path="/minting-and-auctions/marketplace/active-auctions" component={() => <Marketplace />} />
                    <Route exact path="/minting-and-auctions/marketplace/future-auctions" component={() => <Marketplace />} />
                    <Route exact path="/my-nfts" component={() => <MyNFTs />} />
                    <Route exact path="/my-account" component={() => <MyAccount />} />

                    <Route exact path="/my-auctions" component={() => <Auctions />}     />
                    <Route exact path="/reward-tiers" component={() => <RewardTiers />} />
                    <Route exact path="/create-tiers" component={() => <CreateTiers />} />
                    <Route exact path="/review-reward" component={() => <ReviewReward />} />
                    <Route exact path="/select-nfts" component={() => <MyNFTs />} />

                    {/* <Route exact path="/select-action-nfts" component={() => <MyNFTsContainer />} /> */}

                    <Route exact path="/:artist" children={<Artist />} />
                    <Route exact path="/:artist/:auction" children={<AuctionLandingPage />} />
                    
                    <Route path="*" component={() => <Redirect to='/' />} />
                </Switch>
                <Footer />
            </Routes>
        </AppContext.Provider>
    );
}

export default App;