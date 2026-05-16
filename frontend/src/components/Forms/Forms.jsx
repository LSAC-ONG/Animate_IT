import "./Forms.scss";
import Nav from "../Nav";
import HorizontalGallery from "../HorizontalGallery/HorizontalGallery";
import { getAnimationsByCategory } from "../../AnimationsLibrary";

export default function Forms() {
  const getId = (name) => {
    const id = name.toLowerCase().replace(/\s+/g, "-");
    if (id === "simple-registration") return "simple-registration-form";
    return id;
  };

  const baseAnimations = getAnimationsByCategory("Forms");
  const repeatedAnimations = [...baseAnimations, ...baseAnimations, ...baseAnimations];

  const formAnimations = repeatedAnimations.map((anim, i) => {
    const baseId = getId(anim.name);
    return {
      id: `${baseId}-${i}`,
      slug: baseId,
      label: anim.name,
      content: <anim.component />,
    };
  });

  return (
    <div className="forms-container">
      <Nav />
      <div style={{ paddingTop: "6rem", textAlign: "center" }}>
        <h1 className="title">Forms</h1>
        <p style={{ fontFamily: '"Roboto Mono", monospace', color: "rgba(255, 255, 255, 0.7)", marginTop: "1rem" }}>
          Explore our form animations
        </p>
      </div>
      <HorizontalGallery items={formAnimations} />
    </div>
  );
}