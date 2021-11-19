import React from 'react';
import PropTypes from 'prop-types';
import { queryPolymorphsGraph, traitRarity } from '../../../utils/graphql/polymorphQueries';
// import './styles/PolymorphScrambleProp.scss';
import { useGraphQueryHook } from '../../../utils/hooks/useGraphQueryHook';

const PolymorphScrambleProp = ({ data }) => {
  const { data: characterRarityData, loading } = useGraphQueryHook(
    queryPolymorphsGraph(traitRarity(data.chance))
  );

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
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    chance: PropTypes.string,
  }).isRequired,
};

export default PolymorphScrambleProp;
