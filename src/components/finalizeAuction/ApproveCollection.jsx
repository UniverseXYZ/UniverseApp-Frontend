import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { getCollectionBackgroundColor } from '../../utils/helpers';
import Button from '../button/Button';
import universeIcon from '../../assets/images/universe-img.svg';
import completedCheckmark from '../../assets/images/completedCheckmark.svg';

const ApproveCollection = ({ collection, approveCollection, isApproved, auctionOnChainId }) => {
  const [isApproving, setIsApproving] = useState(false);
  // TODO: Add image blur condtion from auction.backgroundImageBlur prop
  return (
    <div className="collection__div" key={uuid()}>
      {collection.address === process.env.REACT_APP_UNIVERSE_ERC_721_ADDRESS.toLowerCase() ? (
        <img src={universeIcon} alt={collection?.name} />
      ) : collection.bgImage ? (
        <img src={URL.createObjectURL(collection.bgImage)} alt={collection?.name} />
      ) : !collection.previewImage ? (
        <div
          className="random__bg__color"
          style={{ backgroundColor: getCollectionBackgroundColor(collection) }}
        />
      ) : (
        <img
          className="blur"
          src={URL.createObjectURL(collection.previewImage)}
          alt={collection?.name}
        />
      )}
      <div>
        <h3>{collection.name}</h3>
        {!isApproving ? (
          <Button
            className={`${isApproving ? 'light-border-button' : 'light-button'} approve-btn`}
            disabled={isApproved || !auctionOnChainId}
            onClick={() => approveCollection(collection.address, setIsApproving)}
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
};

ApproveCollection.propTypes = {
  collection: PropTypes.oneOfType([PropTypes.object]).isRequired,
  approveCollection: PropTypes.func.isRequired,
  isApproved: PropTypes.bool.isRequired,
  auctionOnChainId: PropTypes.bool.isRequired,
};

export default ApproveCollection;
