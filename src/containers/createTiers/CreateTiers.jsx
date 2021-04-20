import '../../components/auctions/Tiers.scss';
import {useState, useContext, useEffect } from 'react';
import arrow from '../../assets/images/arrow.svg';
import { useHistory } from 'react-router-dom';
import AppContext from '../../ContextAPI';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import infoIcon from '../../assets/images/icon.svg'
import { Animated } from 'react-animated-css';
import uuid from 'react-uuid';
import './CreateTiers.scss'

const CreateTiers = () => {
    const history = useHistory();
    const [hideIcon, setHideIcon] = useState(false);
    const [hideIcon1, setHideIcon1] = useState(false);
    const [hideIcon2, setHideIcon2] = useState(false);
    const { auction, setAuction,myNFTs,setMyNFTs } = useContext(AppContext);

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
                setAuction(data => ({ ...data, tier: { ...data.tier, ...values, totalNFTs: values.winners * values.nftsPerWinner, tierId: uuid()} }));
                    history.push('/select-nfts');
            }
        }
    }, [isValidFields])
    console.log(auction)
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
            <div className="back-rew" onClick={() => { history.push('/reward-tiers') }}><img src={arrow} alt="back"/><span>My Auctions</span></div>          
            <div>
                <div className='head-part'>
                    <h2 className="tier-title">Create Reward Tier</h2>
                    <p className="create-p">Each reward tier can contain up to 20 winners and up to 5 NFTs for each winner (total: 100 NFTs).</p>
                </div>
                <div className="tier-info"> 
                    <Input id="name" error={isValidFields.name ? undefined : 'Tier name is required!'} label='Tier name' class="inp" value={values.name} onChange={handleChange} />

                    <div className="tier-info_icon">
                        <label className="inp-label" onMouseOver={() => setHideIcon1(true)}  onMouseLeave={() => setHideIcon1(false)}>
                            <span>Number of winners 
                                <img src={infoIcon} alt='Info Icon' />
                            </span>
                            { hideIcon1 &&
                                <Animated animationIn="zoomIn">
                                    <div className="info-text t1">
                                        <p>Amount of people who will get NFTs from the current reward tier.</p>
                                    </div>
                                </Animated>
                            }
                        </label>
                    </div>
                    <Input id="winners" type="number" error={isValidFields.winners ? undefined : 'Number of winners is required!'} class="inp" value={values.winners} onChange={handleChange}/>
                    
                    <div className="tier-info_icon">
                        <label className="inp-label" onMouseOver={() => setHideIcon2(true)}  onMouseLeave={() => setHideIcon2(false)}>
                            <span>NFTs per winner <img src={infoIcon} alt='Info Icon'/></span>
                            { hideIcon2 &&
                                <Animated animationIn="zoomIn">
                                    <div className="info-text t2">   
                                        <p>Amount of NFTs each winner of this reward tier is going to get.</p>
                                    </div>
                                </Animated>
                            }
                        </label>
                    </div>
                    <Input id="nftsPerWinner" type="number" error={isValidFields.nftsPerWinner ? undefined : 'NFTs per winner is required!'}  class="inp" value={values.nftsPerWinner} onChange={handleChange} />
                </div>
                <div className="button-div">
                    <div class='btns'>
                        <Button className='light-border-button' onClick={() => { history.push('/reward-tiers') }}>Cancel</Button>
                        <Button className='light-button' onClick={handleClick}>Continue</Button>
                    </div>
                    <div className="total-num">
                            { hideIcon &&
                                <Animated animationIn="zoomIn" style={{position: 'relative'}}>
                                    <div className="info-text">
                                        <p>Total amount of NFTs that will be distributed to the current reward tier winners.</p>
                                    </div>
                                </Animated>
                            }
                            Total NTF: <b>{values.winners * values.nftsPerWinner}</b>  
                        <img src={infoIcon} alt='Info Icon' onMouseOver={() => setHideIcon(true)}  onMouseLeave={() => setHideIcon(false)} />
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default CreateTiers