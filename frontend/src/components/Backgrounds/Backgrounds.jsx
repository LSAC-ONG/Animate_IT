import './Backgrounds.css';
import { useState } from 'react';

const animations = [
  'bckAnimation1',
  'bckAnimation2',
  'bckAnimation3' // Add your animation class names here
];

function Backgrounds() {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const prevSlide = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  };

  const nextSlide = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };

  return (
    <div className="backgroundsPage">
      <h1 className="title">Backgrounds</h1>

      <div className="slider">
        <div className={`animation ${animations[currentAnimation]}`} />
      </div>

      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
}

export default Backgrounds;
