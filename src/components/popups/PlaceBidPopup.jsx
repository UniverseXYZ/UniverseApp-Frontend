import {useState, useEffect} from 'react';
import { Animated } from 'react-animated-css';
import closeIcon from '../../assets/images/close-menu.svg';
import currencyIcon from '../../assets/images/currency-eth.svg';
import infoIcon from '../../assets/images/icon.svg';
import Button from '../button/Button';

const PlaceBidPopup = ({ onClose, onAuctionTitle, onArtistName }) => {
    const PLACEHOLDER_YOUR_BALANCE = 48.24;
    const PLACEHOLDER_SERVICE__FEE = 0.105;
    const [yourBid, setYourBid] = useState('');
    const [totalBidAmount, setTotalBidAmount] = useState(0);
    const [showServiceFeeInfo, setShowServiceFeeInfo] = useState(false);
    const [showTotalBidAmountInfo, setShowTotalBidAmountInfo] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (val) => {
        if (!val || val.match(/^\d{1,}(\.\d{0,4})?$/)) {
            setYourBid(val);
            if (!val) {
                PLACEHOLDER_SERVICE__FEE ? setTotalBidAmount(PLACEHOLDER_SERVICE__FEE) : setTotalBidAmount(0);
            } else if (!val.endsWith('.')) {
                PLACEHOLDER_SERVICE__FEE ? setTotalBidAmount(PLACEHOLDER_SERVICE__FEE + parseFloat(val)) : setTotalBidAmount(0 + parseFloat(val))
            } 
        }
    }

    const handlePlaceBidClick = () => {
        if (!yourBid) {
            setError('Your bid field is required.');
        } else if (yourBid.endsWith('.')) {
            setError('Incorrect bid amount.');
        } else if (parseFloat(yourBid) > PLACEHOLDER_YOUR_BALANCE) {
            setError('Not enough funds');
        } else {
            setError('');
        }
    }

    useEffect(() => {
        console.log(error)
    }, [error])

    useEffect(() => {
        PLACEHOLDER_SERVICE__FEE ? setTotalBidAmount(PLACEHOLDER_SERVICE__FEE) : setTotalBidAmount(0);
    }, [])

    return (
        <div className='place__bid__popup'>
            <img className='close__popup' onClick={onClose} src={closeIcon} alt='Close' />
            <h1 className='title'>Place a bid</h1>
            <p className='desc'>You are about to place a bid for <b>{onAuctionTitle}</b> by <b>{onArtistName}</b></p>
            <div className='bid__form'>
                <label htmlFor='your-bid'>Your bid</label>
                <input id='your-bid' type='text' placeholder='Enter your bid amount' value={yourBid} onChange={(e) => handleInputChange(e.target.value)} />
                <div className='currency'>
                    <img src={currencyIcon} alt='Currency ETH' />
                    <span>ETH</span>
                </div>
            </div>
            <div className='total'>
                <div className='total_row'>
                    <div className='label'>Your balance</div>
                    <div className='value'>{PLACEHOLDER_YOUR_BALANCE + ' ETH'}</div>
                </div>
                <div className='total_row'>
                    <div className='label' onMouseEnter={() => setShowServiceFeeInfo(true)} onMouseLeave={() => setShowServiceFeeInfo(false)}>
                        <span>Service fee</span>
                        <div className='service__fee'>
                            <img src={infoIcon} alt='Info' />
                            {showServiceFeeInfo &&
                                <Animated animationIn="zoomIn">
                                    <div className='service__fee__info'>We are decentralization maxis and our goal is to empower the creators and community to create, buy and sell digital art in a feeless way.</div>
                                </Animated>
                            }
                        </div>
                    </div>
                    <div className='value'>{PLACEHOLDER_SERVICE__FEE ? PLACEHOLDER_SERVICE__FEE + ' ETH' : 'No fees, boom!'}</div>
                </div>
                <div className='total_row'>
                    <div className='label' onMouseEnter={() => setShowTotalBidAmountInfo(true)} onMouseLeave={() => setShowTotalBidAmountInfo(false)}>
                        <span>Total bid amount</span>
                        <div className='total__bid__amount'>
                            <img src={infoIcon} alt='Info' />
                            {showTotalBidAmountInfo &&
                                <Animated animationIn="zoomIn">
                                    <div className='total__bid__amount__info'>Keep in mind that your funds will be used only if your bid wins a certain tier. If you don't win, you will be able to withdraw your funds by clicking the Withdraw button that will become active after the auction ends.</div>
                                </Animated>
                            }
                        </div>
                    </div>
                    <div className='value'>{totalBidAmount.toString().substring(0,5) + ' ETH'}</div>
                </div>
            </div>
            <div className='place__bid__btn'>
                <Button className='light-button w-100' onClick={handlePlaceBidClick}>Place a bid</Button>
            </div>
        </div>
    )
}

export default PlaceBidPopup;