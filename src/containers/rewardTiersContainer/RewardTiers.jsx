import '../../components/auctions/Tiers.scss';
import arrow from '../../assets/images/arrow.svg';
import union from '../../assets/images/Union.svg';
import { useHistory } from 'react-router-dom';


const RewardTiers = () => {
    const history = useHistory();
    return (
        <div className='container reward-tiers'>
            <div className="back-rew" onClick={() => { history.push('/my-auctions') }}><img src={arrow} alt="back"/><span>My Auctions</span></div>
            <div>
            <div className='head-part'>
            <h2 className="tier-title">Reward Tiers</h2>
            <p>Reward Tiers are the NFT bundles that users are bidding for to win. There can be up to 10 tiers in one auction.</p>
            </div>
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