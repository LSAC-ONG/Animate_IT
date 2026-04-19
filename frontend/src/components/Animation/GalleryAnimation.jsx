import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./GalleryAnimation.scss";

// --- BACKGROUNDS ---
import FloatingBallsJsx from "../Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls.jsx?raw";
import FloatingBallsCss from "../Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls.css?raw";
import ShootingStarsJsx from "../Backgrounds/BackgroundAnimations/ShootingStars/ShootingStars.jsx?raw";
import ShootingStarsCss from "../Backgrounds/BackgroundAnimations/ShootingStars/ShootingStars.css?raw";
import WavyBackgroundJsx from "../Backgrounds/BackgroundAnimations/WavyBackground/WavyBackground.jsx?raw";
import WavyBackgroundCss from "../Backgrounds/BackgroundAnimations/WavyBackground/WavyBackground.css?raw";
import EyesJsx from "../Backgrounds/BackgroundAnimations/Eyes/Eyes.jsx?raw";
import EyesCss from "../Backgrounds/BackgroundAnimations/Eyes/Eyes.css?raw";
import SquareToOctagonJsx from "../Backgrounds/BackgroundAnimations/SquareToOctagon/SquareToOctagon.jsx?raw";
import SquareToOctagonCss from "../Backgrounds/BackgroundAnimations/SquareToOctagon/SquareToOctagon.css?raw";
import RetroStyleJsx from "../Backgrounds/BackgroundAnimations/RetroStyle/RetroStyle.jsx?raw";
import RetroStyleCss from "../Backgrounds/BackgroundAnimations/RetroStyle/RetroStyle.css?raw";
import BubbleJsx from "../Backgrounds/BackgroundAnimations/Bubble/Bubble.jsx?raw";
import BubbleCss from "../Backgrounds/BackgroundAnimations/Bubble/Bubble.css?raw";
import NoiseJsx from "../Backgrounds/BackgroundAnimations/Noise/Noise.jsx?raw";
import NoiseCss from "../Backgrounds/BackgroundAnimations/Noise/Noise.css?raw";
import ShapesJsx from "../Backgrounds/BackgroundAnimations/Shapes/Shapes.jsx?raw";
import ShapesCss from "../Backgrounds/BackgroundAnimations/Shapes/Shapes.css?raw";
import FloatingDotsJsx from "../Backgrounds/BackgroundAnimations/FloatingDots/FloatingDots.jsx?raw";
import FloatingDotsCss from "../Backgrounds/BackgroundAnimations/FloatingDots/FloatingDots.css?raw";

// --- BUTTONS ---
import SnakeEdgeJsx from "../Buttons/ButtonAnimations/SnakeEdge/SnakeEdge.jsx?raw";
import SnakeEdgeScss from "../Buttons/ButtonAnimations/SnakeEdge/SnakeEdge.scss?raw";
import CursorAwareJsx from "../Buttons/ButtonAnimations/CursorAware/CursorAware.jsx?raw";
import CursorAwareScss from "../Buttons/ButtonAnimations/CursorAware/CursorAware.scss?raw";
import ThinLineJsx from "../Buttons/ButtonAnimations/ThinLine/ThinLine.jsx?raw";
import ThinLineScss from "../Buttons/ButtonAnimations/ThinLine/ThinLine.scss?raw";
import ZoneInJsx from "../Buttons/ButtonAnimations/ZoneIn/ZoneIn.jsx?raw";
import ZoneInScss from "../Buttons/ButtonAnimations/ZoneIn/ZoneIn.scss?raw";
import LoadCheckJsx from "../Buttons/ButtonAnimations/LoadCheck/LoadCheck.jsx?raw";
import LoadCheckScss from "../Buttons/ButtonAnimations/LoadCheck/LoadCheck.scss?raw";

// --- CURSORS ---
import DotTrailJsx from "../Cursors/CursorAnimations/DotTrail/DotTrail.jsx?raw";
import DotTrailScss from "../Cursors/CursorAnimations/DotTrail/DotTrail.scss?raw";
import ColorCirclesJsx from "../Cursors/CursorAnimations/ColorCircles/ColorCircles.jsx?raw";
import ColorCirclesScss from "../Cursors/CursorAnimations/ColorCircles/ColorCircles.scss?raw";
import RainbowAuraJsx from "../Cursors/CursorAnimations/RainbowAura/RainbowAura.jsx?raw";
import RainbowAuraScss from "../Cursors/CursorAnimations/RainbowAura/RainbowAura.scss?raw";
import TrailingDotsJsx from "../Cursors/CursorAnimations/TrailingDots/TrailingDots.jsx?raw";
import TrailingDotsScss from "../Cursors/CursorAnimations/TrailingDots/TrailingDots.scss?raw";
import RainingSquaresJsx from "../Cursors/CursorAnimations/RainingSquares/RainingSquares.jsx?raw";
import RainingSquaresScss from "../Cursors/CursorAnimations/RainingSquares/RainingSquares.scss?raw";

