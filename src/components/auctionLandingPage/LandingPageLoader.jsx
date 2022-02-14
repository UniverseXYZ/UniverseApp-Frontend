import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const LandingPageLoader = () => (
  <div className="auction__details__box">
    <div className="auction__details__box__image">
      <Skeleton height={window.innerWidth > 768 ? 445 : 335} />
    </div>
    <div className="auction__details__box__info">
      <h1 className="title">
        <Skeleton width={200} />
      </h1>
      <div className="artist__details">
        <Skeleton width={30} height={30} circle />
        <Skeleton width={150} />
      </div>
      <div className="auction__ends__in">
        <div className="auction__ends__in__label">
          <Skeleton width={200} />
        </div>
        <Skeleton width={100} />
      </div>
    </div>
    <div className="auction__details__box__top__bidders">
      <div className="auction__details__box__top__bidders__header">
        <h2 className="title">
          <Skeleton width={100} />
        </h2>
        <button type="button" className="view__all__bids">
          <Skeleton width={100} />
        </button>
      </div>
      <div className="auction__details__box__top__bidders__content">
        <div className="ten__bidders__left">
          {[...Array.from(5)].map((number) => (
            <div className="bidder" key={number}>
              <div className="name">
                <Skeleton width={90} />
              </div>
              <div className="bid">
                <Skeleton width={40} />
              </div>
            </div>
          ))}
        </div>
        <div className="ten__bidders__right">
          {[...Array.from(5)].map((number) => (
            <div className="bidder" key={number.id}>
              <div className="name">
                <Skeleton width={90} />
              </div>
              <div className="bid">
                <Skeleton width={40} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="auction__details__box__top__bidders__footer">
        <div className="your__bid">
          <Skeleton width={window.innerWidth > 576 && 100} />
        </div>
        <div className="place__bid">
          <Skeleton width={window.innerWidth > 576 && 100} height={40} />
        </div>
      </div>
    </div>
  </div>
);
