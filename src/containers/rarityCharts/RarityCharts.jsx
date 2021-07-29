import React, { useEffect, useContext } from 'react';
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
    </div>
  );
};

export default RarityCharts;
