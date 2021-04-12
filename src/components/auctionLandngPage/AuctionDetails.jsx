import { useState, useEffect } from 'react';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../utils/fixtures/ActiveAuctionsDummyData';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NotificationManager } from 'react-notifications';
import {Animated} from "react-animated-css";
import { useHistory } from 'react-router';
import Slider from "react-slick";
import leftArrow from '../../assets/images/arrow.svg';
import copyIcon from '../../assets/images/copy.svg';
import Button from '../button/Button';

const AuctionDetails = ({ auction }) => {
    const getAllAuctionsForCurrentArtist = PLACEHOLDER_ACTIVE_AUCTIONS.filter(act => act.artist.id === auction.artist.id);
    const [selectedAuction, setSelectedAuction] = useState(auction);
    const history = useHistory();
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

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
        <div className='auction__details__section' style={{ backgroundImage: `url(${selectedAuction.background})` }}>
            <div className='auction__details__section__container'>
                {getAllAuctionsForCurrentArtist.length && getAllAuctionsForCurrentArtist.length > 1 ?
                    <Slider {...settings}>
                        {getAllAuctionsForCurrentArtist.map(act => {
                            return (
                                <div key={act.id} className={`carousel__auction__container ${selectedAuction.id === act.id ? 'selected' : ''}`} onClick={() => setSelectedAuction(act)}>
                                    <div className='carousel__auction' style={{ border: selectedAuction.background ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.2)' }}>
                                        <div className='carousel__auction__image'>
                                            <img src={act.image} alt={act.title} />
                                        </div>
                                        <div className='carousel__auction__info'>
                                            <h4 style={{ color: selectedAuction.background ? '#fff' : '#000' }}>{act.title}</h4>
                                            <p style={{ color: selectedAuction.background ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)' }}>{act.timeLeft}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                    : <></>
                }
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
                                <button onClick={() => history.push(`/${selectedAuction.artist.name.split(' ')[1]}`, {id: selectedAuction.artist.id})}>{selectedAuction.artist.name}</button>
                            </div>
                            <div className='auction__ends__in'>
                                <label>Auction ends in: </label>
                                <div className='time'>
                                    <div className='days'>{selectedAuction.timeLeft.split(':')[0]}</div><span>:</span>
                                    <div className='hours'>{selectedAuction.timeLeft.split(':')[1]}</div><span>:</span>
                                    <div className='minutes'>{selectedAuction.timeLeft.split(':')[2]}</div><span>:</span>
                                    <div className='seconds'>{selectedAuction.timeLeft.split(':')[3]}</div>
                                </div>
                                <CopyToClipboard text={window.location.href} onCopy={() => NotificationManager.success('Copied!')}>
                                    <div className='copy__to__clipboard'>
                                        <img src={copyIcon} alt='Copy to clipboard' />
                                        <span>Copy URL</span>
                                    </div>
                                </CopyToClipboard>
                            </div>
                            <div className='top__bidders'>
                                <div className='top__bidders__header'>
                                    <h2 className='title'>Top 10 bidders</h2>
                                    <button className='view__all__bids'>View all bids</button>
                                </div>
                                <div className='top__bidders__content'>
                                    <div className='ten__bidders__left'>
                                        {selectedAuction.bidders.map((bidder, index) => {
                                            return index < 5 && (
                                                    <div className='bidder' key={bidder.id}>
                                                        <div className='name'><b>{index + 1}</b> {bidder.name}</div>
                                                        <div className='bid'>{'Ξ' + bidder.bid}</div>
                                                    </div>
                                            )
                                        })}
                                    </div>
                                    <div className='ten__bidders__right'>
                                        {selectedAuction.bidders.map((bidder, index) => {
                                            return index >= 5 && index < 10 && (
                                                    <div className='bidder' key={bidder.id}>
                                                        <div className='name'><b>{index + 1}</b> {bidder.name}</div>
                                                        <div className='bid'>{'Ξ' + bidder.bid}</div>
                                                    </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='top__bidders__footer'>
                                    <div className='your__bid'>
                                        <span className='no__bids'>You haven’t any bids yet</span>
                                    </div>
                                    <div className='place__bid'>
                                        <Button className='light-button'>Place a bid</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Animated>
            </div>
        </div>
    )
}

export default AuctionDetails;