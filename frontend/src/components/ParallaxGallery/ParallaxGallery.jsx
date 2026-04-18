import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ParallaxGallery.module.scss';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxGallery({ items = [], className = '' }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const galleryItems = containerRef.current.querySelectorAll(`.${styles.galleryItem}`);
    galleryItems.forEach(item => {
      const speed = parseFloat(item.dataset.speed) || 1;

      gsap.fromTo(item, 
        { yPercent: 80 * (speed - 1) }, 
        { 
          yPercent: -80 * (speed - 1), 
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div className={`${styles.wrapper} ${className}`} ref={containerRef}>
      <div className={styles.animationBlocks}>
          {items.map((item, i) => (
          <div 
            className={styles.galleryItem} 
            key={item.id ?? i}
            data-speed={item.dataSpeed}
          >
              <div className={styles.galleryItemLabel}>{item.label}</div>
              <div className={styles.galleryItemContent}>
              {item.content}
              </div>
          </div>
          ))}
      </div>
    </div>
  );
}
