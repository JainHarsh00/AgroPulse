import React from "react";
import Navbar from "../components/navbar";
import "../style/Explore.css";
import { Link } from "react-router-dom";

const ExplorePage = () => {
  return (
    <div className="explore-page">
      <div className="hero-section-explore">
        <div className="hero-top">
          <Navbar/>
          <div className="hero-text">
            <p>
              Discover crop care tips, government schemes, sustainable
              practices, and market insights — all in one place. Stay updated,
              learn new techniques, and connect with ideas that help you grow
              smarter.
            </p>
          </div>
        </div>
        <div className="card-container">
          <div className="explore-card">
            <img src="../images/market.png" alt="Marketplace" />
            <div className="card-content">
              <h3>Marketplace</h3>
              <Link to="/marketplace">
                <button className="glass-btn">Explore</button>
              </Link>
              
            </div>
          </div>

          <div className="explore-card">
            <img src="../images/hill.jpg" alt="AI Farming Assistant" />
            <div className="card-content">
              <h3>AI Farming Assistant</h3>
              <Link to="/chatbot">
                <button className="glass-btn">Explore</button>
              </Link>
            </div>
          </div>

          <div className="explore-card">
            <img src="../images/women.jpg" alt="Blogs" />
            <div className="card-content">
              <h3>Blogs</h3>
              <Link to="/blogs">
                <button className="glass-btn">Explore</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
