import React, { useEffect, useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import ItemsPerPageDropdown from '../../components/pagination/ItemsPerPageDropdown';
import Pagination from '../../components/pagination/Pagionation';
import RarityRankPopup from '../../components/popups/RarityRankPopup';
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

  useEffect(() => {
    setDarkMode(true);
  }, []);

  return (
    <div className="rarity--charts--page">
      <Welcome />
      <div className="rarity--charts--page--container">
        <Filters data={PolymorphRarityCharts} getData={(find) => setPolymorphRarityChart(find)} />
        <List data={polymorphRarityData} perPage={perPage} offset={offset} />
        {polymorphRarityData.length ? (
          <div className="pagination__container">
            <Pagination data={polymorphRarityData} perPage={perPage} setOffset={setOffset} />
            <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
          </div>
        ) : (
          <></>
        )}
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
