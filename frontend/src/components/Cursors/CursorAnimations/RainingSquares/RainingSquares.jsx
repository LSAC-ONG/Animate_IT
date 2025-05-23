import React, { useEffect, useRef, useState, useCallback } from 'react';
import './RainingSquares.scss';

const NUM_SQUARES = 30;
const SPAWN_INTERVAL = 100;
const SQUARE_BASE_SIZE = 8;
const SQUARE_FALL_SPEED_MIN = 1.5;
const SQUARE_FALL_SPEED_MAX = 3.5;
const SQUARE_LIFESPAN = 3000;

const getRandomColor = () => `hsla(${Math.random() * 360}, 70%, 70%, ${0.5 + Math.random() * 0.4})`;

const RainingSquares = () => {
    const squaresRef = useRef(new Array(NUM_SQUARES).fill(null));
    const animationFrameIdRef = useRef(null);
    const lastSpawnTimeRef = useRef(0);
    const mouseCoordsRef = useRef({ x: 0, y: 0 });

    const squaresStateRef = useRef(
        Array(NUM_SQUARES).fill(null).map(() => ({
            active: false, x: 0, y: 0, size: 0, opacity: 0, speedY: 0, rotation: 0, color: '', birthTime: 0,
        }))
    );

    const [isMouseInsideContainer, setIsMouseInsideContainer] = useState(false);

    const initSquare = useCallback((squareState) => {
        squareState.active = true;
        squareState.x = mouseCoordsRef.current.x + (Math.random() * 40 - 20);
        squareState.y = mouseCoordsRef.current.y;
        squareState.size = SQUARE_BASE_SIZE + Math.random() * 8 - 4;
        squareState.opacity = 0.8 + Math.random() * 0.2;
        squareState.speedY = SQUARE_FALL_SPEED_MIN + Math.random() * (SQUARE_FALL_SPEED_MAX - SQUARE_FALL_SPEED_MIN);
        squareState.rotation = Math.random() * 360;
        squareState.color = getRandomColor();
        squareState.birthTime = performance.now();
    }, []);


    useEffect(() => {
        const parentAnimationContainer = document.querySelector('.cursors-container .animation-container');

        const handleGlobalMouseMove = (e) => {
            mouseCoordsRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseEnterAnimationArea = () => {
            setIsMouseInsideContainer(true);
        };

        const handleMouseLeaveAnimationArea = () => {
            setIsMouseInsideContainer(false);
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        if (parentAnimationContainer) {
            parentAnimationContainer.addEventListener('mouseenter', handleMouseEnterAnimationArea);
            parentAnimationContainer.addEventListener('mouseleave', handleMouseLeaveAnimationArea);
        } else {
            document.documentElement.addEventListener('mouseenter', handleMouseEnterAnimationArea);
            document.documentElement.addEventListener('mouseleave', handleMouseLeaveAnimationArea);
        }

        const animateSquares = (timestamp) => {
            if (isMouseInsideContainer && timestamp - lastSpawnTimeRef.current > SPAWN_INTERVAL) {
                lastSpawnTimeRef.current = timestamp;
                const inactiveSquareIndex = squaresStateRef.current.findIndex(s => !s.active);
                if (inactiveSquareIndex !== -1) {
                    initSquare(squaresStateRef.current[inactiveSquareIndex]);
                }
            }

            squaresStateRef.current.forEach((sqState, index) => {
                const squareElement = squaresRef.current[index];
                if (!squareElement || !sqState.active) {
                    if(squareElement && squareElement.style.opacity !== '0') squareElement.style.opacity = '0';
                    return;
                }

                const age = timestamp - sqState.birthTime;
                sqState.y += sqState.speedY;
                sqState.rotation += sqState.speedY * 0.05;

                if (age > SQUARE_LIFESPAN || !isMouseInsideContainer) {
                    const fadeDuration = 500;
                    const timeToFade = !isMouseInsideContainer ? 0 : Math.max(0, SQUARE_LIFESPAN + fadeDuration - age);
                    sqState.opacity = Math.max(0, (timeToFade / fadeDuration) * (0.8 + Math.random() * 0.2) );
                }
                
                if (sqState.y > window.innerHeight + sqState.size || sqState.opacity <= 0.01) {
                    sqState.active = false;
                    squareElement.style.opacity = '0';
                    return;
                }

                squareElement.style.display = 'block';
                squareElement.style.width = `${sqState.size}px`;
                squareElement.style.height = `${sqState.size}px`;
                squareElement.style.backgroundColor = sqState.color;
                squareElement.style.opacity = sqState.opacity.toFixed(2);
                squareElement.style.transform = `translate(${sqState.x - sqState.size / 2}px, ${sqState.y - sqState.size / 2}px) rotate(${sqState.rotation}deg)`;
            });

            animationFrameIdRef.current = requestAnimationFrame(animateSquares);
        };

        animationFrameIdRef.current = requestAnimationFrame(animateSquares);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            if (parentAnimationContainer) {
                parentAnimationContainer.removeEventListener('mouseenter', handleMouseEnterAnimationArea);
                parentAnimationContainer.removeEventListener('mouseleave', handleMouseLeaveAnimationArea);
            } else {
                 document.documentElement.removeEventListener('mouseenter', handleMouseEnterAnimationArea);
                 document.documentElement.removeEventListener('mouseleave', handleMouseLeaveAnimationArea);
            }
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [isMouseInsideContainer, initSquare]);

    return (
        <div className="rs-container-visual-only">
            <h1 className="rs-text">Raining Squares</h1>
            <div className="rs-squares-wrapper">
                {squaresRef.current.map((_, index) => (
                    <div
                        key={index}
                        ref={(el) => (squaresRef.current[index] = el)}
                        className="rs-square"
                        style={{ opacity: 0, display: 'none' }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default RainingSquares;