import React from 'react';
import UniverseContributors from '../../components/team/UniverseContributors';
import UniverseCreators from '../../components/team/UniverseCreators';
import Welcome from '../../components/team/Welcome';
import './Team.scss';

const Team = () => (
  <div className="team__page">
    <Welcome />
    <div className="team__section">
      <div className="team__section__container">
        <UniverseCreators />
        <UniverseContributors />
      </div>
    </div>
  </div>
);

export default Team;
