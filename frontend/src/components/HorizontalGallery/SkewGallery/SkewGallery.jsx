import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './SkewGallery.scss';

gsap.registerPlugin(ScrollTrigger);

const clampSkew = gsap.utils.clamp(-20, 20);
const clampRotate = gsap.utils.clamp(-25, 25);

export default function SkewGallery({ items = [] }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = [];

  useGSAP(() => {
    if (!items.length) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const cards = itemRefs.current.filter(Boolean);

    const getScrollAmount = () => -(track.scrollWidth - wrapper.offsetWidth);

    gsap.set(cards, { transformPerspective: 800 });

    const skewTo = gsap.quickTo(cards, 'skewX', { duration: 0.5, ease: 'power3' });
    const rotateTo = gsap.quickTo(cards, 'rotateY', { duration: 0.5, ease: 'power3' });

    gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${-getScrollAmount()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          skewTo(clampSkew(velocity * -0.001));
          rotateTo(clampRotate(velocity * -0.005));
        },
      },
    });
  }, { scope: wrapperRef, dependencies: [items] });

  return (
    <section ref={wrapperRef} className="skew-gallery">
      <div ref={trackRef} className="skew-scroll-track">
        {items.map((item, i) => (
          <div
            className="skew-item"
            key={item.id ?? i}
            ref={el => { itemRefs.current[i] = el; }}
          >
            <div className="skew-item-label">{item.label}</div>
            <div className="skew-item-content">{item.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
