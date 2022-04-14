import React from 'react';
import Skeleton from 'react-loading-skeleton';
// import './NftCardSkeleton.scss';

const NftCardSkeleton = () => (
  <div className="nft--card--skeleton">
    <div className="nft--card--skeleton--header">
      <div className="three--images">
        <div className="creator--details">
          <Skeleton width={26} height={26} circle />
        </div>
        <div className="collection--details">
          <Skeleton width={26} height={26} circle />
        </div>
        <div className="owner--details">
          <Skeleton width={26} height={26} circle />
        </div>
      </div>
      <div className="likes--count">
        <Skeleton width={30} height={12} />
      </div>
    </div>
    <div className="nft--card--skeleton--body">
      <Skeleton width={231} height={231} />
    </div>
    <div className="nft--card--skeleton--footer">
      <div className="name--and--price">
        <h4>
          <Skeleton width={120} height={20} />
        </h4>
        <div className="price--div">
          <Skeleton width={40} height={20} />
        </div>
      </div>
      <div className="quantity--and--offer">
        <div className="editions">
          <Skeleton width={30} height={12} />
        </div>
        <div className="price--offer--div">
          <Skeleton width={80} height={12} />
        </div>
      </div>
    </div>
  </div>
);

export default NftCardSkeleton;
