// import './UniverseNFTs.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import '../pagination/Pagination.scss';

import LobsterRarityFilters from '../rarityCharts/filters/LobsterRarityFilters';
// import '../../containers/rarityCharts/LobsterRarityCharts.scss';
import { categoriesArray } from '../../containers/rarityCharts/categories';
import LobsterRarityList from '../rarityCharts/list/LobsterRarityList';
import CollectionDropdown from './CollectionDropdown';
import { useLobsterContext } from '../../contexts/LobsterContext';
import { useThemeStore } from 'src/stores/themeStore';

const MyLobstersChart = ({ isDropdownOpened, setIsDropdownOpened, scrollContainer }) => {
  const { userLobstersWithMetadata, loadLobsterMetadata } = useLobsterContext();
  const setDarkMode = useThemeStore(s => s.setDarkMode);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [categories, setCategories] = useState(categoriesArray);
  const [filteredLobsters, setFilteredLobsters] = useState(userLobstersWithMetadata);
  const [categoriesIndexes, setCategoriesIndexes] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLobsterMetadata();
    setLoading(false);
    setDarkMode(true);
  }, []);

  useEffect(() => {
    setFilteredLobsters(userLobstersWithMetadata);
  }, [userLobstersWithMetadata]);

  const resetPagination = () => {
    setPage(0);
    setOffset(0);
  };

  useEffect(() => {
    const filtered = userLobstersWithMetadata
      .filter((lobster) => lobster.id.includes(searchText))
      .sort((a, b) => {
        let sort = -1;
        if (sortDir === 'asc') {
          sort = -sort;
        }
        if (+a.id < +b.id) {
          return sort;
        }
        return -sort;
      });
    resetPagination();
    setFilteredLobsters(filtered);
  }, [searchText, sortDir]);

  const handleCategoryFilterChange = (idx, traitIdx) => {
    const newCategories = [...categories];
    const attribute = newCategories[idx];
    const trait = attribute.traits[traitIdx];
    trait.checked = !trait.checked;
    setCategories(newCategories);
    let newFilter = [];
    if (trait.checked) {
      newFilter = [...filter, [attribute.value, trait.name]];
    } else if (attribute.value === 'righthand' || attribute.value === 'lefthand') {
      newFilter = filter.filter((f) => !(f[0] === attribute.value && f[1] === trait.name));
    } else {
      newFilter = filter.filter((f) => f[1] !== trait.name);
    }
    setFilter(newFilter);
  };

  const scrollToNftContainer = () => {
    if (scrollContainer && scrollContainer.current) {
      scrollContainer.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    scrollToNftContainer();
  }, [perPage, page]);

  return (
    <div className="lobster-rarity--charts--page--container">
      <LobsterRarityFilters
        setSortField={setSortField}
        searchText={searchText}
        setSearchText={setSearchText}
        setSortDir={setSortDir}
        sortDir={sortDir}
        resetPagination={resetPagination}
        categories={categories}
        setCategories={setCategories}
        categoriesIndexes={categoriesIndexes}
        setCategoriesIndexes={setCategoriesIndexes}
        resultsCount={filteredLobsters.length}
        handleCategoryFilterChange={handleCategoryFilterChange}
        CollectionFilter={() => (
          <CollectionDropdown
            isDropdownOpened={isDropdownOpened}
            setIsDropdownOpened={setIsDropdownOpened}
          />
        )}
      />
      <LobsterRarityList
        data={filteredLobsters}
        perPage={perPage}
        setPerPage={setPerPage}
        offset={offset}
        setOffset={setOffset}
        page={page}
        setPage={setPage}
        loading={loading}
      />
    </div>
  );
};
MyLobstersChart.propTypes = {
  isDropdownOpened: PropTypes.bool.isRequired,
  setIsDropdownOpened: PropTypes.func.isRequired,
  scrollContainer: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default MyLobstersChart;
