import React from 'react';
import uuid from 'react-uuid';
import icon from '../../../assets/images/ETHicon.png';
import './styles/PolymorphScrambleHistory.scss';
import icon2 from '../../../assets/images/etherscan.svg';
import { History } from '../../../utils/fixtures/PolymorphHistoryPageDummyData';
import arrow from '../../../assets/images/active.svg';
import chessIcon from '../../../assets/images/chessicon.png';
import share from '../../../assets/images/shareicongrey.svg';
import closeicon from '../../../assets/images/closehistory.svg';

const PolymorphScrambleHistory = () => {
  const morphsFilter = () => {
    const element = document.querySelector('.morphs--filter--box');
    const close = document.querySelector('.closeIconClick');
    if (element.classList.contains('background--button')) {
      element.classList.remove('background--button');
      close.classList.remove('closebutton');
      close.classList.add('closeIcon');
    } else {
      element.classList.add('background--button');
      close.classList.add('closebutton');
      close.classList.remove('closeIcon');
    }
  };
  const scramblesFilter = () => {
    const element = document.querySelector('.scrambles--filter--box');
    const close = document.querySelector('.scramblescloseIconClick');
    if (element.classList.contains('background--button')) {
      element.classList.remove('background--button');
      close.classList.remove('scramblesclosebutton');
      close.classList.add('scramblescloseIcon');
    } else {
      element.classList.add('background--button');
      close.classList.add('scramblesclosebutton');
      close.classList.remove('scramblescloseIcon');
    }
  };
  return (
    <div className="history--page">
      <div className="total">
        <div className="total--title">
          <h1>Total cost of Morphs/Scrambles</h1>
        </div>
        <div className="total--price">
          <img src={icon} alt="icon" />
          <h1>0.1</h1>
        </div>
      </div>
      <div className="filter-box">
        <h1>Filter by</h1>
        <div
          className="filter--box--button morphs--filter--box"
          aria-hidden="true"
          onClick={() => morphsFilter()}
        >
          <button type="button" className="morphs--filter">
            <img src={chessIcon} alt="icon" className="chessIcon" />
            Morphs
            <img src={closeicon} alt="icon" className="closeIcon closeIconClick" />
          </button>
          <div className="box--shadow--effect--block" />
        </div>
        <div
          className="filter--box--button scrambles--filter--box"
          aria-hidden="true"
          onClick={() => scramblesFilter()}
        >
          <button type="button" className="scrambles--filter">
            <img src={chessIcon} alt="icon" className="scrambleschessIcon" />
            Scrambles
            <img
              src={closeicon}
              alt="icon"
              className="scramblescloseIcon scramblescloseIconClick"
            />
          </button>
          <div className="box--shadow--effect--block" />
        </div>
      </div>
      <div className="character--section">
        {History.map((elm) => (
          <>
            {elm.morphed ? (
              <div className="character--box" key={uuid()}>
                <div className="image--section">
                  <img src={elm.previewImage.url} alt="cover" />
                </div>
                <div className="info--section">
                  <div className="title--section">
                    <h1>{elm.name}</h1>
                    <div className="icon--section">
                      <img src={icon} alt="icon" className="eth-icon" />
                      <p>{elm.price}</p>
                      <div className="hover--icon">
                        <img src={icon2} alt="share" className="share--hover--icon" />
                        <span className="tooltiptext">View on Etherscan</span>
                      </div>
                    </div>
                  </div>
                  <div className="data--section">
                    <p>Date and Time</p>
                    <h1>
                      {elm.data} | <span>{elm.time}</span>
                    </h1>
                  </div>
                  <div className="properties--section">
                    <div className="scramble--prop">
                      <div className="prop--trait">{elm.firstMetadata.trait}</div>
                      <div className="prop--name">{elm.firstMetadata.name}</div>
                      <div className="prop--chance">{elm.firstMetadata.chance}</div>
                    </div>
                    <div className="arrow-box">
                      <img src={arrow} alt="arrow" />
                    </div>
                    <div className="scramble--prop">
                      <div className="prop--trait">{elm.firstMetadata.trait}</div>
                      <div className="prop--name">{elm.firstMetadata.name}</div>
                      <div className="prop--chance">{elm.firstMetadata.chance}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="character--box character--box--bordered">
                <div className="image--section">
                  <img src={elm.previewImage.url} alt="cover" />
                </div>
                <div className="info--section">
                  <div className="title--section">
                    <h1>{elm.name}</h1>
                    <div className="icon--section">
                      <img src={icon} alt="icon" className="eth-icon" />
                      <p>{elm.price}</p>
                      <div className="hover--icon">
                        <img src={icon2} alt="share" className="share--hover--icon" />
                        <span className="tooltiptext">View on Etherscan</span>
                      </div>
                    </div>
                  </div>
                  <div className="data--section">
                    <p>Date and Time</p>
                    <h1>
                      {elm.data} | <span>{elm.time}</span>
                    </h1>
                  </div>
                  <div className="morphed--box">
                    <h1>The character was morphed</h1>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};
export default PolymorphScrambleHistory;
