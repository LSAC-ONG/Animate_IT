import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Backgrounds from "./components/Backgrounds/Backgrounds";
import Buttons from "./components/Buttons/Buttons";
import Cursors from "./components/Cursors/Cursors";
import Text from "./components/Text/Text";
import Forms from "./components/Forms/Forms";
import CarouselTest from "./components/Carousel/CarouselTest";
import SandboxWrapperTest from "./components/SandboxWrapper/SandboxWrapperTest";
import Animation from "./components/Animation/Animation";
import ZoomAnimation from "./components/ZoomAnimation/ZoomAnimation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/backgrounds" element={<Backgrounds />} />
      <Route path="/buttons" element={<Buttons />} />
      <Route path="/cursors" element={<Cursors />} />
      <Route path="/text" element={<Text />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/carousel-test" element={<CarouselTest />} />
      <Route path="/sandbox-test" element={<SandboxWrapperTest />} />
      <Route path="/zoom-anim" element={<ZoomAnimation />} />
      <Route path="/animation" element={<Animation />} />
      <Route path="/horizontal-gallery" element={<HorizontalGalleryDemo />} />
    </Routes>
  );
}

export default App;
