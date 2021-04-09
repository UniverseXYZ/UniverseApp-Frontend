import './Tiers.scss';
import {useState, useContext } from 'react';
import arrow from '../../../assets/images/arrow.svg';
import { useHistory } from 'react-router-dom';
import AppContext from '../../../ContextAPI';
import Button from '../../button/Button';
import Input from '../../input/Input';
import infoIcon from '../../../assets/images/icon.svg'

const CreateTiers = () => {
    const history = useHistory();
    const [hideIcon, setHideIcon] = useState(true);
    const [hideIcon1, setHideIcon1] = useState(true);
    const [hideIcon2, setHideIcon2] = useState(true);


    return(
        <div className='container create-tiers'>
            <div className="back-rew" onClick={() => { history.push('/reward-tiers') }}><img src={arrow} alt="back"/><span>My Auctions</span></div>          <div>
            <div className='head-part'>
            <h2 className="tier-title">Create Reward Tier</h2>
            <p className="create-p">Each reward tier can contain up to 20 winners and up to 5 NFTs for each winner (total: 100 NFTs).</p>
            </div>
            <div className="tier-info"> 
            <Input label='Tier name' class="inp"/>
            <div hidden={hideIcon1} className="info-text">
                  <p>Amount of people who will get NFTs from the current reward tier.</p>
             </div> 
            <Input label={<span>Number of winners <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon1(false)} onMouseLeave={() => setHideIcon1(true)} /></span>} class="inp"/>
            <div hidden={hideIcon2} className="info-text">
                  <p>Amount of NFTs each winner of this reward tier is going to get.</p>
             </div>
            <Input label={<span>NFTs per winner <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon2(false)}  onMouseLeave={() => setHideIcon2(true)} /></span>} class="inp"/>
            </div>
            <div className="button-div">
                <Button className='light-border-button'>Cancel</Button>
                <Button className='light-button'>Continue</Button>
                <div className="total-num">
                <div hidden={hideIcon} className="info-text">
                <p>Total amount of NFTs that will be distributed to the current reward tier winners.</p>
                </div>
                    Total NTF: <b>15</b>  
                <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon(false)}  onMouseLeave={() => setHideIcon(true)} />
                </div>
            </div>
            </div>
        
        
        
        </div>
    )
}

export default CreateTiers