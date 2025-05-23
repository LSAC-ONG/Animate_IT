import React from 'react';
import './SnakeEdge.scss'; 

const SnakeEdge = () => {
  return (
    <button className="snake-btn">
      <svg viewBox="0 0 250 70">
        <polyline
          points="249,1 249,69 1,69 1,1 249,1"
          className="bg-line"
        />
        <polyline
          points="249,1 249,69 1,69 1,1 249,1"
          className="hl-line"
        />
      </svg>
      <span>Snake Edge</span>
    </button>
  );
};

export default SnakeEdge;