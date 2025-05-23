import React, { useEffect, useRef, useState } from 'react';
import './ColorCircles.scss';

const colors = [
  '#ffb56b', '#fdaf69', '#f89d63', '#f59761', '#ef865e', '#ec805d',
  '#e36e5c', '#df685c', '#d5585c', '#d1525c', '#c5415d', '#c03b5d',
  '#b22c5e', '#ac265e', '#9c155f', '#950f5f', '#830060', '#7c0060',
  '#680060', '#60005f', '#48005f', '#3d005e'
];

const smoothing = 0.2; 

const ColorCircles = () => {
  const circlesRef = useRef([]);
  const coordsRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const animationContainer = document.querySelector('.animation-container');
    const containerRect = animationContainer?.getBoundingClientRect();
    
    circlesRef.current.forEach(circle => {
      if (circle) {
        if (containerRect) {
          circle._x = containerRect.width / 2;
          circle._y = containerRect.height / 2;
        } else {
          circle._x = window.innerWidth / 2;
          circle._y = window.innerHeight / 2;
        }
        circle.style.left = `${circle._x}px`;
        circle.style.top = `${circle._y}px`;
        circle.style.transform = `translate(-50%, -50%) scale(1)`;
      }
    });

    let seeded = false;
    const handleMouseMove = (e) => {
      const animationContainer = document.querySelector('.animation-container');
      if (animationContainer) {
        const rect = animationContainer.getBoundingClientRect();
        coordsRef.current.x = e.clientX - rect.left;
        coordsRef.current.y = e.clientY - rect.top;
        
        if (!seeded) {
          circlesRef.current.forEach(circle => {
            if (circle) {
              circle._x = coordsRef.current.x;
              circle._y = coordsRef.current.y;
            }
          });
          seeded = true;
        }
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    if (animationContainer) {
      animationContainer.addEventListener('mouseenter', handleMouseEnter);
      animationContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;

        let targetX, targetY;

        if (index === 0) {
          targetX = coordsRef.current.x;
          targetY = coordsRef.current.y;
        } else {
          const prevCircle = circlesRef.current[index - 1];
          if (prevCircle && typeof prevCircle._x === 'number' && typeof prevCircle._y === 'number') {
            targetX = prevCircle._x;
            targetY = prevCircle._y;
          } else {
            targetX = circle._x || coordsRef.current.x; 
            targetY = circle._y || coordsRef.current.y;
          }
        }

        if (typeof circle._x !== 'number') circle._x = coordsRef.current.x;
        if (typeof circle._y !== 'number') circle._y = coordsRef.current.y;
        
        circle._x += (targetX - circle._x) * smoothing;
        circle._y += (targetY - circle._y) * smoothing;

        circle.style.left = `${circle._x}px`;
        circle.style.top = `${circle._y}px`;
        
        const scale = (circlesRef.current.length - index) / circlesRef.current.length;
        circle.style.transform = `translate(-50%, -50%) scale(${Math.max(0.1, scale)})`; // Ensure scale is not too small

        circle.style.backgroundColor = colors[index % colors.length];
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationContainer) {
        animationContainer.removeEventListener('mouseenter', handleMouseEnter);
        animationContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="circles-container">
      <div className="color-circles-text">Color Circles</div>
      {[...Array(22)].map((_, i) => (
        <div
          key={i}
          className={`circle ${isVisible ? 'visible' : 'hidden'}`}
          ref={el => (circlesRef.current[i] = el)}
        />
      ))}
    </div>
  );
};

export default ColorCircles;
