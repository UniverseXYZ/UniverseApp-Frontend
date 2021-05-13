import React, { useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import UniverseContributors from '../../components/team/UniverseContributors';
import UniverseCreators from '../../components/team/UniverseCreators';
import Welcome from '../../components/team/Welcome';
import './Team.scss';

const Team = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="team__page">
      <MetaTags>
        <title>Meet the Universe Crew – Universe XYZ</title>
        <meta
          name="description"
          content="The Universe team is full of creators, artists and DeFi minds from all over the world with a shared goal in mind, empower artists."
        />
      </MetaTags>
      <Welcome />
      <div className="team__section">
        <div className="team__section__container">
          <UniverseCreators />
          <UniverseContributors />
        </div>
      </div>
    </div>
  );
};
export default Team;
