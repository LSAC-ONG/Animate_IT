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

  // înlocuiește vechea funcție navigate() cu aceasta
const navigate = (dir) => {
  const { cont, spacing, totalWidth, minScroll, maxScroll } = calc();

  // 1️⃣  indicele slide-ului dorit
  const offset  = cont.scrollLeft - minScroll;
  const index   = Math.round(offset / spacing) + dir;

  // 2️⃣  destinația „brută” (poate ieși din domeniu)
  let dest = minScroll + index * spacing;

  /* 3️⃣  dacă depășește domeniul,
         relocăm INSTANT *și* poziția curentă, *și* destinația,
         cu aceeași lungime de pistă (totalWidth) */
  if (cont.scrollLeft < minScroll) {
    dest            += totalWidth;   // mutăm ținta
    cont.scrollLeft += totalWidth;   // mutăm conținutul la fel ⇒ invizibil
  }
   if (dest >= maxScroll) {
    dest            -= totalWidth;
    cont.scrollLeft -= totalWidth;
  }

  // 4️⃣  oprim tween-ul precedent și pornim unul nou – nu mai avem onUpdate!
  snapTween.current?.kill();
  snapTween.current = gsap.to(cont, {
    scrollTo: { x: dest },
    duration : 0.5,
    ease     : 'power3.out',
    onUpdate : updateScales            // doar scale/zIndex
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
    
    const getX = e =>
      // la pointer events e.pageX există, dar păstrăm fallback
      e.pageX ?? (e.touches && e.touches[0].pageX) ?? 0;
    // Mouse down handler
    const onPointerDown = e => {
      isDown = true;
      snapTween.current?.kill();
      cont.classList.add('dragging');
      startX      = getX(e) - cont.offsetLeft;
      scrollStart = cont.scrollLeft;
    };
    
    const onPointerMove = e => {
      if (!isDown) return;
      e.preventDefault();                     // ✨ oprește scroll-ul nativ pe touch
      const walk      = getX(e) - cont.offsetLeft - startX;
      let newScroll   = scrollStart - walk;
      if (newScroll < 0)           newScroll += totalWidth;
      if (newScroll > maxScroll)   newScroll -= totalWidth;
      cont.scrollLeft = newScroll;
      updateScales();
    };
    
    const onPointerUp = () => {
      if (!isDown) return;
      isDown = false;
      cont.classList.remove('dragging');
      checkBounds();
      const idx = Math.round((cont.scrollLeft - minScroll) / spacing);
      snapTween.current = gsap.to(cont, {
        scrollTo: { x: minScroll + idx * spacing },
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
    cont.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    cont.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', onResize);

    return () => {
      cont.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
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