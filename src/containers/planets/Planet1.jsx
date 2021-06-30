import React from 'react';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import WelcomeWrapper from '../../components/ui-elements/WelcomeWrapper';
import WelcomeSectionImg from '../../assets/images/planet1-welcome-section.png';
import Section2 from '../../components/planets/planet1/Section2';
import Section3 from '../../components/planets/planet1/Section3';
import Section4 from '../../components/planets/planet1/Section4';
import abakaFabled from '../../utils/fixtures/abakaFabledMockData';
import abakaMythical from '../../utils/fixtures/adakaMythicalMockData';
import './Planet1.scss';

const Planet1 = () => (
  <div className="planet--one">
    <WelcomeWrapper
      title={
        <>
          <span>Planet 1</span>
          Adaka
        </>
      }
      hintText={
        <>
          The Twilight Zone, situated in the northern hemisphere of Akaka is home to the famous
          purple glowing cliffs. The cliffs mark the Realm of the Ape Ape Elders and is a meeting
          place for the planet’s Lore Council,
          <br />
          <br />
          Neppaton, the enchanted forest borders the twilight zone
        </>
      }
      btnText="Show characters"
    >
      <img alt="img" src={WelcomeSectionImg} />
    </WelcomeWrapper>
    <AnimatedOnScroll animationIn="fadeIn" animationInDelay={300}>
      <Section2 />
    </AnimatedOnScroll>
    <Section3 abakaFabled={abakaFabled} />
    <Section4 abakaMythical={abakaMythical} />
  </div>
);

export default Planet1;
