import Nav from '../Nav';
import WipeGallery from '../WipeGallery/WipeGallery';
import SkewGallery from '../HorizontalGallery/SkewGallery/SkewGallery';
import ParallaxGallery from '../HorizontalGallery/ParallaxGallery/ParallaxGallery';
import HorizontalGallery from '../HorizontalGallery/HorizontalGallery';
import VerticalParallaxGallery from '../VerticalParallaxGallery/VerticalParallaxGallery';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GalleryPage.scss';

const GalleryImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    draggable={false}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    }}
  />
);

const wipeItems = [
  { id: 'wipe-aurora',     label: 'Aurora Borealis',   content: <GalleryImage src="/gallery_images/aurora_borealis.jpg" alt="Aurora Borealis" /> },
  { id: 'wipe-lightning',  label: 'Lightning Storm',   content: <GalleryImage src="/gallery_images/lightning_storm.jpg" alt="Lightning Storm" /> },
  { id: 'wipe-nebula',     label: 'Nebula',            content: <GalleryImage src="/gallery_images/nebula_space.jpg" alt="Nebula" /> },
  { id: 'wipe-northern',   label: 'Northern Lights',   content: <GalleryImage src="/gallery_images/northern_lights.jpg" alt="Northern Lights" /> },
  { id: 'wipe-starry',     label: 'Starry Mountain',   content: <GalleryImage src="/gallery_images/starry_mountain.jpg" alt="Starry Mountain" /> },
  { id: 'wipe-earth',      label: 'Earth from Space',  content: <GalleryImage src="/gallery_images/earth_space.jpg" alt="Earth from Space" /> },
];

const skewItems = [
  { id: 'skew-dramatic',   label: 'Dramatic Peak',      content: <GalleryImage src="/gallery_images/dramatic_mountain.jpg" alt="Dramatic Peak" /> },
  { id: 'skew-desert',     label: 'Desert Dunes',       content: <GalleryImage src="/gallery_images/desert_dunes.jpg" alt="Desert Dunes" /> },
  { id: 'skew-waterfall',  label: 'Hidden Waterfall',   content: <GalleryImage src="/gallery_images/waterfall.jpg" alt="Hidden Waterfall" /> },
  { id: 'skew-clouds',     label: 'Dark Clouds',        content: <GalleryImage src="/gallery_images/dark_clouds.jpg" alt="Dark Clouds" /> },
  { id: 'skew-architecture', label: 'Architecture',     content: <GalleryImage src="/gallery_images/architecture.jpg" alt="Architecture" /> },
  { id: 'skew-city',       label: 'City Night',         content: <GalleryImage src="/gallery_images/city_night.jpg" alt="City Night" /> },
  { id: 'skew-ocean',      label: 'Ocean Aerial',       content: <GalleryImage src="/gallery_images/ocean_aerial.jpg" alt="Ocean Aerial" /> },
  { id: 'skew-beach',      label: 'Tropical Beach',     content: <GalleryImage src="/gallery_images/tropical_beach.jpg" alt="Tropical Beach" /> },
];

const parallaxItems = [
  { id: 'plx-mountains',   label: 'Mountain Dawn',      content: <GalleryImage src="/gallery_images/mountains_dawn.jpg" alt="Mountain Dawn" /> },
  { id: 'plx-foggy',       label: 'Foggy Forest',       content: <GalleryImage src="/gallery_images/foggy_forest.jpg" alt="Foggy Forest" /> },
  { id: 'plx-lake',        label: 'Lake Mountains',     content: <GalleryImage src="/gallery_images/lake_mountains.jpg" alt="Lake Mountains" /> },
  { id: 'plx-misty',       label: 'Misty Valley',       content: <GalleryImage src="/gallery_images/misty_valley.jpg" alt="Misty Valley" /> },
  { id: 'plx-sunlight',    label: 'Sunlight Trees',     content: <GalleryImage src="/gallery_images/sunlight_trees.jpg" alt="Sunlight Trees" /> },
  { id: 'plx-bridge',      label: 'Waterfall Bridge',   content: <GalleryImage src="/gallery_images/waterfall_bridge.jpg" alt="Waterfall Bridge" /> },
  { id: 'plx-golden',      label: 'Golden Sunset',      content: <GalleryImage src="/gallery_images/golden_sunset.jpg" alt="Golden Sunset" /> },
  { id: 'plx-abstract',    label: 'Abstract Lights',    content: <GalleryImage src="/gallery_images/abstract_lights.jpg" alt="Abstract Lights" /> },
];

