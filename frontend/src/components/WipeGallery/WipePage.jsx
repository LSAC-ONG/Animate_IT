import WipeGallery from './WipeGallery';
import styles from './WipePage.module.scss';
import Nav from '../Nav';

import ShootingStars from '../Backgrounds/BackgroundAnimations/ShootingStars/ShootingStars';
import WavyBackground from '../Backgrounds/BackgroundAnimations/WavyBackground/WavyBackground';
import FloatingBalls from '../Backgrounds/BackgroundAnimations/FloatingBalls/FloatingBalls';
import Bubble from '../Backgrounds/BackgroundAnimations/Bubble/Bubble';
import Shapes from '../Backgrounds/BackgroundAnimations/Shapes/Shapes';

const galleryItems = [
  { id: 'shooting-stars', label: 'Shooting Stars',  content: <ShootingStars /> },
  { id: 'wavy-bg',        label: 'Wavy Background', content: <WavyBackground /> },
  { id: 'floating-balls', label: 'Floating Balls',  content: <FloatingBalls /> },
  { id: 'bubbles',        label: 'Bubbles',         content: <Bubble /> },
  { id: 'shapes',         label: 'Shapes',          content: <Shapes /> },
  { id: 'shooting-stars', label: 'Shooting Stars',  content: <ShootingStars /> },
  { id: 'wavy-bg',        label: 'Wavy Background', content: <WavyBackground /> },
  { id: 'floating-balls', label: 'Floating Balls',  content: <FloatingBalls /> },
  { id: 'bubbles',        label: 'Bubbles',         content: <Bubble /> },
  { id: 'shapes',         label: 'Shapes',          content: <Shapes /> },
];

export default function WipePage() {
  return (
    <div className={styles.wipePage}>
      <Nav />
      <WipeGallery items={galleryItems} />
    </div>
  );
}
