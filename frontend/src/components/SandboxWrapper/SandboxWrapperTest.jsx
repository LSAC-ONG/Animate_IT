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

import SandboxWrapper from "./SandboxWrapper";

function SandboxWrapperTest() {
  const componentsList = [
    {
      jsxName: "FloatingBalls.jsx",
      jsxCode: FloatingBallsJsx,
      styleName: "FloatingBalls.css",
      styleCode: FloatingBallsCss,
    },
    {
      jsxName: "ShootingStars.jsx",
      jsxCode: ShootingStarsJsx,
      styleName: "ShootingStars.css",
      styleCode: ShootingStarsCss,
    },
    {
      jsxName: "WavyBackground.jsx",
      jsxCode: WavyBackgroundJsx,
      styleName: "WavyBackground.css",
      styleCode: WavyBackgroundCss,
    },
    {
      jsxName: "Eyes.jsx",
      jsxCode: EyesJsx,
      styleName: "Eyes.css",
      styleCode: EyesCss,
    },
    {
      jsxName: "SquareToOctagon.jsx",
      jsxCode: SquareToOctagonJsx,
      styleName: "SquareToOctagon.css",
      styleCode: SquareToOctagonCss,
    },
    {
      jsxName: "RetroStyle.jsx",
      jsxCode: RetroStyleJsx,
      styleName: "RetroStyle.css",
      styleCode: RetroStyleCss,
    },
    {
      jsxName: "Bubble.jsx",
      jsxCode: BubbleJsx,
      styleName: "Bubble.css",
      styleCode: BubbleCss,
    },
    {
      jsxName: "Noise.jsx",
      jsxCode: NoiseJsx,
      styleName: "Noise.css",
      styleCode: NoiseCss,
    },
    {
      jsxName: "Shapes.jsx",
      jsxCode: ShapesJsx,
      styleName: "Shapes.css",
      styleCode: ShapesCss,
    },
    {
      jsxName: "FloatingDots.jsx",
      jsxCode: FloatingDotsJsx,
      styleName: "FloatingDots.css",
      styleCode: FloatingDotsCss,
    },
    {
      jsxName: "SnakeEdge.jsx",
      jsxCode: SnakeEdgeJsx,
      styleName: "SnakeEdge.scss",
      styleCode: SnakeEdgeScss,
    },
    {
      jsxName: "CursorAware.jsx",
      jsxCode: CursorAwareJsx,
      styleName: "CursorAware.scss",
      styleCode: CursorAwareScss,
    },
    {
      jsxName: "ThinLine.jsx",
      jsxCode: ThinLineJsx,
      styleName: "ThinLine.scss",
      styleCode: ThinLineScss,
    },
    {
      jsxName: "ZoneIn.jsx",
      jsxCode: ZoneInJsx,
      styleName: "ZoneIn.scss",
      styleCode: ZoneInScss,
    },
    {
      jsxName: "LoadCheck.jsx",
      jsxCode: LoadCheckJsx,
      styleName: "LoadCheck.scss",
      styleCode: LoadCheckScss,
    },
    {
      jsxName: "DotTrail.jsx",
      jsxCode: DotTrailJsx,
      styleName: "DotTrail.scss",
      styleCode: DotTrailScss,
    },
    {
      jsxName: "ColorCircles.jsx",
      jsxCode: ColorCirclesJsx,
      styleName: "ColorCircles.scss",
      styleCode: ColorCirclesScss,
    },
    {
      jsxName: "RainbowAura.jsx",
      jsxCode: RainbowAuraJsx,
      styleName: "RainbowAura.scss",
      styleCode: RainbowAuraScss,
    },
    {
      jsxName: "TrailingDots.jsx",
      jsxCode: TrailingDotsJsx,
      styleName: "TrailingDots.scss",
      styleCode: TrailingDotsScss,
    },
    {
      jsxName: "RainingSquares.jsx",
      jsxCode: RainingSquaresJsx,
      styleName: "RainingSquares.scss",
      styleCode: RainingSquaresScss,
    },
    {
      jsxName: "DancingShadow.jsx",
      jsxCode: DancingShadowJsx,
      styleName: "DancingShadow.css",
      styleCode: DancingShadowCss,
    },
    {
      jsxName: "MatrixGlitch.jsx",
      jsxCode: MatrixGlitchJsx,
      styleName: "MatrixGlitch.css",
      styleCode: MatrixGlitchCss,
    },
    {
      jsxName: "PulseText.jsx",
      jsxCode: PulseTextJsx,
      styleName: "PulseText.css",
      styleCode: PulseTextCss,
    },
    {
      jsxName: "GlitchEffect.jsx",
      jsxCode: GlitchEffectJsx,
      styleName: "GlitchEffect.css",
      styleCode: GlitchEffectCss,
    },
    {
      jsxName: "BorderRevolve.jsx",
      jsxCode: BorderRevolveJsx,
      styleName: "BorderRevolve.css",
      styleCode: BorderRevolveCss,
    },
    {
      jsxName: "LiquidFill.jsx",
      jsxCode: LiquidFillJsx,
      styleName: "LiquidFill.css",
      styleCode: LiquidFillCss,
    },
    {
      jsxName: "GooeyText.jsx",
      jsxCode: GooeyTextJsx,
      styleName: "GooeyText.css",
      styleCode: GooeyTextCss,
    },
    {
      jsxName: "WavyLogin.jsx",
      jsxCode: WavyLoginJsx,
      styleName: "WavyLogin.css",
      styleCode: WavyLoginCss,
    },
    {
      jsxName: "BlockyForm.jsx",
      jsxCode: BlockyFormJsx,
      styleName: "BlockyForm.css",
      styleCode: BlockyFormCss,
    },
    {
      jsxName: "SimpleRegistrationForm.jsx",
      jsxCode: SimpleRegJsx,
      styleName: "SimpleRegistrationForm.css",
      styleCode: SimpleRegCss,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10rem",
      }}
    >
      {componentsList.map((comp, index) => (
        <SandboxWrapper
          key={index}
          jsxDefaultCodeName={comp.jsxName}
          jsxDefaultCode={comp.jsxCode}
          scssDefaultCodeName={comp.styleName}
          scssDefaultCode={comp.styleCode}
        />
      ))}
    </div>
  );
}

export default SandboxWrapperTest;
