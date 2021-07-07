import React from 'react';
import PlanetContainer from '../../components/planets/PlanetContainer';
import WelcomeSectionImg from '../../assets/images/planet3-charachters/welcome-section-planet3-img.png';
import { mythical, fabled, legendary } from '../../utils/fixtures/kuapoMockData';
import legendaryLeftTopImg from '../../assets/images/planet3-charachters/legendary-left-top.png';
import './Planet3.scss';

const Planet3 = () => (
  <PlanetContainer
    title="Kuapo"
    planetNumberText="Planet 3"
    hintText={
      <>
        The thrid planet is like a floating space planet like the jetsons or cloud city but bellow
        there is land and water where mor species live but this planet is more space themed than the
        others
      </>
    }
    welcomeSectionImg={WelcomeSectionImg}
    fabled={fabled}
    mythical={mythical}
    legendary={legendary}
    section2Title="Kuapo Legendary"
    section3Title="Kuapo Fabled"
    section3HintText="3 evolutions"
    section4Title="Kuapo Mythical"
    section4HintText="2 evolutions"
    className="planet--three"
    legendaryLeftTopImg={legendaryLeftTopImg}
  />
);

export default Planet3;
