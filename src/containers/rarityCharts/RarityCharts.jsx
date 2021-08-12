import React, { useEffect, useContext, useState } from 'react';
import ItemsPerPageDropdown from '../../components/pagination/ItemsPerPageDropdown';
import Pagination from '../../components/pagination/Pagionation';
import Filters from '../../components/rarityCharts/filters/Filters';
import List from '../../components/rarityCharts/list/List';
import Welcome from '../../components/rarityCharts/welcome/Welcome';
import AppContext from '../../ContextAPI';
import { PolymorphRarityCharts } from '../../utils/fixtures/RarityChartsDummyData';
import './RarityCharts.scss';
import RarityChartsLoader from './RarityChartsLoader';

const RarityCharts = () => {
  const { setDarkMode } = useContext(AppContext);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(9);
  const [polymorphRarityData, setPolymorphRarityChart] = useState([...PolymorphRarityCharts]);
  const [desc, setDesc] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDarkMode(true);
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

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
        {loading ? (
          <RarityChartsLoader number={9} />
        ) : (
          <>
            <List
              data={polymorphRarityData}
              perPage={perPage}
              setPerPage={setPerPage}
              offset={offset}
              setOffset={setOffset}
            />
          </>
        )}
        {/* {polymorphRarityData.length ? (
          <div className="pagination__container">
            <Pagination data={polymorphRarityData} perPage={perPage} setOffset={setOffset} />
            <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
          </div>
        ) : (
          <></>
        )} */}
      </div>
    </div>
  );
};

export default RarityCharts;
