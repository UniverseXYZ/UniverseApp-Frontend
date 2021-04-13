import '../../components/auctions/Tiers.scss';
import arrow from '../../assets/images/arrow.svg';
import union from '../../assets/images/Union.svg';
import { useHistory } from 'react-router-dom';


const SelectNFTs = () => {
    const history = useHistory();
    return (
        <div className='container select-nfts'>
            <div className="back-rew" onClick={() => { history.push('/reward-tiers') }}><img src={arrow} alt="back"/><span>Create reward tier</span></div>
            <div>
            <div className='head-part'>
            <h2 className="tier-title">Select NTFs</h2>
            </div>
            <div className="create-rew-tier select-ntfs" onClick={() => { history.push('/create-tiers') }}>
                    <div className="plus-icon">
                        <img src={union} alt="create"/>
                    </div> 
                    <div className="create-rew-text">
                        <p>Create NFT</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectNFTs;