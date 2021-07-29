import React, { useEffect, useContext, useState } from 'react';
import ItemsPerPageDropdown from '../../components/pagination/ItemsPerPageDropdown';
import Pagination from '../../components/pagination/Pagionation';
import Filters from '../../components/rarityCharts/filters/Filters';
import List from '../../components/rarityCharts/list/List';
import Welcome from '../../components/rarityCharts/welcome/Welcome';
import AppContext from '../../ContextAPI';
import { PolymorphRarityCharts } from '../../utils/fixtures/RarityChartsDummyData';
import './RarityCharts.scss';

const RarityCharts = () => {
  const { setDarkMode } = useContext(AppContext);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  useEffect(() => {
    setDarkMode(true);
  }, []);

  return (
    <div className="rarity--charts--page">
      <Welcome />
      <div className="rarity--charts--page--container">
        <Filters />
        <List data={PolymorphRarityCharts} perPage={perPage} offset={offset} />
        <div className="pagination__container">
          <Pagination data={PolymorphRarityCharts} perPage={perPage} setOffset={setOffset} />
          <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>
    </div>
  );
};

export default RarityCharts;
