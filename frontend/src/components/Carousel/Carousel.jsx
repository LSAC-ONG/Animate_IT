import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './Carousel.css';

// register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

// Lista de slide-uri definită intern
const slides = [
  { src: 'background-icon.png', alt: 'Backgrounds', label: 'backgrounds!' },
  { src: 'button-icon.png',     alt: 'Buttons',     label: 'buttons!'     },
  { src: 'cursor-icon.png',     alt: 'Cursors',     label: 'cursors!'     },
  { src: 'text-icon.png',       alt: 'Text',        label: 'text!'        },
  { src: 'form-icon.png',       alt: 'Forms',       label: 'forms!'       },
];

// Configurații pentru carousel
const VISIBLE = 5;
const GAP_PX  = 30;

export default function Carousel() {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  let snapTween = useRef(null);

  // animație smooth pentru scala fiecărui slide
  const updateScales = () => {
    const cont = containerRef.current;
    const { left, width } = cont.getBoundingClientRect();
    const centerX = left + width / 2;

    slideRefs.current.forEach(slide => {
      if (!slide) return;
      const rect = slide.getBoundingClientRect();
      const slideCenterX = rect.left + rect.width / 2;
      const diff = Math.abs(centerX - slideCenterX);
      const norm = Math.min(diff / (width / 2), 1);
      const scale = 1 - norm * 0.5;
      gsap.to(slide, { scale, duration: 0.2, ease: 'power1.out', overwrite: 'auto' });
      slide.style.zIndex = `${Math.round((1 - norm) * 100)}`;
    });
  };

  useEffect(() => {
    const cont = containerRef.current;
    const nodes = slideRefs.current;

    // clonări pentru infinite loop
    const pre = slides.slice(-VISIBLE);
    const post = slides.slice(0, VISIBLE);
    const all = [...pre, ...slides, ...post];

    // determinăm spațierea dintre slide-uri
    const spacing = nodes[VISIBLE + 1].offsetLeft - nodes[VISIBLE].offsetLeft;
    const totalSlides = slides.length;
    const totalWidth = spacing * totalSlides;
    const minScroll = spacing * VISIBLE;
    const maxScroll = spacing * (totalSlides + VISIBLE - 1);

    // poziționăm inițial
    cont.scrollLeft = minScroll;
    updateScales();

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const onMouseDown = e => {
      isDown = true;
      if (snapTween.current) snapTween.current.kill();
      cont.classList.add('dragging');
      startX = e.pageX - cont.offsetLeft;
      scrollStart = cont.scrollLeft;
    };

    const onMouseMove = e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - cont.offsetLeft;
      const walk = x - startX;
      let newScroll = scrollStart - walk;
      if (newScroll < minScroll) newScroll += totalWidth;
      if (newScroll > maxScroll) newScroll -= totalWidth;
      cont.scrollLeft = newScroll;
      updateScales();
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      cont.classList.remove('dragging');
      // snap la cel mai apropiat slide
      const current = cont.scrollLeft;
      const offset = current - minScroll;
      const index = Math.round(offset / spacing);
      const target = minScroll + index * spacing;
      snapTween.current = gsap.to(cont, {
        scrollTo: { x: target },
        duration: 0.5,
        ease: 'power3.out',
        onUpdate: updateScales
      });
    };

    cont.addEventListener('mousedown', onMouseDown);
    cont.addEventListener('mousemove', onMouseMove);
    cont.addEventListener('mouseup', onMouseUp);
    cont.addEventListener('mouseleave', onMouseUp);
    cont.addEventListener('scroll', updateScales);

    return () => {
      cont.removeEventListener('mousedown', onMouseDown);
      cont.removeEventListener('mousemove', onMouseMove);
      cont.removeEventListener('mouseup', onMouseUp);
      cont.removeEventListener('mouseleave', onMouseUp);
      cont.removeEventListener('scroll', updateScales);
    };
  }, []);

  // clonări finale pentru render
  const pre = slides.slice(-VISIBLE);
  const post = slides.slice(0, VISIBLE);
  const all = [...pre, ...slides, ...post];

  return (
    <div className="carousel-nav" ref={containerRef}>
      {all.map((s, i) => (
        <div
          className="slide"
          key={i}
          ref={el => (slideRefs.current[i] = el)}
          style={{ willChange: 'transform' }}
        >
          <div className="frame">
            <img src={s.src} alt={s.alt} />
            <span className="label">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}