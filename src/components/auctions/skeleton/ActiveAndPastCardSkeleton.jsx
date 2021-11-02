import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './ActiveAndPastCardSkeleton.scss';

const ActiveAndPastCardSkeleton = () => (
  <div className=" active-past-auction-skeleton">
    <Skeleton className="active-left-border-effect" />
    <div className="auction-header">
      <Skeleton className="img_head" />
      <div className="launch-auction">
        <Skeleton width={195} height={42} className="desktop-button" />
        <Skeleton width={42} height={42} className="arrow" style={{ border: 'none' }} />
      </div>
    </div>
    <div className="mobile-button">
      <Skeleton height={42} style={{ borderRadius: '12px' }} />
    </div>
    <div className="auctions-launch-dates">
      <Skeleton width={158} height={33} style={{ borderRadius: '30px' }} className="total-dates" />
      <Skeleton width={158} height={33} style={{ borderRadius: '30px' }} className="total-dates" />
      <Skeleton width={158} height={33} style={{ borderRadius: '30px' }} className="total-dates" />
    </div>
    <div className="bid_info">
      <div className="total-bids">
        <Skeleton width={40} height={12} style={{ borderRadius: '12px' }} className="head" />
        <Skeleton width={90} height={20} style={{ borderRadius: '12px' }} className="value" />
      </div>
      <div className="total-bids">
        <Skeleton width={40} height={12} style={{ borderRadius: '12px' }} className="head" />
        <Skeleton width={90} height={20} style={{ borderRadius: '12px' }} className="value" />
      </div>
      <div className="total-bids">
        <Skeleton width={40} height={12} style={{ borderRadius: '12px' }} className="head" />
        <Skeleton width={90} height={20} style={{ borderRadius: '12px' }} className="value" />
      </div>
      <div className="total-bids">
        <Skeleton width={40} height={12} style={{ borderRadius: '12px' }} className="head" />
        <Skeleton width={90} height={20} style={{ borderRadius: '12px' }} className="value" />
      </div>
    </div>
  </div>
);

export default ActiveAndPastCardSkeleton;
