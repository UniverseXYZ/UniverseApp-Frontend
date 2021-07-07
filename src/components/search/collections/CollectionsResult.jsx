import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './CollectionsResult.scss';
import { defaultColors } from '../../../utils/helpers';

const CollectionsResult = ({ query, data }) => (
  <div className="collections--search--result">
    <div className="list">
      {data
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
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
                <img className="collection--avatar" src={collection.photo} alt={collection.name} />
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
  </div>
);

CollectionsResult.propTypes = {
  query: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array]),
};

CollectionsResult.defaultProps = {
  query: '',
  data: [],
};

export default CollectionsResult;
