import React from 'react';
import { useHistory } from 'react-router-dom';
import WrapperCenter from '../polymorphs/WrapperCenter';
import Button from '../button/Button';
import nextBtnIcon from '../../assets/images/arrow-black.svg';
import adakaPlanetImg from '../../assets/images/planet1-charachters/planet-adaka-core-drops.png';
import prosoponPlanetImg from '../../assets/images/planet2-charachters/planet-prosopon-core-drops.png';
import kuapoPlanetImg from '../../assets/images/planet3-charachters/planet-kuapo-core-drops.png';
import './styles/Planets1.scss';

const Planets = () => {
  const history = useHistory();

  return (
    <div className="planets--parent">
      {/* adaka block  */}
      <div className="planets--adaka--section">
        <WrapperCenter>
          <div className="planet--image--block">
            <img src={adakaPlanetImg} alt="img" />
          </div>
          <div className="description--block">
            <p className="planet--number">Planet 1</p>
            <h3 className="planet--name">Adaka</h3>
            <p className="description">
              The planet was formed long before the Ape Ape’s came to inhabit it. Their supreme
              leader,Arkenon banished all other inhabitants to live on the icy tundras of Adaka
              after a fall out over custard, 6000 years ago.
            </p>
            <Button
              type="button"
              className="light-button"
              onClick={() => history.push('/planets/adaka')}
            >
              Discover
              <img src={nextBtnIcon} alt="img" />
            </Button>
          </div>
        </WrapperCenter>
      </div>
      {/* prosopon block */}
      <div className="planets--prosopon--section">
        <WrapperCenter>
          <div className="description--block">
            <p className="planet--number">Planet 2</p>
            <h3 className="planet--name">Prosopon</h3>
            <p className="description">
              A thrill seeker’s paradise, Prosopon is host to a smattering of pretty inhospitable
              climates. However, there’s beauty for all that seek it on this little rock.
            </p>
            <Button
              type="button"
              className="light-button"
              onClick={() => history.push('/planets/prosopon')}
            >
              Discover
              <img src={nextBtnIcon} alt="img" />
            </Button>
          </div>
          <div className="planet--image--block">
            <img src={prosoponPlanetImg} alt="img" />
          </div>
        </WrapperCenter>
      </div>
      {/* kuapo block */}
      <div className="planets--kuapo--section">
        <WrapperCenter>
          <div className="planet--image--block">
            <img src={kuapoPlanetImg} alt="img" />
          </div>
          <div className="description--block">
            <p className="planet--number">Planet 3</p>
            <h3 className="planet--name">Kuapo</h3>
            <p className="description">
              Some call it the modern day New York, but it’s the year 5869 AG and the sweet smell of
              coffee isn’t waking the workers like it used to. The noise pollution is so loud,
              Forbes top planet list just ranked it number 5 in it ‘Top 10 undersirable planets to
              live’ list.
            </p>
            <Button
              type="button"
              className="light-button"
              onClick={() => history.push('/planets/kuapo')}
            >
              Discover
              <img src={nextBtnIcon} alt="img" />
            </Button>
          </div>
        </WrapperCenter>
      </div>
    </div>
  );
};

export default Planets;
