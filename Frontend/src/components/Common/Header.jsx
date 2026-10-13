import React from "react";
import TopBar from "../Layouts/TopBar";
import NavBar from "./NavBar";


function Header() {
  return (
    <header className="border-b border-gray-200">
      {/*Top Bar */}
      <TopBar/>
      {/*Nav Bar */}
      <NavBar/>
    </header>
  );
}

export default Header;
