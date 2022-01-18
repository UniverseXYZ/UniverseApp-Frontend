import React, { useEffect, useState, useCallback, useRef } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import SubscribePopup from '../popups/SubscribePopup.jsx';
import circleImg from '../../assets/images/circle.svg';
import tShirtImg from '../../assets/images/t-shirt.png';
import tShirtPresentBoxImg from '../../assets/images/t-shirt-present-box.png';

const EMAIL_REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const TShirtSection = () => {
  const [email, setEmail] = useState('');
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const mainSectionRef = useRef(null);
  const rightCircleRef = useRef(null);
  const leftCircleRef = useRef(null);

  const handleSubscribe = useCallback(() => {
    if (EMAIL_REGEXP.test(String(email).toLowerCase())) {
      const config = {
        headers: { 'Access-Control-Allow-Origin': '*' },
        params: {
          email,
        },
      };
      axios
        .get('https://shielded-sands-48363.herokuapp.com/addContact', config)
        .then((response) => {
          if (response.status === 200) {
            setEmail('');
            setShowSubscribePopup(true);
          } else {
            alert('OOPS! Something went wrong.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Email address is invalid.');
    }
  }, [email]);

  useEffect(() => {
    const circleR = rightCircleRef.current;
    const circleL = leftCircleRef.current;

    const scrollLoop = () => {
      if (mainSectionRef.current) {
        const yScrollPosition = window.scrollY;

        circleR.style.transform = `translate3d(${yScrollPosition * -0.01}px, ${
          yScrollPosition * -0.02
        }px, 0)`;
        circleL.style.transform = `translate3d(${yScrollPosition * -0.01}px, ${
          yScrollPosition * -0.02
        }px, 0) rotate(180deg)`;

        requestAnimationFrame(scrollLoop);
      }
    };

    if (mainSectionRef.current) {
      requestAnimationFrame(scrollLoop);
    }

    return () => cancelAnimationFrame(scrollLoop);
  }, []);

  return (
    <div ref={mainSectionRef} className="tShirt__section">
      <img ref={rightCircleRef} className="circle-r" src={circleImg} alt="Circle" />
      <img ref={leftCircleRef} className="circle-l" src={circleImg} alt="Circle" />
      <div className="tShirt__section__container">
        <div className="present__box">
          <img src={tShirtPresentBoxImg} alt="Present box" />
        </div>
        <AnimatedOnScroll animationIn="fadeIn">
          <div className="universe__protocol">
            <div>
              <h1 className="title">
                Fancy getting your hands on one of our exclusive Universe.xyz t-shirts?
              </h1>
              <div className="subscribe__form">
                <span htmlFor="subscribeInp">
                  For a chance to win, subscribe to our mailing list!
                </span>
                <div className="form__group">
                  <input
                    id="subscribeInp"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="button" className="light-button" onClick={handleSubscribe}>
                    Subscribe
                  </button>
                  <Popup closeOnDocumentClick={false} open={showSubscribePopup}>
                    <SubscribePopup close={() => setShowSubscribePopup(false)} showCongrats />
                  </Popup>
                </div>
              </div>
            </div>
            <div>
              <img src={tShirtImg} alt="t-Shirt" />
            </div>
          </div>
        </AnimatedOnScroll>
      </div>
    </div>
  );
};

export default TShirtSection;
