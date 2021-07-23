import React, { useState } from 'react';
import PropTypes from 'prop-types';
import checkIcon from '../../assets/images/check-black.svg';
import './styles/NftGalleryItemCard.scss';

const NftGalleryItemCard = (props) => {
  const { nft } = props;
  const [active, setActive] = useState(false);
  return (
    <div
      className={
        !active
          ? 'nft--gallery--item--card--parent'
          : 'nft--gallery--item--card--parent nft--gallery--item--card--parent--avtive'
      }
      aria-hidden="true"
      onClick={() => setActive(!active)}
    >
      <div className="nft--gallery--item--card--child">
        <div className="nft--box--header">
          <div className="three--images">
            <div className="creator--details">
              <img src={nft.creator.avatar} alt={nft.creator.name} />
              <span className="tooltiptext">{`Creator: ${nft.creator.name}`}</span>
            </div>
            <div className="collection--details">
              <img src={nft.collection.avatar} alt={nft.collection.name} />
              <span className="tooltiptext">{`Collection: ${nft.collection.name}`}</span>
            </div>
            <div className="owner--details">
              <img src={nft.owner.avatar} alt={nft.owner.name} />
              <span className="tooltiptext">{`Owner: ${nft.owner.name}`}</span>
            </div>
          </div>
        </div>
      </div>
      {active && (
        <div className="nft--selected">
          <img src={checkIcon} alt="img" />
        </div>
      )}
    </div>
  );
};

NftGalleryItemCard.propTypes = {
  nft: PropTypes.shape({
    creator: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    collection: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    owner: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

export default NftGalleryItemCard;
