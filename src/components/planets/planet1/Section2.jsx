import React from 'react';
import WrapperCenter from '../../polymorphs/WrapperCenter';
import WrapperCenterTwoColumns from '../../polymorphs/WrapperCenterTwoColumns';
import Section2Card from './Section2Card';
import LeftTopImg from '../../../assets/images/planet1-section2-left-top.png';
import Kangeroo from '../../../assets/images/characters-planet1-kangeroo.png';
import ChainlinkCat from '../../../assets/images/chainlink-cat.png';
import './styles/Section2.scss';

const Section2 = () => (
  <div className="planet--one--section2">
    <img src={LeftTopImg} alt="img" className="left--top--img" />
    <WrapperCenter className="section--title">
      <h3>Adaka Legendary</h3>
    </WrapperCenter>
    <WrapperCenter className="cards--section">
      <WrapperCenterTwoColumns
        leftBlock={
          <Section2Card image={Kangeroo} name="Doujan" description="Platybelodon" legendary />
        }
        rightBlock={
          <Section2Card image={ChainlinkCat} name="Link" description="Chain-Link Cat" legendary />
        }
      />
    </WrapperCenter>
  </div>
);

export default Section2;
