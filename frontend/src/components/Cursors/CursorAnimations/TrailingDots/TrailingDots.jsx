import React, { useEffect, useRef, useState } from 'react';
import './TrailingDots.scss';

const NUM_TRAIL_DOTS = 4;
const SMOOTHING_FACTOR = 0.25;

const TrailingDots = () => {
    const mainDotRef = useRef(null);
    const trailDotsRef = useRef(new Array(NUM_TRAIL_DOTS).fill(null));
    const animationFrameIdRef = useRef(null);
    const mouseCoordsRef = useRef({ x: 0, y: 0 });

    const dotsStateRef = useRef(
        Array(NUM_TRAIL_DOTS + 1)
            .fill(null)
            .map(() => ({
                currentX: -100, currentY: -100,
                targetX: -100, targetY: -100,
                currentOpacity: 0, targetOpacity: 0,
            }))
    );

    const [isMouseInsideContainer, setIsMouseInsideContainer] = useState(false);
    const hideTimeoutIdRef = useRef(null);

    useEffect(() => {
        const parentAnimationContainer = document.querySelector('.cursors-container .animation-container');

        const handleGlobalMouseMove = (e) => {
            mouseCoordsRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseEnterAnimationArea = () => {
            setIsMouseInsideContainer(true);
            if (hideTimeoutIdRef.current) clearTimeout(hideTimeoutIdRef.current);
        };

        const handleMouseLeaveAnimationArea = () => {
            if (hideTimeoutIdRef.current) clearTimeout(hideTimeoutIdRef.current);
            hideTimeoutIdRef.current = setTimeout(() => {
                setIsMouseInsideContainer(false);
            }, 100);
        };

        const handleContainerMouseMove = () => {
            if (!isMouseInsideContainer) setIsMouseInsideContainer(true);
            if (hideTimeoutIdRef.current) clearTimeout(hideTimeoutIdRef.current);
            hideTimeoutIdRef.current = setTimeout(() => {
                setIsMouseInsideContainer(false);
            }, 1000);
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);

        if (parentAnimationContainer) {
            parentAnimationContainer.addEventListener('mouseenter', handleMouseEnterAnimationArea);
            parentAnimationContainer.addEventListener('mouseleave', handleMouseLeaveAnimationArea);
            parentAnimationContainer.addEventListener('mousemove', handleContainerMouseMove);
        } else {
            document.documentElement.addEventListener('mouseenter', handleMouseEnterAnimationArea);
            document.documentElement.addEventListener('mouseleave', handleMouseLeaveAnimationArea);
        }

        const animateDots = () => {
            dotsStateRef.current[0].targetX = mouseCoordsRef.current.x;
            dotsStateRef.current[0].targetY = mouseCoordsRef.current.y;
            dotsStateRef.current[0].targetOpacity = isMouseInsideContainer ? 1 : 0;

            for (let i = 1; i <= NUM_TRAIL_DOTS; i++) {
                const leaderState = dotsStateRef.current[i - 1];
                const followerState = dotsStateRef.current[i];

                followerState.targetX = leaderState.currentX;
                followerState.targetY = leaderState.currentY;
                if (isMouseInsideContainer && leaderState.targetOpacity > 0.1) {
                    followerState.targetOpacity = Math.max(0, leaderState.targetOpacity - 0.20);
                } else {
                    followerState.targetOpacity = 0;
                }
            }

            const mainDotState = dotsStateRef.current[0];
            mainDotState.currentX += (mainDotState.targetX - mainDotState.currentX) * SMOOTHING_FACTOR;
            mainDotState.currentY += (mainDotState.targetY - mainDotState.currentY) * SMOOTHING_FACTOR;
            mainDotState.currentOpacity += (mainDotState.targetOpacity - mainDotState.currentOpacity) * SMOOTHING_FACTOR;

            if (mainDotRef.current) {
                mainDotRef.current.style.transform = `translate(${mainDotState.currentX}px, ${mainDotState.currentY}px) translate(-50%, -50%)`;
                mainDotRef.current.style.opacity = mainDotState.currentOpacity.toFixed(2);
                mainDotRef.current.classList.toggle('visible', mainDotState.targetOpacity > 0.01);
                mainDotRef.current.classList.toggle('hidden', mainDotState.targetOpacity <= 0.01);
            }

            trailDotsRef.current.forEach((dotElement, index) => {
                if (dotElement) {
                    const trailDotState = dotsStateRef.current[index + 1];
                    
                    trailDotState.currentX += (trailDotState.targetX - trailDotState.currentX) * SMOOTHING_FACTOR;
                    trailDotState.currentY += (trailDotState.targetY - trailDotState.currentY) * SMOOTHING_FACTOR;
                    trailDotState.currentOpacity += (trailDotState.targetOpacity - trailDotState.currentOpacity) * SMOOTHING_FACTOR;

                    dotElement.style.transform = `translate(${trailDotState.currentX}px, ${trailDotState.currentY}px) translate(-50%, -50%)`;
                    dotElement.style.opacity = trailDotState.currentOpacity.toFixed(2);
                    dotElement.classList.toggle('visible', trailDotState.targetOpacity > 0.01);
                    dotElement.classList.toggle('hidden', trailDotState.targetOpacity <= 0.01);
                }
            });

            animationFrameIdRef.current = requestAnimationFrame(animateDots);
        };

        animationFrameIdRef.current = requestAnimationFrame(animateDots);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            if (parentAnimationContainer) {
                parentAnimationContainer.removeEventListener('mouseenter', handleMouseEnterAnimationArea);
                parentAnimationContainer.removeEventListener('mouseleave', handleMouseLeaveAnimationArea);
                parentAnimationContainer.removeEventListener('mousemove', handleContainerMouseMove);
            } else {
                document.documentElement.removeEventListener('mouseenter', handleMouseEnterAnimationArea);
                document.documentElement.removeEventListener('mouseleave', handleMouseLeaveAnimationArea);
            }

            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            if (hideTimeoutIdRef.current) {
                clearTimeout(hideTimeoutIdRef.current);
            }
        };
    }, [isMouseInsideContainer]);

    return (
        <div className="tdc-container">
            <h1 className="tdc-text">Trailing Dots</h1>
            <div className="tdc-cursor-wrapper">
                <div
                    ref={mainDotRef}
                    className="tdc-dot tdc-main-dot"
                    style={{ transform: 'translate(-200px, -200px) translate(-50%,-50%)', opacity: 0}}
                ></div>
                {Array(NUM_TRAIL_DOTS).fill(null).map((_, index) => (
                    <div
                        key={index}
                        ref={(el) => (trailDotsRef.current[index] = el)}
                        className={`tdc-dot tdc-trail-dot size-${index + 1}`}
                        style={{ transform: 'translate(-200px, -200px) translate(-50%,-50%)', opacity: 0}}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default TrailingDots;
