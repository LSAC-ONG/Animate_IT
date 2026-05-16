import "./Buttons.scss";
import Nav from "../Nav";
import HorizontalGallery from "../HorizontalGallery/HorizontalGallery";
import { getAnimationsByCategory } from "../../AnimationsLibrary";

export default function Buttons() {
  const baseAnimations = getAnimationsByCategory("Buttons");
  const repeatedAnimations = [...baseAnimations, ...baseAnimations, ...baseAnimations];

  const buttonAnimations = repeatedAnimations.map((anim, i) => {
    const baseId = anim.name.toLowerCase().replace(/\s+/g, "-");
    return {
      id: `${baseId}-${i}`,
      slug: baseId,
      label: anim.name,
      content: <anim.component />,
    };
  });

  return (
    <div className="buttons-container">
      <Nav />
      <div style={{ paddingTop: "6rem", textAlign: "center" }}>
        <h1 className="title">Buttons</h1>
        <p style={{ fontFamily: '"Roboto Mono", monospace', color: "rgba(255, 255, 255, 0.7)", marginTop: "1rem" }}>
          Explore our button animations
        </p>
      </div>
      <HorizontalGallery items={buttonAnimations} />
    </div>
  );
}
