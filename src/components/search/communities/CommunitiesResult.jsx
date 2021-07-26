import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './CommunitiesResult.scss';
import Button from '../../button/Button.jsx';
import Pagination from '../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown.jsx';

const CommunitiesResult = ({ query, data }) => {
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  return (
    <div className="communities--search--result">
      <div className="communities--search--result--grid">
        {data
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
          .slice(offset, offset + perPage)
          .map((community) => (
            <div className="community--box" key={uuid()}>
              <div className="community--box--header">
                <div className="avatar--title--members">
                  <div>
                    <img src={community.photo} alt={community.name} />
                  </div>
                  <div>
                    <h3>{community.name}</h3>
                    <p>{`${community.members} members`}</p>
                  </div>
                </div>
                <div className="show--on--desktop--only">
                  <Button className="light-button">Join</Button>
                </div>
              </div>
              <div className="community--box--body">
                <p className="desc">{community.description}</p>
              </div>
              <div className="hide--on--desktop--only">
                <Button className="light-button">Join</Button>
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

CommunitiesResult.propTypes = {
  query: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array]),
};

CommunitiesResult.defaultProps = {
  query: '',
  data: [],
};

export default CommunitiesResult;
