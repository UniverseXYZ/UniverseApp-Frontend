import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import arrowDown from '../../../assets/images/arrow-down.svg';
import './CollectionPendingDropdown.scss';
import leftArrow from '../../../assets/images/marketplace/bundles-left-arrow.svg';
import rightArrow from '../../../assets/images/marketplace/bundles-right-arrow.svg';

const CollectionPendingDropdown = ({ data }) => {
  const [isAccordionOpened, setIsAccordionOpened] = useState(false);

  function SampleNextArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className={className}
        style={{ ...style }}
        onClick={onClick}
        aria-hidden="true"
      >
        <img src={rightArrow} alt="arrow right" />
      </button>
    );
  }

  function SamplePrevArrow(props) {
    // eslint-disable-next-line react/prop-types
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className={className}
        style={{ ...style }}
        onClick={onClick}
        aria-hidden="true"
      >
        <img src={leftArrow} alt="arrow left" />
      </button>
    );
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: data.length > 5 ? 1 : data.length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: data.length > 4 ? 1 : data.length,
        },
      },
      {
        breakpoint: 993,
        settings: {
          slidesToShow: data.length > 3 ? 1 : data.length,
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

  useEffect(() => {
    setTimeout(() => {
      if (document.querySelectorAll('.accordion__item__body')) {
        const elems = document.querySelectorAll('.accordion__item__body');
        elems.forEach((el, i) => {
          el.style.animationDuration = '.5s';
        });
      }
    }, 500);
  }, []);
  return (
    <div className="accordion">
      <div
        className={`accordion__item collection--pending--section ${
          isAccordionOpened ? 'opened' : ''
        }`}
      >
        <div
          className="accordion__item__header"
          onClick={() => setIsAccordionOpened(!isAccordionOpened)}
          aria-hidden="true"
        >
          <h3 className="title">Pending collections ({data.length})</h3>
          <div className="dropdown__arrow">
            <img src={arrowDown} alt="arrowDown" />
          </div>
        </div>
        <div className={`accordion__item__body ${isAccordionOpened ? 'open' : ''}`}>
          <div className="collections__list">
            <Slider {...sliderSettings}>
              {data.map((coll, idx) => (
                <div className="collection__card" key={coll.id} style={{ width: 160 }}>
                  <span className="tooltiptext">View on Etherscan</span>
                  <div className="collection__card__body">
                    <div className="loading-image">
                      <div className="image__bg__effect" />
                      <img src={coll.coverURL} alt={coll.name} />
                      <div className="card-lds-roller">
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                      </div>
                    </div>
                  </div>
                  <div className="collection__card__footer">
                    <h1 className="collection__name">
                      {coll.name.length > 15 ? `${coll.name.substring(0, 15)}...` : coll.name}
                    </h1>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

CollectionPendingDropdown.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default CollectionPendingDropdown;
