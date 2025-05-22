import React, { useRef, useEffect } from 'react';
import './CursorAware.scss';

const CursorAware = () => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--x', `${x}px`);
      btn.style.setProperty('--y', `${y}px`);
    };

    btn.addEventListener('mousemove', handleMouseMove);
    return () => btn.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <button ref={btnRef} className="btn-cursor-aware">
      <span>Cursor Aware</span>
      <div className="border-mask"></div>
    </button>
  );
};

export default CursorAware;
