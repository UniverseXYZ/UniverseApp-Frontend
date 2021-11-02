import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './FutureCardSkeleton.scss';

const FutureCardSkeleton = () => (
  <div className=" future-auction-skeleton">
    <Skeleton className="active-left-border-effect" />
    <div className="auction-header">
      <Skeleton className="img_head" />
      <div className="launch-auction">
        <Skeleton width={42} height={42} className="arrow" style={{ border: 'none' }} />
      </div>
    </div>
    <div className="auctions-launch-dates">
      <Skeleton width={158} height={33} style={{ borderRadius: '30px' }} className="total-dates" />
      <Skeleton width={158} height={33} style={{ borderRadius: '30px' }} className="total-dates" />
      <Skeleton width={158} height={33} style={{ borderRadius: '30px' }} className="total-dates" />
    </div>
    <div className="auctions-steps-skeleton">
      <div className="step-1">
        <Skeleton width={51} height={12} style={{ borderRadius: '12px' }} />
        <Skeleton width={120} height={16} style={{ borderRadius: '12px' }} />
        <div className="circle">
          <Skeleton circle width={20} height={20} />
          <Skeleton className="hz-line1" />
        </div>
        <Skeleton width={83} height={42} style={{ borderRadius: '12px' }} />
      </div>
      <div className="step-2">
        <Skeleton width={51} height={12} style={{ borderRadius: '12px' }} />
        <Skeleton width={120} height={16} style={{ borderRadius: '12px' }} />
        <div className="circle">
          <Skeleton circle width={20} height={20} />
          <Skeleton className="hz-line2" />
        </div>
        <Skeleton width={83} height={42} style={{ borderRadius: '12px' }} />
      </div>
      <div className="step-3">
        <Skeleton width={51} height={12} style={{ borderRadius: '12px' }} />
        <Skeleton width={120} height={16} style={{ borderRadius: '12px' }} />
        <div className="circle">
          <Skeleton circle width={20} height={20} />
        </div>
        <Skeleton width={83} height={42} style={{ borderRadius: '12px' }} />
      </div>
    </div>
    <div className="auction-steps-skeleton-mobile">
      <div className="auction-steps-moves">
        <div className="circle">
          <Skeleton circle width={20} height={20} />
        </div>
        <Skeleton className="hz-line1" />
        <div className="circle">
          <Skeleton circle width={20} height={20} />
        </div>
        <Skeleton className="hz-line2" />
        <div className="circle">
          <Skeleton circle width={20} height={20} />
        </div>
      </div>
      <div className="steps">
        <div className="step-1">
          <Skeleton width={51} height={12} style={{ borderRadius: '12px' }} />
          <Skeleton width={120} height={16} style={{ borderRadius: '12px' }} />
          <Skeleton height={42} className="skeleton-button" style={{ borderRadius: '12px' }} />
        </div>
        <div className="step-2">
          <Skeleton width={51} height={12} style={{ borderRadius: '12px' }} />
          <Skeleton width={120} height={16} style={{ borderRadius: '12px' }} />
          <Skeleton height={42} className="skeleton-button" style={{ borderRadius: '12px' }} />
        </div>
        <div className="step-3">
          <Skeleton width={51} height={12} style={{ borderRadius: '12px' }} />
          <Skeleton width={120} height={16} style={{ borderRadius: '12px' }} />
          <Skeleton height={42} className="skeleton-button" style={{ borderRadius: '12px' }} />
        </div>
      </div>
    </div>
  </div>
);

export default FutureCardSkeleton;
