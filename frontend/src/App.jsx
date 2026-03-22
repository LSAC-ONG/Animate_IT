import { useState } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Backgrounds from "./components/Backgrounds/Backgrounds";
import Buttons from "./components/Buttons/Buttons";
import Cursors from "./components/Cursors/Cursors";
import Text from "./components/Text/Text";
import Forms from "./components/Forms/Forms";
import CarouselTest from "./components/Carousel/CarouselTest";
import SandboxWrapper from "./components/SandboxWrapper";

// --- BACKGROUNDS ---
import FloatingBallsJsx from "./components/Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls.jsx?raw";
import FloatingBallsCss from "./components/Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls.css?raw";
import ShootingStarsJsx from "./components/Backgrounds/BackgroundAnimations/ShootingStars/ShootingStars.jsx?raw";
import ShootingStarsCss from "./components/Backgrounds/BackgroundAnimations/ShootingStars/ShootingStars.css?raw";
import WavyBackgroundJsx from "./components/Backgrounds/BackgroundAnimations/WavyBackground/WavyBackground.jsx?raw";
import WavyBackgroundCss from "./components/Backgrounds/BackgroundAnimations/WavyBackground/WavyBackground.css?raw";
import EyesJsx from "./components/Backgrounds/BackgroundAnimations/Eyes/Eyes.jsx?raw";
import EyesCss from "./components/Backgrounds/BackgroundAnimations/Eyes/Eyes.css?raw";
import SquareToOctagonJsx from "./components/Backgrounds/BackgroundAnimations/SquareToOctagon/SquareToOctagon.jsx?raw";
import SquareToOctagonCss from "./components/Backgrounds/BackgroundAnimations/SquareToOctagon/SquareToOctagon.css?raw";
import RetroStyleJsx from "./components/Backgrounds/BackgroundAnimations/RetroStyle/RetroStyle.jsx?raw";
import RetroStyleCss from "./components/Backgrounds/BackgroundAnimations/RetroStyle/RetroStyle.css?raw";
import BubbleJsx from "./components/Backgrounds/BackgroundAnimations/Bubble/Bubble.jsx?raw";
import BubbleCss from "./components/Backgrounds/BackgroundAnimations/Bubble/Bubble.css?raw";
import NoiseJsx from "./components/Backgrounds/BackgroundAnimations/Noise/Noise.jsx?raw";
import NoiseCss from "./components/Backgrounds/BackgroundAnimations/Noise/Noise.css?raw";
import ShapesJsx from "./components/Backgrounds/BackgroundAnimations/Shapes/Shapes.jsx?raw";
import ShapesCss from "./components/Backgrounds/BackgroundAnimations/Shapes/Shapes.css?raw";
import FloatingDotsJsx from "./components/Backgrounds/BackgroundAnimations/FloatingDots/FloatingDots.jsx?raw";
import FloatingDotsCss from "./components/Backgrounds/BackgroundAnimations/FloatingDots/FloatingDots.css?raw";

// --- BUTTONS ---
import SnakeEdgeJsx from "./components/Buttons/ButtonAnimations/SnakeEdge/SnakeEdge.jsx?raw";
import SnakeEdgeScss from "./components/Buttons/ButtonAnimations/SnakeEdge/SnakeEdge.scss?raw";
import CursorAwareJsx from "./components/Buttons/ButtonAnimations/CursorAware/CursorAware.jsx?raw";
import CursorAwareScss from "./components/Buttons/ButtonAnimations/CursorAware/CursorAware.scss?raw";
import ThinLineJsx from "./components/Buttons/ButtonAnimations/ThinLine/ThinLine.jsx?raw";
import ThinLineScss from "./components/Buttons/ButtonAnimations/ThinLine/ThinLine.scss?raw";
import ZoneInJsx from "./components/Buttons/ButtonAnimations/ZoneIn/ZoneIn.jsx?raw";
import ZoneInScss from "./components/Buttons/ButtonAnimations/ZoneIn/ZoneIn.scss?raw";
import LoadCheckJsx from "./components/Buttons/ButtonAnimations/LoadCheck/LoadCheck.jsx?raw";
import LoadCheckScss from "./components/Buttons/ButtonAnimations/LoadCheck/LoadCheck.scss?raw";

