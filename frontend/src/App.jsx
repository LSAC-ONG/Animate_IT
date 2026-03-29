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
    </Routes>
  );
}

export default App;
