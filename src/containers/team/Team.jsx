import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import UniverseContributors from '../../components/team/UniverseContributors.jsx';
import UniverseCreators from '../../components/team/UniverseCreators.jsx';
import Welcome from '../../components/team/Welcome.jsx';
import AppContext from '../../ContextAPI';
import './Team.scss';

const Team = () => {
  const { setDarkMode } = useContext(AppContext);
  useEffect(() => {
    setDarkMode(true);
  }, []);
  return (
    <div className="team__page">
      <Helmet>
        <title>Meet the Universe Crew – Universe XYZ</title>
        <meta
          name="description"
          content="The Universe team is full of creators, artists and DeFi minds from all over the world with a shared goal in mind, empower artists."
        />
      </Helmet>
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
