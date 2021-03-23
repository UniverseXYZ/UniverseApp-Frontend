import { useState } from 'react';
import './my-nfts.scss';
import Wallet from './Wallet';
import SavedNFTs from './SavedNFTs';
import SavedCollections from './SavedCollections';

const MyNFTs = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const tabs = ['Wallet', 'Saved NFTs', 'Saved Collections'];
    return (
        <div className='container mynfts__page'>

            <div className='mynfts__page__header'>
                <h1 className='title'>My NFTs</h1>
                <button>Mint NFT</button>
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
                    <Wallet />
                }
                {selectedTabIndex === 1 &&
                    <SavedNFTs />
                }
                {selectedTabIndex === 2 &&
                    <SavedCollections />
                }
            </div>
        </div>
    )
}

export default MyNFTs;