import React, { useState, useEffect } from 'react';
import BondingCurve from '../../polymorphs/mint-polymorph/BondingCurve';
import './MintLobbyLobsterSection.scss';

const MintLobbyLobsterSection = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mobile, setMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    if (+window.innerWidth <= 576) setMobile(true);
    else setMobile(false);
  }, []);

  return (
    <div className="lobby--lobsters--mint--section">
      <div className="lobby--lobsters--mint--section--container">
        <h1 className="title">Mint a Lobby Lobster</h1>
        <p className="desc">
          100% of sales will be donated to policy and lobby efforts and secondary sales will be
          donated to groups creating a better Ethereum ecosystem.
        </p>
        <BondingCurve
          title="You can mint up to 20 Lobsters in 1 TX"
          price={0.1}
          value={sliderValue}
          setValue={setSliderValue}
          max={30}
          mobile={mobile}
          blur
          quantity={quantity}
          setQuantity={setQuantity}
          light={false}
        />
      </div>
    </div>
  );
};

export default MintLobbyLobsterSection;
