import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button.jsx';
import closeIcon from '../../assets/images/cross.svg';
import AppContext from '../../ContextAPI';
import person from '../../assets/images/randomise-person-images/person.png';

const PolymorphScrambleCongratulationPopup = ({ onClose, onOpenOptionsPopUp, polymorph }) => {
  // const { selectedNftForScramble, setSelectedNftForScramble } = useContext(AppContext);
  const history = useHistory();
  const { polymorphsFilter, navigateToMyNFTsPage } = useContext(AppContext);

  return (
    <div className="polymorph_popup">
      <img className="close" src={closeIcon} alt="Close" onClick={onClose} aria-hidden="true" />
      <h1>Congratulations!</h1>
      <p className="desc">You have sucessfully scrambled your Polymorphic Universe NFT</p>
      <div className="polymorph_confirmation_image">
        <img src={polymorph?.data?.image} alt="soldier" key={uuid()} />
      </div>
      <div className="button__div_polymorph">
        <Button
          className="light-button"
          onClick={() => {
            navigateToMyNFTsPage(polymorphsFilter);
          }}
        >
          My Polymorphs
        </Button>
        <Button
          className="light-border-button"
          onClick={() => {
            onClose();
            onOpenOptionsPopUp();
          }}
        >
          Scramble again
        </Button>
      </div>
    </div>
  );
};

PolymorphScrambleCongratulationPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpenOptionsPopUp: PropTypes.func.isRequired,
  polymorph: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PolymorphScrambleCongratulationPopup;
