import { useState } from 'react';
import { PLACEHOLDER_ACTIVE_AUCTIONS } from '../../utils/fixtures/ActiveAuctionsDummyData';
import Slider from "react-slick";

const AuctionDetails = ({ auction }) => {
    const getAllAuctionsForCurrentArtist = PLACEHOLDER_ACTIVE_AUCTIONS.filter(act => act.artist.id === auction.artist.id);
    const [selectedAuction, setSelectedAuction] = useState(auction);
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <div className='auction__details__section' style={{ backgroundImage: `url(${selectedAuction.background})` }}>
            <div className='auction__details__section__container'>
                {getAllAuctionsForCurrentArtist.length ?
                    <Slider {...settings}>
                        {getAllAuctionsForCurrentArtist.map(act => {
                            return (
                                <div key={act.id} className={`carousel__auction__container ${selectedAuction.id === act.id ? 'selected' : ''}`} onClick={() => setSelectedAuction(act)}>
                                    <div className='carousel__auction'>
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
                <h1>{selectedAuction.title}</h1>
            </div>
        </div>
    )
}

export default AuctionDetails;