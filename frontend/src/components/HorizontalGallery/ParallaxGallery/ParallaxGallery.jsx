import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ParallaxGallery.scss';

gsap.registerPlugin(ScrollTrigger);

const clamp = gsap.utils.clamp(-1, 1);

export default function ParallaxGallery({ items = [] }) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const innerRefs = useRef([]);
  cardRefs.current = [];
  innerRefs.current = [];

  useGSAP(() => {
    if (!items.length) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const cards = cardRefs.current.filter(Boolean);
    const inners = innerRefs.current.filter(Boolean);

    const getScrollAmount = () => -(track.scrollWidth - wrapper.offsetWidth);
    const setters = inners.map(inner => gsap.quickSetter(inner, 'x', 'px'));

    const cardData = cards.map(card => ({
      width: card.offsetWidth,
      left: card.offsetLeft,
    }));

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
        onRefresh: () => {
          cards.forEach((card, i) => {
            cardData[i].width = card.offsetWidth;
            cardData[i].left = card.offsetLeft;
          });
        },
      },
    });

    const PARALLAX_STRENGTH = 0.28;

    const tick = () => {
      const currentX = gsap.getProperty(track, 'x');
      const halfViewport = wrapper.offsetWidth / 2;

      cardData.forEach(({ width, left }, i) => {
        const cardCenter = left + currentX + width / 2;
        const norm = (cardCenter - halfViewport) / (halfViewport + width / 2);
        setters[i](-clamp(norm) * width * PARALLAX_STRENGTH);
      });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, { scope: wrapperRef, dependencies: [items] });

  return (
    <section ref={wrapperRef} className="parallax-gallery">
      <div ref={trackRef} className="parallax-scroll-track">
        {items.map((item, i) => (
          <div
            className="parallax-item"
            key={item.id ?? i}
            ref={el => { cardRefs.current[i] = el; }}
          >
            <div
              className="parallax-item-inner"
              ref={el => { innerRefs.current[i] = el; }}
            >
              {item.content}
            </div>
            <div className="parallax-item-label">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
