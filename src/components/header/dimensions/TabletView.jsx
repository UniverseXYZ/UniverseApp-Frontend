import { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link, useHistory } from 'react-router-dom';
import Popup from "reactjs-popup";
import {Animated} from "react-animated-css";
import hamburgerIcon from '../../../assets/images/hamburger.svg';
import closeIcon from '../../../assets/images/close-menu.svg';
import arrowDown from '../../../assets/images/arrow-down.svg';
import accountIcon from '../../../assets/images/icon1.svg';
import AppContext from '../../../ContextAPI';
import Group1 from '../../../assets/images/Group1.svg';
import Group2 from '../../../assets/images/Group2.svg';
import copyIcon from '../../../assets/images/copy.svg';
import SelectWalletPopup from '../../popups/SelectWalletPopup';
import {shortenEthereumAddress, toFixed} from "../../../utils/helpers/format";

const TabletView = (props) => {
    const {
        ethereumAddress,
        handleConnectWallet,
        showInstallWalletPopup,
        setShowInstallWalletPopup,
        selectedWallet,
        setSelectedWallet,
        showMenu,
        setShowMenu
    } = props;
    const { isWalletConnected, setIsWalletConnected, handleClickOutside, ethBalance, usdEthBalance, wethBalance, usdWethBalance } = useContext(AppContext);
    const [collapseMintingMenu, setCollapseMintingMenu] = useState(false);
    const [collapseAboutMenu, setCollapseAboutMenu] = useState(false);
    const [isAccountDropdownOpened, setIsAccountDropdownOpened] = useState(false);
    const [copied, setCopied] = useState(false)

    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        showMenu ? document.body.classList.add('no__scroll'): document.body.classList.remove('no__scroll');
    }, [showMenu])

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e, 'account__icon', ref, setIsAccountDropdownOpened), true);
        return () => {
            document.removeEventListener('click', (e) => handleClickOutside(e, 'account__icon', ref, setIsAccountDropdownOpened), true);
        };
    })
    
    return (
        <div className='tablet__nav'>
            <button className='hamburger' onClick={() => setShowMenu(!showMenu)}>
                {!showMenu ? 
                    <img src={hamburgerIcon} alt='Hamburger' /> :
                    <img src={closeIcon} alt='Close' />
                }
            </button>
            {isWalletConnected &&
                <div className='wallet__connected__tablet'>
                <img className="account__icon" src={accountIcon} onClick={() => { setIsAccountDropdownOpened(!isAccountDropdownOpened); setShowMenu(false) }} alt='Account icon' />
                    {isAccountDropdownOpened &&
                    <Animated animationIn="fadeIn">
                        <div ref={ref} className='dropdown drop-account'>
                            <div className='dropdown__header'>
                                <div className="copy-div">
                                    <img className="icon-img" src={accountIcon} alt='icon' />
                                    <div className='ethereum__address'>{shortenEthereumAddress(ethereumAddress)}</div>
                                    <div className="copy__div">
                                        <div className='copy' title='Copy to clipboard'>
                                            <div className="copied-div" hidden={!copied}>Address copied!<span></span></div>
                                            <CopyToClipboard text={ethereumAddress} onCopy={() => { setCopied(true); setTimeout(() => { setCopied(false) }, 1000) }}>
                                                <span><img src={copyIcon} alt='Copy to clipboard icon' className='copyImg'/></span>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                </div>
                                <div className="group1">
                                    <img src={Group1} alt="ETH" />
                                    <span className="first-span">{toFixed(ethBalance, 2)} ETH</span>
                                    <span className="second-span">${toFixed(usdEthBalance, 2)}</span>
                                </div>
                                <div className="group2">
                                    <img src={Group2} alt="WETH" />
                                    <span className="first-span">{toFixed(wethBalance, 2)} WETH</span>
                                    <span className="second-span">${toFixed(usdWethBalance, 2)}</span>
                                </div>
                                
                            </div>
                            <div className='dropdown__body'>
                                <button onClick={() => { history.push('/my-account'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My profile</button>
                                <button onClick={() => { history.push('/my-nfts'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My NTFs</button>
                                <button onClick={() => { history.push('/my-auctions'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My auctions</button>
                                <button className="signOut" onClick={() => { setIsAccountDropdownOpened(!isAccountDropdownOpened); setIsWalletConnected(!isWalletConnected) }}>Sign out</button>
                            </div>
                        </div>
                    </Animated>
                    }
                </div>
            }
            {showMenu &&
                <>
                    <div className='overlay'></div>
                    <ul className='nav__menu'>
                        <li>
                        <Link to='' className={collapseMintingMenu ? 'collapsed' : ''} onClick={(e) => { e.preventDefault(); setCollapseMintingMenu(!collapseMintingMenu) }}>
                                <span>Minting & Auctions</span>
                                <img src={arrowDown} alt='arrow-down' />
                            </Link>
                            {collapseMintingMenu &&
                                <>
                                    <Link className='sub__nav' to='/minting-and-auctions/about'>
                                        <span>About</span>
                                    </Link>
                                    <Link className='sub__nav' to='/minting-and-auctions/marketplace/active-auctions'>
                                        <span>Active auctions</span>
                                    </Link>
                                    <Link className='sub__nav' to='/minting-and-auctions/marketplace/future-auctions'>
                                        <span>Future Auctions</span>
                                    </Link>
                                </>
                            }
                        </li>
                        <li>
                        <Link to='' className={collapseAboutMenu ? 'collapsed' : ''} onClick={(e) => { e.preventDefault(); setCollapseAboutMenu(!collapseAboutMenu) }}>
                                <span>About</span>
                                <img src={arrowDown} alt='arrow-down' />
                            </Link>
                            {collapseAboutMenu &&
                                <>
                                    <Link className='sub__nav' to='/'>
                                        <span>Whitepaper</span>
                                    </Link>
                                    <Link className='sub__nav team' to='/'>
                                        <span>Team</span>
                                    </Link>
                                </>
                            }
                        </li>
                        {!isWalletConnected &&
                            <li>
                                <Popup
                                    trigger={<button className='sign__in'>Sign In</button>}
                                >
                                    {
                                        (close) => (
                                            <SelectWalletPopup
                                                close={close}
                                                handleConnectWallet={handleConnectWallet}
                                                showInstallWalletPopup={showInstallWalletPopup}
                                                setShowInstallWalletPopup={setShowInstallWalletPopup}
                                                selectedWallet={selectedWallet}
                                                setSelectedWallet={setSelectedWallet}
                                            />
                                        )
                                    }
                                </Popup>
                            </li>
                        }
                    </ul>
                </>
            }
        </div>
    )
}

TabletView.propTypes = {
    ethereumAddress: PropTypes.string,
    handleConnectWallet: PropTypes.func,
    showInstallWalletPopup: PropTypes.bool,
    setShowInstallWalletPopup: PropTypes.func,
    selectedWallet: PropTypes.string,
    setSelectedWallet: PropTypes.func,
    showMenu: PropTypes.bool,
    setShowMenu: PropTypes.func,
}

export default TabletView;