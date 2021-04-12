import {useState} from 'react'
import ActiveAuctionsTab from './activeAuctions/ActiveAuctionsTab';
import FutureAuctionsTab from './futureAuctions/FutureAuctionsTab';

const Tabs = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    return (
        <div className='tabs__section'>
            <div className='tabs__section__container'>
                <div className='tabs'>
                    <button onClick={() => setSelectedTabIndex(0)} className={selectedTabIndex === 0 ? 'active' : ''}>Active auctions</button>
                    <button onClick={() => setSelectedTabIndex(1)} className={selectedTabIndex === 1 ? 'active' : ''}>Future auctions</button>
                </div>
                <div className='tab__content'>
                    {selectedTabIndex === 0 ? 
                        <ActiveAuctionsTab /> :
                        <FutureAuctionsTab />
                    }
                </div>
            </div>
        </div>
    )
}

export default Tabs;