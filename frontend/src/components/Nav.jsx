import { useState } from "react";
import { Menu, X } from "lucide-react";
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
          <p>Home</p>
          <p>About</p>
          <p>Contact</p>
        </div>
      )}
    </div>
  );
}

export default Nav;
