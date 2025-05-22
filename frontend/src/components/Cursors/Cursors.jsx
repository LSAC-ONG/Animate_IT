import './Cursors.scss';
import { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copyIcon from '../../assets/copy_simbol.png';
import Nav from "../Nav";

// Uncomment and import your animations and code when available
import DotTrail from './CursorAnimations/DotTrail/DotTrail';
// import CursorAnim2 from './CursorAnimations/CursorAnim2/CursorAnim2';
// import CursorAnim3 from './CursorAnimations/CursorAnim3/CursorAnim3';
import DotTrailCode from './CursorAnimations/DotTrail/DotTrail.jsx?raw';
import DotTrailCss from './CursorAnimations/DotTrail/DotTrail.scss?raw';
// import CursorAnim2Code from './CursorAnimations/CursorAnim2/CursorAnim2.jsx?raw';
// import CursorAnim2Css from './CursorAnimations/CursorAnim2/CursorAnim2.css?raw';
// import CursorAnim3Code from './CursorAnimations/CursorAnim3/CursorAnim3.jsx?raw';
// import CursorAnim3Css from './CursorAnimations/CursorAnim3/CursorAnim3.css?raw';

const animations = [
  'DotTrail',
  // 'CursorAnim2',
  // 'CursorAnim3'
];

const animationCodes = [
  { jsx: DotTrailCode, css: DotTrailCss },
  // { jsx: CursorAnim2Code, css: CursorAnim2Css },
  // { jsx: CursorAnim3Code, css: CursorAnim3Css }
];

function Cursors() {
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
      <div ref={animationRef} className="cursors-container">
        <Nav />
        <h1 className="title">Cursors</h1>
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
                {animations[currentAnimation] === 'DotTrail' && <DotTrail />}
                {/* {animations[currentAnimation] === 'CursorAnim2' && <CursorAnim2 />} */}
                {/* {animations[currentAnimation] === 'CursorAnim3' && <CursorAnim3 />} */}
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

export default Cursors;