import "./GlowingSpotlight.scss";
import { useRef } from "react";
import gsap from "gsap";
import particleVideo from "./particle_video.mp4";



function GlowingSpotlight() {
    const spotlightContainerRef = useRef(null);
    const spotlightRef = useRef(null);
    
    function updateGlowPosition(e) {
        const spotlight = spotlightRef.current;
        const spotlightContainer = spotlightContainerRef.current;

        const spotlightContainerRect = spotlightContainer.getBoundingClientRect();
        const x = e.clientX - spotlightContainerRect.left;
        const y = e.clientY - spotlightContainerRect.top;

        spotlightContainer.style.setProperty("--x", `${x}px`);
        spotlightContainer.style.setProperty("--y", `${y}px`);


        gsap.to(spotlight,
            {
                x: x - 125,
                y: y - 125,
                ease: "power2.out",
                duration: 0.3
            }
        )

    }


    return(
        <div className="glowing-spotlight-container" ref={spotlightContainerRef} onMouseMove={updateGlowPosition}>

            <video autoPlay muted loop id="bg-video">
                <source src={particleVideo} type="video/mp4"/>
            </video>

            <div className="cursor-glow" ref={spotlightRef}></div>

            <div className="center">
                <h1>Glowing Spotlight</h1>
            </div> 
        </div>
    )
}

export default GlowingSpotlight;