// --- CURSORS ---
import DotTrailJsx from "./components/Cursors/CursorAnimations/DotTrail/DotTrail.jsx?raw";
import DotTrailScss from "./components/Cursors/CursorAnimations/DotTrail/DotTrail.scss?raw";
import ColorCirclesJsx from "./components/Cursors/CursorAnimations/ColorCircles/ColorCircles.jsx?raw";
import ColorCirclesScss from "./components/Cursors/CursorAnimations/ColorCircles/ColorCircles.scss?raw";
import RainbowAuraJsx from "./components/Cursors/CursorAnimations/RainbowAura/RainbowAura.jsx?raw";
import RainbowAuraScss from "./components/Cursors/CursorAnimations/RainbowAura/RainbowAura.scss?raw";
import TrailingDotsJsx from "./components/Cursors/CursorAnimations/TrailingDots/TrailingDots.jsx?raw";
import TrailingDotsScss from "./components/Cursors/CursorAnimations/TrailingDots/TrailingDots.scss?raw";
import RainingSquaresJsx from "./components/Cursors/CursorAnimations/RainingSquares/RainingSquares.jsx?raw";
import RainingSquaresScss from "./components/Cursors/CursorAnimations/RainingSquares/RainingSquares.scss?raw";

// --- FORMS ---
import WavyLoginJsx from "./components/Forms/FormsAnimations/WavyLogin/WavyLogin.jsx?raw";
import WavyLoginCss from "./components/Forms/FormsAnimations/WavyLogin/WavyLogin.css?raw";
import SimpleRegJsx from "./components/Forms/FormsAnimations/SimpleRegistrationForm/SimpleRegistrationForm.jsx?raw";
import SimpleRegCss from "./components/Forms/FormsAnimations/SimpleRegistrationForm/SimpleRegistrationForm.css?raw";
import BlockyFormJsx from "./components/Forms/FormsAnimations/BlockyForm/BlockyForm.jsx?raw";
import BlockyFormCss from "./components/Forms/FormsAnimations/BlockyForm/BlockyForm.css?raw";

