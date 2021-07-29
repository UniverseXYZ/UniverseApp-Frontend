import React, { useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import RarityRankPopup from '../../components/popups/RarityRankPopup';
import Filters from '../../components/rarityCharts/filters/Filters';
import List from '../../components/rarityCharts/list/List';
import Welcome from '../../components/rarityCharts/welcome/Welcome';
import AppContext from '../../ContextAPI';
import './RarityCharts.scss';

const RarityCharts = () => {
  const { setDarkMode } = useContext(AppContext);
  useEffect(() => {
    setDarkMode(true);
  }, []);
  return (
    <div className="rarity--charts--page">
      <Welcome />
      <div className="rarity--charts--page--container">
        <Filters />
        <List />
      </div>
      <Popup
        trigger={
          <button type="button" className="light-button">
            Rarity rank
          </button>
        }
      >
        {(close) => <RarityRankPopup onClose={close} />}
      </Popup>
    </div>
  );
};

export default RarityCharts;
