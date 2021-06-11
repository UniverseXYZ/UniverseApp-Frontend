import React from 'react';
import WrapperCenter from './WrapperCenter';
import WrapperCenterTwoColumns from './WrapperCenterTwoColumns';
import Section6LeftImg from '../../assets/images/Section6-Illustration-min.png';
import Section6EndImg from '../../assets/images/Section7-Background-min.png';
import Button from '../button/Button.jsx';

import './styles/Section6.scss';

const leftBlock = () => (
  <div>
    <img alt="img" src={Section6LeftImg} />
  </div>
);

const rightBlock = () => (
  <div>
    <div className="coming-soon">Coming soon</div>
    <h2>Make your own Morphing NFTs</h2>
    <p>
      We want you to also be able to mint your own morphing creations. We just need some time to set
      it up.
    </p>
  </div>
);

const Section6 = () => (
  <div className="polymorphs--section6">
    <WrapperCenter className="wrapper--center--section6--two-columns">
      <WrapperCenterTwoColumns leftBlock={leftBlock()} rightBlock={rightBlock()} />
    </WrapperCenter>
    <div className="section6--end--block">
      {/* <img src={Section6EndImg} alt="img" /> */}
      <h2>Now it’s time to mint your own unique polymorph</h2>
      <Button className="light-button">Mint polymorph</Button>
    </div>
  </div>
);

export default Section6;
