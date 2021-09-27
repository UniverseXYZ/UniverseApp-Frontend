import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import RightIcon from '../../assets/images/arrow-black.svg';

import CharacterGroup1 from '../../assets/images/character-group1.png';
import ChGroup1 from '../../assets/images/ch-group1.png';
import GroupText1 from '../../assets/images/ch-text1.png';

import CharacterGroup2 from '../../assets/images/character-group2.png';
import ChGroup2 from '../../assets/images/ch-group2.png';
import GroupText2 from '../../assets/images/ch-text2.png';

import CharacterGroup3 from '../../assets/images/character-group3.png';
import ChGroup3 from '../../assets/images/ch-group3.png';
import GroupText3 from '../../assets/images/ch-text3.png';

const Planets = () => {
  const history = useHistory();

  return (
    <div className="planets__section">
      <div className="planet1--parent">
        <div className="planet1">
          <div className="img-part bg1">
            <img src={GroupText1} alt="bg-img" className="bg-text" />
            <img src={ChGroup1} alt="character-img" className="character-img" />
            <img src={CharacterGroup1} alt="bg-img" className="bg-img" />
          </div>
          <div className="content-part">
            <p className="num">Planet 1</p>
            <h1>Adaka</h1>
            <p className="text-p">
              The planet was formed long before the Ape Ape’s came to inhabit it. Their supreme
              leader, Arkenon banished all other inhabitants to live on the icy tundras of Adaka
              after a fall out over custard, 6000 years ago.
            </p>
            <Button className="light-button" onClick={() => history.push('/planets/adaka')}>
              Discover <img src={RightIcon} alt="right-icon" />
            </Button>
          </div>
        </div>
      </div>
      <div className="planet2--parent">
        <div className="planet2">
          <div className="content-part second">
            <p className="num">Planet 2</p>
            <h1>Prosopon</h1>
            <p className="text-p">
              A thrill seeker’s paradise, Prosopon is host to a smattering of pretty inhospitable
              climates. However, there’s beauty for all that seek it on this little rock.
            </p>
            <Button className="light-button" onClick={() => history.push('/planets/prosopon')}>
              Discover <img src={RightIcon} alt="right-icon" />
            </Button>
          </div>
          <div className="img-part bg2">
            <img src={GroupText2} alt="bg-img" className="bg-text" />
            <img src={ChGroup2} alt="character-img" className="character-img" />
            <img src={CharacterGroup2} alt="bg-img" className="bg-img" />
          </div>
        </div>
      </div>
      <div className="planet3--parent">
        <div className="planet3">
          <div className="img-part bg3">
            <img src={GroupText3} alt="bg-img" className="bg-text" />
            <img src={ChGroup3} alt="character-img" className="character-img" />
            <img src={CharacterGroup3} alt="bg-img" className="bg-img" />
          </div>
          <div className="content-part">
            <p className="num">Planet 3</p>
            <h1>Kuapo</h1>
            <p className="text-p">
              Some call it the modern day New York, but it’s the year 5869 AG and the sweet smell of
              coffee isn’t waking the workers like it used to. The noise pollution is so loud,
              Forbes top planet list just ranked it number 5 in it ‘Top 10 undersirable planets to
              live’ list.
            </p>
            <Button className="light-button" onClick={() => history.push('/planets/kuapo')}>
              Discover <img src={RightIcon} alt="right-icon" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planets;
