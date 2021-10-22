import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './CollectionCardSkeleton.scss';

const CollectionCardSkeleton = () => (
  <div className="saved__collection__skeleton__box">
    <div className="saved__collection__skeleton__box__header">
      <Skeleton className="random__bg__color" />
    </div>
    <div className="saved__collection__skeleton__box__body">
      <Skeleton className="collection__avatar" />
      <div className="collection__name">
        <Skeleton width={120} height={20} />
        <p>
          <Skeleton width={80} height={12} />
        </p>
      </div>
    </div>
  </div>
);

export default CollectionCardSkeleton;
