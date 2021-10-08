import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import bubleIcon from '../../assets/images/text-bubble.png';
import Exclamation from '../../assets/images/Exclamation.svg';

const NoAuctionsFound = ({ title, desc, btnText, btnAction }) => {
  const { loggedInArtist } = useAuthContext();
  const history = useHistory();
  return (
    <div className="empty__auction">
      <img src={bubleIcon} alt="Buble" />
      <h3>{title}</h3>
      {!loggedInArtist.name || !loggedInArtist.avatar ? (
        <div className="warning__div">
          <img src={Exclamation} alt="Warning" />
          <p>
            Please, fill out the profile details before you set up an auction.{' '}
            <button type="button" onClick={() => history.push('/my-account')}>
              Go to my profile
            </button>
            .
          </p>
        </div>
      ) : (
        <p className="desc">{desc}</p>
      )}
      <button
        type="button"
        className="light-button set_up"
        onClick={() => history.push(btnAction)}
        disabled={!loggedInArtist.name || !loggedInArtist.avatar}
      >
        {btnText}
      </button>
    </div>
  );
};

NoAuctionsFound.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  btnText: PropTypes.string,
  btnAction: PropTypes.string,
};

NoAuctionsFound.defaultProps = {
  desc: 'Create your first auction by clicking the button below',
  btnText: 'Set up auction',
  btnAction: '/setup-auction',
};

export default NoAuctionsFound;
