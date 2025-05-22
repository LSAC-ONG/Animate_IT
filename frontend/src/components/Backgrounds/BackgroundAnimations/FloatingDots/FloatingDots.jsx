import React, { useMemo } from 'react';
import './FloatingDots.css';

const DotLayer = ({ duration, delay, size = 3, count = 100 }) => {
  // Generăm text-shadow-urile o singură dată la montare
  const textShadow = useMemo(() => {
    const shadows = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() * size - size/2).toFixed(2) + 'em';
      const y = (Math.random() * size - size/2).toFixed(2) + 'em';
      const hue = Math.floor(Math.random() * 360);
      shadows.push(`${x} ${y} 7px hsla(${hue},100%,50%,0.9)`);
    }
    return shadows.join(', ');
  }, [count, size]);

  return (
    <div
      className="dot-layer"
      style={{
        animation: `move-dots ${duration}s ${delay}s infinite ease-in-out alternate`,
        textShadow
      }}
    >
      .
    </div>
  );
};

const FloatingDots = () => (
  <div className='floating-dots-container'>
    <div className="center">
      <h1>Random Floating</h1>
    </div>
    <DotLayer duration={44} delay={-27} />
    <DotLayer duration={43} delay={-32} />
    <DotLayer duration={42} delay={-23} />
    <DotLayer duration={41} delay={-19} />
    <DotLayer duration={40} delay={-10} />
  </div>
);

export default FloatingDots;
