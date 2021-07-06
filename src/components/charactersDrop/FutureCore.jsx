import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import Frame from '../../assets/images/char-frame.png';
import BookVector from '../../assets/images/play-vector.svg';
import PlayVector from '../../assets/images/book-vector.svg';

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
          <div className="vec-div">
            <img src={PlayVector} alt="polymorphic" />
          </div>
          <div className="info-text">
            <h1>Polmorphic v2 (Game)</h1>
            <p>
              Donec euismod faucibus cras facilisis netus. Erat sollicitudin et, venenatis at ipsum
              maecenas diam aliquam quam. Volutpat.
            </p>
          </div>
        </div>
        <div className="comics-part">
          <div className="vec-div">
            <img src={BookVector} alt="comics" />
          </div>
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
