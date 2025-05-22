import './WavyBackground.css';

const WavyBackground = () => {
    return (
        <div className='wavy-container'>
            <div className="wave">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="center">
                <h1>Wavy Animation</h1>
            </div>
        </div>
    );
};

export default WavyBackground;