import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PlanetContainer from '../../components/planets/PlanetContainer';
import WelcomeSectionImg from '../../assets/images/planet2-charachters/planet-2-welcome-img.png';
import { mythical, fabled, legendary } from '../../utils/fixtures/prosoponMockData';
import LeftTopImg from '../../assets/images/planet2-charachters/planet-2-legendary-left-top.png';
import LeftTopImgMobile from '../../assets/images/planet2-charachters/planet-2-legendary-left-top-mobile.png';
import kuapoImgSection5 from '../../assets/images/planet3-charachters/kuapo-footer-planet.png';
import adakaImgSection5 from '../../assets/images/planet1-charachters/adaka-footer-planet.png';
import './Planet2.scss';
import { useWindowSize } from 'react-use';

const Planet2 = () => {
  const history = useHistory();
  const [legendaryBgFlag, setLegendaryBgFlag] = useState(LeftTopImg);
  const windowSize = useWindowSize();

  const section5Planet1 = {
    planet: 'planet 1',
    title: 'Adaka',
    hintText: `The Twilight Zone, situated in the northern hemisphere of Akaka is home to the famous
      purple glowing cliffs. The cliffs mark the Realm of the Ape Ape Elders and is a meeting place
      for the planet’s Lore Council.`,
    image: adakaImgSection5,
    className: 'adaka--section5',
    btnText: 'Go to Adaka',
    btnOnClick: () => history.push('/planets/adaka'),
  };
  const section5Planet2 = {
    planet: 'planet 3',
    title: 'Kuapo',
    hintText: `The thrid planet is like a floating space planet like the jetsons or cloud city but
      bellow there is land and water where mor species live but this planet is more space themed than
      the others`,
    image: kuapoImgSection5,
    className: 'kuapo--section5',
    btnText: 'Go to Kuapo',
    btnOnClick: () => history.push('/planets/kuapo'),
  };

  useEffect(() => {
    if (windowSize.width <= 576) {
      setLegendaryBgFlag(LeftTopImgMobile);
    }
  }, [windowSize]);
  return (
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
      legendaryLeftTopImg={legendaryBgFlag}
      section5Planet1={section5Planet1}
      section5Planet2={section5Planet2}
    />
  );
};

export default Planet2;
