import React from 'react';
import './List.scss';
import priceIcon from '../../../assets/images/marketplace/price.svg';
import rarityChartImage from '../../../assets/images/soldier.png';
import neverScrambledIcon from '../../../assets/images/never-scrambled-badge.svg';
import singleTraitScrambledIcon from '../../../assets/images/single-trait-scrambled-badge.svg';

const List = () => {
  console.log('Rarity charts list');
  return (
    <div className="rarity-charts--list">
      <div className="grid">
        <div className="card">
          <div className="card--header">
            <div className="card--number">#1</div>
            <div className="card--price">
              <img src={priceIcon} alt="Price" />
              0.5
            </div>
          </div>
          <div className="card--body">
            <img className="rarity--chart" src={rarityChartImage} alt="Long Username" />
            <div className="card--scrambled">
              <img alt="Never scrambled badge" src={neverScrambledIcon} />
              <span className="tooltiptext">Never scrambled</span>
            </div>
          </div>
          <div className="card--footer">
            <h2>Long Username</h2>
            <p>#4352</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
