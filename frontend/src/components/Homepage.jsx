import './Homepage.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="homepage">
      <button className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      {menuOpen && (
        <nav className="menu">
          <ul>
            <li><Link to="/page1">Page 1</Link></li>
            <li><Link to="/page2">Page 2</Link></li>
            <li><Link to="/page3">Page 3</Link></li>
          </ul>
        </nav>
      )}
      <h1>Welcome to Animate_IT</h1>
      <p>Learn how to animate for a more captivating frontend.</p>
    </div>
  )
}

export default Homepage