import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './CollectionsResult.scss';
import { defaultColors } from '../../../utils/helpers';
import Pagination from '../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown.jsx';

const CollectionsResult = ({ query, data }) => {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  return (
    <div className="collections--search--result">
      <div className="collections--search--result--grid">
        {data
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
          .slice(offset, offset + perPage)
          .map((collection) => (
            <div className="collection--box" key={uuid()}>
              <div className="collection--box--header">
                {collection.background ? (
                  <img src={collection.background} alt={collection.name} />
                ) : !collection.background && !collection.photo ? (
                  <div
                    className="random--bg--color"
                    style={{
                      backgroundColor:
                        defaultColors[Math.floor(Math.random() * defaultColors.length)],
                    }}
                  />
                ) : (
                  <img className="blur" src={collection.photo} alt={collection.name} />
                )}
              </div>
              <div className="collection--box--body">
                {!collection.photo ? (
                  <div
                    className="random--avatar--color"
                    style={{
                      backgroundColor:
                        defaultColors[Math.floor(Math.random() * defaultColors.length)],
                    }}
                  >
                    {collection.name.charAt(0)}
                  </div>
                ) : (
                  <img
                    className="collection--avatar"
                    src={collection.photo}
                    alt={collection.name}
                  />
                )}
                <h3 className="collection--name">{collection.name}</h3>
                <div className="owner">
                  <span>by</span>
                  <a>{collection.owner.name}</a>
                </div>
              </div>
            </div>
          ))}
      </div>
      {data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).length ? (
        <div className="pagination__container">
          <Pagination data={data} perPage={perPage} setOffset={setOffset} />
          <ItemsPerPageDropdown perPage={perPage} setPerPage={setPerPage} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

CollectionsResult.propTypes = {
  query: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array]),
};

CollectionsResult.defaultProps = {
  query: '',
  data: [],
};

export default CollectionsResult;
