import React, { useState } from 'react';
import characterImg from '../../assets/images/character.png';
import Button from '../../components/button/Button';
import listedIcon from '../../assets/images/listed.svg';
import mintedIcon from '../../assets/images/minted.svg';
import purchasedIcon from '../../assets/images/purchased.svg';
import tranferredIcon from '../../assets/images/transferred.svg';
import Pagination from '../../components/pagination/Pagionation';
import './CharacterPage.scss';

const CharacterPage = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const tabs = ['Global activity', '1/1 activity'];
  const data = [{}];
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
                {/* <div className="slider" /> */}
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
              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(255, 178, 62, 0.1)' }}>
                  <img src={listedIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere #424</h4>
                    <p className="action">
                      <span>Listed</span> by 0xf4b4a5 3 hours ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 ETH</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(108, 158, 255, 0.1)' }}>
                  <img src={mintedIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere #427</h4>
                    <p className="action">
                      <span>Minted</span> by 0xf4b4a5 2 days ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 COMP</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(78, 208, 75, 0.1)' }}>
                  <img src={purchasedIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere #342</h4>
                    <p className="action">
                      <span>Purchased</span> by 0xf4b4a5 3 hours ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>1.00 BOND</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(209, 70, 243, 0.1)' }}>
                  <img src={tranferredIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere #287</h4>
                    <p className="action">
                      0xf4b4a5 <span>transferred</span> by 0xf4b4a5 3 hours ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 LINK</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(255, 178, 62, 0.1)' }}>
                  <img src={listedIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere #424</h4>
                    <p className="action">
                      <span>Listed</span> by 0xf4b4a5 3 hours ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 ETH</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(108, 158, 255, 0.1)' }}>
                  <img src={mintedIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere #424</h4>
                    <p className="action">
                      <span>Minted</span> by 0xf4b4a5 2 days ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 ETH</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedTabIndex === 1 && (
            <div className="global__activity">
              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(209, 70, 243, 0.1)' }}>
                  <img src={tranferredIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere 1/1</h4>
                    <p className="action">
                      0xf4b4a5 <span>transferred</span> by 0xf4b4a5 3 hours ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>1.00 BOND</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(78, 208, 75, 0.1)' }}>
                  <img src={purchasedIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere 1/1</h4>
                    <p className="action">
                      <span>Purchased</span> by 0xf4b4a5 3 hours ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 COMP</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(255, 178, 62, 0.1)' }}>
                  <img src={listedIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere 1/1</h4>
                    <p className="action">
                      <span>Listed</span> by 0xf4b4a5 3 hours ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 ETH</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(209, 70, 243, 0.1)' }}>
                  <img src={tranferredIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere 1/1</h4>
                    <p className="action">
                      0xf4b4a5 <span>transferred</span> by 0xf4b4a5 3 hours ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 LINK</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(209, 70, 243, 0.1)' }}>
                  <img src={tranferredIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere 1/1</h4>
                    <p className="action">
                      0xf4b4a5 <span>transferred</span> by 0xf4b4a5 3 hours ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 ETH</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>

              <div className="activity__div">
                <div className="icon__div" style={{ background: 'rgba(108, 158, 255, 0.1)' }}>
                  <img src={mintedIcon} alt="Listed" />
                </div>
                <div className="activity__description">
                  <div>
                    <h4>Zhamere 1/1</h4>
                    <p className="action">
                      <span>Minted</span> by 0xf4b4a5 2 days ago
                    </p>
                  </div>
                  <div className="price">
                    <h4>2.00 ETH</h4>
                    <p>$84</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="pagination__container">
          <Pagination data={data} perPage={perPage} setOffset={setOffset} />
        </div>
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
