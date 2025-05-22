import React, { useEffect, useRef } from 'react';
import './ColorCircles.scss';

const colors = [
  '#ffb56b', '#fdaf69', '#f89d63', '#f59761', '#ef865e', '#ec805d',
  '#e36e5c', '#df685c', '#d5585c', '#d1525c', '#c5415d', '#c03b5d',
  '#b22c5e', '#ac265e', '#9c155f', '#950f5f', '#830060', '#7c0060',
  '#680060', '#60005f', '#48005f', '#3d005e'
];

const ColorCircles = () => {
  const circlesRef = useRef([]);
  const coordsRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      coordsRef.current.x = e.clientX;
      coordsRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      let x = coordsRef.current.x;
      let y = coordsRef.current.y;

      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;

        circle.style.transform = `translate(${x - 12}px, ${y - 12}px) scale(${
          (circlesRef.current.length - index) / circlesRef.current.length
        })`;

        const nextCircle = circlesRef.current[index + 1] || circlesRef.current[0];
        const rect = nextCircle.getBoundingClientRect();
        const nextX = rect.left + rect.width / 2;
        const nextY = rect.top + rect.height / 2;

        x += (nextX - x) * 0.3;
        y += (nextY - y) * 0.3;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="container">
      {[...Array(22)].map((_, i) => (
        <div
          key={i}
          className="circle"
          ref={el => (circlesRef.current[i] = el)}
          style={{
            position: 'fixed',
            left: '-100px',
            top: '-100px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: colors[i % colors.length],
            pointerEvents: 'none',
            transition: 'transform 0.3s ease-out',
            transform: 'translate(-50%, -50)'
          }}
        />
      ))}
    </div>
  );
};

export default ColorCircles;