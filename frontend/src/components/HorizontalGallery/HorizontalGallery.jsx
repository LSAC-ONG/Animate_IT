import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './HorizontalGallery.scss';

gsap.registerPlugin(Flip, ScrollTrigger);

export default function HorizontalGallery({ items = [], className = '', onItemSelect }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  const overlayRef = useRef(null);
  const stRef = useRef(null);
  const sourceCardRef = useRef(null);
  const pendingRectRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const scrollBlocker = useRef(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [showCode, setShowCode] = useState(false);

  const lockScroll = () => {
    const prevent = (e) => {
      if (e.target.closest?.('.gallery-code-view')) return;
      e.preventDefault();
    };
    const preventKeys = (e) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];
      if (keys.includes(e.key)) e.preventDefault();
    };
    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });
    scrollBlocker.current = () => {
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
      window.removeEventListener('keydown', preventKeys);
    };
  };

  const unlockScroll = () => {
    scrollBlocker.current?.();
    scrollBlocker.current = null;
  };

  useLayoutEffect(() => {
    if (!items.length) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const getScrollAmount = () => -(track.scrollWidth - wrapper.offsetWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${-getScrollAmount()}`,
        invalidateOnRefresh: true,
      },
    });

    stRef.current = tween.scrollTrigger;

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [items]);

  /* ── Flip expand animation ── */
  useLayoutEffect(() => {
    if (!expandedItem || !overlayRef.current || !pendingRectRef.current) return;

    const overlay = overlayRef.current;
    const rect = pendingRectRef.current;
    pendingRectRef.current = null;

    const header = overlay.querySelector('.gallery-overlay-header');
    if (header) gsap.set(header, { autoAlpha: 0 });

    // 1. Position overlay at the card's rect (starting state)
    gsap.set(overlay, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    // 2. Capture the card-sized state with Flip
    const state = Flip.getState(overlay);

    // 3. Set overlay to its fullscreen destination
    gsap.set(overlay, {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
    });

    // 4. Flip.from animates from saved card-sized state → current fullscreen
    Flip.from(state, {
      targets: overlay,
      duration: 0.6,
      ease: 'power2.inOut',
      absolute: true,
      onComplete: () => {
        if (header) gsap.to(header, { autoAlpha: 1, duration: 0.3 });
        isAnimatingRef.current = false;
      },
    });
  }, [expandedItem]);

  useEffect(() => {
    if (!expandedItem) return;

    const onKey = (e) => {
      if (e.key === 'Escape' && !isAnimatingRef.current) handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expandedItem]);

  const handleCardClick = (item, e) => {
    if (expandedItem || isAnimatingRef.current) return;
    if (!stRef.current?.isActive) return;

    isAnimatingRef.current = true;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    sourceCardRef.current = card;
    pendingRectRef.current = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };

    lockScroll();

    card.style.opacity = '0';

    onItemSelect?.(item.id);

    setShowCode(false);
    setExpandedItem(item);
  };

  const handleClose = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const card = sourceCardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    setShowCode(false);

    const rect = card.getBoundingClientRect();
    const header = overlay.querySelector('.gallery-overlay-header');

    gsap.to(header, {
      autoAlpha: 0,
      duration: 0.2,
      onComplete: () => {
        // 1. Capture the fullscreen state with Flip
        const state = Flip.getState(overlay);

        // 2. Set overlay to the card's rect (destination)
        gsap.set(overlay, {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });

        // 3. Flip.from animates from saved fullscreen state -> current card-sized
        Flip.from(state, {
          targets: overlay,
          duration: 0.6,
          ease: 'power2.inOut',
          absolute: true,
          onComplete: () => {
            card.style.opacity = '1';
            sourceCardRef.current = null;
            setExpandedItem(null);
            unlockScroll();
            isAnimatingRef.current = false;
          },
        });
      },
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section
      ref={wrapperRef}
      className={`horizontal-gallery ${className}`.trim()}
    >
      <div ref={trackRef} className="horizontal-scroll-track">
        {items.map((item, i) => (
          <div
            className="gallery-item"
            key={item.id ?? i}
            onClick={(e) => handleCardClick(item, e)}
          >
            <div className="gallery-item-label">{item.label}</div>
            <div className="gallery-item-content">{item.content}</div>
          </div>
        ))}
      </div>

      {expandedItem && (
        <div ref={overlayRef} className="gallery-overlay">
          {!showCode && (
            <div className="gallery-overlay-content">
              {expandedItem.content}
            </div>
          )}

          {showCode && (
            <div className="gallery-code-view">
              <div className="gallery-code-panel">
                <div className="gallery-code-title">
                  JSX
                  <button className="gallery-copy-btn" onClick={() => handleCopy(expandedItem.jsxCode)} title="Copy JSX">
                    📋
                  </button>
                </div>
                <SyntaxHighlighter
                  language="jsx"
                  style={vscDarkPlus}
                  customStyle={{
                    background: 'transparent',
                    margin: 0,
                    flex: 1,
                    fontSize: '0.85rem',
                    fontFamily: '"Fira Mono", "Roboto Mono", monospace',
                  }}
                >
                  {expandedItem.jsxCode || '// No JSX source available'}
                </SyntaxHighlighter>
              </div>
              <div className="gallery-code-panel">
                <div className="gallery-code-title">
                  CSS
                  <button className="gallery-copy-btn" onClick={() => handleCopy(expandedItem.cssCode)} title="Copy CSS">
                    📋
                  </button>
                </div>
                <SyntaxHighlighter
                  language="css"
                  style={vscDarkPlus}
                  customStyle={{
                    background: 'transparent',
                    margin: 0,
                    flex: 1,
                    fontSize: '0.85rem',
                    fontFamily: '"Fira Mono", "Roboto Mono", monospace',
                  }}
                >
                  {expandedItem.cssCode || '/* No CSS source available */'}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          <div className="gallery-overlay-header">
            <h2 className="gallery-overlay-title">{expandedItem.label}</h2>
            <div className="gallery-overlay-actions">
              {(expandedItem.jsxCode || expandedItem.cssCode) && (
                <button
                  className="gallery-code-btn"
                  onClick={() => setShowCode((prev) => !prev)}
                >
                  {showCode ? 'ANIMATION' : 'CODE'}
                </button>
              )}
              <button className="gallery-back-btn" onClick={handleClose}>
                ← Back
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
