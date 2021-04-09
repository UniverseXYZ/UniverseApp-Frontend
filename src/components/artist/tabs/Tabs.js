import {useState} from 'react'
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../../dummyData/ActiveAuctionsDummyData';
import { PLACEHOLDER_FUTURE_AUCTIONS } from '../../../dummyData/FutureAuctionsDummyData';
import ActiveAuctionsList from './activeAuctions/ActiveAuctionsList';
import FutureAuctionsList from './futureAuctions/FutureAuctionsList';
import NFTsTab from './nfts/NFTsTab';
import PastAuctionsList from './pastAuctions/PastAuctionsList';

const Tabs = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    return (
        <div className='tabs__section'>
            <div className='tabs__section__container'>
                <div className='tabs__wrapper'>
                    <div className='tabs'>
                        <button onClick={() => setSelectedTabIndex(0)} className={selectedTabIndex === 0 ? 'active' : ''}>NFTs</button>
                        <button onClick={() => setSelectedTabIndex(1)} className={selectedTabIndex === 1 ? 'active' : ''}>Active auctions</button>
                        <button onClick={() => setSelectedTabIndex(2)} className={selectedTabIndex === 2 ? 'active' : ''}>Future auctions</button>
                        <button onClick={() => setSelectedTabIndex(3)} className={selectedTabIndex === 3 ? 'active' : ''}>Past auctions</button>
                    </div>
                </div>
                <div className='tab__content'>
                    {selectedTabIndex === 0 && 
                        <NFTsTab />
                    }
                    {selectedTabIndex === 1 && 
                        <ActiveAuctionsList data={PLACEHOLDER_ACTIVE_AUCTIONS} /> 
                    }
                    {selectedTabIndex === 2 && 
                        <FutureAuctionsList data={PLACEHOLDER_FUTURE_AUCTIONS} /> 
                    }
                    {selectedTabIndex === 3 && 
                        <PastAuctionsList /> 
                    }
                </div>
            </div>
        </div>
    )
}

export default Tabs;