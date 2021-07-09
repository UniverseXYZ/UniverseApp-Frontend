import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './GalleriesResult.scss';
import uuid from 'react-uuid';
import Pagination from '../../pagination/Pagionation.jsx';
import ItemsPerPageDropdown from '../../pagination/ItemsPerPageDropdown.jsx';

const GalleriesResult = ({ query, data }) => {
  const [galleries, setGalleries] = useState(data);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);

  const handleLikeClick = (id) => {
    setGalleries((prevState) =>
      prevState.map((el) =>
        el.id === id
          ? {
              ...el,
              likesCount: el.liked ? el.likesCount - 1 : el.likesCount + 1,
              liked: !el.liked,
            }
          : el
      )
    );
  };

  return (
    <div className="galleries--search--result">
      <div className="galleries--search--result--grid">
        {galleries
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
          .slice(offset, offset + perPage)
          .map((gallery) => (
            <div className="gallery--box" key={uuid()}>
              <div className="gallery--box--top">
                {gallery.photos.map(
                  (photo, index) =>
                    index < 3 && <div key={uuid()} style={{ backgroundImage: `url(${photo})` }} />
                )}
              </div>
              <div className="gallery--box--middle">
                <h2>{gallery.name}</h2>
                <div className="likes--count">
                  <div>
                    <svg
                      className={gallery.liked ? 'fill' : ''}
                      onClick={() => handleLikeClick(gallery.id)}
                      width="16"
                      height="14"
                      viewBox="0 0 16 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.9998 13.3996C8.15207 13.3996 8.36959 13.302 8.52911 13.2114C12.6113 10.7016 15.1998 7.78044 15.1998 4.8105C15.1998 2.34253 13.4379 0.599609 11.1611 0.599609C9.7974 0.599609 8.7372 1.30007 8.07164 2.38196C8.03914 2.4348 7.96094 2.43454 7.92872 2.38153C7.27515 1.30607 6.20174 0.599609 4.83848 0.599609C2.56174 0.599609 0.799805 2.34253 0.799805 4.8105C0.799805 7.78044 3.38832 10.7016 7.47775 13.2114C7.63002 13.302 7.84754 13.3996 7.9998 13.3996Z"
                        stroke="black"
                        strokeOpacity="0.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="tooltiptext">
                      <div className="likers--text">{`${gallery.likesCount} people liked this`}</div>
                      <div className="likers--avatars">
                        <img src={gallery.user.avatar} alt="Liker" />
                        <img src={gallery.user.avatar} alt="Liker" />
                        <img src={gallery.user.avatar} alt="Liker" />
                        <img src={gallery.user.avatar} alt="Liker" />
                        <img src={gallery.user.avatar} alt="Liker" />
                        <img src={gallery.user.avatar} alt="Liker" />
                      </div>
                    </div>
                  </div>
                  <span>{gallery.likesCount}</span>
                </div>
              </div>
              <div className="gallery--box--bottom">
                <div className="user">
                  <img src={gallery.user.avatar} alt={gallery.user.name} />
                  <span>by</span>
                  <a>{gallery.user.name}</a>
                </div>
                <div className="items--count">{`${gallery.count} Items`}</div>
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

GalleriesResult.propTypes = {
  query: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array]),
};

GalleriesResult.defaultProps = {
  query: '',
  data: [],
};

export default GalleriesResult;
