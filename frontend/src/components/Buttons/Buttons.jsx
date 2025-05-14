import './Buttons.scss';
import { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copyIcon from '../../assets/copy_simbol.png';
import Nav from "../Nav";

// Uncomment and import your animations and code when available
// import ButtonAnim1 from './ButtonAnimations/ButtonAnim1/ButtonAnim1';
// import ButtonAnim2 from './ButtonAnimations/ButtonAnim2/ButtonAnim2';
// import ButtonAnim3 from './ButtonAnimations/ButtonAnim3/ButtonAnim3';
// import ButtonAnim1Code from './ButtonAnimations/ButtonAnim1/ButtonAnim1.jsx?raw';
// import ButtonAnim1Css from './ButtonAnimations/ButtonAnim1/ButtonAnim1.css?raw';
// import ButtonAnim2Code from './ButtonAnimations/ButtonAnim2/ButtonAnim2.jsx?raw';
// import ButtonAnim2Css from './ButtonAnimations/ButtonAnim2/ButtonAnim2.css?raw';
// import ButtonAnim3Code from './ButtonAnimations/ButtonAnim3/ButtonAnim3.jsx?raw';
// import ButtonAnim3Css from './ButtonAnimations/ButtonAnim3/ButtonAnim3.css?raw';

const animations = [
  // 'ButtonAnim1',
  // 'ButtonAnim2',
  // 'ButtonAnim3'
];

const animationCodes = [
  // { jsx: ButtonAnim1Code, css: ButtonAnim1Css },
  // { jsx: ButtonAnim2Code, css: ButtonAnim2Css },
  // { jsx: ButtonAnim3Code, css: ButtonAnim3Css }
];

function Buttons() {
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
      <div ref={animationRef} className="buttons-container">
        <Nav />
        <h1 className="title">Buttons</h1>
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
                {/* {animations[currentAnimation] === 'ButtonAnim1' && <ButtonAnim1 />} */}
                {/* {animations[currentAnimation] === 'ButtonAnim2' && <ButtonAnim2 />} */}
                {/* {animations[currentAnimation] === 'ButtonAnim3' && <ButtonAnim3 />} */}
              </>
            )}
          </div>
          <div className="arrows-row">
            <button className="prev" onClick={prevSlide}>❮</button>
            <button className="code-btn" onClick={handleCodeClick}>
              {isDoubled ? 'ANIMATION' : 'CODE'}
            </button>
            <button className="next" onClick={nextSlide}>❯</button>
          </div>
        </div>
      </div>
      <div
        ref={codeRef}
        className={`code-squares-wrapper${isDoubled ? ' open' : ''}`}
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

export default Buttons;