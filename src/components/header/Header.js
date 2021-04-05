import { useEffect, useState } from 'react';
import './Header.scss';
import appLogo from '../../assets/images/dark.svg';
import { Link } from 'react-router-dom';
import DesktopView from './dimensions/DesktopView';
import TabletView from './dimensions/TabletView';
import MobileView from './dimensions/MobileView';

const Header = () => {
    const PLACEHOLDER_ETHEREUM_ADDRESS = '0x5493a5a6f...ef8b';
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

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

    return (
        <header>
            <div className='app__logo'>
                <Link to={'/'}><img src={appLogo} alt='App Logo' /></Link>
            </div>
            {windowSize.width > 992 &&
                <DesktopView ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS} />
            }
            {windowSize.width <= 992 && windowSize.width > 576 &&
                <TabletView ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS} />
            }
            {windowSize.width <= 576 &&
                <MobileView ethereumAddress={PLACEHOLDER_ETHEREUM_ADDRESS} />
            }
        </header>
    )
}

export default Header;