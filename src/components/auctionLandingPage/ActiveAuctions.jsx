import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import ActiveAuctionCard from './ActiveAuctionCard';

const ActiveAuctions = ({ mainAuction }) => {
  const [sliderSettings, setSliderSettings] = useState({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1200) {
        setSliderSettings({ ...sliderSettings, slidesToShow: 3 });
      }
      if (window.innerWidth < 993) {
        setSliderSettings({ ...sliderSettings, slidesToShow: 2 });
      }
      if (window.innerWidth < 576) {
        setSliderSettings({ ...sliderSettings, slidesToShow: 1 });
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Slider {...sliderSettings}>
      {mainAuction?.moreActiveAuctions?.map((auction) => (
        <ActiveAuctionCard auction={auction} mainAuction={mainAuction} />
      ))}
    </Slider>
  );
};
ActiveAuctions.propTypes = {
  mainAuction: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default ActiveAuctions;
