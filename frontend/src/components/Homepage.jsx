import './Homepage.css'
import title from '../assets/title_new.png'

function Homepage() {
  return (
    <div className="homepage">
      <div className="title" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={title} alt="Title" />
        <div className="center">
          <h1>
            IT
          </h1>
        </div>
      </div>
    
      <div className="welcome">
        <p>Pick a category suitable for your project!</p>
      </div>
    </div>
  )
}

export default Homepage