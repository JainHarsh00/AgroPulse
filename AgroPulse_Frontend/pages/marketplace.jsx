import React from "react";
import Navbar from "../components/navbar";
import "../style/MarketPlace.css";

export default function Marketplace() {
  return (
    <div className="market-container">
      {/* Navbar always on top */}
      <Navbar />

      {/* Content wrapper (form + buyers) */}
      <div className="marketplace-container">
        {/* Left Form */}
        <div className="form-section">
          <h2>List your crops here...</h2>
          <form>
            <label>Crop *</label>
            <select required>
              <option value="wheat">Wheat</option>
              <option value="jowar">Jowar</option>
              <option value="barley">Barley</option>
            </select>

            <label>Quantity (in quintal) *</label>
            <input type="text" placeholder="eg: 50, 100" required />

            <label>Location *</label>
            <input type="text" placeholder="eg: Delhi, Haryana" required />

            <label>Expected Price *</label>
            <input type="number" placeholder="eg: 2000" required />

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
            <div className="buyer-card">
              <div className="buyer-info">
                <p>
                  <b>Name:</b> XYZ Pvt Ltd
                </p>
                <p>
                  <b>Crop Interest:</b> Wheat
                </p>
                <p>
                  <b>Location:</b> Delhi
                </p>
                <p>
                  <b>Price:</b> 5000
                </p>
              </div>
              <button className="details-btn">View Details</button>
            </div>

            <div className="buyer-card">
              <div className="buyer-info">
                <p>
                  <b>Name:</b> ABC Traders
                </p>
                <p>
                  <b>Crop Interest:</b> Barley
                </p>
                <p>
                  <b>Location:</b> Haryana
                </p>
                <p>
                  <b>Price:</b> 4500
                </p>
              </div>
              <button className="details-btn">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
