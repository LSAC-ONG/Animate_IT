import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HorizontalGallery.scss";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(Flip, ScrollTrigger);

export default function HorizontalGallery({
  items = [],
  className = "",
  onItemSelect,
}) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const navigate = useNavigate();

  const overlayRef = useRef(null);
  const stRef = useRef(null);
  const sourceCardRef = useRef(null);
  const pendingRectRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const scrollBlocker = useRef(null);
  const [expandedItem, setExpandedItem] = useState(null);

  const lockScroll = () => {
    unlockScroll();
    document.body.style.overflow = "hidden";
    const prevent = (e) => {
      e.preventDefault();
    };
    const preventKeys = (e) => {
      const keys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ];
      if (keys.includes(e.key)) e.preventDefault();
    };
    window.addEventListener("wheel", prevent, { passive: false });
    window.addEventListener("touchmove", prevent, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });
    scrollBlocker.current = () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("keydown", preventKeys);
    };
  };

  const unlockScroll = () => {
    scrollBlocker.current?.();
    scrollBlocker.current = null;
  };

  useEffect(() => {
    if (expandedItem) lockScroll();
    return () => unlockScroll();
  }, [expandedItem]);

  useEffect(() => {
    const savedId = sessionStorage.getItem("galleryExpandedId");
    if (savedId && items.length > 0) {
      const item = items.find((i) => i.id === savedId);
      if (item) {
        setExpandedItem(item);
        lockScroll();

        setTimeout(() => {
          const index = items.findIndex((i) => i.id === savedId);
          const cards = document.querySelectorAll(".gallery-item");
          if (cards[index]) {
            sourceCardRef.current = cards[index];
            cards[index].style.opacity = "0";
          }
        }, 0);
      }
      sessionStorage.removeItem("galleryExpandedId");
    }
  }, [items]);

  useLayoutEffect(() => {
    if (!items.length) return;

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const getScrollAmount = () => -(track.scrollWidth - wrapper.offsetWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${-getScrollAmount()}`,
        invalidateOnRefresh: true,
      },
    });

    stRef.current = tween.scrollTrigger;

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [items]);

  useLayoutEffect(() => {
    if (!expandedItem || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const header = overlay.querySelector(".gallery-overlay-header");

    if (!pendingRectRef.current) {
      if (header) gsap.set(header, { autoAlpha: 1 });
      gsap.set(overlay, {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      });
      return;
    }

    const rect = pendingRectRef.current;
    pendingRectRef.current = null;

    if (header) gsap.set(header, { autoAlpha: 0 });

    gsap.set(overlay, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    const state = Flip.getState(overlay);

    gsap.set(overlay, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
    });

    Flip.from(state, {
      targets: overlay,
      duration: 0.6,
      ease: "power2.inOut",
      absolute: true,
      onComplete: () => {
        if (header) gsap.to(header, { autoAlpha: 1, duration: 0.3 });
        isAnimatingRef.current = false;
      },
    });
  }, [expandedItem]);

  useEffect(() => {
    if (!expandedItem) return;

    const onKey = (e) => {
      if (e.key === "Escape" && !isAnimatingRef.current) handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedItem]);

  const handleCardClick = (item, e) => {
    if (expandedItem || isAnimatingRef.current) return;
    if (!stRef.current?.isActive) return;

    isAnimatingRef.current = true;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    sourceCardRef.current = card;
    pendingRectRef.current = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };

    lockScroll();

    card.style.opacity = "0";

    onItemSelect?.(item.id);

    setExpandedItem(item);
  };

  const handleClose = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const card = sourceCardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    const rect = card.getBoundingClientRect();
    const header = overlay.querySelector(".gallery-overlay-header");

    gsap.to(header, {
      autoAlpha: 0,
      duration: 0.2,
      onComplete: () => {
        const state = Flip.getState(overlay);

        gsap.set(overlay, {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });

        Flip.from(state, {
          targets: overlay,
          duration: 0.6,
          ease: "power2.inOut",
          absolute: true,
          onComplete: () => {
            card.style.opacity = "1";
            sourceCardRef.current = null;
            setExpandedItem(null);
            unlockScroll();
            isAnimatingRef.current = false;
          },
        });
      },
    });
  };

  return (
    <section
      ref={wrapperRef}
      className={`horizontal-gallery ${className}`.trim()}
    >
      <div ref={trackRef} className="horizontal-scroll-track">
        {items.map((item, i) => (
          <div
            className="gallery-item"
            key={item.id ?? i}
            onClick={(e) => handleCardClick(item, e)}
          >
            <div className="gallery-item-label">{item.label}</div>
            <div className="gallery-item-content">{item.content}</div>
          </div>
        ))}
      </div>

      {expandedItem && (
        <div ref={overlayRef} className="gallery-overlay">
          <div className="gallery-overlay-content">{expandedItem.content}</div>

          <div className="gallery-overlay-header">
            <h2 className="gallery-overlay-title">{expandedItem.label}</h2>
            <div className="gallery-overlay-actions">
              <button
                className="gallery-code-btn"
                onClick={() => {
                  sessionStorage.setItem("galleryExpandedId", expandedItem.id);
                  navigate(`/gallery-animation/${expandedItem.id}`);
                }}
              >
                LIVE EDIT THIS COMPONENT
              </button>
              <button className="gallery-back-btn" onClick={handleClose}>
                ← Back
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
