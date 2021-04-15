import { useState, useEffect, useContext } from 'react';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../utils/fixtures/ActiveAuctionsDummyData';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NotificationManager } from 'react-notifications';
import { Animated } from "react-animated-css";
import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router';
import Popup from "reactjs-popup"
import Slider from "react-slick";
import leftArrow from '../../assets/images/arrow.svg';
import copyIcon from '../../assets/images/copy.svg';
import AppContext from '../../ContextAPI';
import BidRankingsPopup from '../popups/BidRankingsPopup';
import PlaceBidPopup from '../popups/PlaceBidPopup';
import uuid from 'react-uuid';

const AuctionDetails = ({ onAuction }) => {
    const { windowSize, loggedInArtist } = useContext(AppContext);
    const getAllAuctionsForCurrentArtist = PLACEHOLDER_ACTIVE_AUCTIONS.filter(act => act.artist.id === onAuction.artist.id);
    const [selectedAuction, setSelectedAuction] = useState(onAuction);
    const [sliderSettings, setSliderSettings] = useState({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    });
    const [loading, setLoading] = useState(true);
    const [bidders, setBidders] = useState([
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'Whaleshark',
            bid: 10,
            rewardTier: 'Gold',
        },
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'WeirdWoman',
            bid: 24,
            rewardTier: 'Gold',
        },
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'TopBidder',
            bid: 13.5,
            rewardTier: 'Gold',
        },
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'Weird Man',
            bid: 23,
            rewardTier: 'Gold',
        },
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'Weird Man',
            bid: 20,
            rewardTier: 'Gold',
        },
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'Weird Man',
            bid: 40,
            rewardTier: 'Platinum',
        },
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'WeirdWoman',
            bid: 5,
            rewardTier: 'Silver',
        },
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'TopBidder',
            bid: 2,
            rewardTier: 'Silver',
        },
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'Warden',
            bid: 17,
            rewardTier: 'Gold',
        },
        {
            id: uuid(),
            aucionId: selectedAuction.id,
            artistId: uuid(),
            name: 'Weird Man',
            bid: 6.8,
            rewardTier: 'Silver',
        },
    ]);
    const [currentBid, setCurrentBid] = useState(null);
    const [countdown, setCountdown] = useState({
            days: null,
            hours: null,
            minutes: null,
            seconds: null,
        });
    const history = useHistory();

    const convertDate = (date) => {
        let dLeft = Math.abs(new Date(date) - Date.now()) / 1000;
        let daysLeft = Math.floor(dLeft / 86400);
        let hoursLeft = Math.floor(dLeft / 3600) % 24;
        let minutesLeft = Math.floor(dLeft / 60) % 60;
        let secondsLeft = dLeft % 60;
        return `Ends in ${parseInt(daysLeft)}d : ${parseInt(hoursLeft)}h : ${parseInt(minutesLeft)}m : ${parseInt(secondsLeft)}s`;
    } 

    useEffect(() => {
        const interval = setInterval(() => {
            let d = Math.abs(new Date(selectedAuction.endDate) - Date.now()) / 1000;
            let days = Math.floor(d / 86400);
            let hours = Math.floor(d / 3600) % 24;
            let minutes = Math.floor(d / 60) % 60;
            let seconds = d % 60;
            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(interval);
            } else {
                setCountdown({
                    days: Number(days),
                    hours: Number(hours),
                    minutes: Number(minutes),
                    seconds: parseInt(seconds),
                });
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [selectedAuction])

    useEffect(() => {
        const res = bidders.filter(bidder => bidder.artistId === loggedInArtist.id);
        res.length && setCurrentBid(res[res.length-1])
        bidders.sort((a, b) => b.bid - a.bid);
    }, [bidders])

    useEffect(() => {
        // Here need to get Auction details
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [loading])

    useEffect(() => {
        if (windowSize.width >= 993) {
            setSliderSettings({ ...sliderSettings, slidesToShow: 4 });
        }
        if (windowSize.width < 993) {
            setSliderSettings({ ...sliderSettings, slidesToShow: 3 });
        }
        if (windowSize.width < 768) {
            setSliderSettings({ ...sliderSettings, slidesToShow: 2 });
        }
        if (windowSize.width < 576) {
            setSliderSettings({ ...sliderSettings, slidesToShow: 1 });
        }
    }, [windowSize])

    useEffect(() => {
        // Prev Icon
        const prev = document.querySelector('.slick-prev');
        if (prev) {
            const prevIcon = document.createElement('img');
            prevIcon.src = leftArrow;
            prev.innerHTML = '';
            prev.appendChild(prevIcon)
        }

        // Next icon
        const next = document.querySelector('.slick-next');
        if (next) {
            const nextIcon = document.createElement('img');
            nextIcon.src = leftArrow;
            next.innerHTML = '';
            next.appendChild(nextIcon)
        }
    }, [])

    return (
        <div className='auction__details__section' style={{ background: selectedAuction.background ? `url(${selectedAuction.background})` : '#F8FBFF' }}>
            <div className='auction__details__section__container'>
                {getAllAuctionsForCurrentArtist.length && getAllAuctionsForCurrentArtist.length > 1 ?
                    <Slider {...sliderSettings}>
                        {getAllAuctionsForCurrentArtist.map(act => {
                            return (
                                <div key={act.id} className={`carousel__auction__container ${selectedAuction.id === act.id ? 'selected' : ''}`} onClick={() => { setSelectedAuction(act); setLoading(true); { history.push(`/${act.artist.name.split(' ')[1]}/${act.title}`, {id: act.id}) } }}>
                                    <div className='carousel__auction' style={{ border: selectedAuction.background ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)' }}>
                                        <div className='carousel__auction__image'>
                                            <img src={act.image} alt={act.title} />
                                        </div>
                                        <div className='carousel__auction__info'>
                                            <h4 style={{ color: selectedAuction.background ? '#fff' : '#000' }}>{act.title}</h4>
                                            <p style={{ color: selectedAuction.background ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}>
                                                {convertDate(act.endDate)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                    : <></>
                }
                {!loading ?
                    <Animated animationIn="zoomIn" key={selectedAuction.id}>
                        <div className='auction__details__box'>
                            <div className='auction__details__box__image'>
                                <img src={selectedAuction.image} />
                            </div>
                            <div className='auction__details__box__info'>
                                <h1 className='title'>{selectedAuction.title}</h1>
                                <div className='artist__details'>
                                    <img src={selectedAuction.artist.avatar} alt={selectedAuction.artist.name} />
                                    <span>by</span>
                                    <button onClick={() => history.push(`/${selectedAuction.artist.name.split(' ')[1]}`, { id: selectedAuction.artist.id })}>{selectedAuction.artist.name}</button>
                                </div>
                                <div className='auction__ends__in'>
                                    <div className='auction__ends__in__label'>
                                        <label>Auction ends in: </label>
                                        <div className='time'>
                                            <div className='days'>{countdown.days + 'd'}</div><span>:</span>
                                            <div className='hours'>{countdown.hours + 'h'}</div><span>:</span>
                                            <div className='minutes'>{countdown.minutes + 'm'}</div><span>:</span>
                                            <div className='seconds'>{countdown.seconds + 's'}</div>
                                        </div>
                                    </div>
                                    <CopyToClipboard text={window.location.href} onCopy={() => NotificationManager.success('Copied!')}>
                                        <div className='copy__to__clipboard'>
                                            <img src={copyIcon} alt='Copy to clipboard' />
                                            <span>Copy URL</span>
                                        </div>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className='auction__details__box__top__bidders'>
                                <div className='auction__details__box__top__bidders__header'>
                                    <h2 className='title'>Top 10 bidders</h2>
                                    <Popup
                                        trigger={<button className='view__all__bids'>View all bids</button>}
                                    >
                                        {
                                            (close) => (
                                                <BidRankingsPopup onClose={close} onBidders={bidders}  />
                                            )
                                        }
                                    </Popup>
                                </div>
                                <div className='auction__details__box__top__bidders__content'>
                                    <div className='ten__bidders__left'>
                                        {bidders.map((bidder, index) => {
                                            return index < 5 && (
                                                <div className='bidder' key={bidder.id}>
                                                    <div className='name'>
                                                        <b>{index + 1 +'.'}</b>
                                                        {bidder.name}
                                                        <span className={bidder.rewardTier.toLocaleLowerCase()}>{bidder.rewardTier}</span>
                                                    </div>
                                                    <div className='bid'>{'Ξ' + bidder.bid}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='ten__bidders__right'>
                                        {bidders.map((bidder, index) => {
                                            return index >= 5 && index < 10 && (
                                                <div className='bidder' key={bidder.id}>
                                                    <div className='name'>
                                                        <b>{index + 1+'.'}</b>
                                                        {bidder.name}
                                                        <span className={bidder.rewardTier.toLocaleLowerCase()}>{bidder.rewardTier}</span>
                                                    </div>
                                                    <div className='bid'>{'Ξ' + bidder.bid}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='auction__details__box__top__bidders__footer'>
                                    <div className='your__bid'>
                                        {!currentBid ? 
                                            <span className='no__bids'>You haven’t any bids yet</span> :
                                            <span className='your__current__bid'>
                                                <b>{`Your bid: Ξ${currentBid.bid} `}</b>
                                                {`(#${bidders.findIndex(x => (x.artistId == currentBid.artistId) && (x.bid == currentBid.bid)) + 1} in the list)`}
                                            </span>
                                        }
                                    </div>
                                    <div className='place__bid'>
                                        <Popup
                                            trigger={<button className='light-button'>Place a bid</button>}
                                        >
                                            {
                                                (close) => (
                                                    <PlaceBidPopup
                                                        onClose={close}
                                                        onAuctionId={selectedAuction.id}
                                                        onAuctionTitle={selectedAuction.title}
                                                        onArtistName={selectedAuction.artist.name}
                                                        onBidders={bidders}
                                                        onSetBidders={setBidders}
                                                    />
                                                )
                                            }
                                        </Popup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Animated> :
                    <div className='auction__details__box'>
                        <div className='auction__details__box__image'>
                            <Skeleton height={windowSize.width > 768 ? 445 : 335} />
                        </div>
                        <div className='auction__details__box__info'>
                            <h1 className='title'><Skeleton width={200} /></h1>
                            <div className='artist__details'>
                                <Skeleton width={30} height={30} circle={true} />
                                <Skeleton width={150} />
                            </div>
                            <div className='auction__ends__in'>
                                <div className='auction__ends__in__label'>
                                    <Skeleton width={200} />
                                </div>
                                <Skeleton width={100} />
                            </div>
                        </div>
                        <div className='auction__details__box__top__bidders'>
                            <div className='auction__details__box__top__bidders__header'>
                                <h2 className='title'><Skeleton width={100} /></h2>
                                <button className='view__all__bids'><Skeleton width={100} /></button>
                            </div>
                            <div className='auction__details__box__top__bidders__content'>
                                <div className='ten__bidders__left'>
                                    {bidders.map((bidder, index) => {
                                        return index < 5 && (
                                            <div className='bidder' key={bidder.id}>
                                                <div className='name'><Skeleton width={90} /></div>
                                                <div className='bid'><Skeleton width={40} /></div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='ten__bidders__right'>
                                    {bidders.map((bidder, index) => {
                                        return index >= 5 && index < 10 && (
                                            <div className='bidder' key={bidder.id}>
                                                <div className='name'><Skeleton width={90} /></div>
                                                <div className='bid'><Skeleton width={40} /></div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='auction__details__box__top__bidders__footer'>
                                <div className='your__bid'>
                                    <Skeleton width={windowSize.width > 576 && 100} />
                                </div>
                                <div className='place__bid'>
                                    <Skeleton width={windowSize.width > 576 && 100} height={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default AuctionDetails;