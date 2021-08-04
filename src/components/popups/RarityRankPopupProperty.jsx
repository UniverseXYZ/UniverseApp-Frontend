import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { traitRarity } from '../../utils/graphql/queries';
import RarityRankOrangeProperty from './RarityRankOrangeProperty';
import RarityRankBlueProperty from './RarityRankBlueProperty';
import RarityRankPinkProperty from './RarityRankPinkProperty';
import RarityRankNoColorProperty from './RarityRankNoColorProperty';

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
    // Checks if hands are matching different set than the main and secondary sets
    if (
      (propertyName === 'Left Hand' || propertyName === 'Right Hand') &&
      matchingHands === 2 &&
      !mainMatchingAttributes.includes(propertyName) &&
      !secMatchingAttributes.includes(propertyName)
    ) {
      return (
        <RarityRankPinkProperty
          tooltipText="Hands set trait"
          propertyName={propertyName}
          trait={value}
          chance={chance}
        />
      );
    }

    // TODO: This should be changed to green puzzle piece when it's designed
    if (
      mainMatchingAttributes.includes(propertyName) &&
      secMatchingAttributes.includes(propertyName)
    ) {
      return (
        <RarityRankPinkProperty
          tooltipText="Main &amp; Secondary set trait"
          propertyName={propertyName}
          trait={value}
          chance={chance}
        />
      );
    }

    if (mainMatchingAttributes.includes(propertyName)) {
      return (
        <RarityRankOrangeProperty
          tooltipText="Main set trait"
          propertyName={propertyName}
          trait={value}
          chance={chance}
        />
      );
    }

    if (secMatchingAttributes.includes(propertyName)) {
      return (
        <RarityRankBlueProperty
          tooltipText="Secondary set trait"
          propertyName={propertyName}
          trait={value}
          chance={chance}
        />
      );
    }
    return <RarityRankNoColorProperty propertyName={propertyName} trait={value} chance={chance} />;
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
