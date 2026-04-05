import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import "./NeonFlicker.scss";

const NeonFlicker = () => {
	const textRef = useRef(null);

	useGSAP(() => {
		const split = new SplitType(textRef.current, { types: "chars" });
		const tl = gsap.timeline();
		tl.from(split.chars, {
			scale: 0,
			opacity: 0,
			stagger: 0.05,
			duration: 0.5,
			ease: "back.out(3)",
		}).to(split.chars, {
			textShadow: "0 0 20px #0ef, 0 0 40px #0ef",
			stagger: { each: 0.1, repeat: -1, yoyo: true },
			duration: 1.2,
			ease: "sine.inOut",
		});
		return () => split.revert();
	}, { scope: textRef });

	return (
		<div className="neon-container">
			<h1 ref={textRef} className="neon-text">Neon Flicker</h1>
		</div>
	);
};

export default NeonFlicker;
