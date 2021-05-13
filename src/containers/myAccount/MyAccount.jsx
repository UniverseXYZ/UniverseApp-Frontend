import React, { useEffect, useContext } from 'react';
import Main from '../../components/myAccount/Main';
import './MyAccount.scss';
import About from '../../components/myAccount/About';
import PersonalLogo from '../../components/myAccount/PersonalLogo';
import Social from '../../components/myAccount/Social';
import Head from '../../components/myAccount/Head';
import AppContext from '../../ContextAPI';

const MyAccount = () => {
  const { setWebsite } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setWebsite(false);
    document.title = 'Universe Minting - My Profile';
    return () => {
      document.title = 'Universe Minting';
    };
  }, []);

  return (
    <div>
      <Head />
      <Main />
      <About />
      <PersonalLogo />
      <Social />
    </div>
  );
};

export default MyAccount;
