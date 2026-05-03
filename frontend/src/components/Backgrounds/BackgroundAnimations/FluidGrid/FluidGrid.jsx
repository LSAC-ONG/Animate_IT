import { useEffect, useRef } from 'react';
import './FluidGrid.scss';
import gsap from 'gsap';

function initDotGrid(width, height, dotSizePx, gridMarginPx, gapPx, ctx) {
    const step = gapPx + dotSizePx;
    const particles = [];

    for (let y = gridMarginPx; y < height - gridMarginPx; y += step) {
        for (let x = gridMarginPx; x < width - gridMarginPx; x += step) {

        const particle = new Particle(x, y, dotSizePx);
        ctx.fillRect(x, y, dotSizePx, dotSizePx);
        particles.push(particle);
        }
    }
    return particles;
}

class Particle {
    constructor(x, y, sizePx) {
        // relative to the canvas's position, not the viewport
        this.x = this.x0 = x;
        this.y = this.y0 = y;
        this.vx = 0;
        this.vy = 0;
        this.sizePx = sizePx;
    }

    update(mouseX, mouseY) {

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        // TODO
        if (dist < 80) {
            let angle = Math.atan2(dy, dx);
            let force = (80 - dist) * 0.02;
            this.vx += Math.cos(angle) * force;
            this.vy += Math.sin(angle) * force;
        }

        
        this.vx += (this.x0 - this.x) * 0.05;
        this.vy += (this.y0 - this.y) * 0.05;

        
        this.vx *= 0.9;
        this.vy *= 0.9;

        this.x += this.vx;
        this.y += this.vy;
    
    }
}

function updateDotGrid(width, height, ctx, particles) {
    if (!ctx) {
        // console.log("X");
        return; 

    }
    
    ctx.clearRect(0, 0, width, height);

    for (let particle of particles) {
        ctx.fillRect(particle.x, particle.y, particle.sizePx, particle.sizePx);
    }

    // console.log("grid updated!");
}


const FluidGrid = () => {
    
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({x: -100, y: -100});
    

    function handleMouseMove(e) {
        // console.log('Mouse position:', event.clientX, event.clientY);
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        // translate pointer coords to canvas

        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctxRef.current = ctx;
        const rect = canvas.getBoundingClientRect();

        // resize drawing buffer size to match visible canvas size
        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, rect.width, rect.height);

        ctx.fillStyle = '#e5e7eb';
        particlesRef.current = initDotGrid(rect.width, rect.height, 5, 10, 10, ctx);

        const tick = () => {
            const particles = particlesRef.current;
            const mouse = mouseRef.current;
            // console.log(particles);

            if (particles.length > 0) {
                for (let particle of particles) {
                    particle.update(mouse.x, mouse.y);
                    // console.log("particle updated!");
                }
            }
            updateDotGrid(canvas.width, canvas.height, ctxRef.current, particlesRef.current);
            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);

    }, []);
    

    return (
        <div className='fluid-grid-container'>
            <canvas className="fluid-grid" ref={canvasRef} onMouseMove={handleMouseMove}>
                
            </canvas>


            {/* <div className="center">
                <h1>Wavy Animation</h1>
            </div> */}
        </div>
    );
};

export default FluidGrid;