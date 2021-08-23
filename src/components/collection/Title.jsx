import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import pencilIcon from '../../assets/images/edit.svg';
import Button from '../button/Button.jsx';
import AppContext from '../../ContextAPI';

const Title = ({ selectedCollection, saved }) => {
  const { setSavedCollectionID, setActiveView, setShowModal } = useContext(AppContext);
  const history = useHistory();
  const handleEdit = (id) => {
    setSavedCollectionID(id);
    history.push('/my-nfts/create', { tabIndex: 1, nftType: 'collection' });
  };
  return (
    <div className="collection__info">
      <div className="collection__name__desc">
        <h1>{selectedCollection.name}</h1>
      </div>
      {saved && (
        <div className="collection__edit">
          <Button
            className="light-border-button"
            onClick={() => handleEdit(selectedCollection?.id)}
          >
            <span className="hide__on__mobile">Edit</span>
            <img src={pencilIcon} alt="Edit Icon" />
          </Button>
        </div>
      )}
    </div>
  );
};

Title.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
  saved: PropTypes.bool.isRequired,
};

export default Title;
