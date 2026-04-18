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

const galleryItems = [
  { id: 'shooting-stars', label: 'Shooting Stars', content: <ShootingStars /> },
  { id: 'wavy-bg',        label: 'Wavy Background', content: <WavyBackground /> },
  { id: 'floating-balls', label: 'Floating Balls', content: <FloatingBalls /> },
  { id: 'bubbles',        label: 'Bubbles',         content: <Bubble /> },
  { id: 'retro-style',    label: 'Retro Style',     content: <RetroStyle /> },
  { id: 'shapes',         label: 'Shapes',          content: <Shapes /> },
  { id: 'eyes',           label: 'Eyes',             content: <Eyes /> },
  { id: 'noise',          label: 'Noise',            content: <Noise /> },
  { id: 'glitch',         label: 'Glitch Effect',   content: <GlitchEffect /> },
  { id: 'liquid-fill',    label: 'Liquid Fill',      content: <LiquidFill /> },
  { id: 'snake-edge',     label: 'Snake Edge',      content: <SnakeEdge /> },
  { id: 'cursor-aware',   label: 'Cursor Aware',    content: <CursorAware /> },
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
