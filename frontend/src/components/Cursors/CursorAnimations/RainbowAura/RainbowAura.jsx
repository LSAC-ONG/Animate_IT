import React, { useEffect, useRef } from 'react';
import './RainbowAura.scss';

const RainbowAura = () => {
    const cursorRef = useRef(null);
    const timeoutIdRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const cursorEl = cursorRef.current;
        const currentContainer = containerRef.current;

        if (!cursorEl || !currentContainer) {
            return;
        }

        const handleMouseMove = (e) => {
            let x = e.clientX;
            let y = e.clientY;

            cursorEl.style.top = y + 'px';
            cursorEl.style.left = x + 'px';
            cursorEl.style.display = 'block';

            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }

            timeoutIdRef.current = setTimeout(() => {
                if (cursorEl) {
                    cursorEl.style.display = 'none';
                }
            }, 30000);
        };

        const handleMouseLeave = () => {
            if (cursorEl) {
                cursorEl.style.display = 'none';
            }
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };

        currentContainer.addEventListener('mousemove', handleMouseMove);
        currentContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (currentContainer) {
                currentContainer.removeEventListener('mousemove', handleMouseMove);
                currentContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, []);

    return (
        <div className="ra-container" ref={containerRef} style={{ width: '100%', height: '100%' }}>
            <div className="ra-cursor" ref={cursorRef}></div>
            <h1 className="ra-text">Rainbow Aura</h1>
        </div>
    );
};

export default RainbowAura;
