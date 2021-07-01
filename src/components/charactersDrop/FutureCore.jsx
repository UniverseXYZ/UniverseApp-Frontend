import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import Comics from '../../assets/images/comics.svg';
import Polmorphic from '../../assets/images/polmorphic.svg';
import Frame from '../../assets/images/char-frame.png';

const FutureCore = () => {
  const history = useHistory();

  return (
    <div className="future_core_section">
      <img src={Frame} alt="frame" className="char1" />
      <img src={Frame} alt="frame" className="char2" />
      <div className="future_core_head">
        <h1>Future Core Drops</h1>
      </div>
      <div className="img-info">
        <div className="polmorphic-part">
          {/* <img src={Polmorphic} alt="polmorphic-img" /> */}
          <div className="info-text">
            <h1>Polmorphic v2 (Game)</h1>
            <p>
              Donec euismod faucibus cras facilisis netus. Erat sollicitudin et, venenatis at ipsum
              maecenas diam aliquam quam. Volutpat.
            </p>
          </div>
        </div>
        <div className="comics-part">
          {/* <img src={Comics} alt="comics-img" /> */}
          <div className="info-text">
            <h1>Comics</h1>
            <p>
              Donec euismod faucibus cras facilisis netus. Erat sollicitudin et, venenatis at ipsum
              maecenas diam aliquam quam. Volutpat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureCore;
