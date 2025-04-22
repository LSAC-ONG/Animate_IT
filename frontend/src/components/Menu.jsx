// Menu.jsx
import React from "react";
import { MenuIcon } from "lucide-react"; 

export default function Menu() {
  return (
    <button className="flex flex-col justify-between w-8 h-6">
      <span className="block h-1 bg-cyan-300 rounded">Ceva1</span>
      <span className="block h-1 bg-cyan-300 rounded">Ceva2</span>
      <span className="block h-1 bg-cyan-300 rounded">Ceva3</span>
    </button>
  );
}
