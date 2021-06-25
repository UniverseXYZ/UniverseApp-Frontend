import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import { useHistory } from 'react-router-dom';
import uuid from 'react-uuid';
import AppContext from '../../../ContextAPI';
import backArrow from '../../../assets/images/go-back-arrow.svg';
import person from '../../../assets/images/randomise-person-images/person.png';
import Button from '../../button/Button';
import Tabs from '../../tabs/Tabs';
import PolymorphScrambleProp from './PolymorphScrambleProp';
import './styles/PolymorphScramblePage.scss';
import PolymorphScramblePopup from '../../popups/PolymorphScramblePopup';
import LoadingPopup from '../../popups/LoadingPopup';
import PolymorphScrambleCongratulationPopup from '../../popups/PolymorphScrambleCongratulationPopup';

const PolymorphScramblePage = () => {
  const history = useHistory();
  const { selectedNftForScramble, setSelectedNftForScramble } = useContext(AppContext);

  const [propertiesTabSelected, setPropertiesTabSelected] = useState(true);
  const [metadataTabSelected, setMetadataTabSelected] = useState(false);

  const tabs = [
    {
      name: 'Properties',
      active: propertiesTabSelected,
      handler: () => {
        setPropertiesTabSelected(true);
        setMetadataTabSelected(false);
      },
    },
    {
      name: 'Metadata',
      active: metadataTabSelected,
      handler: () => {
        setPropertiesTabSelected(false);
        setMetadataTabSelected(true);
      },
    },
  ];

  const properties = [
    {
      trait: 'Base character',
      name: 'Charles',
      chance: '28% have this trait',
    },
    {
      trait: 'Eyewear',
      name: 'Orange Sunglasses',
      chance: '58% have this trait',
    },
    {
      trait: 'Headwear',
      name: 'Marine Helmet',
      chance: '58% have this trait',
    },
    {
      trait: 'Footwear',
      name: 'Basketball Shoes',
      chance: '58% have this trait',
    },
    {
      trait: 'Torso',
      name: 'Clown Jacket',
      chance: '58% have this trait',
    },
    {
      trait: 'Pants',
      name: 'Marine Pants',
      chance: '58% have this trait',
    },
    {
      trait: 'Left-hand accessory',
      name: 'Golden Spartan Sword',
      chance: '58% have this trait',
    },
    {
      trait: 'Right-hand accessory',
      name: 'Double Degen Sword Red',
      chance: '58% have this trait',
    },
    {
      trait: 'Background',
      name: 'Strong Bliss',
      chance: '58% have this trait',
    },
  ];

  const onGoBack = () => {
    history.goBack();
  };

  const onOpenOptionsPopUp = () => {
    document.getElementById('popup-hidden-btn').click();
  };

  return (
    <div className="container scramble--wrapper">
      <Popup
        trigger={
          <button
            type="button"
            id="popup-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <PolymorphScramblePopup onClose={close} />}
      </Popup>
      <Popup
        trigger={
          <button
            type="button"
            id="loading-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <LoadingPopup onClose={close} />}
      </Popup>
      <Popup
        trigger={
          <button
            type="button"
            id="scramble-hidden-btn"
            aria-label="hidden"
            style={{ display: 'none' }}
          />
        }
      >
        {(close) => <PolymorphScrambleCongratulationPopup onClose={close} />}
      </Popup>

      <div className="go--back--wrapper" aria-hidden="true" onClick={onGoBack}>
        <img src={backArrow} alt="go back" />
        <span>My NFTs</span>
      </div>

      <div className="scramble--content">
        <div className="avatar--wrapper">
          {selectedNftForScramble.background ? (
            <img src={selectedNftForScramble.background} className="background" alt="background" />
          ) : (
            ''
          )}
          <img src={person} className="person" alt="person" />
          {selectedNftForScramble.headWear ? (
            <img src={selectedNftForScramble.headWear} className="headWear" alt="headWear" />
          ) : (
            ''
          )}
          {selectedNftForScramble.eyeWear ? (
            <img src={selectedNftForScramble.eyeWear} className="eyeWear" alt="eyeWear" />
          ) : (
            ''
          )}
          {selectedNftForScramble.torso ? (
            <img src={selectedNftForScramble.torso} className="torso" alt="torso" />
          ) : (
            ''
          )}
          {selectedNftForScramble.pants ? (
            <img src={selectedNftForScramble.pants} className="pants" alt="pants" />
          ) : (
            ''
          )}
          {selectedNftForScramble.footWear ? (
            <img src={selectedNftForScramble.footWear} className="footWear" alt="footWear" />
          ) : (
            ''
          )}
          {selectedNftForScramble.leftHand ? (
            <img src={selectedNftForScramble.leftHand} className="leftHand" alt="leftHand" />
          ) : (
            ''
          )}
          {selectedNftForScramble.rightHand ? (
            <img src={selectedNftForScramble.rightHand} className="rightHand" alt="rightHand" />
          ) : (
            ''
          )}
        </div>

        <div className="scramble--options">
          <div className="name">{selectedNftForScramble.name}</div>
          <div className="description">
            Charles the Clown is a citizen of the Polymorph Universe. Charles has a unique genetic
            code that can be scrambled at anytime.
          </div>

          <Tabs items={tabs} />
          {propertiesTabSelected ? (
            <>
              <div className="scramble--properties">
                {properties.map((props) => (
                  <PolymorphScrambleProp key={uuid()} data={props} />
                ))}
              </div>
            </>
          ) : (
            <div className="metadata">
              <div className="genome--string--name">Genome string</div>
              <div className="genome--string--value">
                {'0xDC25EF3F5B8A186998338A2ADA83795FBA2D695E'.substr(0, 14)}
                {'...'}
                {'0xDC25EF3F5B8A186998338A2ADA83795FBA2D695E'.substr(38)}
              </div>
            </div>
          )}

          <Button className="light-button" onClick={onOpenOptionsPopUp}>
            Scramble options
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolymorphScramblePage;
