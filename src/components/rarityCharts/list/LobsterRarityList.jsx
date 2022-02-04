/* eslint-disable array-callback-return */
import React from 'react';
import PropTypes from 'prop-types';
import './RarityLobsterList.scss';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown';
import '../../../containers/rarityCharts/RarityCharsLoader.scss';
import '../../../containers/rarityCharts/RarityCharts.scss';
import LobsterRarityChartsLoader from '../../../containers/rarityCharts/LobsterRarityChartsLoader';
import LobsterCard from './LobsterCard';
import SimplePagination from '../../pagination/SimplePaginations';

const LobsterRarityList = ({
  data,
  perPage,
  offset,
  setPerPage,
  setOffset,
  loading,
  page,
  setPage,
}) => {
  const sliceData = data.slice(offset, offset + perPage) || [];

  return (
    <>
      <div className="lobster-rarity--charts--list">
        <div className="list--with--selected--filters">
          {loading ? (
            <div className="grid">
              <LobsterRarityChartsLoader number={12} />
            </div>
          ) : data.length ? (
            <div className="grid">
              {sliceData.map((item, i) => (
                <LobsterCard key={item.id} item={item} index={offset + i + 1} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {data.length >= perPage ? (
        <div className="pagination__container">
          <SimplePagination
            data={data}
            perPage={perPage}
            setOffset={setOffset}
            page={page}
            setPage={setPage}
          />
          <ItemsPerPageDropdown
            itemsPerPage={[8, 16, 32]}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </div>
      ) : null}

      <div className="rarity--charts--empty lobsters">
        {!loading && !data.length ? <p>No Lobster could be found :’(</p> : <></>}
      </div>
    </>
  );
};

LobsterRarityList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  perPage: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  setOffset: PropTypes.func.isRequired,
  setPerPage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

LobsterRarityList.defaultProps = {
  loading: false,
};

export default LobsterRarityList;
