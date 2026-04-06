import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './LoadingAnimation.scss';

gsap.registerPlugin(useGSAP);

export default function LoadingAnimation({
  text = 'IT',
  loadingDuration = 3,
  startingDuration = 2,
  fadeDuration = 1.5,
  movement = 560,
  strokeWidth = 2,
  strokeColor = '#000000',
  firstColor = 'hsl(220, 100%, 25%)',
  secondColor = 'hsl(318, 90%, 45%)',
  gradientSpeed = 4,
  scaleFactor = 2,
  onComplete,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const westRectangleRef = useRef(null);
  const northRectangleRef = useRef(null);
  const eastRectangleRef = useRef(null);
  const southRectangleRef = useRef(null);
  const waveBorderRef = useRef(null);
  const innerFillRef = useRef(null);
  const introCoverRef = useRef(null);

  const introFadeDuration = 2.5;
  const spinUpDuration = 0;
  const swellDuration = Math.max(fadeDuration * 0.18, 0.12);
  const drainDuration = Math.max(fadeDuration * 0.28, 0.2);
  const logoTiltDegrees = -10;
  const logoDrainSpinDegrees = 540;

  useGSAP(() => {
      if (!rootRef.current) {
        return;
      }

      gsap.set(waveBorderRef.current, { transformOrigin: '50% 50%' });
      gsap.set(innerRef.current, { svgOrigin: '50 50', rotation: 0 });

      const timeline = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          onComplete?.();
        },
      });

      timeline.to(waveBorderRef.current, {
        rotation: '+=2000',
        duration: introFadeDuration + spinUpDuration,
        ease: 'power4.in',
      }, "start");

      timeline.to(introCoverRef.current, {
        autoAlpha: 0,
        duration: introFadeDuration,
        ease: 'linear',
      }, "start+=0.5");

      
      gsap.to(waveBorderRef.current, {
        rotation: '+=5000',
        duration: loadingDuration + startingDuration + 2,
        ease: 'power4.out',
        transformOrigin: '50% 50%',
        delay: introFadeDuration + spinUpDuration,
      });

      timeline.to({}, {
        duration: loadingDuration,
      }, 'loading');

      timeline.to(
        [
          northRectangleRef.current,
          eastRectangleRef.current,
          southRectangleRef.current,
          westRectangleRef.current,
        ],
        {
          duration: startingDuration,
          ease: 'power1.inOut',
          stagger: 0.1,
          x: (index) => {
            if (index === 1) return movement;
            if (index === 3) return -movement;
            return 0;
          },
          y: (index) => {
            if (index === 0) return -movement;
            if (index === 2) return movement;
            return 0;
          },
        },
        'starting',
      );

      timeline.add('drain', 'starting+=1.2');

      timeline.to(
        [innerFillRef.current, waveBorderRef.current],
        {
          scale: 1.08,
          svgOrigin: '50 50',
          duration: swellDuration,
          ease: 'power2.out',
        },
        'drain',
      );

      timeline.to(
        innerRef.current,
        {
          scale: 1.08,
          rotation: logoTiltDegrees,
          svgOrigin: '50 50',
          duration: swellDuration,
          ease: 'power2.out',
        },
        'drain',
      );

      timeline.to(
        innerFillRef.current,
        {
          attr: { r: 0 },
          duration: drainDuration,
          ease: 'power4.in',
        },
        'drain+=0.12',
      );

      timeline.to(
        waveBorderRef.current,
        {
          scale: 0,
          svgOrigin: '50 50',
          duration: drainDuration,
          ease: 'power4.in',
        },
        'drain+=0.12',
      );

      timeline.to(
        innerRef.current,
        {
          scale: 0,
          rotation: `+=${logoDrainSpinDegrees}`,
          svgOrigin: '50 50',
          duration: drainDuration,
          ease: 'power4.in',
        },
        'drain+=0.12',
      );
    },
    {
      scope: rootRef,
      revertOnUpdate: true,
      dependencies: [
        fadeDuration,
        firstColor,
        gradientSpeed,
        loadingDuration,
        movement,
        onComplete,
        scaleFactor,
        secondColor,
        startingDuration,
        strokeColor,
        strokeWidth,
      ],
    },
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div ref={rootRef} className="loading-animation" aria-label="Loading screen" aria-busy="true">
      <div ref={introCoverRef} className="loading-animation__intro-cover" aria-hidden="true" />

      <svg viewBox="0 0 100 100" className="loading-animation__svg">
        <defs>
          <linearGradient
            id="loading-animation-gradient"
            gradientUnits="userSpaceOnUse"
            x1={movement}
            y1={-movement}
            x2={-movement}
            y2={movement}
          >
            <stop offset="0%" stopColor={firstColor}>
              <animate
                attributeName="stop-color"
                values={`${firstColor}; ${secondColor}; ${firstColor}`}
                dur={gradientSpeed}
                repeatCount="indefinite"
              />
            </stop>

            <stop offset="100%" stopColor={secondColor}>
              <animate
                attributeName="stop-color"
                values={`${secondColor}; ${firstColor}; ${secondColor}`}
                dur={gradientSpeed}
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        <polygon
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="url(#loading-animation-gradient)"
          ref={northRectangleRef}
          className="loading-animation__shape loading-animation__shape--top"
          points="50,50 -2000,-2000 2100,-2000"
        />
        <polygon
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="url(#loading-animation-gradient)"
          ref={eastRectangleRef}
          className="loading-animation__shape loading-animation__shape--right"
          points="50,50 2100,-2000 2100,2100"
        />
        <polygon
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="url(#loading-animation-gradient)"
          ref={southRectangleRef}
          className="loading-animation__shape loading-animation__shape--bottom"
          points="50,50 2100,2100 -2000,2100"
        />
        <polygon
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="url(#loading-animation-gradient)"
          ref={westRectangleRef}
          className="loading-animation__shape loading-animation__shape--left"
          points="50,50 -2000,2100 -2000,-2000"
        />

        <g id="center-unit" transform={`scale(${scaleFactor})`} style={{ transformOrigin: 'center' }}>
          <path
            ref={waveBorderRef}
            className="loading-animation__wave-border"
            d="M19.9512 59.1602C13.3074 54.8607 13.3074 45.1393 19.9512 40.8398C20.3129 40.6057 20.4607 40.1501 20.3057 39.748C17.4581 32.3647 23.1722 24.5009 31.0742 24.9277C31.5043 24.9509 31.8919 24.6691 32.0029 24.2529C34.0389 16.6057 43.2837 13.6018 49.4258 18.5918C49.7602 18.8634 50.2398 18.8634 50.5742 18.5918C56.7163 13.6018 65.9611 16.6057 67.9971 24.2529C68.1081 24.6691 68.4957 24.9509 68.9258 24.9277C76.8278 24.5009 82.5419 32.3647 79.6943 39.748C79.5393 40.1501 79.6871 40.6057 80.0488 40.8398C86.6926 45.1393 86.6926 54.8607 80.0488 59.1602C79.6871 59.3943 79.5393 59.8499 79.6943 60.252C82.5419 67.6353 76.8278 75.4991 68.9258 75.0723C68.4957 75.0491 68.1081 75.3309 67.9971 75.7471C65.9611 83.3943 56.7163 86.3982 50.5742 81.4082C50.2398 81.1366 49.7602 81.1366 49.4258 81.4082C43.2837 86.3982 34.0389 83.3943 32.0029 75.7471C31.8919 75.3309 31.5043 75.0491 31.0742 75.0723C23.1722 75.4991 17.4581 67.6353 20.3057 60.252C20.4607 59.8499 20.3129 59.3943 19.9512 59.1602Z"
            stroke="black"
            strokeOpacity="1"
            strokeWidth="10"
          />

          <circle
            className="loading-animation__center-fill"
            ref={innerFillRef}
            cx="50"
            cy="50"
            r="30"
            fill="#000000"
            fillOpacity="1"
          />

          <g id="center-circle" ref={innerRef}>
            <text
              x="50"
              y="48"
              fill={`url(#loading-animation-gradient)`}
              fontSize="32"
              fontWeight="700"
              textAnchor="middle"
              fontFamily="system-ui, Avenir, Helvetica, Arial, sans-serif"
              dominantBaseline="central"
            >
              {text}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}