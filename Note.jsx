import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DisplayProducts from "./DisplayProducts.jsx";
import Header from "./Header";
const coffeeBeans =
  "https://lkxdeoexdxrizzkblvac.supabase.co/storage/v1/object/public/product-images/coffee%20and%20beans.png";
function Note({ isValid2, nameOfTheUser }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div>
      <Header isValid2={isValid2} nameOfTheUser={nameOfTheUser} />
      <div
        style={{
          backgroundImage: `url(${coffeeBeans})`,
          backgroundSize: "1600px 600px",
          backgroundRepeat: "no-repeat",
          height: "600px",
        }}
      >
        <div className="margin">
          <h1>
            FRESHLY ROASTED
            <br />
            COFFEE
          </h1>
          <p>
            Discover the flavor of our freshly roasted coffee.
            <br />
            Each batch is carefully crafted to ensure
            <br /> the highest quality.
          </p>
          <Link to="/shop">
            <button className="shopNow">SHOP NOW</button>
          </Link>
        </div>
      </div>
      <div className="AboutUs">
        <h1 id="about-us">About Golden Nuts</h1>
        <p>
          Welcome to Golden Bean Roastery! We are a small, family-owned coffee
          roastery
          <br /> dedicated to sourcing and roasting the highest quality coffee
          beans. Our passion
          <br /> for coffee is reflected in every cup
        </p>
        <h2 id="contact-us">Contact Us</h2>
        <p>
          25/810677
          <br />
          +961 78933282
        </p>
      </div>
    </div>
  );
}
export default Note;
