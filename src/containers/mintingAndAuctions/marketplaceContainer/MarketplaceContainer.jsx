import { useEffect } from 'react';
import './Marketplace.scss';
import CreateYourAuction from '../../../components/mintingAndAuctions/marketplace/tabs/CreateYourAuction';
import Tabs from '../../../components/mintingAndAuctions/marketplace/tabs/Tabs';
import Welcome from '../../../components/mintingAndAuctions/marketplace/Welcome';

const MarketplaceContainer = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Universe Minting - Minting & Auctions - Marketplace'
        return () => { document.title = 'Universe Minting' };
    }, [])

    return (
        <div className='marketplace__page'>
            <Welcome />
            <Tabs />
            <CreateYourAuction />
        </div>
    )
}

export default MarketplaceContainer;