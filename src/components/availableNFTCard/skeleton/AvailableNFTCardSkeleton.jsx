import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './AvailableNFTCardSkeleton.scss';

const AvailableNFTCardSkeleton = () => (
  <div className="nft--card--skeleton">
    <Skeleton className="nft--card--skeleton--body" />
    <div className="nft--card--skeleton--footer">
      <div className="nft--name">
        <h4>
          <Skeleton width={160} height={20} style={{ borderRadius: '12px' }} />
        </h4>
      </div>
      <div className="collection--details">
        <Skeleton width={20} height={20} circle />
        <Skeleton width={79} height={12} style={{ marginLeft: '6px', marginTop: '6px' }} />
      </div>
    </div>
  </div>
);

export default AvailableNFTCardSkeleton;
