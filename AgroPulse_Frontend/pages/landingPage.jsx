
import "../style/landingPage.css";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

export default function LandingPage() {
  
  const farmlandSrc = "/static/homepagePhoto.jpg";
  return (
    <div className="landing-page">
      <div className="container">
        <div className="card">
          {/* Top nav */}
          <Navbar />

          {/* Hero */}
          <div className="hero">
            <div className="hero-left">
              <h1>AgroPulse</h1>
              <p>
                From solving everyday farming queries to connecting you with
                buyers and sharing the latest practices, Agropulse empowers
                farmers with the right tools and knowledge to grow better and
                earn more.
              </p>

              <Link to="/explore">
                <button className="explore-btn">Explore AgroPulse</button>
              </Link>
            </div>

            <div className="hero-right">
              <div className="image-card">
                <img
                  src={farmlandSrc}
                  alt="Golden farmland with winding path and tree"
                />
                <Link to="/chatbot">
                  <Pill
                  style={{ top: "8%", right: "10%" }}
                  text="Talk to ChatBot"
                />
                </Link>
                <Link to="/marketplace">
                  <Pill style={{ top: "34%", left: "9%" }} text="MarketPlace" />
                </Link>

                <Link to="/blogs">
                  <Pill style={{ bottom: "35%", left: "50%" }} text="Blogs" />
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ style, text }) {
  return (
    <div style={style} className="pill">
      <span className="pill-icon">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="#111"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span>{text}</span>
    </div>
  );
}
