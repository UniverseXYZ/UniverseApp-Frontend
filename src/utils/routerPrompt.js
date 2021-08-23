import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import PopupComponent from '../components/popups/Popup';

export function RouterPrompt({ when, onOK }) {
  const history = useHistory();

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (when) {
      history.block((prompt) => {
        setCurrentPath(prompt.pathname);
        document.getElementById('show-popup').click();
        return 'true';
      });
    } else {
      history.block(() => {});
    }

    return () => {
      history.block(() => {});
    };
  }, [history, when]);

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
};
