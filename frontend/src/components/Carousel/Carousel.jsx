import React, { useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './Carousel.scss';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin);

const slides = [
  { src: '/carousel_images/backgrounds.png', alt: 'Backgrounds', label: 'backgrounds!', link: '/backgrounds' },
  { src: '/carousel_images/buttons.png', alt: 'Buttons', label: 'buttons!', link: '/buttons' },
  { src: '/carousel_images/cursors.png', alt: 'Cursors', label: 'cursors!', link: '/cursors' },
  { src: '/carousel_images/texts.png', alt: 'Text', label: 'text!', link: '/text' },
  { src: '/carousel_images/forms.png', alt: 'Forms', label: 'forms!', link: '/forms' },
];


export default function Carousel({ VISIBLE, MAX_HEIGHT }) {
  const [resize, setResize] = useState(0);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const snapTween = useRef(null);
  const GAP_PX = VISIBLE==1?5:30
  console.log(GAP_PX)
  const widthCalc = `min(calc((100% - ${VISIBLE - 1} * ${GAP_PX}px) / ${VISIBLE}))`;
  // Ajustează lățimea containerului
  const adjustWidth = () => {
    const width = slideRefs.current[0].offsetWidth;
    const height = slideRefs.current[0].offsetHeight;
    console.log('width', width, 'height', height);
    console.log('containerRef', containerRef.current.offsetWidth - 1)
    if (width !== height) {
      const newWidth = (width - height) * VISIBLE;
      containerRef.current.style.width = `${containerRef.current.offsetWidth - newWidth}px`;
    }
  };

  // Ajustează stilul slide-urilor
  const slideStyle = {
    flexBasis: widthCalc,
    minWidth: widthCalc,
    maxWidth: widthCalc,
    willChange: 'transform',
  };

  const calc = () => {
    const cont = containerRef.current;
    const nodes = slideRefs.current;
    const slideWidth = nodes[VISIBLE].offsetWidth;
    const gap = GAP_PX; // același GAP_PX
    const spacing = slideWidth + gap;
    const totalSlides = slides.length;
    const totalWidth = spacing * totalSlides;
    const minScroll = spacing * VISIBLE;
    const maxScroll = spacing * (VISIBLE + totalSlides);
    return { cont, spacing, totalWidth, minScroll, maxScroll };
  };

  const navigate = (direction) => {
    const { cont, spacing, totalWidth, minScroll, maxScroll } = calc();

    // 1) compute which “slide” we want next
    const offset = cont.scrollLeft - minScroll;
    const index = Math.round(offset / spacing) + direction;
    const rawTarget = minScroll + index * spacing;

    // 2) kill any pending tween
    if (snapTween.current) snapTween.current.kill();

    // 3) tween with onUpdate wrap logic
    snapTween.current = gsap.to(cont, {
      scrollTo: { x: rawTarget },
      duration: 0.5,
      ease: 'power3.out',
      onUpdate: () => {
        // if we scrolled off one end, wrap instantly but invisibly
        if (cont.scrollLeft < minScroll) {
          cont.scrollLeft += totalWidth;
        } else if (cont.scrollLeft >= maxScroll) {
          cont.scrollLeft -= totalWidth;
        }
      }
    });
  };


  // Actualizează scale și zIndex
  const updateScales = () => {
    const { cont } = calc();
    const { left, width } = cont.getBoundingClientRect();
    const centerX = left + width / 2;

    slideRefs.current.forEach(slide => {
      if (!slide) return;
      const rect = slide.getBoundingClientRect();
      const slideCenterX = rect.left + rect.width / 2;
      const diff = Math.abs(centerX - slideCenterX);
      const norm = Math.min(diff / (width / 2), 1);
      const scale = 1 - norm * 0.35;
      gsap.set(slide, { scale, overwrite: 'auto' });
      slide.style.zIndex = `${Math.round((1 - norm) * 100)}`;
    });
  };

  useLayoutEffect(() => {
    containerRef.current.style.maxHeight = MAX_HEIGHT;
    containerRef.current.style.width = '90vw';
    adjustWidth();
    const { cont, spacing, totalWidth, minScroll, maxScroll } = calc();
    cont.scrollLeft = minScroll;
    updateScales();

    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    // Repoziționare invizibilă
    const checkBounds = () => {
      if (cont.scrollLeft < 0) cont.scrollLeft += totalWidth;
      else if (cont.scrollLeft > maxScroll) cont.scrollLeft -= totalWidth;
    };

    // Scroll handler
    const handleScroll = () => {
      checkBounds();
      updateScales();
    };

    // Mouse down handler
    const onMouseDown = e => {
      isDown = true;
      if (snapTween.current) snapTween.current.kill();
      cont.classList.add('dragging');
      startX = e.pageX - cont.offsetLeft;
      scrollStart = cont.scrollLeft;
    };

    // Mouse move handler
    const onMouseMove = e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - cont.offsetLeft;
      const walk = x - startX;
      let newScroll = scrollStart - walk;
      if (newScroll < 0) newScroll += totalWidth;
      if (newScroll > maxScroll) newScroll -= totalWidth;
      cont.scrollLeft = newScroll;
      updateScales();
    };

    // Mouse up handler
    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      cont.classList.remove('dragging');
      checkBounds();
      const offset = cont.scrollLeft - minScroll;
      const index = Math.round(offset / spacing);
      const target = minScroll + index * spacing;
      snapTween.current = gsap.to(cont, {
        scrollTo: { x: target },
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    // Resize handler
    const onResize = () => {
      // const { cont: c, spacing: s, minScroll: min } = calc();
      // const offset = c.scrollLeft - min;
      // const idx = Math.round(offset / s);
      // c.scrollLeft = min + idx * s;
      // adjustWidth();
      // updateScales();
      setResize(resize + 1);
    };

    // Atașăm evenimente
    cont.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    cont.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', onResize);

    return () => {
      cont.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cont.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [VISIBLE, resize]);

  // Render cu clonele front/back
  const pre = slides.slice(-VISIBLE);
  const post = slides.slice(0, VISIBLE);
  const all = [...pre, ...slides, ...post];

  return (
    <div className='carousel-wrapper'>
      <button
        className="carousel-btn prev"
        onClick={() => navigate(-1)}
      >
          <svg viewBox="0 0 16 16">
            <path d="M11 3 l-5 5 l5 5" stroke="currentColor" stroke-width="1.3" fill="none" />
          </svg>
      </button>
      <div className={`carousel-nav ${VISIBLE === 1 ? 'single' : ''}`} ref={containerRef}>
        {all.map((s, i) => (

          <div
            className="carousel-slide" style={slideStyle}
            key={i}
            ref={el => (slideRefs.current[i] = el)}
          >
            <div className="frame">
              <Link className='link-carousel' to={s.link} draggable={false}
                onDragStart={e => e.preventDefault()}  ><img draggable={false}
                  onDragStart={e => e.preventDefault()} src={s.src} alt={s.alt} /></Link>
              <Link className='link-carousel-text' to={s.link} draggable={false}
                onDragStart={e => e.preventDefault()}> <span className="label">{s.label}</span></Link>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-btn next"
        onClick={() => navigate(1)}
      >
        <svg viewBox="0 0 16 16">
          <path d="M5 3 l5 5 l-5 5" stroke="currentColor" stroke-width="1.3" fill="none" />
        </svg>

      </button>
    </div>
  );
}