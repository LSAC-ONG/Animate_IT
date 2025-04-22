import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // <- importă Link
import "./Nav.css";

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <button onClick={() => setOpen(!open)}>
        {open ? <X size={32} color="white" /> : <Menu size={32} color="white" />}
      </button>
      {open && (
        <div className="menu">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
