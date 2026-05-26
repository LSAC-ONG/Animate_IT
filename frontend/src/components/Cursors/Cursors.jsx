import "./Cursors.scss";
import Nav from "../Nav";
import HorizontalGallery from "../HorizontalGallery/HorizontalGallery";
import { getAnimationsByCategory } from "../../AnimationsLibrary";

export default function Cursors() {
  const baseAnimations = getAnimationsByCategory("Cursors");

  const cursorAnimations = baseAnimations.map((anim, i) => {
    const baseId = anim.name.toLowerCase().replace(/\s+/g, "-");
    return {
      id: `${baseId}-${i}`,
      slug: baseId,
      label: anim.name,
      content: <anim.component />,
    };
  });

  return (
    <div className="cursors-container">
      <Nav />
      <div style={{ paddingTop: "6rem", textAlign: "center" }}>
        <h1 className="title">Cursors</h1>
        <p style={{ fontFamily: '"Roboto Mono", monospace', color: "rgba(255, 255, 255, 0.7)", marginTop: "1rem" }}>
          Explore our cursor animations
        </p>
      </div>
      <HorizontalGallery items={cursorAnimations} />
    </div>
  );
}
