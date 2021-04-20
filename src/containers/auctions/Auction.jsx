import './Auctions.scss';
import { useContext, useEffect, } from 'react';
import { AUCTIONS_DATA } from '../../utils/fixtures/AuctionsDummyData';
import AppContext from '../../ContextAPI';
import Exclamation from '../../assets/images/Exclamation.svg';
import tabArrow from '../../assets/images/tab-arrow.svg';
import FutureAuctions from '../../components/auctions/FutureAuctions';
import ActiveAictions from '../../components/auctions/ActiveAuctions';
import PastAuctions from '../../components/auctions/PastAuctions';
import { useHistory } from 'react-router-dom';


const MyAuction = () => {
    const {  selectedTabIndex, setSelectedTabIndex } = useContext(AppContext);
    const tabs = ['Active auctions', 'Future auctions', 'Past auctions'];

    const handleTabRightScrolling = () => {
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            document.querySelector('.tabs').scrollLeft += 10;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
                document.querySelector('.tab__left__arrow').style.display = 'flex';
                if(document.querySelector('.tabs').scrollLeft > 100) {
                    document.querySelector('.tab__right__arrow').style.display = 'none';
                }
            }
        }, 25);
    }

    const handleTabLeftScrolling = () => {
        var scrollAmount = 100;
        var slideTimer = setInterval(function(){
            document.querySelector('.tabs').scrollLeft -= 10;
            scrollAmount -= 10;
            if(scrollAmount <= 0){
                window.clearInterval(slideTimer);
                document.querySelector('.tab__right__arrow').style.display = 'flex';
                if(document.querySelector('.tabs').scrollLeft <= 0) {
                    document.querySelector('.tab__left__arrow').style.display = 'none';
                }
            }
        }, 25);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Universe Minting - My Auctions'
        return () => { document.title = 'Universe Minting' };
    }, [])

    useEffect(() => {
        function handleResize() {
            if(window.innerWidth < 400) {
                document.querySelector('.tab__right__arrow').style.display = 'flex';
            } else {
                document.querySelector('.tab__right__arrow').style.display = 'none';
                document.querySelector('.tab__left__arrow').style.display = 'none';
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                <div className='tabs__wrapper'>
                    <div className='tab__left__arrow'>
                        <img onClick={handleTabLeftScrolling} src={tabArrow} alt='Tab left arrow' />
                    </div>
                    <ul className='tabs'>
                        {tabs.map((tab, index) => {
                            return (
                                <li key={index} className={selectedTabIndex === index ? 'active' : ''} onClick={() => setSelectedTabIndex(index)}>{tab}</li>
                            )
                        })}
                    </ul>
                    <div className='tab__right__arrow'>
                        <img onClick={handleTabRightScrolling} src={tabArrow} alt='Tab right arrow' />
                    </div>
                </div>
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