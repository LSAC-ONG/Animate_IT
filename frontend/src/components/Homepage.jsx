import './Homepage.scss'
import title from '../assets/title_new.png'
import Nav from "./Nav";
import { useState, useEffect } from 'react';
import Carousel from './Carousel/Carousel'

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
  return (
    <div className="homepage-container">
      <div className="title" style={{ display: 'flex', alignItems: 'center' }}>
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
  )
}

export default Homepage