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
  const [polymorphRarityData, setPolymorphRarityChart] = useState([...PolymorphRarityCharts]);
  const [desc, setDesc] = useState(false);

  useEffect(() => {
    setDarkMode(true);
  }, []);

  return (
    <div className="rarity--charts--page">
      <Welcome />
      <div className="rarity--charts--page--container">
        <Filters
          data={PolymorphRarityCharts}
          getData={(find) => setPolymorphRarityChart(find)}
          getDesc={(value) => setDesc(value)}
          desc={desc}
        />
        <List data={polymorphRarityData} perPage={perPage} offset={offset} />
        <div className="pagination__container">
          <Pagination data={polymorphRarityData} perPage={perPage} setOffset={setOffset} />
          <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
        </div>
      </div>
    </div>
  );
};

export default RarityCharts;
