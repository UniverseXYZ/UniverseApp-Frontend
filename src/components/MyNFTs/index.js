import { useContext, useEffect } from 'react';
import './my-nfts.scss';
import Wallet from './Wallet';
import SavedNFTs from './SavedNFTs';
import SavedCollections from './SavedCollections';
import MintModal from '../MintModal';
import { PLACEHOLDER_NFTS } from '../../dummydata/NFTsDummyData';
import AppContext from '../../ContextAPI';

const MyNFTs = () => {
    const { savedNfts, selectedTabIndex, setSelectedTabIndex, showModal, setShowModal } = useContext(AppContext);
    const tabs = ['Wallet', 'Saved NFTs', 'Saved Collections'];
    const handleClose = () => {
        document.body.classList.remove('no__scroll');
        setTimeout(() => { setShowModal(false) }, 500);
    }

    const handleOpen = () => {
        setShowModal(true);
        document.body.classList.add('no__scroll')
    }

    const checkSelectedSavedNfts = () => {
        const res = savedNfts.filter(nft => nft.selected)

        return res.length ? false : true;
    }

    useEffect(() => {
        document.title = 'Universe Minting - My NFTs'
        return () => { document.title = 'Universe Minting' };
    }, [])
        
    return (
        <div className='container mynfts__page'>
            {PLACEHOLDER_NFTS.length ?
                <>
                    <div className='mynfts__page__header'>
                        <h1 className='title'>My NFTs</h1>
                        <div>
                            {selectedTabIndex === 1 &&
                                <button className='mint__btn' disabled={checkSelectedSavedNfts()}>Mint selected</button>
                            }
                            <button className='mint__btn' onClick={handleOpen}>Mint NFT</button>
                        </div>
                        {showModal &&
                            <MintModal open={showModal} onClose={handleClose}></MintModal>
                        }
                    </div>

                    <div className='mynfts__page__body'>
                        <ul className='tabs'>
                            {tabs.map((tab, index) => {
                                return (
                                    <li key={index} className={selectedTabIndex === index ? 'active' : ''} onClick={() => setSelectedTabIndex(index)}>{tab}</li>
                                )
                            })}
                        </ul>
                        {selectedTabIndex === 0 &&
                            <Wallet data={PLACEHOLDER_NFTS} />
                        }
                        {selectedTabIndex === 1 &&
                            <SavedNFTs />
                        }
                        {selectedTabIndex === 2 &&
                            <SavedCollections />
                        }
                    </div>
                </> :
                <div className='empty__nfts'>
                    <h1 className='title'>My NFTs</h1>
                    <h3>No NFTs found</h3>
                    <p className='desc'>Create NFTs or NFT collections with our platform by clicking the button below</p>
                    <button className='mint__btn' onClick={handleOpen}>Mint NFT</button>
                    {showModal &&
                        <MintModal open={showModal} onClose={handleClose}></MintModal>
                    }
                </div>
            }
        </div>
    )
}

export default MyNFTs;