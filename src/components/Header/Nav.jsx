import { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import diamondIcon from '../../assets/images/diamond.svg';
import copyIcon from '../../assets/images/copy.svg';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Nav = () => {
    const PLACEHOLDER_ETHEREUM_ADDRESS = '0x...7923';
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(true);
    const [copied, setCopied] = useState(false);
    const history = useHistory();
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (!event.target.classList.contains('dropdown__opened')) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsDropdownOpened(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    })

    return (
        <ul>
            <li>
                <Link to={'/'}>My NFTs</Link>
            </li>
            <li>
                <Link to={'/auctions'}>Auctions</Link>
            </li>
            <li>
                {isWalletConnected ? 
                    <button className={`connect__wallet__btn ${isDropdownOpened ? 'dropdown__opened' : ''}`} onClick={() => setIsDropdownOpened(!isDropdownOpened)}>{PLACEHOLDER_ETHEREUM_ADDRESS}</button>
                    :
                    <button className='connect__wallet__btn' onClick={() => setIsWalletConnected(!isWalletConnected)}>Connect Wallet</button>
                }
                {isDropdownOpened &&
                    <div ref={ref} className='dropdown'>
                        <div className='dropdown__header'>
                            <div className='diamond'>
                                <img src={diamondIcon} alt='Diamond icon' />
                            </div>
                            <div className='ethereum__address'>{copied ? 'Copied!' : PLACEHOLDER_ETHEREUM_ADDRESS}</div>
                            <div className='copy' title='Copy to clipboard'>
                                <CopyToClipboard text={PLACEHOLDER_ETHEREUM_ADDRESS} onCopy={() => { setCopied(true); setTimeout(() => { setCopied(false) }, 1000) }}>
                                    <span><img src={copyIcon} alt='Copy to clipboard icon' /></span>
                                </CopyToClipboard>
                            </div>
                        </div>
                        <div className='dropdown__body'>
                            <button onClick={() => { history.push('/my-account'); setIsDropdownOpened(!isDropdownOpened) }}>My Account</button>
                            <button onClick={() => { setIsWalletConnected(!isWalletConnected); setIsDropdownOpened(!isDropdownOpened)}}>Disconnect</button>
                        </div>
                    </div>
                }
            </li>
        </ul>
    )
}

export default Nav;