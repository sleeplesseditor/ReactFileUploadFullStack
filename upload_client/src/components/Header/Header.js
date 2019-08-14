import React from "react";
import "./Header.css";
import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <header className="Header">
      <h3 className="navbar-heading">
          <Link 
            to={"/"}
            style={{ textDecoration: 'none' }}
          >
            React Full-Stack File Upload
          </Link>
        </h3>
    </header>
  );
}