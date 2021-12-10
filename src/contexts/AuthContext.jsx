import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Contract, providers, utils } from 'ethers';
import uuid from 'react-uuid';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useHistory } from 'react-router-dom';
import { getEthPriceCoingecko } from '../utils/api/etherscan';
import Contracts from '../contracts/contracts.json';
import { CONNECTORS_NAMES } from '../utils/dictionary';
import { getProfileInfo, setChallenge, userAuthenticate } from '../utils/api/profile';
import { mapUserData } from '../utils/helpers';
import { useErrorContext } from './ErrorContext';

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const { setShowError, setErrorTitle, setErrorBody, closeError } = useErrorContext();

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
  const [polymorphContract, setPolymorphContract] = useState(null);
  const [lobsterContract, setLobsterContract] = useState(null);
  const [providerName, setProviderName] = useState(localStorage.getItem('providerName') || '');
  const [web3Provider, setWeb3Provider] = useState(null);
  const [address, setAddress] = useState('');
  const [signer, setSigner] = useState(null);
  const [yourBalance, setYourBalance] = useState(0);
  const [yourEnsDomain, setYourEnsDomain] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [ethereumNetwork, setEthereumNetwork] = useState('');
  const [usdEthBalance, setUsdEthBalance] = useState(0);
  const [ethPrice, setEthPrice] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWrongNetworkPopup, setShowWrongNetworkPopup] = useState(false);
  const [universeERC721CoreContract, setUniverseERC721CoreContract] = useState(null);
  const [universeERC721FactoryContract, setUniverseERC721FactoryContract] = useState(null);
  const [contracts, setContracts] = useState(false);
  const [deployedCollections, setDeployedCollections] = useState([]);
  const [universeAuctionHouseContract, setUniverseAuctionHouseContract] = useState(null);

  const [showWalletPopup, setshowWalletPopup] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');

  // TODO: Add logic and component for checking if metamask is installed
  // Currently the app assumes the user has metamask installed
  const [showInstallWalletPopup, setShowInstallWalletPopup] = useState(false);
  const [installed, setInstalled] = useState(true);

  const history = useHistory();
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
    localStorage.removeItem('xyz_access_token');
    localStorage.removeItem('user_address');
    localStorage.removeItem('providerName');
  };

  // Authentication and Web3
  const web3AuthenticationProccess = async (
    providerToUse = null,
    networkToUse = null,
    accounts
    // eslint-disable-next-line consistent-return
  ) => {
    let provider = providerToUse;
    if (!provider) {
      // IF no explicit provider, use MetaMask
      const { ethereum } = window;
      provider = new providers.Web3Provider(ethereum);
    }

    let network = networkToUse;
    if (!network) {
      network = await provider.getNetwork();
    }

    if (network.chainId !== +process.env.REACT_APP_NETWORK_CHAIN_ID) {
      return setShowWrongNetworkPopup(true);
    }
    const balance = await provider.getBalance(accounts[0]);
    const ensDomain = await provider.lookupAddress(accounts[0]);
    const signerResult = provider.getSigner(accounts[0]).connectUnchecked();

    const { contracts: contractsData } = Contracts[network.chainId];

    // Minting
    const universeERC721CoreContractResult = new Contract(
      contractsData.UniverseERC721Core.address,
      contractsData.UniverseERC721Core.abi,
      signerResult
    );
    const universeERC721FactoryContractResult = new Contract(
      contractsData.UniverseERC721Factory.address,
      contractsData.UniverseERC721Factory.abi,
      signerResult
    );

    // Auctions
    const auctionHouseContract = new Contract(
      process.env.REACT_APP_UNIVERSE_AUCTION_HOUSE_ADDRESS,
      contractsData.UniverseAuctionHouse.abi,
      signerResult
    );

    const polymContract = contractsData.PolymorphWithGeneChanger;

    const polymorphContractInstance = new Contract(
      process.env.REACT_APP_POLYMORPHS_CONTRACT_ADDRESS,
      polymContract?.abi,
      signerResult
    );

    const lobsContract = contractsData.Lobster;
    const lobsterContractInstance = new Contract(
      process.env.REACT_APP_LOBSTERS_CONTRACT_ADDRESS,
      lobsContract?.abi,
      signerResult
    );

    setWeb3Provider(provider);
    setSigner(signerResult);
    setYourBalance(utils.formatEther(balance));
    setYourEnsDomain(ensDomain);
    // setIsWalletConnected(true);
    setEthereumNetwork(network);
    setUniverseERC721CoreContract(universeERC721CoreContractResult);
    setUniverseERC721FactoryContract(universeERC721FactoryContractResult);
    setContracts(contractsData);

    setPolymorphContract(polymorphContractInstance);
    setLobsterContract(lobsterContractInstance);

    setUniverseAuctionHouseContract(auctionHouseContract);
  };

  const resetConnectionState = async (walletConnectEvent) => {
    // if (providerName === CONNECTORS_NAMES.WalletConnect && !walletConnectEvent) {
    //   await providerObject.disconnect();
    // }

    setWeb3Provider(null);
    setAddress('');
    setSigner('');
    setYourBalance(0);
    setYourEnsDomain(null);
    setIsWalletConnected(false);
    setEthereumNetwork('');
    setUsdEthBalance(0);
    clearStorageAuthData();
    setIsAuthenticated(false);

    setPolymorphContract(null);
    setLobsterContract(null);
  };

  const handleAccountsChanged = useCallback(async ([account]) => {
    // IF ACCOUNT CHANGES, CLEAR TOKEN AND ADDRESS FROM LOCAL STORAGE
    clearStorageAuthData();
    if (account) {
      history.push('/');
      await resetConnectionState();
      web3AuthenticationProccess(null, null, [account]);
    } else {
      resetConnectionState();
    }
  }, []);

  const connectWithMetaMask = async () => {
    const { ethereum } = window;

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    await web3AuthenticationProccess(null, null, accounts);

    setProviderName(() => {
      const name = CONNECTORS_NAMES.MetaMask;
      localStorage.setItem('providerName', name);
      return name;
    });

    ethereum.removeListener('accountsChanged', handleAccountsChanged);
    ethereum.on('accountsChanged', handleAccountsChanged);

    ethereum.on('chainChanged', async (networkId) => {
      clearStorageAuthData();
      window.location.reload();
    });

    ethereum.on('disconnect', async (error) => {
      resetConnectionState();
    });
  };

  const connectWithWalletConnect = async () => {
    // There is an issue when user clicks close on wallet connect scan qr code step
    // the library throws an error that the user has closed the popup and makes the app crash
    // I've wrapped the code inside a try catch to mitigate that
    try {
      const provider = new WalletConnectProvider({
        infuraId: '1745e014e2ed4047acdaa135e869a11b',
      });

      await provider.enable();

      const web3ProviderWrapper = new providers.Web3Provider(provider);
      const network = await web3ProviderWrapper.getNetwork();
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      if (network.chainId !== +process.env.REACT_APP_NETWORK_CHAIN_ID) {
        await provider.disconnect();
        setShowWrongNetworkPopup(true);
      } else {
        web3AuthenticationProccess(web3ProviderWrapper, network, accounts);
      }

      setProviderName(() => {
        const name = CONNECTORS_NAMES.WalletConnect;
        localStorage.setItem('providerName', name);
        return name;
      });
      // setProviderObject(provider);

      // Subscribe to accounts change
      provider.on('accountsChanged', async ([account]) => {
        // IF ACCOUNT CHANGES, CLEAR TOKEN AND ADDRESS FROM LOCAL STORAGE
        clearStorageAuthData();
        history.push('/');
        web3AuthenticationProccess(web3ProviderWrapper, network, [account]);
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
    } catch (err) {
      console.error(err);
    }
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
    try {
      if (signer) {
        const addressToSign = (await signer.getAddress()).toLowerCase();
        const sameUser = addressToSign === localStorage.getItem('user_address');
        const hasSigned = sameUser && localStorage.getItem('xyz_access_token');
        if (!hasSigned) {
          const chanllenge = uuid();
          const challengeResult = await setChallenge(chanllenge);
          const signedMessage = await signer?.signMessage(chanllenge);
          const authInfo = await userAuthenticate({
            address: addressToSign,
            signedMessage,
            uuid: challengeResult?.uuid,
          });

          if (!authInfo.error) {
            // Save xyz_access_token into the local storage for later API requests usage
            localStorage.setItem('xyz_access_token', authInfo.token);
            localStorage.setItem('user_address', addressToSign);

            setIsAuthenticated(true);
            setIsWalletConnected(true);
            setAddress(addressToSign);
            setLoggedInArtist(mapUserData(authInfo.user));
            setshowWalletPopup(false);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          // THE USER ALREADY HAS SIGNED
          setIsAuthenticated(true);
          setIsWalletConnected(true);
          setAddress(addressToSign);

          const userInfo = await getProfileInfo(addressToSign);

          if (userInfo && !userInfo.error) {
            setshowWalletPopup(false);

            setLoggedInArtist({
              id: userInfo.id,
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
        closeError();
      }
    } catch (err) {
      if (err?.code === 4001) {
        setShowError(true);
        setErrorTitle('Signature is required');
        setErrorBody(
          "Signing a challenge is part of the authentication process.\nWithout it the application can't authenticate you."
        );
      }
      setIsWalletConnected(false);
      setIsAuthenticated(false);
      console.error(err);
    }
  };

  const handleConnectWallet = async (wallet) => {
    // Here need to check if selected wallet is installed in browser
    setSelectedWallet(wallet);
    if (installed) {
      if (wallet === CONNECTORS_NAMES.MetaMask && typeof window.ethereum !== 'undefined') {
        await connectWithMetaMask();
      } else if (wallet === CONNECTORS_NAMES.WalletConnect) {
        await connectWithWalletConnect();
      }
    } else {
      setShowInstallWalletPopup(true);
    }
  };

  useEffect(async () => {
    if (signer?.address !== address) signMessage();
  }, [signer]);

  return (
    <AuthContext.Provider
      value={{
        loggedInArtist,
        setLoggedInArtist,
        myBalance,
        setMyBalance,
        polymorphContract,
        setPolymorphContract,
        lobsterContract,
        setLobsterContract,
        providerName,
        setProviderName,
        web3Provider,
        setWeb3Provider,
        address,
        setAddress,
        signer,
        setSigner,
        yourBalance,
        setYourBalance,
        yourEnsDomain,
        setYourEnsDomain,
        isWalletConnected,
        setIsWalletConnected,
        ethereumNetwork,
        setEthereumNetwork,
        usdEthBalance,
        setUsdEthBalance,
        ethPrice,
        setEthPrice,
        isAuthenticated,
        setIsAuthenticated,
        showWrongNetworkPopup,
        setShowWrongNetworkPopup,
        universeERC721CoreContract,
        setUniverseERC721CoreContract,
        universeERC721FactoryContract,
        setUniverseERC721FactoryContract,
        contracts,
        setContracts,
        deployedCollections,
        setDeployedCollections,
        resetConnectionState,
        connectWithMetaMask,
        connectWeb3,
        connectWithWalletConnect,
        universeAuctionHouseContract,
        showInstallWalletPopup,
        setShowInstallWalletPopup,
        handleConnectWallet,
        showWalletPopup,
        setshowWalletPopup,
        selectedWallet,
        setSelectedWallet,
        installed,
        setInstalled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext was used outside of its Provider');
  }

  return context;
};

export { AuthContextProvider, useAuthContext };
