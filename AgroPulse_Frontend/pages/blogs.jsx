import React from "react";
import Navbar from "../components/navbar" // your navbar
import "../style/Blog.css"

export default function Blogs() {
  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <div className="hero-section-blogs">
        <Navbar />

        <div className="overlay-text">
          <h1>Explore our blogs</h1>
        </div>
      </div>

      {/* Blog Cards Container */}
      <div className="blog-container">
        <div className="blog-card">
          <h2>Title</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
            pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
            tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
            per conubia nostra inceptos himenaeos.
          </p>
        </div>
      </div>
    </div>
  );
}
