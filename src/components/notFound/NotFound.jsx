import { OpenGraph } from "@app/components";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useThemeStore } from "src/stores/themeStore";
import notFoundImgOg from "../../assets/images/404-og.png";
import notFoundImg from "../../assets/images/404img.png";
import Button from "../button/Button";


const title = 'Page not found'
const description = 'Oops.. page not found'


const NotFound = () => {
  const setDarkMode = useThemeStore((s) => s.setDarkMode);
  const history = useRouter();

  useEffect(() => {
    setDarkMode(false);
  }, []);


  return (
    <>
     <OpenGraph
      title={title}
      description={description}
      image={notFoundImgOg}
    />
      <div className="not__found__page">
        <div className="not__found__page__box">
          <h1>
            <img src={notFoundImg} alt="404" />
          </h1>
          <p>{description}</p>
          <Button className="light-button" onClick={() => history.push("/")}>
            Go back
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
