import { OpenGraph } from '@app/components';
import OpenGraphImage from '@assets/images/open-graph/team.png';
import React, { useEffect } from 'react';
import { useThemeStore } from 'src/stores/themeStore';
import UniverseContributors from '../../components/team/UniverseContributors.jsx';
import UniverseCreators from '../../components/team/UniverseCreators.jsx';
import Welcome from '../../components/team/Welcome.jsx';
// import './Team.scss';

const METADATA = {
  title: "Meet the Universe Crew",
  description:
    "Universe team is full of creators, artists and DeFi minds from all over the world with a shared goal in mind, to empower artists.",
};

const Team = () => {
  const setDarkMode = useThemeStore(s => s.setDarkMode);

  useEffect(() => setDarkMode(true), []);

   const schema = {
    "@context": "http://schema.org",
    "@type": "OurTeamPage",
    name: METADATA.title,
    description:
      METADATA.description,
  };

  return (
    <div className="team__page">
      <OpenGraph
        title={METADATA.title}
        description={METADATA.description}
        image={OpenGraphImage}
      />
      <Welcome />
      <div className="team__section">
        <div className="team__section__container">
          <UniverseCreators />
          <UniverseContributors />
        </div>
      </div>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>
    </div>
  );
};
export default Team;
