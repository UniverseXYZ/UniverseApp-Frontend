import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import PopupComponent from '../components/popups/Popup';

export function RouterPrompt({ when, onOK, editing }) {
  const history = useHistory();

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (when && editing) {
      history.block((prompt) => {
        if (
          prompt.pathname !== '/setup-auction/auction-settings' &&
          prompt.pathname !== '/setup-auction/reward-tiers' &&
          prompt.pathname !== '/create-tiers' &&
          prompt.pathname !== '/setup-auction/review-auction'
        ) {
          setCurrentPath(prompt.pathname);
          document.getElementById('show-popup').click();
          return 'true';
        }
        return {};
      });
    } else {
      history.block(() => {});
    }

    return () => {
      history.block(() => {});
    };
  }, [history, when, editing]);

  const handleOK = useCallback(async () => {
    if (onOK) {
      const canRoute = await Promise.resolve(onOK());
      if (canRoute) {
        history.block(() => {});
        history.push(currentPath);
      }
    }
  }, [currentPath, history, onOK]);

  return <PopupComponent onClose={handleOK} />;
}

RouterPrompt.propTypes = {
  when: PropTypes.bool.isRequired,
  onOK: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};