const basicItems = [
  { id: 'basic-ocean',     label: 'Ocean Waves',        content: <GalleryImage src="/gallery_images/ocean_waves.jpg" alt="Ocean Waves" /> },
  { id: 'basic-aurora',    label: 'Aurora Borealis',    content: <GalleryImage src="/gallery_images/aurora_borealis.jpg" alt="Aurora Borealis" /> },
  { id: 'basic-desert',    label: 'Desert Dunes',       content: <GalleryImage src="/gallery_images/desert_dunes.jpg" alt="Desert Dunes" /> },
  { id: 'basic-lightning', label: 'Lightning Storm',    content: <GalleryImage src="/gallery_images/lightning_storm.jpg" alt="Lightning Storm" /> },
  { id: 'basic-mountain',  label: 'Dramatic Mountain',  content: <GalleryImage src="/gallery_images/dramatic_mountain.jpg" alt="Dramatic Mountain" /> },
  { id: 'basic-city',      label: 'City Night',         content: <GalleryImage src="/gallery_images/city_night.jpg" alt="City Night" /> },
  { id: 'basic-earth',     label: 'Earth from Space',   content: <GalleryImage src="/gallery_images/earth_space.jpg" alt="Earth from Space" /> },
  { id: 'basic-waterfall', label: 'Waterfall',          content: <GalleryImage src="/gallery_images/waterfall.jpg" alt="Waterfall" /> },
];

const verticalItems = [
  { id: 'vp-starry',     label: 'Starry Mountain',    content: <GalleryImage src="/gallery_images/starry_mountain.jpg" alt="Starry Mountain" />,   dataSpeed: 1.5 },
  { id: 'vp-foggy',      label: 'Foggy Forest',       content: <GalleryImage src="/gallery_images/foggy_forest.jpg" alt="Foggy Forest" />,         dataSpeed: 0.3 },
  { id: 'vp-northern',   label: 'Northern Lights',    content: <GalleryImage src="/gallery_images/northern_lights.jpg" alt="Northern Lights" />,   dataSpeed: 2.0 },
  { id: 'vp-lake',       label: 'Lake Mountains',     content: <GalleryImage src="/gallery_images/lake_mountains.jpg" alt="Lake Mountains" />,     dataSpeed: 1.8 },
  { id: 'vp-beach',      label: 'Tropical Beach',     content: <GalleryImage src="/gallery_images/tropical_beach.jpg" alt="Tropical Beach" />,     dataSpeed: 0.6 },
  { id: 'vp-clouds',     label: 'Dark Clouds',        content: <GalleryImage src="/gallery_images/dark_clouds.jpg" alt="Dark Clouds" />,           dataSpeed: 2.5 },
  { id: 'vp-abstract',   label: 'Abstract Lights',    content: <GalleryImage src="/gallery_images/abstract_lights.jpg" alt="Abstract Lights" />,   dataSpeed: 0.1 },
  { id: 'vp-architecture', label: 'Architecture',     content: <GalleryImage src="/gallery_images/architecture.jpg" alt="Architecture" />,         dataSpeed: 0.4 },
  { id: 'vp-sunset',     label: 'Golden Sunset',      content: <GalleryImage src="/gallery_images/golden_sunset.jpg" alt="Golden Sunset" />,       dataSpeed: 1.2 },
  { id: 'vp-misty',      label: 'Misty Valley',       content: <GalleryImage src="/gallery_images/misty_valley.jpg" alt="Misty Valley" />,         dataSpeed: 0.8 },
];


export default function GalleryPage() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="gallery-page">
      <Nav />

      <section className="gallery-page-hero">
        <h1>The Gallery</h1>
        <p>Five stunning scroll-driven galleries — one seamless experience.</p>
        <div className="scroll-hint">
          <span className="scroll-arrow">↓</span>
        </div>
      </section>

      <section className="section-intro">
        <span className="section-number">01</span>
        <h2>Cinematic Wipe</h2>
        <p>Full-screen reveals that wipe away to unveil the next image.</p>
      </section>

      <WipeGallery items={wipeItems} />

      <section className="section-intro">
        <span className="section-number">02</span>
        <h2>Velocity Skew</h2>
        <p>Momentum bends the cards — scroll fast to feel it.</p>
      </section>

      <SkewGallery items={skewItems} />

      <section className="section-intro">
        <span className="section-number">03</span>
        <h2>Inner Parallax Pan</h2>
        <p>Card windows reveal layered depth as you scroll.</p>
      </section>

      <ParallaxGallery items={parallaxItems} />

      <section className="section-intro">
        <span className="section-number">04</span>
        <h2>Classic Scroll</h2>
        <p>The foundation — smooth horizontal translation. Click any card to view full-screen.</p>
      </section>

      <HorizontalGallery items={basicItems} />

      <section className="section-intro">
        <span className="section-number">05</span>
        <h2>Vertical Parallax</h2>
        <p>Staggered depths that shift at different speeds.</p>
      </section>

      <VerticalParallaxGallery items={verticalItems} />

      <section className="gallery-page-outro">
        <h2>End of Gallery</h2>
        <p>Thanks for scrolling through our showcase!</p>
      </section>
    </div>
  );
}
