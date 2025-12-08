import React from "react";
import { Link } from "react-router-dom";
function Header({ isValid2, nameOfTheUser }) {
  return (
    <div className="header-content">
      <div className="title">
        <Link to="/">
          <button>
            <p>GOLDEN NUTS</p>
          </button>
        </Link>
        <br />
      </div>
      <div className="buttons-inside-the-header">
        <Link to="/">
          <button>HOME</button>
        </Link>
        <a href="/#about-us">
          <button>ABOUT US</button>
        </a>
        <Link to="/cart">
          <button>CART</button>
        </Link>
        <a href="/#contact-us">
          <button>CONTACT</button>
        </a>
      </div>
      {!isValid2 && (
        <div className="margin2">
          <Link to="/sign_up">
            <button>SIGN UP</button>
          </Link>
          <Link to="/sign_in">
            <button>SIGN IN</button>
          </Link>
        </div>
      )}
      {isValid2 && (
        <div className="margin3 vertical">
          <p>{nameOfTheUser}</p>
          <button
            onClick={async () => {
              await fetch("http://localhost:3000/logout", {
                method: "GET",
                credentials: "include",
              });
              window.location.href = "/";
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
export default Header;
