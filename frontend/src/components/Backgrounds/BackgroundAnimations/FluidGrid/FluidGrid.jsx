import { useEffect, useRef } from 'react';
import './FluidGrid.scss';

function drawDotGrid(width, height, dotSizePx, gridMarginPx, gapPx, ctx) {
    const step = gapPx + dotSizePx;

    for (let y = gridMarginPx; y < height - gridMarginPx; y += step) {
        for (let x = gridMarginPx; x < width - gridMarginPx; x += step) {
        ctx.fillRect(x, y, dotSizePx, dotSizePx);
        }
    }
}

function handleMouseMove(event) {
    // console.log(console.log('Mouse position:', event.clientX, event.clientY));
}

const FluidGrid = () => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);

        ctx.fillStyle = '#e5e7eb';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, rect.width, rect.height);

        drawDotGrid(rect.width, rect.height, 10, 10, 10, ctx);
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