import HorizontalGallery from './HorizontalGallery';
import ParallaxGallery from './ParallaxGallery/ParallaxGallery';
import SkewGallery from './SkewGallery/SkewGallery';
import './HorizontalGalleryDemo.scss';
import Nav from '../Nav';

import ShootingStars from '../Backgrounds/BackgroundAnimations/ShootingStars/ShootingStars';
import WavyBackground from '../Backgrounds/BackgroundAnimations/WavyBackground/WavyBackground';
import FloatingBalls from '../Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls';
import Bubble from '../Backgrounds/BackgroundAnimations/Bubble/Bubble';
import RetroStyle from '../Backgrounds/BackgroundAnimations/RetroStyle/RetroStyle';
import Shapes from '../Backgrounds/BackgroundAnimations/Shapes/Shapes';
import Eyes from '../Backgrounds/BackgroundAnimations/Eyes/Eyes';
import Noise from '../Backgrounds/BackgroundAnimations/Noise/Noise';
import GlitchEffect from '../Text/TextAnimations/GlitchEffect/GlitchEffect';
import LiquidFill from '../Text/TextAnimations/LiquidFill/LiquidFill';
import SnakeEdge from '../Buttons/ButtonAnimations/SnakeEdge/SnakeEdge';
import CursorAware from '../Buttons/ButtonAnimations/CursorAware/CursorAware';


import ShootingStarsJsx from '../Backgrounds/BackgroundAnimations/ShootingStars/ShootingStars.jsx?raw';
import ShootingStarsCss from '../Backgrounds/BackgroundAnimations/ShootingStars/ShootingStars.css?raw';
import WavyBackgroundJsx from '../Backgrounds/BackgroundAnimations/WavyBackground/WavyBackground.jsx?raw';
import WavyBackgroundCss from '../Backgrounds/BackgroundAnimations/WavyBackground/WavyBackground.css?raw';
import FloatingBallsJsx from '../Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls.jsx?raw';
import FloatingBallsCss from '../Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls.css?raw';
import BubbleJsx from '../Backgrounds/BackgroundAnimations/Bubble/Bubble.jsx?raw';
import BubbleCss from '../Backgrounds/BackgroundAnimations/Bubble/Bubble.css?raw';
import RetroStyleJsx from '../Backgrounds/BackgroundAnimations/RetroStyle/RetroStyle.jsx?raw';
import RetroStyleCss from '../Backgrounds/BackgroundAnimations/RetroStyle/RetroStyle.css?raw';
import ShapesJsx from '../Backgrounds/BackgroundAnimations/Shapes/Shapes.jsx?raw';
import ShapesCss from '../Backgrounds/BackgroundAnimations/Shapes/Shapes.css?raw';
import EyesJsx from '../Backgrounds/BackgroundAnimations/Eyes/Eyes.jsx?raw';
import EyesCss from '../Backgrounds/BackgroundAnimations/Eyes/Eyes.css?raw';
import NoiseJsx from '../Backgrounds/BackgroundAnimations/Noise/Noise.jsx?raw';
import NoiseCss from '../Backgrounds/BackgroundAnimations/Noise/Noise.css?raw';
import GlitchEffectJsx from '../Text/TextAnimations/GlitchEffect/GlitchEffect.jsx?raw';
import GlitchEffectCss from '../Text/TextAnimations/GlitchEffect/GlitchEffect.css?raw';
import LiquidFillJsx from '../Text/TextAnimations/LiquidFill/LiquidFill.jsx?raw';
import LiquidFillCss from '../Text/TextAnimations/LiquidFill/LiquidFill.css?raw';
import SnakeEdgeJsx from '../Buttons/ButtonAnimations/SnakeEdge/SnakeEdge.jsx?raw';
import SnakeEdgeScss from '../Buttons/ButtonAnimations/SnakeEdge/SnakeEdge.scss?raw';
import CursorAwareJsx from '../Buttons/ButtonAnimations/CursorAware/CursorAware.jsx?raw';
import CursorAwareScss from '../Buttons/ButtonAnimations/CursorAware/CursorAware.scss?raw';

const galleryItems = [
  { id: 'shooting-stars', label: 'Shooting Stars', content: <ShootingStars />,  jsxCode: ShootingStarsJsx,  cssCode: ShootingStarsCss },
  { id: 'wavy-bg',        label: 'Wavy Background', content: <WavyBackground />, jsxCode: WavyBackgroundJsx, cssCode: WavyBackgroundCss },
  { id: 'floating-balls', label: 'Floating Balls', content: <FloatingBalls />,  jsxCode: FloatingBallsJsx,  cssCode: FloatingBallsCss },
  { id: 'bubbles',        label: 'Bubbles',         content: <Bubble />,         jsxCode: BubbleJsx,         cssCode: BubbleCss },
  { id: 'retro-style',    label: 'Retro Style',     content: <RetroStyle />,     jsxCode: RetroStyleJsx,     cssCode: RetroStyleCss },
  { id: 'shapes',         label: 'Shapes',          content: <Shapes />,         jsxCode: ShapesJsx,         cssCode: ShapesCss },
  { id: 'eyes',           label: 'Eyes',             content: <Eyes />,           jsxCode: EyesJsx,           cssCode: EyesCss },
  { id: 'noise',          label: 'Noise',            content: <Noise />,          jsxCode: NoiseJsx,          cssCode: NoiseCss },
  { id: 'glitch',         label: 'Glitch Effect',   content: <GlitchEffect />,   jsxCode: GlitchEffectJsx,   cssCode: GlitchEffectCss },
  { id: 'liquid-fill',    label: 'Liquid Fill',      content: <LiquidFill />,     jsxCode: LiquidFillJsx,     cssCode: LiquidFillCss },
  { id: 'snake-edge',     label: 'Snake Edge',      content: <SnakeEdge />,      jsxCode: SnakeEdgeJsx,      cssCode: SnakeEdgeScss },
  { id: 'cursor-aware',   label: 'Cursor Aware',    content: <CursorAware />,    jsxCode: CursorAwareJsx,    cssCode: CursorAwareScss },
];

export default function HorizontalGalleryDemo() {
  return (
    <div className="gallery-demo">
      <Nav />

      <section className="gallery-hero">
        <h1>Horizontal Gallery</h1>
        <p>Demo showcaseing some of our animations</p>
        <div className="scroll-hint">
          <span className="scroll-arrow">↓(this way)↓</span>
        </div>
      </section>

      <section className="variation-intro">
        <h2>00 — Basic Scroll</h2>
        <p>The foundation — pure horizontal translation.</p>
      </section>

      <HorizontalGallery items={galleryItems} />

      <section className="variation-intro">
        <h2>01 — Inner Parallax Pan</h2>
        <p>Card windows reveal layered depth as you scroll.</p>
      </section>

      <ParallaxGallery items={galleryItems} />

      <section className="variation-intro">
        <h2>02 — Velocity Skew</h2>
        <p>Momentum bends the cards — scroll fast to feel it.</p>
      </section>

      <SkewGallery items={galleryItems} />

      <section className="gallery-outro">
        <h2>The end!</h2>
      </section>
    </div>
  );
}