// --- FORMS ---
import WavyLoginJsx from "../Forms/FormsAnimations/WavyLogin/WavyLogin.jsx?raw";
import WavyLoginCss from "../Forms/FormsAnimations/WavyLogin/WavyLogin.css?raw";
import SimpleRegJsx from "../Forms/FormsAnimations/SimpleRegistrationForm/SimpleRegistrationForm.jsx?raw";
import SimpleRegCss from "../Forms/FormsAnimations/SimpleRegistrationForm/SimpleRegistrationForm.css?raw";
import BlockyFormJsx from "../Forms/FormsAnimations/BlockyForm/BlockyForm.jsx?raw";
import BlockyFormCss from "../Forms/FormsAnimations/BlockyForm/BlockyForm.css?raw";

// --- TEXT ---
import DancingShadowJsx from "../Text/TextAnimations/DancingShadow/DancingShadow.jsx?raw";
import DancingShadowCss from "../Text/TextAnimations/DancingShadow/DancingShadow.css?raw";
import MatrixGlitchJsx from "../Text/TextAnimations/MatrixGlitch/MatrixGlitch.jsx?raw";
import MatrixGlitchCss from "../Text/TextAnimations/MatrixGlitch/MatrixGlitch.css?raw";
import PulseTextJsx from "../Text/TextAnimations/PulseText/PulseText.jsx?raw";
import PulseTextCss from "../Text/TextAnimations/PulseText/PulseText.css?raw";
import GlitchEffectJsx from "../Text/TextAnimations/GlitchEffect/GlitchEffect.jsx?raw";
import GlitchEffectCss from "../Text/TextAnimations/GlitchEffect/GlitchEffect.css?raw";
import BorderRevolveJsx from "../Text/TextAnimations/BorderRevolve/BorderRevolve.jsx?raw";
import BorderRevolveCss from "../Text/TextAnimations/BorderRevolve/BorderRevolve.css?raw";
import LiquidFillJsx from "../Text/TextAnimations/LiquidFill/LiquidFill.jsx?raw";
import LiquidFillCss from "../Text/TextAnimations/LiquidFill/LiquidFill.css?raw";
import GooeyTextJsx from "../Text/TextAnimations/GooeyText/GooeyText.jsx?raw";
import GooeyTextCss from "../Text/TextAnimations/GooeyText/GooeyText.css?raw";

import SandboxWrapper from "./SandboxWrapper/SandboxWrapper";
import Nav from "../Nav";

