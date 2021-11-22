import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Contract, providers, utils } from 'ethers';
import uuid from 'react-uuid';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { getEthPriceCoingecko } from '../utils/api/etherscan';
import Contracts from '../contracts/contracts.json';
import { CONNECTORS_NAMES } from '../utils/dictionary';
import { getProfileInfo, setChallenge, userAuthenticate } from '../utils/api/profile';
import { mapUserData } from '../utils/helpers';
import { useErrorContext } from './ErrorContext';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'

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
  const [providerName, setProviderName] = useState(Cookies.get('providerName') || '');
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
  const history = useRouter();
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
    Cookies.remove('xyz_access_token');
    Cookies.remove('user_address');
    Cookies.remove('providerName');
  };

  // Authentication and Web3
  const web3AuthenticationProccess = async (provider, network, accounts) => {
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
    setAddress(accounts[0] || '');
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

  const connectWithMetaMask = async () => {
    const { ethereum } = window;

    // await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new providers.Web3Provider(ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const network = await provider.getNetwork();

    if (network.chainId !== +process.env.REACT_APP_NETWORK_CHAIN_ID) {
      setShowWrongNetworkPopup(true);
    } else {
      await web3AuthenticationProccess(provider, network, accounts);
    }

    setProviderName(() => {
      const name = CONNECTORS_NAMES.MetaMask;
      Cookies.set('providerName', name);
      return name;
    });

    ethereum.on('accountsChanged', async ([account]) => {
      // IF ACCOUNT CHANGES, CLEAR TOKEN AND ADDRESS FROM LOCAL STORAGE
      clearStorageAuthData();
      if (account) {
        // await connectWithMetaMask();
        history.push('/');
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
        Cookies.set('providerName', name);
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
      !(providerName === CONNECTORS_NAMES.WalletConnect && !Cookies.get('walletconnect'))
    ) {
      connectWeb3();
    }
  }, []);

  // Sign message for BE authentication
  const signMessage = async () => {
    try {
      if (signer) {
        const sameUser = address === Cookies.get('user_address');
        const hasSigned = sameUser && Cookies.get('xyz_access_token');

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
            setLoggedInArtist(mapUserData(authInfo.user));

            // Save xyz_access_token into the local storage for later API requests usage
            Cookies.set('xyz_access_token', authInfo.token);
            Cookies.set('user_address', address);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          // THE USER ALREADY HAS SIGNED
          const userInfo = await getProfileInfo(address);

          if (!userInfo.error) {
            setIsAuthenticated(true);
            setIsWalletConnected(true);

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
