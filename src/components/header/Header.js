import { useContext, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.scss';
import appDarkLogo from '../../assets/images/dark.svg';
import appLightLogo from '../../assets/images/light.svg';
import DesktopView from './dimensions/DesktopView';
import TabletView from './dimensions/TabletView';
import MobileView from './dimensions/MobileView';
import AppContext from '../../ContextAPI';

const Header = (props) => {
    const { setIsWalletConnected } = useContext(AppContext);
    const PLACEHOLDER_ETHEREUM_ADDRESS = '0x5493a5a6f...ef8b';
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    const [selectedWallet, setSelectedWallet] = useState('');
    const [installed, setInstalled] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [showSelectWallet, setShowSelectWallet] = useState(false);
    const [showInstallWalletPopup, setShowInstallWalletPopup] = useState(false);
    
    const handleConnectWallet = (wallet) => {
        // Here need to check if selected wallet is installed in browser
        setSelectedWallet(wallet);
        if (installed) {
            setIsWalletConnected(true);
            setShowMenu(false);
            setShowSelectWallet(false);
        } else {
            setShowInstallWalletPopup(true);
        }
    }

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (props.location.pathname === '/' || props.location.pathname === '/minting-and-auctions/about') {
            document.querySelector('header').classList.add('dark')
        } else {
            document.querySelector('header').classList.remove('dark')
        }
    })

    return (
        <header>
            <div className='app__logo'>
                <Link className='dark' to={'/'}><img src={appDarkLogo} alt='App Logo' /></Link>
                <Link className='light' to={'/'}><img src={appLightLogo} alt='App Logo' /></Link>
            </div>
            {windowSize.width > 992 &&
                <DesktopView
                    ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS}
                    handleConnectWallet={handleConnectWallet}
                    showInstallWalletPopup={showInstallWalletPopup}
                    setShowInstallWalletPopup={setShowInstallWalletPopup}
                    selectedWallet={selectedWallet}
                    setSelectedWallet={setSelectedWallet}
                />
            }
            {windowSize.width <= 992 && windowSize.width > 576 &&
                <TabletView
                    ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS}
                    handleConnectWallet={handleConnectWallet}
                    showInstallWalletPopup={showInstallWalletPopup}
                    setShowInstallWalletPopup={setShowInstallWalletPopup}
                    selectedWallet={selectedWallet}
                    setSelectedWallet={setSelectedWallet}
                />
            }
            {windowSize.width <= 576 &&
                <MobileView
                    ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS}
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
            }
        </header>
    )
}

export default withRouter(Header);