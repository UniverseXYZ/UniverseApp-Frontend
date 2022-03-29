import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { ReactComponent as InfoIcon } from '../../assets/images/info-icon.svg';

const PreviewModeSection = ({ locationState }) => {
  const history = useHistory();

  const exitPreview = () => {
    if (locationState?.savePreview) {
      history.push('/my-auctions');
    } else {
      history.goBack();
    }
  };

  return (
    <div className="preview--auction--container">
      <div className="preview--auction">
        <div>
          <InfoIcon />
          Preview mode
        </div>
        <div>
          <button type="button" onClick={exitPreview}>
            <span className="preview--auction__exit">Exit preview mode</span>
            <span className="preview--auction__exit--mobile">Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

PreviewModeSection.propTypes = {
  locationState: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default PreviewModeSection;
