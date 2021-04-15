import '../../components/auctions/Tiers.scss';
import {useState, useContext, useEffect } from 'react';
import arrow from '../../assets/images/arrow.svg';
import { useHistory } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import infoIcon from '../../assets/images/icon.svg'

const CreateTiers = () => {
    const history = useHistory();
    const [hideIcon, setHideIcon] = useState(true);
    const [hideIcon1, setHideIcon1] = useState(true);
    const [hideIcon2, setHideIcon2] = useState(true);
    const { auction, setAuction } = useContext(AppContext);

    const { myNFTs,setMyNFTs } = useContext(AppContext);

    const [values, setValues] = useState({
        name: '',
        winners: '',
        nftsPerWinner: '',
    });

    const [isValidFields, setIsValidFields] = useState({
        name: true,
        winners: true,
        nftsPerWinner: true,
    });

    useEffect(() => {
        if (values.name) {
            if (isValidFields.name && isValidFields.winners && isValidFields.nftsPerWinner) {
                setAuction(data => ({ ...data, tier: { ...data.tier, ...values, totalNFTs: values.winners * values.nftsPerWinner } }));
                    history.push('/select-nfts');
            }
        }
    }, [isValidFields])

    const handleChange = event => {
        setValues(prevValues => ({ ...prevValues, [event.target.id]: event.target.value }));
    };

    const handleClick = () => {
        setIsValidFields(prevValues => ({ ...prevValues, name: values.name.trim().length !== 0 }));
        setIsValidFields(prevValues => ({ ...prevValues, winners: values.winners.trim().length !== 0 }));
        setIsValidFields(prevValues => ({ ...prevValues, nftsPerWinner: values.nftsPerWinner.trim().length !== 0 }));
    };

    return(
        <div className='container create-tiers'>
            <div className="back-rew" onClick={() => { history.push('/reward-tiers') }}><img src={arrow} alt="back"/><span>My Auctions</span></div>          <div>
            <div className='head-part'>
            <h2 className="tier-title">Create Reward Tier</h2>
            <p className="create-p">Each reward tier can contain up to 20 winners and up to 5 NFTs for each winner (total: 100 NFTs).</p>
            </div>
            <div className="tier-info"> 
            <Input id="name" error={isValidFields.name ? undefined : 'Tier name is required!'} label='Tier name' class="inp" value={values.name} onChange={handleChange} />
            <div hidden={hideIcon1} className="info-text t1">
                  <p>Amount of people who will get NFTs from the current reward tier.</p>
             </div> 
            <Input id="winners" type="number" error={isValidFields.winners ? undefined : 'Number of winners is required!'} label={<span>Number of winners <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon1(false)} onMouseLeave={() => setHideIcon1(true)} /></span>} class="inp" value={values.winners} onChange={handleChange}/>
            <div hidden={hideIcon2} className="info-text t2">   
                  <p>Amount of NFTs each winner of this reward tier is going to get.</p>
             </div>
            <Input id="nftsPerWinner" type="number" error={isValidFields.nftsPerWinner ? undefined : 'NFTs per winner is required!'} label={<span>NFTs per winner <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon2(false)}  onMouseLeave={() => setHideIcon2(true)} /></span>} class="inp" value={values.nftsPerWinner} onChange={handleChange} />
            </div>
            <div className="button-div">
                <Button className='light-border-button' onClick={() => { history.push('/reward-tiers') }}>Cancel</Button>
                <Button className='light-button' onClick={handleClick}>Continue</Button>
                <div className="total-num">
                <div hidden={hideIcon} className="info-text">
                <p>Total amount of NFTs that will be distributed to the current reward tier winners.</p>
                </div>
                    Total NTF: <b>{values.winners * values.nftsPerWinner}</b>  
                <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon(false)}  onMouseLeave={() => setHideIcon(true)} />
                </div>
            </div>
            </div>    
        </div>
    )
}

export default CreateTiers