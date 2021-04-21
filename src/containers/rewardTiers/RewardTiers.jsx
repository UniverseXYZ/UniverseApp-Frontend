import '../../components/auctions/Tiers.scss';
import arrow from '../../assets/images/arrow.svg';
import union from '../../assets/images/Union.svg';
import icon from '../../assets/images/icon.svg';

import { useLocation, useHistory } from 'react-router-dom';
import './RewardTiers.scss';
import AppContext from '../../ContextAPI';
import { useEffect, useState, useContext} from 'react';



const RewardTiers = () => {
    const location = useLocation();
    const history = useHistory();

    const { auction,setAuction } = useContext(AppContext);
    const tierId = location.state;
    const tierById = auction.tiers.find((element) => element.id === tierId)
    console.log(auction.tiers)
    return (
        <div className='container reward-tiers'>
            <div className="back-rew" onClick={() => { history.push('/my-auctions') }}><img src={arrow} alt="back"/><span>My Auctions</span></div>
            <div>
            <div className='head-part'>
            <h2 className="tier-title">Reward Tiers</h2>
            <p>Reward Tiers are the NFT bundles that users are bidding for to win. There can be up to 10 tiers in one auction.</p>
            </div>
            {auction.tiers.length>0 &&
              auction.tiers.map((tier, index) => {
                return (
                <div className="view-tier">
                <div className="auction-header">
                            <div className="img_head">
                               <h1>{tier.name}</h1> 
                            </div>
                        </div>
                </div>
                    )
              })
            }            
            <div className="create-rew-tier" onClick={() => { history.push('/create-tiers') }}>
                    <div className="plus-icon">
                        <img src={union} alt="create"/>
                    </div> 
                    <div className="create-rew-text">
                        <p>Create  reward tier</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RewardTiers;