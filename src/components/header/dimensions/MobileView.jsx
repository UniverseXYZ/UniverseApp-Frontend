import { useContext, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AppContext from '../../../ContextAPI';
import hamburgerIcon from '../../../assets/images/hamburger.svg';
import closeIcon from '../../../assets/images/close-menu.svg';
import arrowDown from '../../../assets/images/arrow-down.svg';
import Group1 from '../../../assets/images/Group1.svg';
import Group2 from '../../../assets/images/Group2.svg';
import copyIcon from '../../../assets/images/copy.svg';
import accountIcon from '../../../assets/images/icon1.svg';
import metamaskLogo from '../../../assets/images/metamask.svg';
import ledgerLogo from '../../../assets/images/ledger.svg';
import keystoreLogo from '../../../assets/images/keystore.svg';
import trezorLogo from '../../../assets/images/trezor.svg';
import coinbaseLogo from '../../../assets/images/coinbase.svg';
import walletConnectLogo from '../../../assets/images/wallet-connect.svg';
import leftArrow from '../../../assets/images/arrow.svg'

const MobileView = ({ethereumAddress}) => {
    const { isWalletConnected, setIsWalletConnected, handleClickOutside } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);
    const [collapseMintingMenu, setCollapseMintingMenu] = useState(false);
    const [collapseAboutMenu, setCollapseAboutMenu] = useState(false);
    const [isAccountDropdownOpened, setIsAccountDropdownOpened] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showSelectWallet, setShowSelectWallet] = useState(false);

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
        <div className='mobile__nav'>
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
                        <div ref={ref} className='dropdown drop-account'>
                            <div className='dropdown__header'>
                                <div className="copy-div">
                                    <img className="icon-img" src={accountIcon} alt='icon' />
                                    <div className='ethereum__address'>{copied ? 'Copied!' : ethereumAddress}</div>
                                    <div className='copy' title='Copy to clipboard'>
                                        <CopyToClipboard text={ethereumAddress} onCopy={() => { setCopied(true); setTimeout(() => { setCopied(false) }, 1000) }}>
                                            <span><img src={copyIcon} alt='Copy to clipboard icon' /></span>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="group1">
                                    <img src={Group1} alt="ETH" />
                                    <span className="first-span">6,24 ETH</span>
                                    <span className="second-span">$10,554</span>
                                </div>
                                <div className="group2">
                                    <img src={Group2} alt="WETH" />
                                    <span className="first-span">6,24 WETH</span>
                                    <span className="second-span">$10,554</span>
                                </div>
                                
                            </div>
                            <div className='dropdown__body'>
                                <button onClick={() => { history.push('/my-account'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My Profile</button>
                                <button onClick={() => { history.push('/'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My ntfs</button>
                                <button onClick={() => { history.push('/my-auctions'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My auctions</button>
                                <button className="signOut" onClick={() => { setIsAccountDropdownOpened(!isAccountDropdownOpened); setIsWalletConnected(!isWalletConnected) }}>Sign Out</button>
                            </div>
                        </div>
                    }
                </div>
            }
            {showMenu &&
                <>
                    <div className='overlay'></div>
                    <ul className='nav__menu'>
                        {!showSelectWallet ?
                            <>
                                <li>
                                    <Link to='' className={collapseMintingMenu ? 'collapsed' : ''} onClick={() => setCollapseMintingMenu(!collapseMintingMenu)}>
                                        <span>Minting & Auctions</span>
                                        <img src={arrowDown} alt='arrow-down' />
                                    </Link>
                                    {collapseMintingMenu &&
                                        <>
                                            <Link className='sub__nav' to='/about'>
                                                <span>About</span>
                                            </Link>
                                            <Link className='sub__nav' to='/active-auctions'>
                                                <span>Active auctions</span>
                                            </Link>
                                            <Link className='sub__nav' to='/upcoming-releases'>
                                                <span>upcoming releases</span>
                                            </Link>
                                        </>
                                    }
                                </li>
                                <li>
                                    <Link to='' className={collapseAboutMenu ? 'collapsed' : ''} onClick={() => setCollapseAboutMenu(!collapseAboutMenu)}>
                                        <span>About</span>
                                        <img src={arrowDown} alt='arrow-down' />
                                    </Link>
                                    {collapseAboutMenu &&
                                        <>
                                            <Link className='sub__nav' to='/whitepaper'>
                                                <span>Whitepaper</span>
                                            </Link>
                                            <Link className='sub__nav' to='/team'>
                                                <span>Team</span>
                                            </Link>
                                        </>
                                    }
                                </li>
                                {!isWalletConnected &&
                                    <li>
                                        <button className='sign__in' onClick={() => setShowSelectWallet(true)}>Sign In</button>
                                    </li>
                                }
                            </> :
                            <div className='select_wallet__section'>
                                <div className="backToMenu" onClick={() => setShowSelectWallet(false)}><img src={leftArrow} alt="back"/><span>Back to menu</span></div>
                                <h1 className='title'>Select Wallet</h1>
                                <p className='desc'>Please pick a wallet to connect to Universe</p>
                                <div className='wallets'>
                                    <button onClick={() => {setIsWalletConnected(!isWalletConnected); setShowMenu(false); setShowSelectWallet(false)}}>
                                        <img src={metamaskLogo} alt='Metamask' />
                                    </button>
                                    <button onClick={() => {setIsWalletConnected(!isWalletConnected); setShowMenu(false); setShowSelectWallet(false)}}>
                                        <img src={ledgerLogo} alt='Ledger' />
                                    </button>
                                    <button onClick={() => {setIsWalletConnected(!isWalletConnected); setShowMenu(false); setShowSelectWallet(false)}}>
                                        <img src={keystoreLogo} alt='Keystore' />
                                    </button>
                                    <button onClick={() => {setIsWalletConnected(!isWalletConnected); setShowMenu(false); setShowSelectWallet(false)}}>
                                        <img src={trezorLogo} alt='Trezor' />
                                    </button>
                                    <button onClick={() => {setIsWalletConnected(!isWalletConnected); setShowMenu(false); setShowSelectWallet(false)}}>
                                        <img src={coinbaseLogo} alt='Coinbase' />
                                    </button>
                                    <button onClick={() => {setIsWalletConnected(!isWalletConnected); setShowMenu(false); setShowSelectWallet(false)}}>
                                        <img src={walletConnectLogo} alt='WalletConnect' />
                                    </button>
                                </div>
                                <p className='info'>We do not own your private keys and cannot access your funds without your confirmation.</p>
                            </div>
                        }
                    </ul>
                </>
            }
        </div>
    )
}

export default MobileView;