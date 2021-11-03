import React, { useState } from 'react';
import './EditionsSelectRemove.scss';
import PropTypes from 'prop-types';
import Button from '../button/Button';

const EditionsSelectRemove = ({ nft, removeEdition, close }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEditions, setSelectedEditions] = useState([]);

  const handleSelectAll = (event) => {
    if (event.target.className === 'edition-container' || event.target.className === 'checkmark') {
      if (!selectAll) {
        setSelectedEditions(nft.tokenIds);
        setSelectAll(true);
      } else {
        setSelectedEditions([]);
        setSelectAll(false);
      }
    }
  };
  const handleSelectEdition = (event, edition) => {
    if (event.target.className === 'edition-container' || event.target.className === 'checkmark') {
      if (!selectedEditions.includes(edition)) {
        setSelectedEditions([...selectedEditions, edition]);
      } else {
        setSelectAll(false);
        const updatedEditions = selectedEditions.filter(
          (selectedEdition) => selectedEdition !== edition
        );
        setSelectedEditions(updatedEditions);
      }
    }
  };
  return (
    <>
      <ul className="remove-editions-list">
        <li>
          <label
            className="edition-container"
            aria-hidden="true"
            onClick={(event) => handleSelectAll(event)}
          >
            Select All
            <input type="checkbox" checked={selectAll} />
            <span className="checkmark" />
          </label>
        </li>
        {nft.tokenIds?.length &&
          nft.tokenIds.map((edition) => (
            <li key={edition}>
              <label
                htmlFor={edition}
                className="edition-container"
                aria-hidden="true"
                onClick={(event) => handleSelectEdition(event, edition)}
              >
                {`#${edition}`}
                <input
                  type="checkbox"
                  checked={selectedEditions?.includes(edition) || selectAll}
                  id={edition}
                />
                <span className="checkmark" />
              </label>
            </li>
          ))}
      </ul>
      <Button
        className="light-border-button remove-btn"
        onClick={() => {
          removeEdition(selectedEditions);
          close();
        }}
      >
        Remove
      </Button>
    </>
  );
};

EditionsSelectRemove.propTypes = {
  nft: PropTypes.oneOfType([PropTypes.object]).isRequired,
  removeEdition: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default EditionsSelectRemove;
