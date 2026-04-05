import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import "./FlipReveal.scss";

const FlipReveal = () => {
	const textRef = useRef(null);

	useGSAP(() => {
		const split = new SplitType(textRef.current, { types: "chars" });
		gsap.set(split.chars, { transformPerspective: 400 });
		gsap.from(split.chars, {
			rotateX: 90,
			opacity: 0,
			stagger: 0.05,
			transformOrigin: "center top",
			duration: 0.7,
			ease: "back.out(2)",
		});
		return () => split.revert();
	}, { scope: textRef });

	return (
		<div className="flip-container">
			<h1 ref={textRef} className="flip-text">Flip Reveal</h1>
		</div>
	);
};

export default FlipReveal;
