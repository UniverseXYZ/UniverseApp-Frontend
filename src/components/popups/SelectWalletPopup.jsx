import PropTypes from 'prop-types';
import Button from '../button/Button';
import metamaskLogo from '../../assets/images/metamask.svg';
import ledgerLogo from '../../assets/images/ledger.svg';
import keystoreLogo from '../../assets/images/keystore.svg';
import trezorLogo from '../../assets/images/trezor.svg';
import coinbaseLogo from '../../assets/images/coinbase.svg';
import walletConnectLogo from '../../assets/images/wallet-connect.svg';
import closeIcon from '../../assets/images/close-menu.svg';

const SelectWalletPopup = (props) => {
    const { close, handleConnectWallet, showInstallWalletPopup, setShowInstallWalletPopup, selectedWallet, setSelectedWallet } = props;

    return (
        <div className='select_wallet__popup'>
            <img className='close__popup' onClick={close} src={closeIcon} alt='Close' />
            {!showInstallWalletPopup ? 
                <>
                    <h1 className='title'>Select Wallet</h1>
                    <p className='desc'>Please pick a wallet to connect to Universe</p>
                    <div className='wallets'>
                        <button onClick={() => handleConnectWallet('Metamask')}>
                            <img src={metamaskLogo} alt='Metamask' />
                        </button>
                        <button onClick={() => handleConnectWallet('Ledger')}>
                            <img src={ledgerLogo} alt='Ledger' />
                        </button>
                        <button onClick={() => handleConnectWallet('Keystore')}>
                            <img src={keystoreLogo} alt='Keystore' />
                        </button>
                        <button onClick={() => handleConnectWallet('Trezor')}>
                            <img src={trezorLogo} alt='Trezor' />
                        </button>
                        <button onClick={() => handleConnectWallet('Coinbase')}>
                            <img src={coinbaseLogo} alt='Coinbase' />
                        </button>
                        <button onClick={() => handleConnectWallet('WalletConnect')}>
                            <img src={walletConnectLogo} alt='WalletConnect' />
                        </button>
                    </div>
                    <p className='info'>We do not own your private keys and cannot access your funds without your confirmation.</p>
                </> :
                <>
                    <h1 className='title'>Install {selectedWallet}</h1>
                    <p className='desc'>You need to have Metamask installed to continue. Once you have installed it, please refresh the page</p>
                    <div className='links'>
                        <Button className='light-button'>Install {selectedWallet}</Button>
                        <Button className='light-border-button' onClick={() => { setShowInstallWalletPopup(false); setSelectedWallet(''); }}>Go back</Button>
                    </div>
                </>
            }
            
        </div>
    )
}

SelectWalletPopup.propTypes = {
    close: PropTypes.func,
    handleConnectWallet: PropTypes.func,
    showInstallWalletPopup: PropTypes.bool,
    setShowInstallWalletPopup: PropTypes.func,
    selectedWallet: PropTypes.bool,
    setSelectedWallet: PropTypes.func,
}

export default SelectWalletPopup;
