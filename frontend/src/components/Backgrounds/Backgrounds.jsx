import './Backgrounds.scss';
import { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copyIcon from '../../assets/copy_simbol.png';
import Nav from "../Nav";

import FloatingBalls from './BackgroundAnimations/FloatingBalls/FloatingBalls';
import FloatingBallsCode from './BackgroundAnimations/FloatingBalls/FloatingBalls.jsx?raw';
import FloatingBallsCss from './BackgroundAnimations/FloatingBalls/FloatingBalls.css?raw';
import ShootingStars from './BackgroundAnimations/ShootingStars/ShootingStars';
import ShootingStarsCode from './BackgroundAnimations/ShootingStars/ShootingStars.jsx?raw';
import ShootingStarsCss from './BackgroundAnimations/ShootingStars/ShootingStars.css?raw';
import WavyBackground from './BackgroundAnimations/WavyBackground/WavyBackground';
import WavyBackgroundCode from './BackgroundAnimations/WavyBackground/WavyBackground.jsx?raw';
import WavyBackgroundCss from './BackgroundAnimations/WavyBackground/WavyBackground.css?raw';

import Eyes from './BackgroundAnimations/Eyes/Eyes';
import EyesCode from './BackgroundAnimations/Eyes/Eyes.jsx?raw';
import EyesCss from './BackgroundAnimations/Eyes/Eyes.css?raw';

import SquareToOctagon from './BackgroundAnimations/SquareToOctagon/SquareToOctagon';
import SquareToOctagonCode from './BackgroundAnimations/SquareToOctagon/SquareToOctagon.jsx?raw';
import SquareToOctagonCss from './BackgroundAnimations/SquareToOctagon/SquareToOctagon.css?raw';

import RetroStyle from './BackgroundAnimations/RetroStyle/RetroStyle';
import RetroStyleCode from './BackgroundAnimations/RetroStyle/RetroStyle.jsx?raw';
import RetroStyleCss from './BackgroundAnimations/RetroStyle/RetroStyle.css?raw';

import Bubble from './BackgroundAnimations/Bubble/Bubble';
import BubbleCode from './BackgroundAnimations/Bubble/Bubble.jsx?raw';
import BubbleCss from './BackgroundAnimations/Bubble/Bubble.css?raw';

import Noise from './BackgroundAnimations/Noise/Noise';
import NoiseCode from './BackgroundAnimations/Noise/Noise.jsx?raw';
import NoiseCss from './BackgroundAnimations/Noise/Noise.css?raw';

import Shapes from './BackgroundAnimations/Shapes/Shapes';
import ShapesCode from './BackgroundAnimations/Shapes/Shapes.jsx?raw';
import ShapesCss from './BackgroundAnimations/Shapes/Shapes.css?raw';

const animations = [
  'Shapes',
  'RetroStyle',
  'FloatingBalls',
  'Noise',
  'Bubble',
  'ShootingStars',
  'WavyBackground',
  'Eyes',
  'SquareToOctagon',
];

const animationCodes = [
  { jsx: FloatingBallsCode, css: FloatingBallsCss },
  { jsx: ShootingStarsCode, css: ShootingStarsCss },
  { jsx: WavyBackgroundCode, css: WavyBackgroundCss },
  { jsx: SquareToOctagonCode, css: SquareToOctagonCss },
  { jsx: EyesCode, css: EyesCss },
  { jsx: RetroStyleCode, css: RetroStyleCss },
  { jsx: BubbleCode, css: BubbleCss },
  { jsx: NoiseCode, css: NoiseCss },
  { jsx: ShapesCode, css: ShapesCss }
];

function Backgrounds() {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isDoubled, setIsDoubled] = useState(false);

  const animationRef = useRef(null);
  const codeRef = useRef(null);

  const prevSlide = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
    setIsDoubled(false);
    setTimeout(() => {
      if (animationRef.current) {
        animationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const nextSlide = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
    setIsDoubled(false);
    setTimeout(() => {
      if (animationRef.current) {
        animationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCodeClick = () => {
    setIsDoubled((prev) => {
      const next = !prev;
      setTimeout(() => {
        if (next && codeRef.current) {
          codeRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            window.scrollBy({ top: 300, left: 0, behavior: 'smooth' });
          }, 600);
        } else if (!next && animationRef.current) {
          animationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            window.scrollBy({ top: -200, left: 0, behavior: 'smooth' });
          }, 600);
        }
      }, 100);
      return next;
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    window.alert('Text copied!');
  };

  return (
    <>
      <div ref={animationRef} className="text-container">
        <Nav />
        <h1 className="title">Backgrounds</h1>
        <div className="slider">
          <div className="animation-container">
            {animations[currentAnimation] === 'FloatingBalls' && <FloatingBalls />}
            {animations[currentAnimation] === 'ShootingStars' && <ShootingStars />}
            {animations[currentAnimation] === 'WavyBackground' && <WavyBackground />}
            {animations[currentAnimation] === 'Eyes' && <Eyes />}
            {animations[currentAnimation] === 'SquareToOctagon' && <SquareToOctagon />}
            {animations[currentAnimation] === 'RetroStyle' && <RetroStyle />}
            {animations[currentAnimation] === 'Bubble' && <Bubble />}
            {animations[currentAnimation] === 'Noise' && <Noise />}
            {animations[currentAnimation] === 'Shapes' && <Shapes />}
          </div>
        </div>
        <div className="arrows-row">
          <button className="prev" onClick={prevSlide}>❮</button>
          <button className="code-btn" onClick={handleCodeClick}>
            {isDoubled ? 'ANIMATION' : 'CODE'}
          </button>
          <button className="next" onClick={nextSlide}>❯</button>
        </div>
      </div>

      <div
        ref={codeRef}
        className={`code-squares-wrapper${isDoubled ? ' open' : ''}`}
        style={{
            maxHeight: isDoubled ? '3000px' : '0',
            opacity: isDoubled ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s'
        }}
      >
        {isDoubled && (
          <>
            <div className="code-square css">
              <div className="code-title">
                CSS
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(animationCodes[currentAnimation].css)}
                  title="Copy CSS"
                >
                  <img src={copyIcon} alt="Copy" />
                </button>
              </div>
              <SyntaxHighlighter
                language="css"
                style={vscDarkPlus}
                customStyle={{
                  background: 'transparent',
                  height: '100%',
                  margin: 0,
                  fontSize: '1.1rem',
                  fontFamily: '"Fira Mono", "Roboto Mono", monospace'
                }}
              >
                {animationCodes[currentAnimation].css}
              </SyntaxHighlighter>
            </div>
            <div className="code-square jsx">
              <div className="code-title">
                JSX
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(animationCodes[currentAnimation].jsx)}
                  title="Copy JSX"
                >
                  <img src={copyIcon} alt="Copy" />
                </button>
              </div>
              <SyntaxHighlighter
                language="jsx"
                style={vscDarkPlus}
                customStyle={{
                  background: 'transparent',
                  height: '100%',
                  margin: 0,
                  fontSize: '1.1rem',
                  fontFamily: '"Fira Mono", "Roboto Mono", monospace'
                }}
              >
                {animationCodes[currentAnimation].jsx}
              </SyntaxHighlighter>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Backgrounds;