import { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import './Header.scss';
import appDarkLogo from '../../assets/images/dark.svg';
import appLightLogo from '../../assets/images/light.svg';
import DesktopView from './dimensions/DesktopView';
import TabletView from './dimensions/TabletView';
import MobileView from './dimensions/MobileView';
import AppContext from '../../ContextAPI';
import { providers, utils } from "ethers";

const Header = (props) => {
    const { setIsWalletConnected, windowSize, address, connectMetamask, connectWalletConnect } = useContext(AppContext);

    const [selectedWallet, setSelectedWallet] = useState('');
    const [installed, setInstalled] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [showSelectWallet, setShowSelectWallet] = useState(false);
    const [showInstallWalletPopup, setShowInstallWalletPopup] = useState(false);
    
    const handleConnectWallet = async (wallet) => {
        // Here need to check if selected wallet is installed in browser
        setSelectedWallet(wallet);
        if (installed) {
            
            if (wallet == "Metamask" && typeof window.ethereum !== "undefined") {
                const provider = new providers.Web3Provider(window.ethereum);
                await connectMetamask( window.ethereum, provider);
           
            } else if (wallet === 'WalletConnect') {
                //  Create WalletConnect Provider
                const provider = new WalletConnectProvider({
                    infuraId: "e49086a14af041ee82be935ea2da4d12",
                });
                
                //  Enable session (triggers QR Code modal)
                await provider.enable();
                
                connectWalletConnect(provider)
            }

            setIsWalletConnected(true);
            setShowMenu(false);
            setShowSelectWallet(false);
        } else {
            setShowInstallWalletPopup(true);
        }
    }

    useEffect(() => {
        setShowMenu(false);
        if (
            props.location.pathname === '/' ||
            props.location.pathname === '/minting-and-auctions/about' ||
            props.location.pathname === '/minting-and-auctions/marketplace/active-auctions' ||
            props.location.pathname === '/minting-and-auctions/marketplace/future-auctions'
        ) {
            document.querySelector('header').classList.add('dark')
        } else {
            document.querySelector('header').classList.remove('dark')
        }
    }, [props.location.pathname])

    return (
        <header>
            <div className='app__logo'>
                <Link className='dark' to={'/'}><img src={appDarkLogo} alt='App Logo' /></Link>
                <Link className='light' to={'/'}><img src={appLightLogo} alt='App Logo' /></Link>
            </div>
            <DesktopView
                ethereumAddress={address}
                handleConnectWallet={handleConnectWallet}
                showInstallWalletPopup={showInstallWalletPopup}
                setShowInstallWalletPopup={setShowInstallWalletPopup}
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
            />
            <TabletView
                ethereumAddress={address}
                handleConnectWallet={handleConnectWallet}
                showInstallWalletPopup={showInstallWalletPopup}
                setShowInstallWalletPopup={setShowInstallWalletPopup}
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
            />
            <MobileView
                ethereumAddress={address}
                handleConnectWallet={handleConnectWallet}
                setShowMenu={setShowMenu}
                setShowSelectWallet={setShowSelectWallet}
                showMenu={showMenu}
                showSelectWallet={showSelectWallet}
                showInstallWalletPopup={showInstallWalletPopup}
                setSelectedWallet={setSelectedWallet}
                setShowInstallWalletPopup={setShowInstallWalletPopup}
                selectedWallet={selectedWallet}
            />
        </header>
    )
}

export default withRouter(Header);