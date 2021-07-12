import React from 'react';
import PlanetContainer from '../../components/planets/PlanetContainer';
import WelcomeSectionImg from '../../assets/images/planet1-welcome-section.png';
import { mythical, fabled, legendary } from '../../utils/fixtures/adakaMockData';
import prosoponImgSection5 from '../../assets/images/planet2-charachters/prosopon-footer-planet.png';
import './Planet1.scss';

const section5Planet1 = {
  planet: 'planet 2',
  title: 'Prosopon',
  hintText: `The second planet is a bunch of different climates and terrain like some with intense
    factors like meteor showers and rain and cliffs and acid pools like a mystical vibe like
    dragons and fairy land just crazy weather like elemental vibes`,
  image: prosoponImgSection5,
  className: 'prosopon--section5',
};
const section5Planet2 = {
  planet: 'planet 2',
  title: 'Prosopon',
  hintText: `The second planet is a bunch of different climates and terrain like some with intense
    factors like meteor showers and rain and cliffs and acid pools like a mystical vibe like
    dragons and fairy land just crazy weather like elemental vibes`,
  image: prosoponImgSection5,
  className: 'prosopon--section5',
};

const Planet1 = () => (
  <PlanetContainer
    title="Adaka"
    planetNumberText="Planet 1"
    hintText={
      <>
        The Twilight Zone, situated in the northern hemisphere of Akaka is home to the famous purple
        glowing cliffs. The cliffs mark the Realm of the Ape Ape Elders and is a meeting place for
        the planet’s Lore Council,
        <br />
        <br />
        Neppaton, the enchanted forest borders the twilight zone
      </>
    }
    welcomeSectionImg={WelcomeSectionImg}
    fabled={fabled}
    mythical={mythical}
    legendary={legendary}
    section2Title="Adaka Legendary"
    section3Title="Adaka Fabled"
    section3HintText="3 evolutions"
    section4Title="Adaka Mythical"
    section4HintText="2 evolutions"
    className="planet--one"
    section5Planet1={section5Planet1}
    section5Planet2={section5Planet2}
  />
);

export default Planet1;
