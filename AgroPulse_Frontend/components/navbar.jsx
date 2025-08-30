import React from "react";
import "../style/navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        
        <header className="navbar">
            <div className="logo">
              <div className="logo-icon">
                <img 
                    src="../images/logo.png" 
                    alt="icon" 
                />

              </div>
              <span><Link to="/"> AgroPulse</Link></span>
            </div>

            <nav className="nav-links">
              <Link to="/blogs">Blogs</Link>
              <Link to="/chatbot">Chatbot</Link>
              <Link to="/marketplace">Marketplace</Link>
            </nav>
          </header>
    )
}

