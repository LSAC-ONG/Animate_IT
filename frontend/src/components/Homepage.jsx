import './Homepage.scss'
import title from '../assets/title_new.png'
import Nav from "./Nav";
import Carousel from './Carousel/Carousel'

function Homepage() {
  return (
    <div className="homepage-container">
      <div className="title" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={title} alt="title-home" />
        <div className="center">
          <h1>
            IT
          </h1>
        </div>
      </div>
      <Carousel VISIBLE={5} MAX_HEIGHT={'40vh'} />
      <div className="welcome">
        <p>Pick a category suitable for your project!</p>
      </div>
    </div>
  )
}

export default Homepage