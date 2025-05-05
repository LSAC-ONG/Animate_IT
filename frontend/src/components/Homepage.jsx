import './Homepage.css'
import title from '../assets/title_new.png'
import Carousel from './Carousel/carousel'

function Homepage() {
  return (
    <div className="homepage">
      <div className="title-home" style={{ display: 'flex', alignItems: 'center' }}>
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