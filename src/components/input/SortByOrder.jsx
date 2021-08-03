import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import SortDownIcon from '../../assets/images/rarity-charts/sortDownIcon.svg';
import SortUpIcon from '../../assets/images/rarity-charts/sortUpIcon.svg';
import AppContext from '../../ContextAPI';
import './SortByOrder.scss';

const SortByOrder = ({ setSortDir, sortDir, setApiPage }) => {
  const [direction, setDirection] = useState(sortDir);
  const { setMyUniverseNFTsActiverPage } = useContext(AppContext);

  const handleChange = () => {
    let newDir = '';
    if (direction === 'asc') {
      newDir = 'desc';
    } else {
      newDir = 'asc';
    }
    setDirection(newDir);
    setSortDir(newDir);
    setApiPage(1);
    setMyUniverseNFTsActiverPage(0);
  };
  return (
    <div className="sort--by--order" aria-hidden="true" onClick={handleChange}>
      <div className="sort--by--order--icon">
        <img
          src={direction === 'desc' ? SortDownIcon : SortUpIcon}
          alt={direction === 'desc' ? 'Arrow Down' : 'Arrow Up'}
        />
      </div>
      <div className="box--shadow--effect--block" />
    </div>
  );
};
SortByOrder.propTypes = {
  setSortDir: PropTypes.func.isRequired,
  sortDir: PropTypes.bool.isRequired,
  setApiPage: PropTypes.func.isRequired,
};
export default SortByOrder;
