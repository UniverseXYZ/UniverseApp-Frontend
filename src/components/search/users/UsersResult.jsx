import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import './UsersResult.scss';
import Button from '../../button/Button.jsx';

const UsersResult = ({ query, data }) => {
  const [users, setUsers] = useState(data);

  const handleFollow = (idx) => {
    const newUsers = [...users];
    newUsers[idx].following = !newUsers[idx].following;
    setUsers(newUsers);
  };

  return (
    <div className="users--search--result">
      {users
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .map((user, i) => (
          <div className="user--box" key={uuid()}>
            <div className="details">
              <img src={user.avatar} alt={user.name} />
              <div>
                <h2>{user.name}</h2>
                <p className="desc">{user.description}</p>
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
              {user.galleries.map(
                (gallery, index) => index < 4 && <img src={gallery} alt="Gallery" key={uuid()} />
              )}
            </div>
          </div>
        ))}
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