function GalleryAnimation() {
  const { id } = useParams();

  const componentsList = [
    {
      id: "floating-balls",
      jsxName: "FloatingBalls.jsx",
      jsxCode: FloatingBallsJsx,
      styleName: "FloatingBalls.css",
      styleCode: FloatingBallsCss,
    },
    {
      id: "shooting-stars",
      jsxName: "ShootingStars.jsx",
      jsxCode: ShootingStarsJsx,
      styleName: "ShootingStars.css",
      styleCode: ShootingStarsCss,
    },
    {
      id: "wavy-bg",
      jsxName: "WavyBackground.jsx",
      jsxCode: WavyBackgroundJsx,
      styleName: "WavyBackground.css",
      styleCode: WavyBackgroundCss,
    },
    {
      id: "eyes",
      jsxName: "Eyes.jsx",
      jsxCode: EyesJsx,
      styleName: "Eyes.css",
      styleCode: EyesCss,
    },
    {
      id: "square-to-octagon",
      jsxName: "SquareToOctagon.jsx",
      jsxCode: SquareToOctagonJsx,
      styleName: "SquareToOctagon.css",
      styleCode: SquareToOctagonCss,
    },
    {
      id: "retro-style",
      jsxName: "RetroStyle.jsx",
      jsxCode: RetroStyleJsx,
      styleName: "RetroStyle.css",
      styleCode: RetroStyleCss,
    },
    {
      id: "bubbles",
      jsxName: "Bubble.jsx",
      jsxCode: BubbleJsx,
      styleName: "Bubble.css",
      styleCode: BubbleCss,
    },
    {
      id: "noise",
      jsxName: "Noise.jsx",
      jsxCode: NoiseJsx,
      styleName: "Noise.css",
      styleCode: NoiseCss,
    },
    {
      id: "shapes",
      jsxName: "Shapes.jsx",
      jsxCode: ShapesJsx,
      styleName: "Shapes.css",
      styleCode: ShapesCss,
    },
    {
      id: "floating-dots",
      jsxName: "FloatingDots.jsx",
      jsxCode: FloatingDotsJsx,
      styleName: "FloatingDots.css",
      styleCode: FloatingDotsCss,
    },
    {
      id: "snake-edge",
      jsxName: "SnakeEdge.jsx",
      jsxCode: SnakeEdgeJsx,
      styleName: "SnakeEdge.scss",
      styleCode: SnakeEdgeScss,
    },
    {
      id: "cursor-aware",
      jsxName: "CursorAware.jsx",
      jsxCode: CursorAwareJsx,
      styleName: "CursorAware.scss",
      styleCode: CursorAwareScss,
    },
    {
      id: "thin-line",
      jsxName: "ThinLine.jsx",
      jsxCode: ThinLineJsx,
      styleName: "ThinLine.scss",
      styleCode: ThinLineScss,
    },
    {
      id: "zone-in",
      jsxName: "ZoneIn.jsx",
      jsxCode: ZoneInJsx,
      styleName: "ZoneIn.scss",
      styleCode: ZoneInScss,
    },
    {
      id: "load-check",
      jsxName: "LoadCheck.jsx",
      jsxCode: LoadCheckJsx,
      styleName: "LoadCheck.scss",
      styleCode: LoadCheckScss,
    },
    {
      id: "dot-trail",
      jsxName: "DotTrail.jsx",
      jsxCode: DotTrailJsx,
      styleName: "DotTrail.scss",
      styleCode: DotTrailScss,
    },
    {
      id: "color-circles",
      jsxName: "ColorCircles.jsx",
      jsxCode: ColorCirclesJsx,
      styleName: "ColorCircles.scss",
      styleCode: ColorCirclesScss,
    },
    {
      id: "rainbow-aura",
      jsxName: "RainbowAura.jsx",
      jsxCode: RainbowAuraJsx,
      styleName: "RainbowAura.scss",
      styleCode: RainbowAuraScss,
    },
    {
      id: "trailing-dots",
      jsxName: "TrailingDots.jsx",
      jsxCode: TrailingDotsJsx,
      styleName: "TrailingDots.scss",
      styleCode: TrailingDotsScss,
    },
    {
      id: "raining-squares",
      jsxName: "RainingSquares.jsx",
      jsxCode: RainingSquaresJsx,
      styleName: "RainingSquares.scss",
      styleCode: RainingSquaresScss,
    },
    {
      id: "dancing-shadow",
      jsxName: "DancingShadow.jsx",
      jsxCode: DancingShadowJsx,
      styleName: "DancingShadow.css",
      styleCode: DancingShadowCss,
    },
    {
      id: "matrix-glitch",
      jsxName: "MatrixGlitch.jsx",
      jsxCode: MatrixGlitchJsx,
      styleName: "MatrixGlitch.css",
      styleCode: MatrixGlitchCss,
    },
    {
      id: "pulse-text",
      jsxName: "PulseText.jsx",
      jsxCode: PulseTextJsx,
      styleName: "PulseText.css",
      styleCode: PulseTextCss,
    },
    {
      id: "glitch",
      jsxName: "GlitchEffect.jsx",
      jsxCode: GlitchEffectJsx,
      styleName: "GlitchEffect.css",
      styleCode: GlitchEffectCss,
    },
    {
      id: "border-revolve",
      jsxName: "BorderRevolve.jsx",
      jsxCode: BorderRevolveJsx,
      styleName: "BorderRevolve.css",
      styleCode: BorderRevolveCss,
    },
    {
      id: "liquid-fill",
      jsxName: "LiquidFill.jsx",
      jsxCode: LiquidFillJsx,
      styleName: "LiquidFill.css",
      styleCode: LiquidFillCss,
    },
    {
      id: "gooey-text",
      jsxName: "GooeyText.jsx",
      jsxCode: GooeyTextJsx,
      styleName: "GooeyText.css",
      styleCode: GooeyTextCss,
    },
    {
      id: "wavy-login",
      jsxName: "WavyLogin.jsx",
      jsxCode: WavyLoginJsx,
      styleName: "WavyLogin.css",
      styleCode: WavyLoginCss,
    },
    {
      id: "blocky-form",
      jsxName: "BlockyForm.jsx",
      jsxCode: BlockyFormJsx,
      styleName: "BlockyForm.css",
      styleCode: BlockyFormCss,
    },
    {
      id: "simple-registration-form",
      jsxName: "SimpleRegistrationForm.jsx",
      jsxCode: SimpleRegJsx,
      styleName: "SimpleRegistrationForm.css",
      styleCode: SimpleRegCss,
    },
  ];

  const currentAnimation = componentsList.find((comp) => comp.id === id);

  return (
    <div className="text-container">
      {currentAnimation ? (
        <SandboxWrapper
          jsxDefaultCodeName={currentAnimation.jsxName}
          jsxDefaultCode={currentAnimation.jsxCode}
          scssDefaultCodeName={currentAnimation.styleName}
          scssDefaultCode={currentAnimation.styleCode}
        />
      ) : (
        "Animation not found!"
      )}
    </div>
  );
}

export default GalleryAnimation;
