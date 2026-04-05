import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import "./WaveText.scss";

const WaveText = () => {
	const textRef = useRef(null);

	useGSAP(() => {
		const split = new SplitType(textRef.current, { types: "chars" });
		gsap.to(split.chars, {
			y: -20,
			stagger: { each: 0.08, repeat: -1, yoyo: true },
			duration: 0.5,
			ease: "sine.inOut",
		});
		return () => split.revert();
	}, { scope: textRef });

	return (
		<div className="wave-container">
			<h1 ref={textRef} className="wave-text">Wave Text</h1>
		</div>
	);
};

export default WaveText;
