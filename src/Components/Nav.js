import React from "react";
import { Link } from "@reach/router";

const Nav = () => {
  return (
    <nav className="navbar"><b>
      <Link to="/login" className="link">Login</Link>
      <Link to="/" className="link">Home</Link>
      </b>
    </nav>
  );
};

export default Nav;