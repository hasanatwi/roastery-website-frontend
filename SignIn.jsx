import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
function SignIn({ isValid2, setIsValid2, setNameOfTheUser2, setEmail2 }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
  `https://roastery-website-backend-2.onrender.com/login`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username: email, password }),
  }
);


      const data = await response.json();
      if (response.ok) {
        setNameOfTheUser2(data.user.nameoftheuser);
        setIsValid2(true);
        console.log("Login successful:", data.message);
        console.log("The name of the user is:" + data.user.nameoftheuser);
        navigate("/");
      } else {
        console.log("Login failed:", data.message);
        setErrorMessage("Incorrect Username or Password");
      }
    } catch (error) {
      console.error("Error during sign in: ", error);
    }
  };

  return (
    <div>
      <form className="signInForm" onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <label className="labelEmail2">Enter your email:</label>
        <br />
        <input
          type="text"
          name="username"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmail2(e.target.value);
          }}
        ></input>
        <br />
        <br />
        <label className="labelPassword2">Enter your password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />
        <button type="submit">Sign In</button>
        <table className="miniSignUp">
          <tr>
            <td>
              <p>New User?</p>
            </td>
            <td>
              <Link to="/sign_up">
                <button>Sign Up</button>
              </Link>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}
export default SignIn;


