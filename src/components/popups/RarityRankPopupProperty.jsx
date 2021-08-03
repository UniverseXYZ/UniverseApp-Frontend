import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { traitRarity } from '../../utils/graphql/queries';
import bluePuzzle from '../../assets/images/blue-puzzle.svg';
import pinkPuzzle from '../../assets/images/pink-puzzle.svg';

function RarityRankPopupProperty({
  mainMatchingAttributes,
  propertyName,
  secMatchingAttributes,
  value,
  genesMap,
  matchingHands,
}) {
  const { data, loading } = useQuery(traitRarity(genesMap[propertyName.toUpperCase()]));

  let chance = '';
  if (data?.traits?.length) {
    chance = `${Math.round(data.traits[0]?.rarity, 10)}% have this trait`;
  }
  const renderTrait = () => {
    if (
      mainMatchingAttributes.includes(propertyName) ||
      (propertyName === 'Left Hand' &&
        !mainMatchingAttributes.includes('Left Hand') &&
        matchingHands === 2) ||
      (propertyName === 'Right Hand' &&
        !mainMatchingAttributes.includes('Right Hand') &&
        matchingHands === 2)
    ) {
      return (
        <div className="rarity--description selected">
          <div className="matching">
            <img src={bluePuzzle} alt="Blue" />
            <span className="tooltiptext">Main set trait</span>
          </div>
          <h4>{propertyName}</h4>
          <h3>{value}</h3>
          <p className="description">{chance}</p>
        </div>
      );
    }
    if (secMatchingAttributes.includes(propertyName)) {
      return (
        <div className="rarity--description selected">
          <div className="matching">
            <img src={pinkPuzzle} alt="Pink" />
            <span className="tooltiptext">Secondary set trait</span>
          </div>
          <h4>{propertyName}</h4>
          <h3>{value}</h3>
          <p className="description">{chance}</p>
        </div>
      );
    }
    return (
      <div className="rarity--description">
        <h4>{propertyName}</h4>
        <h3>{value}</h3>
        <p className="description">{chance}</p>
      </div>
    );
  };

  return renderTrait();
}

RarityRankPopupProperty.propTypes = {
  propertyName: PropTypes.oneOfType([PropTypes.string]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string]).isRequired,
  matchingHands: PropTypes.oneOfType([PropTypes.number]).isRequired,
  genesMap: PropTypes.oneOfType([PropTypes.any]).isRequired,
  mainMatchingAttributes: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string)]).isRequired,
  secMatchingAttributes: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string)]).isRequired,
};

export default RarityRankPopupProperty;
