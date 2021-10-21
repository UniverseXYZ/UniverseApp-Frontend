import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import './AuctionsCardSkeleton.scss';

const AuctionsCardSkeleton = ({ variant }) => (
  <div className="active__auction__item">
    <Skeleton className="active__auction__image" />
    <div className="active__auction__details">
      <div className="title">
        <h2>
          <Skeleton height={20} width={240} style={{ borderRadius: '12px' }} />
        </h2>
      </div>
      <div className="creator">
        <Skeleton circle height={30} width={30} />
        <a>
          <Skeleton height={12} width={90} style={{ borderRadius: '12px' }} />
        </a>
      </div>
      <div className="statistics">
        <div>
          <label>
            <Skeleton height={12} width={97} style={{ borderRadius: '12px' }} />
          </label>
          <p>
            <Skeleton height={20} width={40} style={{ borderRadius: '12px' }} />
          </p>
        </div>
        <div>
          <label>
            <Skeleton height={12} width={97} style={{ borderRadius: '12px' }} />
          </label>
          <p>
            <Skeleton height={20} width={40} style={{ borderRadius: '12px' }} />
          </p>
        </div>
        {variant === 'active' || variant === 'past' ? (
          <>
            <div>
              <label>
                <Skeleton height={12} width={97} style={{ borderRadius: '12px' }} />
              </label>
              <p>
                <Skeleton height={20} width={40} style={{ borderRadius: '12px' }} />
              </p>
            </div>
            <div>
              <label>
                <Skeleton height={12} width={97} style={{ borderRadius: '12px' }} />
              </label>
              <p>
                <Skeleton height={20} width={40} style={{ borderRadius: '12px' }} />
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {variant === 'active' ? (
        <Skeleton className="view--auction--btn" height={42} style={{ borderRadius: '12px' }} />
      ) : (
        <></>
      )}
    </div>
  </div>
);

AuctionsCardSkeleton.propTypes = {
  variant: PropTypes.string,
};

AuctionsCardSkeleton.defaultProps = {
  variant: 'active', // active, future, past
};

export default AuctionsCardSkeleton;
