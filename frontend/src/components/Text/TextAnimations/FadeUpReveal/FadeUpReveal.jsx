import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import "./FadeUpReveal.scss";

const FadeUpReveal = () => {
	const textRef = useRef(null);

	useGSAP(() => {
		const split = new SplitType(textRef.current, { types: "chars" });
		gsap.from(split.chars, {
			y: 60,
			opacity: 0,
			stagger: 0.04,
			duration: 0.7,
			ease: "back.out(1.7)",
		});
		return () => split.revert();
	}, { scope: textRef });

	return (
		<div className="fade-up-container">
			<h1 ref={textRef} className="fade-up-text">Fade Up Reveal</h1>
		</div>
	);
};

export default FadeUpReveal;
