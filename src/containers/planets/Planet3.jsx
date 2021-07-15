import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PlanetContainer from '../../components/planets/PlanetContainer';
import WelcomeSectionImg from '../../assets/images/planet3-charachters/welcome-section-planet3-img.png';
import { mythical, fabled, legendary } from '../../utils/fixtures/kuapoMockData';
import LeftTopImg from '../../assets/images/planet3-charachters/legendary-left-top.png';
import LeftTopImgMobile from '../../assets/images/planet3-charachters/legendary-left-top-mobile.png';
import adakaImgSection5 from '../../assets/images/planet1-charachters/adaka-footer-planet.png';
import prosoponImgSection5 from '../../assets/images/planet2-charachters/prosopon-footer-planet.png';
import './Planet3.scss';

const Planet3 = () => {
  const history = useHistory();
  const [legendaryBgFlag, setLegendaryBgFlag] = useState(LeftTopImg);

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
    planet: 'planet 2',
    title: 'Prosopon',
    hintText: `The second planet is a bunch of different climates and terrain like some with intense
      factors like meteor showers and rain and cliffs and acid pools like a mystical vibe like
      dragons and fairy land just crazy weather like elemental vibes`,
    image: prosoponImgSection5,
    className: 'prosopon--section5',
    btnText: 'Go to Prosopon',
    btnOnClick: () => history.push('/planets/prosopon'),
  };

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setLegendaryBgFlag(LeftTopImgMobile);
    }
  }, []);
  return (
    <PlanetContainer
      title="Kuapo"
      planetNumberText="Planet 3"
      hintText={
        <>
          The thrid planet is like a floating space planet like the jetsons or cloud city but bellow
          there is land and water where mor species live but this planet is more space themed than
          the others
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
      legendaryLeftTopImg={legendaryBgFlag}
      section5Planet1={section5Planet1}
      section5Planet2={section5Planet2}
    />
  );
};

export default Planet3;
