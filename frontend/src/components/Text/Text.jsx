import "./Text.scss";
import Nav from "../Nav";
import HorizontalGallery from "../HorizontalGallery/HorizontalGallery";
import { getAnimationsByCategory } from "../../AnimationsLibrary";

export default function Text() {
  const getId = (name) => {
    const id = name.toLowerCase().replace(/\s+/g, "-");
    if (id === "glitch-effect") return "glitch";
    return id;
  };

  const baseAnimations = getAnimationsByCategory("Text");

  const textAnimations = baseAnimations.map((anim, i) => {
    const baseId = getId(anim.name);
    return {
      id: `${baseId}-${i}`,
      slug: baseId,
      label: anim.name,
      content: <anim.component />,
    };
  });

  return (
    <div className="text-container">
      <Nav />
      <div style={{ paddingTop: "6rem", textAlign: "center" }}>
        <h1 className="title">Text</h1>
        <p style={{ fontFamily: '"Roboto Mono", monospace', color: "rgba(255, 255, 255, 0.7)", marginTop: "1rem" }}>
          Explore our text animations
        </p>
      </div>
      <HorizontalGallery items={textAnimations} />
    </div>
  );
}
