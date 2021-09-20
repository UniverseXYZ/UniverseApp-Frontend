import React from 'react';
import PropTypes from 'prop-types';
import { defaultColors, getCollectionBackgroundColor } from '../../utils/helpers';

const Avatar = ({ selectedCollection }) => {
  console.log(selectedCollection);
  console.log(selectedCollection.name.charAt(0));
  console.log(selectedCollection.id);
  console.log(
    Math.floor((selectedCollection.name.charAt(0) * selectedCollection.id) % defaultColors.length)
  );
  return (
    <div className="collection__image">
      {!selectedCollection.coverUrl ? (
        <div
          className="random__bg__color"
          style={{
            backgroundColor:
              defaultColors[
                Math.floor(
                  (selectedCollection.name.charCodeAt(0) * selectedCollection.id) %
                    defaultColors.length
                )
              ],
          }}
        >
          {selectedCollection.name.charAt(0)}
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: getCollectionBackgroundColor(collection),
          }}
        />
      )}
    </div>
  );
};

Avatar.propTypes = {
  selectedCollection: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Avatar;
