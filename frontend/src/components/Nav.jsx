import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // <- importă Link
import "./Nav.scss";

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
          <Link to="/backgrounds" onClick={() => setOpen(false)}>Backgrounds</Link>
          <Link to="/buttons" onClick={() => setOpen(false)}>Buttons</Link>
          <Link to="/cursors" onClick={() => setOpen(false)}>Cursors</Link>
          <Link to="/text" onClick={() => setOpen(false)}>Text</Link>
          <Link to="/forms" onClick={() => setOpen(false)}>Forms</Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
