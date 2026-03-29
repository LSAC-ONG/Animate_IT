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
  const westRectangleRef = useRef(null);
  const southEastLineRef = useRef(null);
  const northRectangleRef = useRef(null);
  const eastRectangleRef = useRef(null);
  const southRectangleRef = useRef(null);
  const waveBorderRef = useRef(null);

  const loadingDuration = 15;
  const startingDuration = 1.5;
  const fadeDuration = 1;
  const movement = 600;

  useGSAP(() => {

    // aici incepe loading-ul simulat
    let tl = gsap.timeline();
    tl.to(waveBorderRef.current, {
      rotation: 720,
      duration: loadingDuration,
      ease: "linear",
      transformOrigin: "center",
    }, "loading")

    tl.to(southEastLineRef.current, {
      x: 10000,
      y: -10000,
      duration: loadingDuration,
      ease: "linear",
    }, "loading")

    tl.to(innerRef.current, {
      ease: "linear",
    }, "loading") // label ce marcheaza etapa din animatie. toate tween-urile cu label-ul "loading" vor incepe in acelasi timp

    // aici incepe deschiderea
    tl.to(innerRef.current, {
      ease: "linear",
      autoAlpha: 0,
    }, "starting")

    tl.to(waveBorderRef.current, {
      ease: "linear",
      autoAlpha: 0,
      duration: fadeDuration,
    }, "starting")

    tl.to(waveBorderRef.current, {
      rotation: "+=360",
      ease: "linear",
      transformOrigin: "center",
      duration: startingDuration,
    }, "starting")

    tl.to(westRectangleRef.current, {
      duration: startingDuration,
      x: -movement,
      ease: "power2.inOut"
    }, "starting")

    tl.to(northRectangleRef.current, {
      duration: startingDuration,
      y: -movement,
      ease: "power2.inOut"
    }, "starting")

    tl.to(eastRectangleRef.current, {
      duration: startingDuration,
      x: movement,
      ease: "power2.inOut"
    }, "starting")

    tl.to(southRectangleRef.current, {
      duration: startingDuration,
      y: movement,
      ease: "power2.inOut"
    }, "starting")
  });


  const strokeWidth = 1;
  const strokeColor = "#000000";
  const firstColor = "#00246c";
  const secondColor = "#FF00B3";
  const gradientSpeed = 4;
  const scaleFactor = 2;
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

          <defs>
            <linearGradient 
              id="cyber-gradient" 
              gradientUnits="userSpaceOnUse" 
              x1={movement} y1={-movement} 
              x2={-movement} y2={movement}
            >
              <stop offset="0%" stopColor={firstColor}>
                <animate attributeName="stop-color" values={`${firstColor}; ${secondColor}; ${firstColor}`} dur={gradientSpeed} repeatCount="indefinite" />
              </stop>
              
              <stop offset="100%" stopColor={secondColor}>
                <animate attributeName="stop-color" values={`${secondColor}; ${firstColor}; ${secondColor}`} dur={gradientSpeed} repeatCount="indefinite" />
              </stop>
            </linearGradient>

            <clipPath id="circle-clip">
              <circle cx="50" cy="50" r="25" />
            </clipPath>
          </defs>
          
          <polygon stroke={strokeColor} strokeWidth={strokeWidth} fill="url(#cyber-gradient)" ref={northRectangleRef} className="retracting-shape shape-top" points="50,50 -2000,-2000 2100,-2000" />
          <polygon stroke={strokeColor} strokeWidth={strokeWidth} fill="url(#cyber-gradient)" ref={eastRectangleRef} className="retracting-shape shape-right" points="50,50 2100,-2000 2100,2100" />
          <polygon stroke={strokeColor} strokeWidth={strokeWidth} fill="url(#cyber-gradient)" ref={southRectangleRef} className="retracting-shape shape-bottom" points="50,50 2100,2100 -2000,2100" />
          <polygon stroke={strokeColor} strokeWidth={strokeWidth} fill="url(#cyber-gradient)" ref={westRectangleRef} className="retracting-shape shape-left" points="50,50 -2000,2100 -2000,-2000" />
          
          <g transform="translate(50, 50) rotate(0) scale(0.6) translate(-730, -25)">
            <path
              ref={southEastLineRef}
              d="M729.857 4.93512C714.075 53.4819 697.691 80.283 661.677 116.461C625.321 152.982 585.604 149.022 549.248 185.543C513.234 221.721 517.083 260.891 481.069 297.069C444.713 333.591 404.996 329.63 368.64 366.152C332.626 402.329 336.474 441.5 300.46 477.677C264.104 514.199 224.388 510.239 188.032 546.76C152.018 582.938 155.948 622.19 119.852 658.286C83.7562 694.382 51.88 699.839 8.32653 726.465" 
              stroke="black"
              strokeWidth="35" 
              fill="none"
            />
          </g>

          <g id="center-unit" transform={`scale(${scaleFactor})`} style={{ transformOrigin: 'center' }}>
            <path ref={waveBorderRef} className={waveBorderRef} d="M19.9512 59.1602C13.3074 54.8607 13.3074 45.1393 19.9512 40.8398C20.3129 40.6057 20.4607 40.1501 20.3057 39.748C17.4581 32.3647 23.1722 24.5009 31.0742 24.9277C31.5043 24.9509 31.8919 24.6691 32.0029 24.2529C34.0389 16.6057 43.2837 13.6018 49.4258 18.5918C49.7602 18.8634 50.2398 18.8634 50.5742 18.5918C56.7163 13.6018 65.9611 16.6057 67.9971 24.2529C68.1081 24.6691 68.4957 24.9509 68.9258 24.9277C76.8278 24.5009 82.5419 32.3647 79.6943 39.748C79.5393 40.1501 79.6871 40.6057 80.0488 40.8398C86.6926 45.1393 86.6926 54.8607 80.0488 59.1602C79.6871 59.3943 79.5393 59.8499 79.6943 60.252C82.5419 67.6353 76.8278 75.4991 68.9258 75.0723C68.4957 75.0491 68.1081 75.3309 67.9971 75.7471C65.9611 83.3943 56.7163 86.3982 50.5742 81.4082C50.2398 81.1366 49.7602 81.1366 49.4258 81.4082C43.2837 86.3982 34.0389 83.3943 32.0029 75.7471C31.8919 75.3309 31.5043 75.0491 31.0742 75.0723C23.1722 75.4991 17.4581 67.6353 20.3057 60.252C20.4607 59.8499 20.3129 59.3943 19.9512 59.1602Z" stroke="black" stroke-opacity="0.8" stroke-width="10"/>

            <g id="center-circle" ref={innerRef}>
              <text 
                x="50" 
                y="48"
                fill="url(#cyber-gradient)" 
                fontSize="32"
                fontWeight="700"
                textAnchor="middle"
                fontFamily="system-ui, Avenir, Helvetica, Arial, sans-serif"
                dominantBaseline="central"
              >
                IT
              </text>
            </g>
          </g>
        </svg>

      </div>
    </>
  )
}

export default Homepage