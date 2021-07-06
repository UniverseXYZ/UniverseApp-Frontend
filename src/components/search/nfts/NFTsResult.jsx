import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './NFTsResult.scss';
import heartIcon from '../../../assets/images/marketplace/heart.svg';
import priceIcon from '../../../assets/images/marketplace/price.svg';

const NFTsResult = ({ query, data }) => (
  <div className="nfts--search--result">
    {data
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .map((nft) => (
        <div className="nft--box" key={uuid()}>
          <div className="nft--box--header">
            <div className="three--images">
              <div className="creator--details">
                <img src={nft.creator.avatar} alt={nft.creator.name} />
                <span className="tooltiptext">{`Creator: ${nft.creator.name}`}</span>
              </div>
              <div className="collection--details">
                <img src={nft.collection.avatar} alt={nft.collection.name} />
                <span className="tooltiptext">{`Creator: ${nft.collection.name}`}</span>
              </div>
              <div className="owner--details">
                <img src={nft.owner.avatar} alt={nft.owner.name} />
                <span className="tooltiptext">{`Creator: ${nft.owner.name}`}</span>
              </div>
            </div>
            <div className="likes--count">
              <img src={heartIcon} alt="Heart" />
              <span>{nft.likesCount}</span>
            </div>
          </div>
          <div className="nft--box--body">
            <img src={nft.photo} alt={nft.name} />
          </div>
          <div className="nft--box--footer">
            <div className="name--and--price">
              <h4>{nft.name}</h4>
              <div className="price--div">
                <img src={priceIcon} alt="Price" />
                <span>{nft.price}</span>
              </div>
            </div>
            <div className="quantity--and--offer">
              <p>{nft.quantity}</p>
              <div className="price--offer--div">
                <label>Offer for</label>
                <img src={priceIcon} alt="Price" />
                <span>{nft.offerFor}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
  </div>
);

NFTsResult.propTypes = {
  query: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array]),
};

NFTsResult.defaultProps = {
  query: '',
  data: [],
};

export default NFTsResult;
