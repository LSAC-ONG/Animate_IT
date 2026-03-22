import { useState } from "react";
import "./App.scss";
import Homepage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import Backgrounds from "./components/Backgrounds/Backgrounds";
import Buttons from "./components/Buttons/Buttons";
import Cursors from "./components/Cursors/Cursors";
import Text from "./components/Text/Text";
import Forms from "./components/Forms/Forms";
import CarouselTest from "./components/Carousel/CarouselTest";

import SandboxWrapper from "./components/SandboxWrapper";

import FloatingBallsJsx from "./components/Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls.jsx?raw";
import FloatingBallsCss from "./components/Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls.css?raw";

import SnakeEdgeJsx from "./components/Buttons/ButtonAnimations/SnakeEdge/SnakeEdge.jsx?raw";
import SnakeEdgeScss from "./components/Buttons/ButtonAnimations/SnakeEdge/SnakeEdge.scss?raw";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/backgrounds" element={<Backgrounds />} />
      <Route path="/buttons" element={<Buttons />} />
      <Route path="/cursors" element={<Cursors />} />
      <Route path="/text" element={<Text />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/carousel-test" element={<CarouselTest />} />

      <Route
        path="/sandbox-test"
        element={
          <div>
            <SandboxWrapper
              jsxDefaultCodeName="SnakeEdge.jsx"
              jsxDefaultCode={SnakeEdgeJsx}
              scssDefaultCodeName="SnakeEdge.scss"
              scssDefaultCode={SnakeEdgeScss}
            />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
