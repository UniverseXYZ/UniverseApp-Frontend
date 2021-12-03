import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { AnimatedOnScroll } from 'react-animated-css-onscroll';
import SubscribePopup from '../popups/SubscribePopup.jsx';
import circleImg from '../../assets/images/circle.svg';
import tShirtImg from '../../assets/images/t-shirt.png';
import tShirtPresentBoxImg from '../../assets/images/t-shirt-present-box.png';

const TShirtSection = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
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
            document.getElementById('sub-hidden-btn').click();
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
  };

  useEffect(() => {
    const circleR = document.querySelector('#tShirt-circle-r');
    const circleL = document.querySelector('#tShirt-circle-l');

    const scrollLoop = () => {
      if (document.querySelector('.about__section')) {
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

    if (document.querySelector('.about__section')) {
      requestAnimationFrame(scrollLoop);
    }

    return () => cancelAnimationFrame(scrollLoop);
  }, []);

  return (
    <div className="tShirt__section">
      <img id="tShirt-circle-r" className="circle-r" src={circleImg} alt="Circle" />
      <img id="tShirt-circle-l" className="circle-l" src={circleImg} alt="Circle" />
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
                  <Popup
                    trigger={
                      <button
                        type="button"
                        id="sub-hidden-btn"
                        aria-label="hidden"
                        style={{ display: 'none' }}
                      />
                    }
                  >
                    {(close) => <SubscribePopup close={close} showCongrats />}
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
