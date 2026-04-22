import { useRef, useState } from 'react';
import gsap from 'gsap';
import { Flip } from 'gsap/flip';
import { useGSAP } from '@gsap/react';
import './ZoomAnimation.scss';

gsap.registerPlugin(Flip);

export default function ZoomAnimation() {
  const [expanded, setExpanded] = useState(false);
  const target = useRef(null);
  const preview = useRef(null);
  const content = useRef(null);
  const previewText = useRef(null);

  const { contextSafe } = useGSAP({ scope: target });

  const handleFlip = contextSafe(() => {
    const state = Flip.getState(preview.current);

    const isOpening = !expanded;
    setExpanded(isOpening);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          if (isOpening) {
            gsap.to(content.current, { 
                autoAlpha: 1, 
                duration: 0.3
            });
            gsap.to(".placeholder-text", { autoAlpha: 0, duration: 0.3 });
          }
        }
      });
    });
  });

  const handleClose = contextSafe((e) => {
    e.stopPropagation();

    gsap.to(content.current, {
      autoAlpha: 0,
      duration: 0.2,
      onComplete: () => {
        const state = Flip.getState(preview.current);
        
        setExpanded(false);

        requestAnimationFrame(() => {
          gsap.set(previewText.current, { autoAlpha: 0 });

          Flip.from(state, {
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(previewText.current, { autoAlpha: 1, duration: 0.3 });
            }
          });
        });
      }
    });
  });

  return (
    <div ref={target} className="screen">
      <div 
        ref={preview} 
        className={`item ${expanded ? 'is-fullscreen' : ''}`} 
        onClick={!expanded ? handleFlip : undefined}
      >
        {!expanded && <div className="placeholder-text" ref={previewText}>press to zoom</div>}
        {expanded &&
          <div className="content" ref={content}>
            <p>assume this is content</p>
            <button onClick={handleClose}>back</button>
          </div>
        }
      </div>
    </div>
  );
}