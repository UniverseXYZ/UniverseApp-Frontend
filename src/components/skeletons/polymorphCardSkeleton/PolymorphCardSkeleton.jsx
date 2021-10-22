import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './PolymorphCardSkeleton.scss';

const PolymorphCardSkeleton = () => (
  <div className="polymorph--card--skeleton">
    <div className="polymorph--card--skeleton--header">
      <div className="card--number">
        <Skeleton width={20} height={12} />
      </div>
      <div className="card--price">
        <Skeleton width={114} height={20} />
      </div>
    </div>
    <Skeleton className="polymorph--card--skeleton--body" />
    <div className="polymorph--card--skeleton--footer">
      <Skeleton width={114} height={20} />
      <Skeleton width={50} height={12} />
    </div>
  </div>
);

export default PolymorphCardSkeleton;
