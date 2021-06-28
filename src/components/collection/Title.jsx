import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import pencilIcon from '../../assets/images/edit.svg';
import Button from '../button/Button.jsx';
import AppContext from '../../ContextAPI';

const Title = ({ selectedCollection, saved }) => {
  const { setSavedCollectionID, setActiveView, setShowModal } = useContext(AppContext);
  const handleEdit = (id) => {
    document.body.classList.add('no__scroll');
    setSavedCollectionID(id);
    setActiveView('collection');
    setShowModal(true);
  };
  return (
    <div className="collection__info">
      <div className="collection__name__desc">
        <h1>{selectedCollection.name}</h1>
      </div>
      {saved && (
        <div className="collection__edit">
          <Button className="light-border-button" onClick={() => handleEdit(selectedCollection.id)}>
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
