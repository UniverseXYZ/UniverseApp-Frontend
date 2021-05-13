import React, { useEffect, useContext } from 'react';
import UniverseContributors from '../../components/team/UniverseContributors';
import UniverseCreators from '../../components/team/UniverseCreators';
import Welcome from '../../components/team/Welcome';
import AppContext from '../../ContextAPI';
import './Team.scss';

const Team = () => {
  const { setWebsite } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setWebsite(true);
    document.title = 'Universe Minting - Team and Contributors';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);
  return (
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
};

export default Team;
