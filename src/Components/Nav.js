import React from "react";
import { Link } from "@reach/router";

const Nav = () => {
  return (
    <nav>
      <Link to="/login" className="link">Login</Link>
      <Link to="/" className="link">Home</Link>
    </nav>
  );
};

export default Nav;