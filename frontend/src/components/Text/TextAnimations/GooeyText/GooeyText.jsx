import './GooeyText.css';

const GooeyText = () => {
  return (
    <>
      <svg width="0" height="0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix"
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 20 -10" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </svg>

      <div className="gooey-container">
        <h1 className="gooey-text" data-text="GOOEY">GOOEY</h1>
      </div>
    </>
  );
};

export default GooeyText;
