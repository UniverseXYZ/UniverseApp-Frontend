import React, { useState, useEffect } from 'react';
import BondingCurve from '../../polymorphs/mint-polymorph/BondingCurve';
import './MintLobbyLobsterSection.scss';
import lobsterLoadingBg from '../../../assets/images/lobby-lobsters/img_placeholder.png';

const MintLobbyLobsterSection = React.forwardRef((props, ref) => {
  const [sliderValue, setSliderValue] = useState(4520);
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
    <div className="lobby--lobsters--mint--section" ref={ref}>
      <div className="lobby--lobsters--mint--section--background">
        <div className="lobby--lobsters--mint--section--container">
          <h1 className="title">Mint a Lobby Lobster</h1>
          <p className="desc">
            100% of primary sales will be donated to policy and lobby efforts. Secondary sales will
            be donated to groups focused on growing the Ethereum ecosystem. Mint a Lobby Lobster to
            become part of a community that will change the universe!
          </p>
          <BondingCurve
            title="You can mint 20 Lobby Lobsters at a time"
            price={0.1}
            value={sliderValue}
            setValue={setSliderValue}
            max={10000}
            mobile={mobile}
            blur
            quantity={quantity}
            setQuantity={setQuantity}
            light={false}
            loadingImage={lobsterLoadingBg}
          />
        </div>
      </div>
    </div>
  );
});

export default MintLobbyLobsterSection;
