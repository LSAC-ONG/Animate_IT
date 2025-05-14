import './Backgrounds.scss';
import { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copyIcon from '../../assets/copy_simbol.png';
import Nav from "../Nav";

// Add your animation imports here when available
// import BckAnim1 from './BackgroundAnimations/BckAnim1/BckAnim1';
// import BckAnim2 from './BackgroundAnimations/BckAnim2/BckAnim2';
// import BckAnim3 from './BackgroundAnimations/BckAnim3/BckAnim3';
// import BckAnim1Code from './BackgroundAnimations/BckAnim1/BckAnim1.jsx?raw';
// import BckAnim1Css from './BackgroundAnimations/BckAnim1/BckAnim1.css?raw';
// import BckAnim2Code from './BackgroundAnimations/BckAnim2/BckAnim2.jsx?raw';
// import BckAnim2Css from './BackgroundAnimations/BckAnim2/BckAnim2.css?raw';
// import BckAnim3Code from './BackgroundAnimations/BckAnim3/BckAnim3.jsx?raw';
// import BckAnim3Css from './BackgroundAnimations/BckAnim3/BckAnim3.css?raw';

const animations = [
  // 'BckAnim1',
  // 'BckAnim2',
  // 'BckAnim3'
];

const animationCodes = [
  // { jsx: BckAnim1Code, css: BckAnim1Css },
  // { jsx: BckAnim2Code, css: BckAnim2Css },
  // { jsx: BckAnim3Code, css: BckAnim3Css }
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
      <div ref={animationRef} className="backgrounds-container">
        <Nav />
        <h1 className="title">Backgrounds</h1>
        <div className="slider">
          <div className="animation-container">
            {animations.length === 0 ? (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: '#08D0FE',
                fontFamily: '"Roboto Mono", monospace',
                textAlign: 'center'
              }}>
                No animations found. Start creating!
              </div>
            ) : (
              <>
                {/* {animations[currentAnimation] === 'BckAnim1' && <BckAnim1 />} */}
                {/* {animations[currentAnimation] === 'BckAnim2' && <BckAnim2 />} */}
                {/* {animations[currentAnimation] === 'BckAnim3' && <BckAnim3 />} */}
              </>
            )}
          </div>
        </div>
        <button className="prev" onClick={prevSlide}>❮</button>
        <button className="next" onClick={nextSlide}>❯</button>
      </div>
      <button className="code-btn" onClick={handleCodeClick}>
        {isDoubled ? 'ANIMATION' : 'CODE'}
      </button>
      <div
        ref={codeRef}
        className="code-squares-wrapper"
        style={{
          maxHeight: isDoubled ? '1000px' : '0',
          opacity: isDoubled ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s'
        }}
      >
        {isDoubled && animations.length > 0 && (
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