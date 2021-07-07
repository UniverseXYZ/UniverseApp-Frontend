import React, { useState } from 'react';
import characterImg from '../../assets/images/character.png';
import Button from '../../components/button/Button';
import Pagination from '../../components/pagination/Pagionation';
import './CharacterPage.scss';
import {
  PLACEHOLDER__GLOBAL__DATA,
  PLACEHOLDER__ACTIVE__DATA,
} from '../../utils/fixtures/CharacterPageDummyData';

const CharacterPage = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabs = ['Global activity', '1/1 activity'];
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(6);
  const [value, setValue] = useState(0);

  return (
    <div className="character__page">
      <div className="character__page__head">
        <div className="head container">
          <div className="character__picture">
            <img src={characterImg} alt="Character" />
          </div>
          <div className="character__description">
            <h1>Zhamere</h1>
            <h3 className="character__name">Beard Wendigo</h3>
            <p className="name__description">
              Scelerisque sit facillisi elit ultrices. Purus dui velit, porttitor cursus eu. Aliquet
              lacus enim porta mi in ipsum massa. Sed iaculis nisi neque enim egestas.
            </p>
            <h3 className="bonding__curve">Bonding Curve</h3>
            <div className="character__bonding__curve">
              <div className="character__bar">
                <input
                  type="range"
                  value={value}
                  min="0"
                  max="25000"
                  onChange={(e) => setValue(e.target.value)}
                />
                <div
                  className="minted__div"
                  style={{
                    left: `calc(100% / 25000 * ${value} + 18px - ${value} * 40px / 25000 )`,
                  }}
                >
                  {value}/25000 minted
                  <span />
                </div>
              </div>
              <div className="character__eth">
                <p className="left">0.1 ETH</p>
                <p className="right">24 ETH</p>
              </div>
            </div>
            <p className="price">Price: 3 ETH</p>
            <div className="character__buttons">
              <Button className="light-button">Mint reprint</Button>
              <Button className="light-border-button">1/1 auction</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="character__page__body container">
        <h1 className="character__activity__header">Activity</h1>
        <div className="character__activity__div">
          <ul className="tabs">
            {tabs.map((tab, index) => (
              <li
                className={selectedTabIndex === index ? 'active' : ''}
                onClick={() => setSelectedTabIndex(index)}
                aria-hidden="true"
              >
                {tab}
              </li>
            ))}
          </ul>
          {selectedTabIndex === 0 && (
            <div className="global__activity">
              {PLACEHOLDER__GLOBAL__DATA.slice(offset, offset + perPage).map((elm, i) => (
                <div className="activity__div">
                  <div className="icon__div" style={{ background: `${elm.background}` }}>
                    <img src={elm.icon} alt="Listed" />
                  </div>
                  <div className="activity__description">
                    <div>
                      <h4>{elm.name}</h4>
                      {elm.status === 'transferred' ? (
                        <p className="action">
                          0xf4b4a5 <span>{elm.status}</span> {elm.text}
                        </p>
                      ) : (
                        <p className="action">
                          <span>{elm.status}</span> {elm.text}
                        </p>
                      )}
                    </div>
                    <div className="price">
                      <h4>{elm.cash}</h4>
                      <p>{elm.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedTabIndex === 1 && (
            <div className="active__activity">
              {PLACEHOLDER__ACTIVE__DATA.slice(offset, offset + perPage).map((elm, i) => (
                <div className="activity__div">
                  <div className="icon__div" style={{ background: `${elm.background}` }}>
                    <img src={elm.icon} alt="Listed" />
                  </div>
                  <div className="activity__description">
                    <div>
                      <h4>{elm.name}</h4>
                      {elm.status === 'transferred' ? (
                        <p className="action">
                          0xf4b4a5 <span>{elm.status}</span> {elm.text}
                        </p>
                      ) : (
                        <p className="action">
                          <span>{elm.status}</span> {elm.text}
                        </p>
                      )}
                    </div>
                    <div className="price">
                      <h4>{elm.cash}</h4>
                      <p>{elm.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedTabIndex === 0 ? (
          <div className="pagination__container">
            <Pagination data={PLACEHOLDER__GLOBAL__DATA} perPage={perPage} setOffset={setOffset} />
          </div>
        ) : (
          <div className="pagination__container">
            <Pagination data={PLACEHOLDER__ACTIVE__DATA} perPage={perPage} setOffset={setOffset} />
          </div>
        )}
        <div className="character__planet">
          <h1 className="character__planet__header">More from this planet</h1>
          <div className="planet__items__list">
            <div className="planet__item">
              <img src={characterImg} alt="Character" />
              <h3 className="planet__item__title">Bones</h3>
              <p className="planet__item__name">Skeleton Dude</p>
              <div className="buttons">
                <Button className="light-button">Mint reprint</Button>
                <Button className="light-border-button">1/1 auction</Button>
              </div>
            </div>
            <div className="planet__item">
              <img src={characterImg} alt="Character" />
              <h3 className="planet__item__title">Grim</h3>
              <p className="planet__item__name">Skeleton Dude</p>
              <div className="buttons">
                <Button className="light-button">Mint reprint</Button>
                <Button className="light-border-button">1/1 auction</Button>
              </div>
            </div>
            <div className="planet__item">
              <img src={characterImg} alt="Character" />
              <h3 className="planet__item__title">Baron Samedi</h3>
              <p className="planet__item__name">Skeleton Dude</p>
              <div className="buttons">
                <Button className="light-button">Mint reprint</Button>
                <Button className="light-border-button">1/1 auction</Button>
              </div>
            </div>
          </div>
          <Button className="light-border-button">View planet</Button>
        </div>
      </div>
    </div>
  );
};
export default CharacterPage;
