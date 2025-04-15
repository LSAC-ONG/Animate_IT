import './Homepage.css'
import title from '../assets/title.png'

function Homepage() {
  return (
    <div className="homepage">
      <div className="title">
        <img src={title} alt="Title" />
      </div>
    
      <div className="welcome">
        <p>Pick a category suitable for your project!</p>
      </div>
    </div>
  )
}

export default Homepage