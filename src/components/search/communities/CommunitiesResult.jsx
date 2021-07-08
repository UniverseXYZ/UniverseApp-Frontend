import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './CommunitiesResult.scss';
import Button from '../../button/Button.jsx';

const CommunitiesResult = ({ query, data }) => (
  <div className="communities--search--result">
    {data
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
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
            <div>
              <Button className="light-button">Join</Button>
            </div>
          </div>
          <div className="community--box--body">
            <p className="desc">{community.description}</p>
          </div>
        </div>
      ))}
  </div>
);

CommunitiesResult.propTypes = {
  query: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array]),
};

CommunitiesResult.defaultProps = {
  query: '',
  data: [],
};

export default CommunitiesResult;
