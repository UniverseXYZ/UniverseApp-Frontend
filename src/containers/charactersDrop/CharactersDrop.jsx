import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './CharactersDrop.scss';
import WelcomeHead from '../../components/charactersDrop/WelcomeHead';
import Planets from '../../components/charactersDrop/Planets';
import FutureCore from '../../components/charactersDrop/FutureCore';
import AppContext from '../../ContextAPI';

const CharactersDrop = () => {
  const { setDarkMode } = useContext(AppContext);
  const history = useHistory();
  const [mobile, setMobile] = useState(false);
  return (
    <div className="characters-drop">
      <WelcomeHead />
      <Planets />
      <FutureCore />
    </div>
  );
};

export default CharactersDrop;
