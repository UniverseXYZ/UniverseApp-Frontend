import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ChoosePolymorph.scss';
import { Popup } from 'reactjs-popup';
import Caroussel3d from './caroussel/Caroussel3d';
import Button from '../button/Button';
import textImage from '../../assets/images/TextBubble.png';
import { CHOOSE_POLYMORPH_CARD } from '../../utils/fixtures/ChoosePolymorphCardDummyData';
import BurnPolymorphCongratPopup from '../popups/BurnPolymorphCongratPopup';
import loadingBg from '../../assets/images/burnpolymorphbg1.png';
import BurnAnimation from './animations/BurnAnimation';
import BackgroundFlamesAnimation from './animations/BackgroundFlamesAnimation';

const ChoosePolymorph = () => {
  const history = useHistory();
  const [burnt, setBurnt] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hideAnimation, setHideAnimation] = useState(false);
  const [selectedPolymorphImageSource, setSelectedPolymorphImageSource] = useState(false);

  const handleClick = () => {
    const getSelectedPolymorph = document.querySelector(
      '.slider-content .active .polymorph--card--middle--section img'
    );
    setSelectedPolymorphImageSource(getSelectedPolymorph.src);
    setBurnt(true);
    setHideAnimation(false);
    setTimeout(() => {
      setShowPopup(true);
      setHideAnimation(true);
    }, 3400);
  };

  return (
    <div className="choose--polymorph">
      <div className="animation--background">
        <BackgroundFlamesAnimation />
      </div>
      <div className="choose--polymorph--container">
        {!burnt ? (
          <>
            <h1>Choose a Polymorph</h1>
            <p>Select a polymorph you’d like to burn from your wallet.</p>
            {CHOOSE_POLYMORPH_CARD.length ? (
              <>
                <div className="slider--carousel">
                  <Caroussel3d />
                </div>
                <div className="button--section">
                  <Button className="light-button" onClick={handleClick}>
                    Burn a Polymorph
                  </Button>
                </div>
              </>
            ) : (
              <div className="no--polymorphs--found--section">
                <img src={textImage} alt="text" />
                <h1>No Polymorphs found</h1>
                <p>Buy Polymorphs on marketplace by clicking the button below</p>
                <Button className="light-button">Go to marketplace</Button>
              </div>
            )}
          </>
        ) : (
          <div className="animation--page">
            {!hideAnimation ? (
              <div className="image--secion">
                <img src={selectedPolymorphImageSource} alt="polymorph" />
                <div className="burn--animation">
                  <BurnAnimation />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      <Popup closeOnDocumentClick={false} open={showPopup}>
        <BurnPolymorphCongratPopup
          onClose={() => setShowPopup(false)}
          loadingBg={loadingBg}
          setBurnt={setBurnt}
        />
      </Popup>
    </div>
  );
};
export default ChoosePolymorph;
