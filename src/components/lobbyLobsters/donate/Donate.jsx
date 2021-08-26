import React from 'react';
import donatebox from '../../../assets/images/lobby-lobsters/donatebox.png';
import './Donate.scss';

const Donate = () => (
  <div className="donate--general--section">
    <div className="donate--general--section--container">
      <div className="left--block">
        <h1>Donating all sales to lobby and policy efforts for crypto</h1>
        <p>
          Lobby Lobsters aim to raise money that will be donated to efforts on creating policy that
          improves the space. By owning a Lobby Lobster you have a badge to prove that you have
          helped make a difference for the industry.
        </p>
      </div>
      <div className="right--block">
        <img src={donatebox} alt="box" />
      </div>
    </div>
  </div>
);
export default Donate;
