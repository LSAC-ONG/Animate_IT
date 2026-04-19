import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './WipeGallery.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function WipeGallery({ items = [], className = '' }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!items.length) return;
    const sections = Array.from(containerRef.current.querySelectorAll(`.${styles.wipeSection}`));
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${(items.length - 1) * 100}%`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    sections.forEach((section, index) => {
      if (index === 0) return;

      tl.fromTo(section, 
        { clipPath: 'inset(100% 0 0 0)' }, 
        { 
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
        },
        index - 1
      );
    });

  }, { scope: containerRef });

  return (
    <div className={`${styles.wipeContainer} ${className}`} ref={containerRef}>
      {items.map((item, i) => (
        <div 
          className={styles.wipeSection} 
          key={item.id ?? i}
          style={{ zIndex: i + 1 }}
        >
          <div className={styles.label}>{item.label}</div>
          <div className={styles.content}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
