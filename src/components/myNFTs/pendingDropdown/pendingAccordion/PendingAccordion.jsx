import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import arrowDown from '../../../../assets/images/arrow-down.svg';
import PendingNextArrow from '../misc/PendingNextArrow';
import PendingPrevArrow from '../misc/PendingPrevArrow';
// import './PendingAccordion.scss';

const PendingAccordion = ({ title, dataLength, children }) => {
  const [isAccordionOpened, setIsAccordionOpened] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: dataLength > 5 ? 1 : dataLength,
    slidesToScroll: 1,
    nextArrow: <PendingNextArrow />,
    prevArrow: <PendingPrevArrow />,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: dataLength > 4 ? 1 : dataLength,
        },
      },
      {
        breakpoint: 993,
        settings: {
          slidesToShow: dataLength > 3 ? 1 : dataLength,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="accordion">
      <div className="box--shadow--effect--block" />
      <div className={`accordion__item pending--section ${isAccordionOpened ? 'opened' : ''}`}>
        <div
          className="accordion__item__header"
          onClick={() => setIsAccordionOpened(!isAccordionOpened)}
          aria-hidden="true"
        >
          <h3 className="title">{`${title} (${dataLength})`}</h3>
          <div className="dropdown__arrow">
            <img src={arrowDown} alt="arrowDown" />
          </div>
        </div>
        <div className={`accordion__item__body ${isAccordionOpened ? 'open' : ''}`}>
          {isAccordionOpened ? (
            <div className="nfts__list collections__list">
              <Slider {...sliderSettings}>{children}</Slider>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

PendingAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  dataLength: PropTypes.number.isRequired,
};

export default PendingAccordion;
