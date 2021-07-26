import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './UsersResult.scss';
import Button from '../../button/Button.jsx';
import Pagination from '../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown.jsx';

const UsersResult = ({ query, data }) => {
  const [users, setUsers] = useState(data);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  const handleFollow = (idx) => {
    const newUsers = [...users];
    newUsers[idx].following = !newUsers[idx].following;
    setUsers(newUsers);
  };

  return (
    <div className="users--search--result">
      {users
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .slice(offset, offset + perPage)
        .map((user, i) => (
          <div className="user--box" key={uuid()}>
            <div className="details">
              <img src={user.avatar} alt={user.name} />
              <div>
                <h2>{user.name}</h2>
                <p className="desc">{user.description}</p>
                <p className="show--on--mobile--only">{`${user.followers} Followers`}</p>
                <div className="follow">
                  {user.following ? (
                    <Button className="light-border-button" onClick={() => handleFollow(i)}>
                      Following
                    </Button>
                  ) : (
                    <Button className="light-button" onClick={() => handleFollow(i)}>
                      Follow
                    </Button>
                  )}
                  <div className="followers--count">
                    <h3>{user.followers}</h3>
                    <span>Followers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="galleries">
              {user.galleries.map((gallery, index) =>
                window.innerWidth > 1230 && index < 4 ? (
                  <img src={gallery} alt="Gallery" key={uuid()} />
                ) : (
                  index < 2 && <img src={gallery} alt="Gallery" key={uuid()} />
                )
              )}
            </div>
          </div>
        ))}
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

UsersResult.propTypes = {
  query: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array]),
};

UsersResult.defaultProps = {
  query: '',
  data: [],
};

export default UsersResult;
