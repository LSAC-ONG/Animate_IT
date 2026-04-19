import { useState } from "react";
import "./App.scss";
import Homepage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import Backgrounds from "./components/Backgrounds/Backgrounds";
import Buttons from "./components/Buttons/Buttons";
import Cursors from "./components/Cursors/Cursors";
import Text from "./components/Text/Text";
import Forms from "./components/Forms/Forms";
import CarouselTest from "./components/Carousel/CarouselTest";
import ZoomAnimation from "./components/ZoomAnimation/ZoomAnimation";
import HorizontalGalleryDemo from "./components/HorizontalGallery/HorizontalGalleryDemo";
import GalleryAnimation from "./components/Animation/GalleryAnimation";
import VerticalParallaxGalleryPage from "./components/VerticalParallaxGallery/VerticalParallaxPage";
import WipePage from "./components/WipeGallery/WipePage";

function App() {
  const [hasPlayedHomepageLoader, setHasPlayedHomepageLoader] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Homepage
            shouldShowLoading={!hasPlayedHomepageLoader}
            onLoadingComplete={() => setHasPlayedHomepageLoader(true)}
          />
        }
      />
      <Route path="/backgrounds" element={<Backgrounds />} />
      <Route path="/buttons" element={<Buttons />} />
      <Route path="/cursors" element={<Cursors />} />
      <Route path="/text" element={<Text />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/carousel-test" element={<CarouselTest />} />
      <Route path="/zoom-anim" element={<ZoomAnimation />} />
      <Route path="/horizontal-gallery" element={<HorizontalGalleryDemo />} />
      <Route path="/gallery-animation/:id?" element={<GalleryAnimation />} />
      <Route path="/vertical-parallax-gallery" element={<VerticalParallaxGalleryPage />} />
      <Route path="/wipe-gallery" element={<WipePage />} />
    </Routes>
  );
}

export default App;
