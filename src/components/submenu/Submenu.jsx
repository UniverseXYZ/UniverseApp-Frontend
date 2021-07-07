import React from 'react';
import PropTypes from 'prop-types';
import './Submenu.scss';
import uuid from 'react-uuid';

const Submenu = (props) => {
  const { title, subtitles } = props;
  return (
    <div className="marketplace--submenu">
      <div className="page--title">{title}</div>
      {subtitles.map((st) => (
        <div className="page--subtitle" key={uuid()}>
          {st}
        </div>
      ))}
    </div>
  );
};

Submenu.propTypes = {
  title: PropTypes.string.isRequired,
  subtitles: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default Submenu;
