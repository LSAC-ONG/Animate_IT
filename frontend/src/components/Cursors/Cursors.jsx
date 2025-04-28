import './Cursors.css';
import { useState } from 'react';
import Nav from "../Nav";

const animations = [
  'cursorAnimation1',
  'cursorAnimation2',
  'cursorAnimation3' // Add your animation class names here
];

function Cursors() {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const prevSlide = () => {
    setCurrentAnimation((prev) => (prev - 1 + animations.length) % animations.length);
  };

  const nextSlide = () => {
    setCurrentAnimation((prev) => (prev + 1) % animations.length);
  };

  return (
    <div className="cursorsPage">
      <Nav />
      <h1 className="title">Cursors</h1>

      <div className="slider">
        <div className={`animation ${animations[currentAnimation]}`} />
      </div>

      <button className="prev" onClick={prevSlide}>❮</button>
      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
}

export default Cursors;
