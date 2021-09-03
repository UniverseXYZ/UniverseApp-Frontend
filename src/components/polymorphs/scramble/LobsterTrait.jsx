import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { traitRarity } from '../../../utils/graphql/queries';
import './styles/PolymorphScrambleProp.scss';
import { lobsterTraitRarity, queryLobstersGraph } from '../../../utils/graphql/lobsterQueries';

const LobsterTrait = ({ traitData }) => {
  const [rarity, setRarity] = useState('');

  const queryTraitRarity = async () => {
    const data = await queryLobstersGraph(lobsterTraitRarity(traitData.chance));

    if (data?.traits?.length) {
      const rarityText = `${Math.round(data.traits[0]?.rarity, 10)}% have this trait`;
      setRarity(rarityText);
    }
  };

  useEffect(() => {
    queryTraitRarity();
  }, []);

  return (
    <div className="scramble--prop">
      <div className="prop--trait">{traitData.trait}</div>
      <div className="prop--name">{traitData.name}</div>
      <div className="prop--chance">{rarity}</div>
    </div>
  );
};

LobsterTrait.propTypes = {
  traitData: PropTypes.shape({
    trait: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    chance: PropTypes.string.isRequired,
  }).isRequired,
};

export default LobsterTrait;
