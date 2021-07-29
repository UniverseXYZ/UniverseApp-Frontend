import React from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import priceIcon from '../../../assets/images/eth-icon-new.svg';
import neverScrambledIcon from '../../../assets/images/never-scrambled-badge.svg';
import singleTraitScrambledIcon from '../../../assets/images/single-trait-scrambled-badge.svg';

const List = ({ data, perPage, offset }) => {
  const sliceData = data.slice(offset, offset + perPage);

  return (
    <div className="rarity-charts--list">
      <div className="grid">
        {sliceData.map((item) => (
          <div className="card">
            <div className="card--header">
              <div className="card--number">{`#${item.id}`}</div>
              <div className="card--price">
                <img src={priceIcon} alt="Price" />
                {item.price}
              </div>
            </div>
            <div className="card--body">
              <img className="rarity--chart" src={item.previewImage.url} alt={item.name} />
              {item.scrambled === 'single' ? (
                <div className="card--scrambled">
                  <img alt="Single trait scrambled badge" src={singleTraitScrambledIcon} />
                  <span className="tooltiptext">Single trait scrambled</span>
                </div>
              ) : (
                <div className="card--scrambled">
                  <img alt="Never scrambled badge" src={neverScrambledIcon} />
                  <span className="tooltiptext">Never scrambled</span>
                </div>
              )}
            </div>
            <div className="card--footer">
              <h2>{item.name}</h2>
              <p>{`#${item.serialNumber}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

List.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

export default List;
