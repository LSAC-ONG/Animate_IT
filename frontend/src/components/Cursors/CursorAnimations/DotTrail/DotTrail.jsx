import React, { useEffect, useRef } from 'react';
import './DotTrail.scss';

const DotTrail = () => {
  const containerRef = useRef(null);
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const cursorDot = dotRef.current;
    const cursorDotOutline = outlineRef.current;
    if (!container || !cursorDot || !cursorDotOutline) return;

    const moveCursor = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      cursorDot.style.transform = `translate(${x}px, ${y}px)`;
      cursorDotOutline.style.transform = `translate(${x}px, ${y}px)`;
    };

    const showCursors = () => {
      cursorDot.style.opacity = '1';
      cursorDotOutline.style.opacity = '1';
    };

    const hideCursors = () => {
      cursorDot.style.opacity = '0';
      cursorDotOutline.style.opacity = '0';
    };

    container.addEventListener('mousemove', moveCursor);
    container.addEventListener('mouseenter', showCursors);
    container.addEventListener('mouseleave', hideCursors);

    hideCursors();

    return () => {
      container.removeEventListener('mousemove', moveCursor);
      container.removeEventListener('mouseenter', showCursors);
      container.removeEventListener('mouseleave', hideCursors);
    };
  }, []);

  return (
    <div ref={containerRef} className="dot-trail-container">
      <div ref={dotRef} id="cursor-dot"></div>
      <div ref={outlineRef} id="cursor-dot-outline"></div>
      <h1 className="dot-trail-text">Dot Trail</h1>
    </div>
  );
};

export default DotTrail;