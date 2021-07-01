import React from 'react';
import PlanetContainer from '../../components/planets/PlanetContainer';
import WelcomeSectionImg from '../../assets/images/planet2-charachters/planet-2-welcome-img.png';
import { mythical, fabled, legendary } from '../../utils/fixtures/prosoponMockData';
import './Planet2.scss';

const Planet2 = () => (
  <PlanetContainer
    title="Prosopon"
    planetNumberText="Planet 2"
    hintText={
      <>
        The second planet is a bunch of different climates and terrain like some with intense
        factors like meteor showers and rain and cliffs and acid pools like a mystical vibe like
        dragons and fairy land just crazy weather like elemental vibes
      </>
    }
    welcomeSectionImg={WelcomeSectionImg}
    fabled={fabled}
    mythical={mythical}
    legendary={legendary}
    section2Title="Prosopon Legendary"
    section3Title="Prosopon Fabled"
    section3HintText="3 evolutions"
    section4Title="Prosopon Mythical"
    section4HintText="2 evolutions"
    className="planet--two"
  />
);

export default Planet2;
