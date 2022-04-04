import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useThemeStore } from 'src/stores/themeStore';
import UniverseContributors from '../../components/team/UniverseContributors.jsx';
import UniverseCreators from '../../components/team/UniverseCreators.jsx';
import Welcome from '../../components/team/Welcome.jsx';
import OpenGraphImage from '@assets/images/open-graph/team.png';
import { OpenGraph } from '@app/components';
// import './Team.scss';

const Team = () => {
  const setDarkMode = useThemeStore(s => s.setDarkMode);

  useEffect(() => setDarkMode(true), []);

  return (
    <div className="team__page">
      <OpenGraph
        title={'Meet the Universe Crew'}
        description={'Universe team is full of creators, artists and DeFi minds from all over the world with a shared goal in mind, empower artists.'}
        image={OpenGraphImage}
      />
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
