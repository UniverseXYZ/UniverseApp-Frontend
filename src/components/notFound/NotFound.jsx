import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useThemeStore } from "src/stores/themeStore";
import notFoundImg from "../../assets/images/404img.png";
import Button from "../button/Button";

const NotFound = () => {
  const setDarkMode = useThemeStore((s) => s.setDarkMode);
  const history = useRouter();

  useEffect(() => {
    setDarkMode(false);
  }, []);

  return (
    <>
      <Head>
        <title>Universe - 404</title>
      </Head>
      <div className="not__found__page">
        <div className="not__found__page__box">
          <h1>
            <img src={notFoundImg} alt="404" />
          </h1>
          <p>Oops.. page not found</p>
          <Button className="light-button" onClick={() => history.push("/")}>
            Go back
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