// --- TEXT ---
import DancingShadowJsx from "./components/Text/TextAnimations/DancingShadow/DancingShadow.jsx?raw";
import DancingShadowCss from "./components/Text/TextAnimations/DancingShadow/DancingShadow.css?raw";
import MatrixGlitchJsx from "./components/Text/TextAnimations/MatrixGlitch/MatrixGlitch.jsx?raw";
import MatrixGlitchCss from "./components/Text/TextAnimations/MatrixGlitch/MatrixGlitch.css?raw";
import PulseTextJsx from "./components/Text/TextAnimations/PulseText/PulseText.jsx?raw";
import PulseTextCss from "./components/Text/TextAnimations/PulseText/PulseText.css?raw";
import GlitchEffectJsx from "./components/Text/TextAnimations/GlitchEffect/GlitchEffect.jsx?raw";
import GlitchEffectCss from "./components/Text/TextAnimations/GlitchEffect/GlitchEffect.css?raw";
import BorderRevolveJsx from "./components/Text/TextAnimations/BorderRevolve/BorderRevolve.jsx?raw";
import BorderRevolveCss from "./components/Text/TextAnimations/BorderRevolve/BorderRevolve.css?raw";
import LiquidFillJsx from "./components/Text/TextAnimations/LiquidFill/LiquidFill.jsx?raw";
import LiquidFillCss from "./components/Text/TextAnimations/LiquidFill/LiquidFill.css?raw";
import GooeyTextJsx from "./components/Text/TextAnimations/GooeyText/GooeyText.jsx?raw";
import GooeyTextCss from "./components/Text/TextAnimations/GooeyText/GooeyText.css?raw";

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
          <div
            style={{
              background: "#0a0524",
              minHeight: "100vh",
              padding: "4rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "10rem",
              alignItems: "center",
            }}
          >
            <SandboxWrapper
              jsxDefaultCodeName="FloatingBalls.jsx"
              jsxDefaultCode={FloatingBallsJsx}
              scssDefaultCodeName="FloatingBalls.css"
              scssDefaultCode={FloatingBallsCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="ShootingStars.jsx"
              jsxDefaultCode={ShootingStarsJsx}
              scssDefaultCodeName="ShootingStars.css"
              scssDefaultCode={ShootingStarsCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="WavyBackground.jsx"
              jsxDefaultCode={WavyBackgroundJsx}
              scssDefaultCodeName="WavyBackground.css"
              scssDefaultCode={WavyBackgroundCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="Eyes.jsx"
              jsxDefaultCode={EyesJsx}
              scssDefaultCodeName="Eyes.css"
              scssDefaultCode={EyesCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="SquareToOctagon.jsx"
              jsxDefaultCode={SquareToOctagonJsx}
              scssDefaultCodeName="SquareToOctagon.css"
              scssDefaultCode={SquareToOctagonCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="RetroStyle.jsx"
              jsxDefaultCode={RetroStyleJsx}
              scssDefaultCodeName="RetroStyle.css"
              scssDefaultCode={RetroStyleCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="Bubble.jsx"
              jsxDefaultCode={BubbleJsx}
              scssDefaultCodeName="Bubble.css"
              scssDefaultCode={BubbleCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="Noise.jsx"
              jsxDefaultCode={NoiseJsx}
              scssDefaultCodeName="Noise.css"
              scssDefaultCode={NoiseCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="Shapes.jsx"
              jsxDefaultCode={ShapesJsx}
              scssDefaultCodeName="Shapes.css"
              scssDefaultCode={ShapesCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="FloatingDots.jsx"
              jsxDefaultCode={FloatingDotsJsx}
              scssDefaultCodeName="FloatingDots.css"
              scssDefaultCode={FloatingDotsCss}
            />

            <SandboxWrapper
              jsxDefaultCodeName="SnakeEdge.jsx"
              jsxDefaultCode={SnakeEdgeJsx}
              scssDefaultCodeName="SnakeEdge.scss"
              scssDefaultCode={SnakeEdgeScss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="CursorAware.jsx"
              jsxDefaultCode={CursorAwareJsx}
              scssDefaultCodeName="CursorAware.scss"
              scssDefaultCode={CursorAwareScss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="ThinLine.jsx"
              jsxDefaultCode={ThinLineJsx}
              scssDefaultCodeName="ThinLine.scss"
              scssDefaultCode={ThinLineScss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="ZoneIn.jsx"
              jsxDefaultCode={ZoneInJsx}
              scssDefaultCodeName="ZoneIn.scss"
              scssDefaultCode={ZoneInScss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="LoadCheck.jsx"
              jsxDefaultCode={LoadCheckJsx}
              scssDefaultCodeName="LoadCheck.scss"
              scssDefaultCode={LoadCheckScss}
            />

            <SandboxWrapper
              jsxDefaultCodeName="DotTrail.jsx"
              jsxDefaultCode={DotTrailJsx}
              scssDefaultCodeName="DotTrail.scss"
              scssDefaultCode={DotTrailScss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="ColorCircles.jsx"
              jsxDefaultCode={ColorCirclesJsx}
              scssDefaultCodeName="ColorCircles.scss"
              scssDefaultCode={ColorCirclesScss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="RainbowAura.jsx"
              jsxDefaultCode={RainbowAuraJsx}
              scssDefaultCodeName="RainbowAura.scss"
              scssDefaultCode={RainbowAuraScss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="TrailingDots.jsx"
              jsxDefaultCode={TrailingDotsJsx}
              scssDefaultCodeName="TrailingDots.scss"
              scssDefaultCode={TrailingDotsScss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="RainingSquares.jsx"
              jsxDefaultCode={RainingSquaresJsx}
              scssDefaultCodeName="RainingSquares.scss"
              scssDefaultCode={RainingSquaresScss}
            />

            <SandboxWrapper
              jsxDefaultCodeName="DancingShadow.jsx"
              jsxDefaultCode={DancingShadowJsx}
              scssDefaultCodeName="DancingShadow.css"
              scssDefaultCode={DancingShadowCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="MatrixGlitch.jsx"
              jsxDefaultCode={MatrixGlitchJsx}
              scssDefaultCodeName="MatrixGlitch.css"
              scssDefaultCode={MatrixGlitchCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="PulseText.jsx"
              jsxDefaultCode={PulseTextJsx}
              scssDefaultCodeName="PulseText.css"
              scssDefaultCode={PulseTextCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="GlitchEffect.jsx"
              jsxDefaultCode={GlitchEffectJsx}
              scssDefaultCodeName="GlitchEffect.css"
              scssDefaultCode={GlitchEffectCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="BorderRevolve.jsx"
              jsxDefaultCode={BorderRevolveJsx}
              scssDefaultCodeName="BorderRevolve.css"
              scssDefaultCode={BorderRevolveCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="LiquidFill.jsx"
              jsxDefaultCode={LiquidFillJsx}
              scssDefaultCodeName="LiquidFill.css"
              scssDefaultCode={LiquidFillCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="GooeyText.jsx"
              jsxDefaultCode={GooeyTextJsx}
              scssDefaultCodeName="GooeyText.css"
              scssDefaultCode={GooeyTextCss}
            />

            <SandboxWrapper
              jsxDefaultCodeName="WavyLogin.jsx"
              jsxDefaultCode={WavyLoginJsx}
              scssDefaultCodeName="WavyLogin.css"
              scssDefaultCode={WavyLoginCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="BlockyForm.jsx"
              jsxDefaultCode={BlockyFormJsx}
              scssDefaultCodeName="BlockyForm.css"
              scssDefaultCode={BlockyFormCss}
            />
            <SandboxWrapper
              jsxDefaultCodeName="SimpleRegistrationForm.jsx"
              jsxDefaultCode={SimpleRegJsx}
              scssDefaultCodeName="SimpleRegistrationForm.css"
              scssDefaultCode={SimpleRegCss}
            />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
