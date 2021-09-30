import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import arrowDown from '../../../assets/images/arrow-down.svg';
import './WalletPendingDropdown.scss';
import { PLACEHOLDER_MARKETPLACE_NFTS } from '../../../utils/fixtures/BrowseNFTsDummyData';
import mp3Icon from '../../../assets/images/mp3-icon.png';
import leftArrow from '../../../assets/images/marketplace/bundles-left-arrow.svg';
import rightArrow from '../../../assets/images/marketplace/bundles-right-arrow.svg';

const WalletPendingDropdown = () => {
  const [isAccordionOpened, setIsAccordionOpened] = useState(false);
  const [walletPendingDummyData, setWalletPendingDummyData] = useState(
    PLACEHOLDER_MARKETPLACE_NFTS
  );

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
    slidesToShow: walletPendingDummyData.length > 5 ? 1 : walletPendingDummyData.length,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: walletPendingDummyData.length > 4 ? 1 : walletPendingDummyData.length,
        },
      },
      {
        breakpoint: 993,
        settings: {
          slidesToShow: walletPendingDummyData.length > 3 ? 1 : walletPendingDummyData.length,
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
      <div className="box--shadow--effect--block" />
      <div
        className={`accordion__item wallet--pending--section ${isAccordionOpened ? 'opened' : ''}`}
      >
        <div
          className="accordion__item__header"
          onClick={() => setIsAccordionOpened(!isAccordionOpened)}
          aria-hidden="true"
        >
          <h3 className="title">Pending NFTs ({walletPendingDummyData.length})</h3>
          <div className="dropdown__arrow">
            <img src={arrowDown} alt="arrowDown" />
          </div>
        </div>
        <div className={`accordion__item__body ${isAccordionOpened ? 'open' : ''}`}>
          <div className="nfts__list">
            <Slider {...sliderSettings}>
              {walletPendingDummyData.map((nft, idx) => (
                <div className="nft__card" key={nft.id} style={{ width: 160 }}>
                  <span className="tooltiptext">View on Etherscan</span>
                  <div className="nft__card__header">
                    <div className="three__images">
                      <div className="creator--details">
                        <img src={nft.creator.avatar} alt="first" />
                      </div>
                      <div className="collection--details">
                        <img src={nft.collection.avatar} alt="second" />
                      </div>
                      <div className="owner--details">
                        <img src={nft.owner.avatar} alt="last" />
                      </div>
                    </div>
                    <p className="nfts__qantity">
                      {`${nft.numberOfEditions}/${nft.numberOfEditions}`}
                    </p>
                  </div>
                  <div className="nft__card__body">
                    <div className="loading-image">
                      <div className="image__bg__effect" />
                      {nft.media.type &&
                        !nft.media.type.endsWith('mpeg') &&
                        !nft.media.type.endsWith('mp4') && (
                          <img src={nft.media.url} alt={nft.name} />
                        )}
                      {nft.media.type && nft.media.type.endsWith('mp4') && (
                        <video>
                          <source src={nft.media.url} type="video/mp4" />
                          <track kind="captions" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {nft.media.type && nft.media.type.endsWith('mpeg') && (
                        <img className="nft--image" src={mp3Icon} alt={nft.name} />
                      )}
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
                  <div className="nft__card__footer">
                    <h1 className="nft__name">{nft.name}</h1>
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

export default WalletPendingDropdown;
