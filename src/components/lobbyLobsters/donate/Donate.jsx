import React from 'react';
import donatebox from '../../../assets/images/lobby-lobsters/donatebox.png';
import './Donate.scss';

const Donate = () => (
  <div className="donate--general--section">
    <div className="donate--general--section--container">
      <div className="left--block">
        <h1>100% of the Money Will Be Donated</h1>
        <p>
          Lobby Lobsters goal is to raise money to donate to efforts that sanction decentralization.
          A Lobby Lobster is a badge for collectors which proves they helped make a difference.
        </p>
      </div>
      <div className="right--block">
        <img src={donatebox} alt="box" />
      </div>
    </div>
  </div>
);
export default Donate;
