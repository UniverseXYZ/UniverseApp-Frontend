import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Icon from '../../assets/images/icon1.svg';
import copyIcon from '../../assets/images/copy.svg';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import AppContext from '../../ContextAPI';
import arrowUP from '../../assets/images/arrow-down.svg';
import Group1 from '../../assets/images/Group1.svg';
import Group2 from '../../assets/images/Group2.svg';


const Nav = () => {
    const { isWalletConnected, setIsWalletConnected, handleClickOutside } = useContext(AppContext);
    const [isAccountDropdownOpened, setIsAccountDropdownOpened] = useState(false);
    const [isMintingDropdownOpened, setIsMintingDropdownOpened] = useState(false);
    const [copied, setCopied] = useState(false);
    const history = useHistory();
    const ref = useRef(null);
    const PLACEHOLDER_ETHEREUM_ADDRESS = '0x5493a5a6f...ef8b';

    useEffect(() => {
        document.addEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsAccountDropdownOpened), true);
        document.addEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsMintingDropdownOpened), true);
        return () => {
            document.removeEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsAccountDropdownOpened), true);
            document.removeEventListener('click', (e) => handleClickOutside(e, 'dropdown__opened', ref, setIsMintingDropdownOpened), true);
        };
    })

    return (
        <ul>
            <li>
                <button className={`menu-li ${isMintingDropdownOpened ? 'dropdown__opened' : ''}`} onClick={() => setIsMintingDropdownOpened(!isMintingDropdownOpened)}>
                    <span className='nav__link__title'>minting & Auctions</span>
                    <img src={arrowUP} alt="Minting & Auctions" />
                </button>
                {isMintingDropdownOpened &&
                    <div ref={ref} className='dropdown minting-drop'>
                        <div className='dropdown__body'>
                            <button onClick={() => { history.push(''); setIsMintingDropdownOpened(!isMintingDropdownOpened) }}>About</button>
                            <button className="active-auctions" onClick={() => { history.push('my-auctions'); setIsWalletConnected(!isWalletConnected); setIsMintingDropdownOpened(!isMintingDropdownOpened)}}>Active Auction</button>
                            <button onClick={() => { history.push(''); setIsMintingDropdownOpened(!isMintingDropdownOpened) }}>Upcoming releases</button>
                        </div>
                    </div>
                }
            </li>
            <li>Whitepaper</li>
            <li className="team">Team</li>
            <li>
                <button className={`menu-li myAccount ${isAccountDropdownOpened ? 'dropdown__opened' : ''}`} onClick={() => setIsAccountDropdownOpened(!isAccountDropdownOpened)}>
                    <img className="icon-img" src={Icon} alt='Diamond icon' />
                    <span className='nav__link__title'>My Account</span>
                    <img src={arrowUP} alt="My Account" />
                </button>

                {isAccountDropdownOpened &&
                    <div ref={ref} className='dropdown drop-account'>
                        <div className='dropdown__header'>
                            <div className="copy-div">
                                <img className="icon-img" src={Icon} alt='icon' />
                                <div className='ethereum__address'>{copied ? 'Copied!' : PLACEHOLDER_ETHEREUM_ADDRESS}</div>
                                <div className='copy' title='Copy to clipboard'>
                                    <CopyToClipboard text={PLACEHOLDER_ETHEREUM_ADDRESS} onCopy={() => { setCopied(true); setTimeout(() => { setCopied(false) }, 1000) }}>
                                        <span><img src={copyIcon} alt='Copy to clipboard icon' /></span>
                                    </CopyToClipboard>
                                </div>
                                </div>
                                <div className="group1">
                                    <img src={Group1} alt="ETH"/>
                                    <span className="first-span">6,24 ETH</span>
                                    <span className="second-span">$10,554</span>  
                                </div>
                                <div className="group2">  
                                <img src={Group2} alt="WETH"/>               
                                <span className="first-span">6,24 WETH</span>
                                <span className="second-span">$10,554</span> 
                            </div>
                            
                        </div>
                        <div className='dropdown__body'>
                            <button onClick={() => { history.push('/my-account'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My Profile</button>
                            <button onClick={() => { history.push('/'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My ntfs</button>
                            <button onClick={() => { history.push('/my-auctions'); setIsAccountDropdownOpened(!isAccountDropdownOpened) }}>My auctions</button>
                            {/* <button onClick={() => { history.push('/my-account'); setIsAccountDropdownOpened(!isDropdownOpened) }}>My Account</button> */}
                            <button className="signOut" onClick={() => { setIsAccountDropdownOpened(!isAccountDropdownOpened)}}>Sign Out</button>
                        </div>
                    </div>
                }
            </li>
        </ul>
    )
}

export default Nav;