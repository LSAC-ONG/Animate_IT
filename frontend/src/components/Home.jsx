import "./Home.css";
import Nav from "./Nav"; // vom crea si Nav.jsx

function Home() {
  return (
    <div className="page">
      <Nav />
      <h1 className="title">ANIMATE</h1>
      <div className="it">IT</div>
      <div className="categories">
        <div className="category">
          <img src="/background.png" alt="backgrounds" width="50" />
          <span>backgrounds!</span>
        </div>
        <div className="category">
          <img src="/cursor.png" alt="cursors" width="50" />
          <span>cursors!</span>
        </div>
        <div className="category">
          <img src="/button.png" alt="buttons" width="50" />
          <span>buttons!</span>
        </div>
        <div className="category">
          <img src="/text.png" alt="text" width="50" />
          <span>text!</span>
        </div>
        <div className="category">
          <img src="/form.png" alt="forms" width="50" />
          <span>forms!</span>
        </div>
      </div>
      <div className="pick-text">Pick a category suitable for your project!</div>
    </div>
  );
}

export default Home;
