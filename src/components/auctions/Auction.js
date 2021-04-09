import './Auctions.scss';
import { useContext, useEffect, } from 'react';
import { AUCTIONS_DATA } from '../../auctionsData/Data';
import AppContext from '../../ContextAPI';
import Exclamation from '../../assets/images/Exclamation.svg';
import FutureAuctions from './auctionsTabs/FutureAuctions';
import ActiveAictions from './auctionsTabs/ActiveAuctions';
import PastAuctions from './auctionsTabs/PastAuctions';
import { useHistory } from 'react-router-dom';


const MyAuction = () => {
    const {  selectedTabIndex, setSelectedTabIndex } = useContext(AppContext);
    const tabs = ['Active auctions', 'Future auctions', 'Past auctions'];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Universe Minting - My Auctions'
        return () => { document.title = 'Universe Minting' };
    }, [])

    const history = useHistory();
    
    return(
  <div className="container auction__page">

       <div className='auction__page__header'>
                        <h1 className='title'>My Auctions</h1>
                        <div>
                        <button className='set_up' onClick={() => { history.push('/reward-tiers') }}>Set up auction</button>
                        </div>  
      </div>
      
      <div className='auction__page__body'>
                        <ul className='tabs'>
                            {tabs.map((tab, index) => {
                                return (
                                    <li key={index} className={selectedTabIndex === index ? 'active' : ''} onClick={() => setSelectedTabIndex(index)}>{tab}</li>
                                )
                            })}
                        </ul>
                        <div style={{display: "none"}} className="err-msg">
                            <img src={Exclamation} alt="message"/>
                            <p>Please, fill out the profile details before you set up an auction.<span> Go to my profile.</span></p>
                        </div>      
                        {selectedTabIndex === 0 && AUCTIONS_DATA.length > 0 && 
                            <ActiveAictions />
                         }
                        {selectedTabIndex === 0 && AUCTIONS_DATA.length === 0 && <>
                        <div className='empty__auction'>
                            <h3>No active auctions found</h3>
                            <p className='desc'>Create your first auction by clicking the button below</p>
                            <button className='set_up'>Set up auction</button>
                        </div> 
                         </> }
                         {selectedTabIndex === 1 && AUCTIONS_DATA.length > 0 && 
                            <FutureAuctions /> }
                         {selectedTabIndex === 1 && AUCTIONS_DATA.length === 0 && <>
                        <div className='empty__auction'>
                            <h3>No scheduled auctions found</h3>
                            <p className='desc'>Create your first auction by clicking the button below</p>
                            <button className='set_up'>Set up auction</button>
                        </div> 
                     </>}
                        
                         {selectedTabIndex === 2 && AUCTIONS_DATA.length > 0 && 
                         <PastAuctions /> }
                         {selectedTabIndex === 2 && AUCTIONS_DATA.length === 0 && <>
                        <div className='empty__auction'>
                            <h3>No past auctions found</h3>
                            <p className='desc'>Create your first auction by clicking the button below</p>
                            <button className='set-up' onClick={() => { history.push('/reward-tiers') }}>Set up auction</button>
                        </div> 
                         </> }

                    </div>
 </div>
    )
}
export default MyAuction