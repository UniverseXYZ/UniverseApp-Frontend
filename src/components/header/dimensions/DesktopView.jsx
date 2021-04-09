import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Popup from "reactjs-popup"
import Icon from '../../../assets/images/icon1.svg';
import copyIcon from '../../../assets/images/copy.svg';
import AppContext from '../../../ContextAPI';
import arrowUP from '../../../assets/images/arrow-down.svg';
import Group1 from '../../../assets/images/Group1.svg';
import Group2 from '../../../assets/images/Group2.svg';
import SelectWalletPopup from '../../popups/SelectWalletPopup';

const DesktopView = ({ethereumAddress, handleConnectWallet, showInstallWalletPopup, setShowInstallWalletPopup, selectedWallet, setSelectedWallet}) => {
    const { isWalletConnected, setIsWalletConnected, handleClickOutside } = useContext(AppContext);
    const [isAccountDropdownOpened, setIsAccountDropdownOpened] = useState(false);
    const [isMintingDropdownOpened, setIsMintingDropdownOpened] = useState(false);
    const [isAboutDropdownOpened, setIsAboutDropdownOpened] = useState(false);
    const [copied, setCopied] = useState(false);
    const history = useHistory();
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsAccountDropdownOpened), true);
        document.addEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsMintingDropdownOpened), true);
        document.addEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsAboutDropdownOpened), true);
        return () => {
            document.removeEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsAccountDropdownOpened), true);
            document.removeEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsMintingDropdownOpened), true);
            document.removeEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsAboutDropdownOpened), true);
        };
    })
    return (
        <div className='desktop__nav'>
            <ul>
                <li>
                    <button className={`menu-li ${isMintingDropdownOpened ? 'dropdown__opened' : ''}`} onClick={() => setIsMintingDropdownOpened(!isMintingDropdownOpened)}>
                        <span className='nav__link__title'>Minting & Auctions</span>
                        <img className='arrow' src={arrowUP} alt="arrow" />
                    </button>
                    {isMintingDropdownOpened &&
                        <div ref={ref} className='dropdown minting-drop'>
                            <div className='dropdown__body'>
                                <button onClick={() => { history.push('/minting-and-auctions/about'); setIsMintingDropdownOpened(!isMintingDropdownOpened) }}>About</button>
                                <button className="active-auctions" onClick={() => { history.push('/minting-and-auctions/marketplace'); setIsWalletConnected(!isWalletConnected); setIsMintingDropdownOpened(!isMintingDropdownOpened)}}>Active auctions</button>
                                <button onClick={() => { history.push('/minting-and-auctions/marketplace'); setIsMintingDropdownOpened(!isMintingDropdownOpened) }}>Future auctions</button>
                            </div>
                        </div>
                    }
                </li>
                <li>
                    <button className={`menu-li ${isAboutDropdownOpened ? 'dropdown__opened' : ''}`} onClick={() => setIsAboutDropdownOpened(!isAboutDropdownOpened)}>
                        <span className='nav__link__title'>About</span>
                        <img className='arrow' src={arrowUP} alt="arrow" />
                    </button>
                    {isAboutDropdownOpened &&
                        <div ref={ref} className='dropdown minting-drop'>
                            <div className='dropdown__body'>
                                <button onClick={() => { history.push('/'); setIsAboutDropdownOpened(!isAboutDropdownOpened) }}>Whitepaper</button>
                                <button className="team" onClick={() => { history.push('/'); setIsAboutDropdownOpened(!isAboutDropdownOpened)}}>Team</button>
                            </div>
                        </div>
                    }
                </li>
                {isWalletConnected ?
                    <li>
                        <button className={`menu-li myAccount ${isAccountDropdownOpened ? 'dropdown__opened' : ''}`} onClick={() => setIsAccountDropdownOpened(!isAccountDropdownOpened)}>
                            <img className="icon-img" src={Icon} alt='Diamond icon' />
                            <span className='nav__link__title'>My Account</span>
                            <img className='arrow' src={arrowUP} alt="arrow" />
                        </button>

                        {isAccountDropdownOpened &&
                            <div ref={ref} className='dropdown drop-account'>
                                <div className='dropdown__header'>
                                    <div className="copy-div">
                                        <img className="icon-img" src={Icon} alt='icon' />
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
                                    <button onClick={() => { history.push('/my-account'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My profile</button>
                                    <button onClick={() => { history.push('/my-nfts'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My NFTs</button>
                                    <button onClick={() => { history.push('/my-auctions'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My auctions</button>
                                <button className="signOut" onClick={() => { setIsAccountDropdownOpened(!isAccountDropdownOpened); setIsWalletConnected(!isWalletConnected) }}>Sign out</button>
                                </div>
                            </div>
                        }
                    </li> :
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
        </div>
    )
}

export default DesktopView;