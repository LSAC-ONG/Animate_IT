import React, { useEffect, useRef, useState, useCallback } from 'react';
import './RainingSquares.scss';

const NUM_SQUARES = 30;
const SPAWN_INTERVAL = 100;
const SQUARE_BASE_SIZE = 8;
const SQUARE_FALL_SPEED_MIN = 1.0;
const SQUARE_FALL_SPEED_MAX = 2.5;
const SQUARE_LIFESPAN = 2500;

const getRandomColor = () => `hsla(${170 + Math.random() * 50}, 70%, 65%, ${0.5 + Math.random() * 0.3})`;

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

    const [isMouseInsideParentContainer, setIsMouseInsideParentContainer] = useState(false);
    const parentAnimationContainerRef = useRef(null); 
    const parentContainerBoundsRef = useRef(null); 

    const initSquare = useCallback((squareState) => {
        squareState.active = true;
        
        squareState.x = mouseCoordsRef.current.x + (Math.random() * 10 - 5); 
        squareState.y = mouseCoordsRef.current.y;
        squareState.size = SQUARE_BASE_SIZE + Math.random() * 6 - 3;
        squareState.opacity = 0.7 + Math.random() * 0.3;
        squareState.speedY = SQUARE_FALL_SPEED_MIN + Math.random() * (SQUARE_FALL_SPEED_MAX - SQUARE_FALL_SPEED_MIN);
        squareState.rotation = Math.random() * 180 - 90;
        squareState.color = getRandomColor();
        squareState.birthTime = performance.now();
    }, []);


    useEffect(() => {
        parentAnimationContainerRef.current = document.querySelector('.cursors-container .animation-container');
        const currentParentContainer = parentAnimationContainerRef.current;

        if (!currentParentContainer) {
            console.warn("RainingSquares: Parent '.animation-container' not found.");
            return;
        }
        
        parentContainerBoundsRef.current = currentParentContainer.getBoundingClientRect();

        
        const updateBounds = () => {
            if (currentParentContainer) {
                parentContainerBoundsRef.current = currentParentContainer.getBoundingClientRect();
            }
        };
        window.addEventListener('resize', updateBounds);
        document.addEventListener('scroll', updateBounds, true); 


        const handleGlobalMouseMove = (e) => { 
            mouseCoordsRef.current = { x: e.clientX, y: e.clientY };

            
            const bounds = parentContainerBoundsRef.current;
            if (bounds &&
                e.clientX >= bounds.left && e.clientX <= bounds.right &&
                e.clientY >= bounds.top && e.clientY <= bounds.bottom) {
                if (!isMouseInsideParentContainer) setIsMouseInsideParentContainer(true);
            } else {
                if (isMouseInsideParentContainer) setIsMouseInsideParentContainer(false);
            }
        };

        
        window.addEventListener('mousemove', handleGlobalMouseMove);


        const animateSquares = (timestamp) => {
            const bounds = parentContainerBoundsRef.current; 

            if (isMouseInsideParentContainer && timestamp - lastSpawnTimeRef.current > SPAWN_INTERVAL) {
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

                if (age > SQUARE_LIFESPAN || !isMouseInsideParentContainer) {
                    const fadeDuration = 400;
                    const timeToFade = !isMouseInsideParentContainer ? 0 : Math.max(0, (SQUARE_LIFESPAN + fadeDuration) - age);
                    sqState.opacity = Math.max(0, (timeToFade / fadeDuration) * sqState.opacity);
                }
                
                
                let outOfBounds = false;
                if (bounds) {
                    
                    
                    if (sqState.y - (sqState.size / 2) > bounds.bottom) outOfBounds = true;
                    
                    if (sqState.x + (sqState.size / 2) < bounds.left || sqState.x - (sqState.size / 2) > bounds.right) outOfBounds = true;
                }


                if (outOfBounds || sqState.opacity <= 0.01) {
                    sqState.active = false;
                    squareElement.style.opacity = '0'; 
                    
                    return;
                }

                squareElement.style.display = 'block';
                squareElement.style.width = `${sqState.size}px`;
                squareElement.style.height = `${sqState.size}px`;
                squareElement.style.backgroundColor = sqState.color;
                squareElement.style.opacity = sqState.opacity.toFixed(2);
                
                squareElement.style.transform = `translate(${sqState.x}px, ${sqState.y}px) translate(-50%, -50%) rotate(${sqState.rotation}deg)`;
            });

            animationFrameIdRef.current = requestAnimationFrame(animateSquares);
        };

        animationFrameIdRef.current = requestAnimationFrame(animateSquares);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('resize', updateBounds);
            document.removeEventListener('scroll', updateBounds, true);

            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [isMouseInsideParentContainer, initSquare]); 

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