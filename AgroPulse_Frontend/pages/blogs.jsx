import React from "react";
import Navbar from "../components/navbar"; // your navbar
import "../style/Blog.css";

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
          <h2>Crop Diseases: Types, Control, And Prevention</h2>
          <p>
            Plant diseases are a severe threat to the entire production.
            Therefore, it is essential for farmers to effectively deal with them
            and check them with the help of timely prevention. Depending on the
            agricultural area size, this task can be difficult, especially since
            the list of harmful crop diseases is quite impressive. Modern
            technologies come to the aid of farmers. EOSDA Crop Monitoring
            allows you to identify dangerous areas and apply an individual
            approach to yield treatment, significantly increasing disease
            control effectiveness.
          </p>
        </div>
        <div className="blog-card">
          <h2>Guide to crop disease and management</h2>
          <p>
            Understanding crop diseases and their management is essential for
            maintaining agricultural productivity and ensuring food security. In
            this guide to crop disease and management, we will explore common
            plant diseases, signs and symptoms of plant disease, strategies for
            preventing crop diseases, and the technologies available to aid in
            their management.
          </p>
        </div>
        <div className="blog-card">
          <h2>Common Crop Diseases and How to Prevent Them</h2>
          <p>
            India has made tremendous strides in food-grain production from 82
            million tonnes in 1960-61 to 271.37 million tonnes in 2018-19. It
            further increased to 329.7 million tonnes in 2022-23 with
            agricultural exports exceeding Rs 4 lakh crore (US$ 53 B). India has
            the second-largest agricultural land in the world with the sector
            providing livelihood for nearly half of the nation’s population,
            contributing to about 18% of India’s GDP.
          </p>
        </div>
        <div className="blog-card">
          <h2>Pest and Disease Management</h2>
          <p>
            Ensuring crop health is essential for maximizing yield and
            profitability. Pests and diseases can significantly reduce
            production if not managed properly. Implementing an integrated pest
            and disease management approach helps protect crops while
            maintaining soil health. In this blog, we explore the best practices
            for controlling pests and diseases and how Krikso India’s solutions
            can help safeguard your farm.
          </p>
        </div>
        <div className="blog-card">
          <h2>PlantwisePlus Blog</h2>
          <p>
            Digital innovation isn’t just about tools, it’s about transforming
            access to knowledge where it’s needed most.” In Bangladesh, millions
            of smallholder farmers struggle with unpredictable weather and
            frequent pest and disease outbreaks. Traditional agricultural
            extension services often can’t reach them fast enough. Digital
            agricultural extension, or e-extension, offers a solution.
          </p>
        </div>
        <div className="blog-card">
          <h2>What is Protected Cultivation in Agriculture?</h2>
          <p>
            Protected cultivation is a modern method of farming where crops are
            grown inside specially designed structures such as polyhouses, shade
            nets, or greenhouses. These structures create a controlled
            environment for crops by regulating temperature, humidity, light,
            and water. Unlike traditional open-field farming, protected
            cultivation allows farmers to grow crops in all seasons with better
            quality and higher yields.
          </p>
        </div>
        <div className="blog-card">
          <h2>Which Form of Nitrogen is Best for Crops?</h2>
          <p>
            Nitrogen is one of the most important nutrients for crops. It is
            often called the “engine of plant growth” because it helps in
            building proteins, chlorophyll, and enzymes. Without proper
            nitrogen, crops remain yellow, weak, and give low yields. Farmers
            use nitrogen fertilizers like urea, DAP, and ammonium nitrate, but
            do you know that nitrogen exists in different forms in soil? Each
            form has its own benefits and limitations. Let’s understand them in
            detail.
          </p>
        </div>
      </div>
    </div>
  );
}
