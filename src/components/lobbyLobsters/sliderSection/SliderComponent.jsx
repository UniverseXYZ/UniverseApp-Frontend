import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import sliderImage1 from '../../../assets/images/lobby-lobsters/1.png';
import sliderImage2 from '../../../assets/images/lobby-lobsters/2.png';
import sliderImage3 from '../../../assets/images/lobby-lobsters/3.png';
import sliderImage4 from '../../../assets/images/lobby-lobsters/4.png';
import sliderImage5 from '../../../assets/images/lobby-lobsters/5.png';
import sliderImage6 from '../../../assets/images/lobby-lobsters/6.png';
import sliderImage7 from '../../../assets/images/lobby-lobsters/7.png';
import sliderImage8 from '../../../assets/images/lobby-lobsters/8.png';
import sliderImage9 from '../../../assets/images/lobby-lobsters/9.png';
import sliderImage10 from '../../../assets/images/lobby-lobsters/10.png';
import { useWindowSize } from 'react-use';

const SliderComponent = () => {
  const [sliderWidth, setSliderWidth] = useState(200);
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 8000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    variableWidth: true,
  };
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width < 768) {
      setSliderWidth(140);
    } else {
      setSliderWidth(200);
    }
  }, [windowSize]);

  return (
    <div style={{ pointerEvents: 'none' }}>
      <Slider {...settings}>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage1} alt="Slider 1" />
        </div>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage2} alt="Slider 2" />
        </div>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage3} alt="Slider 3" />
        </div>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage4} alt="Slider 4" />
        </div>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage5} alt="Slider 5" />
        </div>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage6} alt="Slider 6" />
        </div>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage7} alt="Slider 7" />
        </div>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage8} alt="Slider 8" />
        </div>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage9} alt="Slider 9" />
        </div>
        <div style={{ width: sliderWidth }}>
          <img src={sliderImage10} alt="Slider 10" />
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
