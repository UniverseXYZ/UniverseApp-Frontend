import React from 'react';
import PlanetContainer from '../../components/planets/PlanetContainer';
import WelcomeSectionImg from '../../assets/images/planet1-welcome-section.png';
import { mythical, fabled, legendary } from '../../utils/fixtures/adakaMockData';
import './Planet1.scss';

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
  />
);

export default Planet1;
