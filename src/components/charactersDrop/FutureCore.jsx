import React, { useState, useEffect } from 'react';
import Frame from '../../assets/images/char-frame-future-core-drops.png';
import FrameMobile from '../../assets/images/char-frame-future-core-drops-mobile.png';
import BookVector from '../../assets/images/play-vector.svg';
import PlayVector from '../../assets/images/book-vector.svg';
import { useWindowSize } from 'react-use';

const FutureCore = () => {
  const [frame, setFrame] = useState(Frame);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= 576) {
      setFrame(FrameMobile);
    }
  }, []);

  return (
    <div className="future_core_section">
      <img src={frame} alt="img" className="bg--flag--future--core--drops" />
      <div className="future_core_head">
        <h1>Future Core Drops</h1>
      </div>
      <div className="img-info">
        <div className="polmorphic-part">
          <div className="vec-div">
            <img src={BookVector} alt="polymorphic" />
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
            <img src={PlayVector} alt="comics" />
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
