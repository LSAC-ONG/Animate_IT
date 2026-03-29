import './Homepage.scss'
import title from '../assets/title_new.png'
import Nav from "./Nav";
import { useState, useEffect, useRef } from 'react';
import Carousel from './Carousel/Carousel'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Homepage() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= 400
  );
  const [isTablet, setIsTablet] = useState(
    () => window.innerWidth <= 700
  );
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth > 700
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: 700px)`);
    const mq2 = window.matchMedia(`(max-width: 400px)`);
    const mq3 = window.matchMedia(`(min-width: 701px)`);

    // handler when media query status changes
    const handler = (e) => setIsMobile(e.matches);
    const handler2 = (e) => setIsMobile(e.matches);
    const handler3 = (e) => setIsMobile(e.matches);

    // set the initial value
    setIsTablet(mq.matches);
    setIsMobile(mq2.matches);
    setIsDesktop(mq3.matches);

    // listen for changes
    mq.addEventListener('change', handler);
    mq2.addEventListener('change', handler2);
    mq3.addEventListener('change', handler3);

    // cleanup
    return () => mq.removeEventListener('change', handler);
  });

  const innerRef = useRef(null);

  useGSAP(() => {
    gsap.to(innerRef.current, {
      rotation: 360,
      duration: 1.5,
      ease: 'power2.inOut',
      repeat: -1
    });
  });

  return (
    <>
      <div className="homepage-container">
        <div className="title">
          <img src={title} alt="title-home" />
          <div className="center">
            <h1>
              IT
            </h1>
          </div>
        </div>{
          isDesktop?<Carousel VISIBLE={5} MAX_HEIGHT={'40vh'} />:(isTablet?
            (isMobile?<Carousel VISIBLE={1} MAX_HEIGHT={'30vh'} />:
            <Carousel VISIBLE={3} MAX_HEIGHT={'40vh'} />)
          :<Carousel VISIBLE={5} MAX_HEIGHT={'40vh'} />)
        }
        <div className="welcome">
          <p>Pick a category suitable for your project!</p>
        </div>
      </div>
      <div id="preloader" className="preloader-wrapper">
  
        <svg viewBox="0 0 100 100" className="preloader-svg">
          
          <polygon className="retracting-shape shape-top" points="50,50 -2000,-2000 2100,-2000" />
          <polygon className="retracting-shape shape-right" points="50,50 2100,-2000 2100,2100" />
          <polygon className="retracting-shape shape-bottom" points="50,50 2100,2100 -2000,2100" />
          <polygon className="retracting-shape shape-left" points="50,50 -2000,2100 -2000,-2000" />

          <g id="center-circle" ref={innerRef}>
            <circle cx="50" cy="50" r="15" className="center-bg" />
            <circle cx="50" cy="50" r="3" className="center-dot" />
          </g>

        </svg>

      </div>
    </>
  )
}

export default Homepage