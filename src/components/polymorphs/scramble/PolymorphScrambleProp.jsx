import React from 'react';
import PropTypes from 'prop-types';
import './styles/PolymorphScrambleProp.scss';

const PolymorphScrambleProp = ({ data }) =>
  data.type === 'pink-orange' ? (
    <div className="rarity--description--gradient">
      <div className="rarity--description selected--pink--orange">
        <div className="matching">
          <img src={data.icon} alt="Pink orage" />
          <span className="tooltiptext">Matching trait</span>
        </div>
        <h4>{data.trait}</h4>
        <h3>{data.name}</h3>
        <p className="description">{data.chance}</p>
      </div>
      <div className="rarity--rank--border" />
    </div>
  ) : (
    <div
      className={`rarity--description ${
        data.type === 'orange'
          ? 'selected--orange'
          : data.type === 'blue'
          ? 'selected--blue'
          : data.type === 'pink'
          ? 'selected--pink'
          : ''
      }`}
    >
      {data.type && (
        <div className="matching">
          <img src={data.icon} alt="Orange" />
          <span className="tooltiptext">Matching trait</span>
        </div>
      )}
      <h4>{data.trait}</h4>
      <h3>{data.name}</h3>
      <p className="description">{data.chance}</p>
    </div>
  );

PolymorphScrambleProp.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default PolymorphScrambleProp;
