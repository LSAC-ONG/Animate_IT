import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import "./BlurReveal.scss";

const BlurReveal = () => {
	const textRef = useRef(null);

	useGSAP(() => {
		const split = new SplitType(textRef.current, { types: "chars" });
		gsap.from(split.chars, {
			opacity: 0,
			filter: "blur(14px)",
			stagger: 0.06,
			duration: 0.9,
			ease: "power3.out",
		});
		return () => split.revert();
	}, { scope: textRef });

	return (
		<div className="blur-container">
			<h1 ref={textRef} className="blur-text">Blur Reveal</h1>
		</div>
	);
};

export default BlurReveal;
