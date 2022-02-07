import React, { useCallback, useEffect, useRef, useState } from 'react';
import useStateIfMounted from './useStateIfMounted';

export const useImageLoaded = () => {
  const [loaded, setLoaded] = useStateIfMounted(false);
  const [errored, setErrored] = useStateIfMounted(false);

  const ref = useRef();

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const onError = useCallback(() => {
    setLoaded(false);
    setErrored(true);
  }, []);

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  return [ref, loaded, onLoad, errored, onError, setLoaded];
};
