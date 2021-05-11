import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import Skeleton from 'react-loading-skeleton';
import twitterIcon from '../../assets/images/icons_twitter.svg';
import instagramIcon from '../../assets/images/instagram-outlined.svg';

const AuctionOwnerDetails = ({ artist }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('ssssss', artist);
    // Here need to get artist details
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="artist__details__section">
      {!loading ? (
        <AnimatedOnScroll animationIn="zoomIn">
          <div className="artist__details__section__container">
            <div className="avatar">
              <img src={URL.createObjectURL(artist.avatar)} alt={artist.name} />
              <h2 className="show__on__mobile">{artist.name}</h2>
            </div>
            <div className="info">
              <h1 className="title">{`About ${artist.name}`}</h1>
              <p className="desc">{artist.about}</p>
              <div className="social__links">
                <a
                  href={`https://www.instagram.com/${artist.instagramLink}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={instagramIcon} alt="Instagram" />
                </a>
                <a
                  href={`https://twitter.com/${artist.twitterLink}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={twitterIcon} alt="Twitter" />
                </a>
              </div>
            </div>
          </div>
        </AnimatedOnScroll>
      ) : (
        <div className="artist__details__section__container">
          <div className="avatar">
            <Skeleton
              height={window.screen.width > 576 ? 280 : 90}
              width={window.screen.width > 576 ? 280 : 90}
              circle
            />
            <h2 className="show__on__mobile">
              <Skeleton width={200} />
            </h2>
          </div>
          <div className="info">
            <h1 className="title">
              <Skeleton width={200} />
            </h1>
            <p className="desc">
              <Skeleton height={200} />
            </p>
            <div className="social__links">
              <Skeleton width={300} height={50} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

AuctionOwnerDetails.propTypes = {
  artist: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default AuctionOwnerDetails;
