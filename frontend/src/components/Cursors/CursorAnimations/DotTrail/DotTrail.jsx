import React, { useEffect, useRef, useState } from 'react';
import './DotTrail.scss';

const DotTrail = () => {
  const cursorDotRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  const mousePositionRef = useRef({ x: -100, y: -100 });
  const isMouseInsideRef = useRef(false); 
  const isMouseDownRef = useRef(false);   

  useEffect(() => {
    const currentContainer = containerRef.current;
    const dotEl = cursorDotRef.current;

    if (!currentContainer || !dotEl) return;

    dotEl.style.transform = `translate(-200px, -200px) translate(-50%, -50%) scale(1)`;
    dotEl.style.opacity = '0';


    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      isMouseInsideRef.current = true;
    };

    const handleMouseLeave = () => {
      isMouseInsideRef.current = false;
    };

    const handleGlobalMouseDown = (e) => {
      if (currentContainer && currentContainer.contains(e.target) && isMouseInsideRef.current) {
        isMouseDownRef.current = true;
      }
    };

    const handleGlobalMouseUp = () => {
      if (isMouseDownRef.current) { 
        isMouseDownRef.current = false;
      }
    };

    currentContainer.addEventListener('mousemove', handleMouseMove);
    currentContainer.addEventListener('mouseenter', handleMouseEnter);
    currentContainer.addEventListener('mouseleave', handleMouseLeave);

    window.addEventListener('mousedown', handleGlobalMouseDown);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    const animateDot = () => {
      if (dotEl) { 
        const targetScale = isMouseDownRef.current ? 0.6 : 1.0;
        const targetOpacity = isMouseInsideRef.current ? 0.85 : 0;

        dotEl.style.transform = `translate(${mousePositionRef.current.x}px, ${mousePositionRef.current.y}px) translate(-50%, -50%) scale(${targetScale})`;
        dotEl.style.opacity = targetOpacity.toString(); 
        
        dotEl.classList.toggle('visible', isMouseInsideRef.current);
        dotEl.classList.toggle('pressed', isMouseDownRef.current && isMouseInsideRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(animateDot);
    };

    animationFrameIdRef.current = requestAnimationFrame(animateDot);

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
        currentContainer.removeEventListener('mouseenter', handleMouseEnter);
        currentContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('mousedown', handleGlobalMouseDown);
      window.removeEventListener('mouseup', handleGlobalMouseUp);

      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []); 

  return (
    <div className="dt-container" ref={containerRef}>
      <div
        ref={cursorDotRef}
        className="dt-cursor-dot"
      ></div>
      <h1 className="dt-text">Goofy Dot</h1>
      <p></p>
      <h2>Hold Click</h2>
    </div>
  );
};

export default DotTrail;
