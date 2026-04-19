import VerticalParallaxGallery from './VerticalParallaxGallery';
import styles from './VerticalParallaxPage.module.scss';
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
  { id: 'shooting-stars', label: 'Shooting Stars',  content: <ShootingStars />, dataSpeed: 1.5 },
  { id: 'wavy-bg',        label: 'Wavy Background', content: <WavyBackground />, dataSpeed: 0.3 },
  { id: 'floating-balls', label: 'Floating Balls',  content: <FloatingBalls />, dataSpeed: 2.0 },
  { id: 'bubbles',        label: 'Bubbles',         content: <Bubble />,        dataSpeed: 1.8 },
  { id: 'retro-style',    label: 'Retro Style',     content: <RetroStyle />,    dataSpeed: 0.6 },
  { id: 'shapes',         label: 'Shapes',          content: <Shapes />,        dataSpeed: 2.5 },
  { id: 'eyes',           label: 'Eyes',            content: <Eyes />,          dataSpeed: 0.1 },
  { id: 'noise',          label: 'Noise',           content: <Noise />,         dataSpeed: 0.4 },
  { id: 'glitch',         label: 'Glitch Effect',   content: <GlitchEffect />,  dataSpeed: 1.2 },
  { id: 'liquid-fill',    label: 'Liquid Fill',     content: <LiquidFill />,    dataSpeed: 0.8 },
  { id: 'snake-edge',     label: 'Snake Edge',      content: <SnakeEdge />,     dataSpeed: 2.2 },
  { id: 'cursor-aware',   label: 'Cursor Aware',    content: <CursorAware />,   dataSpeed: 0.5 },
];

export default function VerticalParallaxGalleryPage() {
  return (
    <div className={styles.galleryDemo}>
      <Nav />

      <VerticalParallaxGallery items={galleryItems} />

    </div>
  );
}
