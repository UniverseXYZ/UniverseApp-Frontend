import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import Button from '../button/Button';
import universeIcon from '../../assets/images/universe-img.svg';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';

const ApproveCollection = ({
  collection,
  approveCollection,
  isApproved,
  isApproving,
  auctionOnChainId,
}) => (
  // TODO: Add image blur condtion from auction.backgroundImageBlur prop
  <div className="collection__div" key={collection.address}>
    {collection.address === process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
      <img src={universeIcon} alt={collection?.name} />
    ) : collection.coverUrl ? (
      <img src={collection.coverUrl} alt={collection?.name} />
    ) : (
      !collection.coverUrl && (
        <div
          className="random__bg__color"
          style={{ backgroundColor: getCollectionBackgroundColor(collection) }}
        />
      )
    )}
    <div>
      <h3>{collection.name}</h3>
      {!isApproving ? (
        <Button
          className={`${isApproving ? 'light-border-button' : 'light-button'} approve-btn`}
          disabled={isApproved || !auctionOnChainId}
          onClick={() => approveCollection(collection.address)}
        >
          {isApproved ? (
            <>
              Approved
              <img src={completedCheckmark} className="checkmark" alt="Approved" />
            </>
          ) : (
            'Approve'
          )}
        </Button>
      ) : (
        <div className="loading-ring">
          <div className="lds-roller">
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
      )}
    </div>
  </div>
);
ApproveCollection.propTypes = {
  collection: PropTypes.oneOfType([PropTypes.object]).isRequired,
  approveCollection: PropTypes.func.isRequired,
  isApproved: PropTypes.bool.isRequired,
  isApproving: PropTypes.bool.isRequired,
  auctionOnChainId: PropTypes.number.isRequired,
};

export default ApproveCollection;
