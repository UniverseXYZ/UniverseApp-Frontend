import React from 'react';
import { useHistory } from 'react-router-dom';
import TimKangImg from '../../../assets/images/Tim-Kang.png';
import TylerWardImg from '../../../assets/images/Tyler-Ward.png';
import TroyMurrayImg from '../../../assets/images/Troy-Murray.png';
import MarkWardImg from '../../../assets/images/Mark-Ward.png';
import RyanShtirmerImg from '../../../assets/images/Ryan-Shtirmer.png';
import Button from '../../button/Button.jsx';

const OurTeam = () => {
  const history = useHistory();

  return (
    <div className="our__team__section">
      <div className="our__team__section__container">
        <h1 className="title">Our Team</h1>
        <div className="team__members">
          <div className="member">
            <img src={TimKangImg} alt="Tim Kang" />
            <h3>Tim Kang</h3>
          </div>
          <div className="member">
            <img src={TylerWardImg} alt="Tyler Ward" />
            <h3>Tyler Ward</h3>
          </div>
          <div className="member">
            <img src={TroyMurrayImg} alt="Troy Murray" />
            <h3>Troy Murray</h3>
          </div>
          <div className="member">
            <img src={MarkWardImg} alt="Mark Ward" />
            <h3>Mark Ward</h3>
          </div>
          <div className="member">
            <img src={RyanShtirmerImg} alt="Ryan Shtirmer" />
            <h3>Ryan Shtirmer</h3>
          </div>
        </div>
        <div className="see__full__team">
          <Button
            type="button"
            className="light-border-button"
            onClick={() => history.push('/team')}
          >
            See the Full Team
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
