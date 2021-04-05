import metamaskLogo from '../../assets/images/metamask.svg';
import ledgerLogo from '../../assets/images/ledger.svg';
import keystoreLogo from '../../assets/images/keystore.svg';
import trezorLogo from '../../assets/images/trezor.svg';
import coinbaseLogo from '../../assets/images/coinbase.svg';
import walletConnectLogo from '../../assets/images/wallet-connect.svg';
import closeIcon from '../../assets/images/close-menu.svg';
import { useContext } from 'react';
import AppContext from '../../ContextAPI';

const SelectWalletPopup = ({ close }) => {
    const { isWalletConnected, setIsWalletConnected } = useContext(AppContext);

    return (
        <div className='select_wallet__popup'>
            <img className='close__popup' onClick={close} src={closeIcon} alt='Close' />
            <h1 className='title'>Select Wallet</h1>
            <p className='desc'>Please pick a wallet to connect to Universe</p>
            <div className='wallets'>
                <button onClick={() => {setIsWalletConnected(!isWalletConnected)}}>
                    <img src={metamaskLogo} alt='Metamask' />
                </button>
                <button onClick={() => {setIsWalletConnected(!isWalletConnected)}}>
                    <img src={ledgerLogo} alt='Ledger' />
                </button>
                <button onClick={() => {setIsWalletConnected(!isWalletConnected)}}>
                    <img src={keystoreLogo} alt='Keystore' />
                </button>
                <button onClick={() => {setIsWalletConnected(!isWalletConnected)}}>
                    <img src={trezorLogo} alt='Trezor' />
                </button>
                <button onClick={() => {setIsWalletConnected(!isWalletConnected)}}>
                    <img src={coinbaseLogo} alt='Coinbase' />
                </button>
                <button onClick={() => {setIsWalletConnected(!isWalletConnected)}}>
                    <img src={walletConnectLogo} alt='WalletConnect' />
                </button>
            </div>
            <p className='info'>We do not own your private keys and cannot access your funds without your confirmation.</p>
        </div>
    )
}

export default SelectWalletPopup
