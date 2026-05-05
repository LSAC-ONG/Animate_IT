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
        this.cursorRadius = 80;
        this.friction = 0.9;
        this.springStrngth = 0.05;
        this.pushForce = 0.02;
    }

    update(mouseX, mouseY, deltaRatio) {

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < this.cursorRadius) {
            let angle = Math.atan2(dy, dx);
            let force = (this.cursorRadius - dist) * this.pushForce;
            this.vx += Math.cos(angle) * force;
            this.vy += Math.sin(angle) * force;
        }

        
        this.vx += (this.x0 - this.x) * this.springStrngth;
        this.vy += (this.y0 - this.y) * this.springStrngth;

        
        this.vx *= 0.9;
        this.vy *= 0.9;

        this.x += this.vx * deltaRatio;
        this.y += this.vy * deltaRatio;
    
    }
}

function updateDotGrid(width, height, ctx, particles) {
    if (!ctx) {
        return; 

    }
    
    ctx.clearRect(0, 0, width, height);

    for (let particle of particles) {
        ctx.fillRect(particle.x, particle.y, particle.sizePx, particle.sizePx);
    }

}


const FluidGrid = () => {
    
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({x: -100, y: -100});
    

    function handleMouseMove(e) {
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
        particlesRef.current = initDotGrid(rect.width, rect.height, 3, 10, 10, ctx);

        const tick = (time, deltaTime, frame) => {
            const particles = particlesRef.current;
            const mouse = mouseRef.current;
            const deltaRatio = gsap.ticker.deltaRatio(60);

            if (particles.length > 0) {
                for (let particle of particles) {
                    particle.update(mouse.x, mouse.y, deltaRatio);
                }
            }
            updateDotGrid(canvas.width, canvas.height, ctxRef.current, particlesRef.current);
        }
        gsap.ticker.add(tick);

        return () => {
            gsap.ticker.remove(tick);
        }
    }, []);
    

    return (
        <div className='fluid-grid-container'>
            <canvas className="fluid-grid" ref={canvasRef} onMouseMove={handleMouseMove}>
                
            </canvas>


             <div className="center">
                <h1>Fluid Grid (move cursor over)</h1>
            </div> 
        </div>
    );
};

export default FluidGrid;