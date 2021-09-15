import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { traitRarity } from '../../../utils/graphql/queries';
import './styles/PolymorphScrambleProp.scss';

const PolymorphScrambleProp = ({ data }) => {
  const { data: characterRarityData, loading } = useQuery(traitRarity(data.chance));

  let rarity = '';
  if (characterRarityData?.traits?.length) {
    rarity = `${Math.round(characterRarityData.traits[0]?.rarity, 10)}% have this trait`;
  }
  return (
    <div className="scramble--prop">
      <div className="prop--trait">{data.trait}</div>
      <div className="prop--name">{data.name}</div>
      <div className="prop--chance">{rarity}</div>
    </div>
  );
};

PolymorphScrambleProp.propTypes = {
  data: PropTypes.shape({
    trait: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    chance: PropTypes.string.isRequired,
  }).isRequired,
};

export default PolymorphScrambleProp;
