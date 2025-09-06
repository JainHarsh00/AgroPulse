import React, { useState } from "react";
import Navbar from "../components/navbar";
import buyers from "../src/data/buyerData";
import "../style/MarketPlace.css";

export default function Marketplace() {
  const [formData, setFormData] = useState({
    crop: "",
    quantity: "",
    location: "",
    price: ""
  });
  const [matchedBuyers, setMatchedBuyers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter buyers where crop + location match
    const matches = buyers.filter(
      (buyer) =>
        buyer.crop === formData.crop.toLowerCase() &&
        buyer.location.toLowerCase() === formData.location.toLowerCase()
    );

    setMatchedBuyers(matches);
  };

  return (
    <div className="market-container">
      <Navbar />

      <div className="marketplace-container">
        {/* Left Form */}
        <div className="form-section">
          <h2>List your crops here...</h2>
          <form onSubmit={handleSubmit}>
            <label>Crop *</label>
            <select
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Crop --</option>
              <option value="wheat">Wheat</option>
              <option value="jowar">Jowar</option>
              <option value="barley">Barley</option>
            </select>

            <label>Quantity (in quintal) *</label>
            <input
              type="number"
              name="quantity"
              placeholder="eg: 50, 100"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

            <label>Location *</label>
            <input
              type="text"
              name="location"
              placeholder="eg: Delhi, Haryana"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label>Expected Price *</label>
            <input
              type="number"
              name="price"
              placeholder="eg: 2000"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <button type="submit" className="list-btn">
              LIST
            </button>
          </form>
          <p className="note">
            If you aren’t seeing any buyers it’s probably that you haven’t
            listed anything yet or there are no buyers according to your
            preferences. Please try again later...
          </p>
        </div>

        {/* Right Buyers List */}
        <div className="buyers-section">
          <h2>Available Buyers</h2>
          <div className="buyers-list">
            {matchedBuyers.length > 0 ? (
              matchedBuyers.map((buyer, index) => (
                <div className="buyer-card" key={index}>
                  <div className="buyer-info">
                    <p>
                      <b>Name:</b> {buyer.name}
                    </p>
                    <p>
                      <b>Crop Interest:</b> {buyer.crop}
                    </p>
                    <p>
                      <b>Location:</b> {buyer.location}
                    </p>
                    <p>
                      <b>Price:</b> {buyer.price}
                    </p>
                  </div>
                  <button className="details-btn">View Details</button>
                </div>
              ))
            ) : (
              <p>No matching buyers found yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
