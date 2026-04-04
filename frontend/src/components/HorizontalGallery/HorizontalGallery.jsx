import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HorizontalGallery.scss';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalGallery({ items = [], className = '' }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (!items.length) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    const getScrollAmount = () => -(track.scrollWidth - wrapper.offsetWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${-getScrollAmount()}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();      // Cleanup
      tween.kill();
    };
  }, [items]);

  return (
    <section
      ref={wrapperRef}
      className={`horizontal-gallery ${className}`.trim()}
    >
      <div ref={trackRef} className="horizontal-scroll-track">
        {items.map((item, i) => (
          <div className="gallery-item" key={item.id ?? i}>
            <div className="gallery-item-label">{item.label}</div>
            <div className="gallery-item-content">
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
