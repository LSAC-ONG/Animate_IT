import './Forms.css';
import { useState } from 'react';
import Nav from "../Nav";

const animations = [
  'formsAnimation1',
  'formsAnimation2',
  'formsAnimation3' // Add your animation class names here
];

function Forms() {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const prevSlide = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  };

  const nextSlide = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };

  return (
    
    <div className="formsPage">
      <Nav />
      <h1 className="title">Forms</h1>

      <div className="slider">
        <div className={`animation ${animations[currentAnimation]}`} />
      </div>

      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
}

export default Forms;
