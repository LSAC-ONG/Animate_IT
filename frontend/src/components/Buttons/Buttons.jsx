import './Buttons.css';
import { useState } from 'react';
import Nav from "../Nav";

const animations = [
  'buttonAnimation1',
  'buttonAnimation2',
  'buttonAnimation3' // Add your animation class names here
];

function Buttons() {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const prevSlide = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  };

  const nextSlide = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };

  return (
    <div className="buttonsPage">
      <Nav />
      <h1 className="title">Buttons</h1>

      <div className="slider">
        <div className={`animation ${animations[currentAnimation]}`} />
      </div>

      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
}

export default Buttons;
