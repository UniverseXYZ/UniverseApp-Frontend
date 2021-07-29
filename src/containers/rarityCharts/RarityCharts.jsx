import React, { useEffect, useContext } from 'react';
import Filters from '../../components/rarityCharts/filters/Filters';
import List from '../../components/rarityCharts/list/List';
import Welcome from '../../components/rarityCharts/welcome/Welcome';
import AppContext from '../../ContextAPI';

const RarityCharts = () => {
  console.log('Rarity Charts page');
  const { setDarkMode } = useContext(AppContext);
  useEffect(() => {
    setDarkMode(true);
  }, []);
  return (
    <div className="rarity--charts--page">
      <Welcome />
      <Filters />
      <List />
    </div>
  );
};

export default RarityCharts;
