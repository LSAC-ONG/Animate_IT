import './Text.css';
import { useState } from 'react';

import DancingShadow from './TextAnimations/DancingShadow/DancingShadow';
import MatrixGlitch from './TextAnimations/MatrixGlitch/MatrixGlitch';
import Nav from "../Nav";
const animations = [
  'DancingShadow',
  'MatrixGlitch'
];

function Text() {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const prevSlide = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  };

  const nextSlide = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };

  return (

    <div className="textPage">
      <Nav />
      <h1 className="title">Text</h1>

      <div className="slider">
        <div className="animation-container">
          {animations[currentAnimation] === 'DancingShadow' && <DancingShadow />}
          {animations[currentAnimation] === 'MatrixGlitch' && <MatrixGlitch />}
        </div>
      </div>

      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
}

export default Text;
