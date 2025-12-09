import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Note from "./Note";
import DisplayProducts from "./DisplayProducts";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import DisplaySpecificProducts from "./displaySpecificProducts";
import Item from "./Item";
import UserProducts from "./UserProducts";

function App() {
  const [isValid, setIsValid] = useState(false);
  const [nameOfTheUser, setNameOfTheUser] = useState("");
  const [email, setEmail] = useState("");
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Note isValid2={isValid} nameOfTheUser={nameOfTheUser} />}
          />
          <Route
            path="/shop"
            element={
              <DisplayProducts
                isValid2={isValid}
                nameOfTheUser={nameOfTheUser}
              />
            }
          />
          <Route
            path="/sign_up"
            element={
              <SignUp
                isValid2={isValid}
                setIsValid2={setIsValid}
                setNameOfTheUser2={setNameOfTheUser}
                setEmail2={setEmail}
              />
            }
          />
          <Route
            path="/sign_in"
            element={
              <SignIn
                isValid2={isValid}
                setIsValid2={setIsValid}
                setNameOfTheUser2={setNameOfTheUser}
                setEmail2={setEmail}
              />
            }
          />
          <Route
            path="/displaySpecificProducts/:title"
            element={
              <DisplaySpecificProducts
                isValid2={isValid}
                nameOfTheUser={nameOfTheUser}
              />
            }
          />
          <Route
            path="/item/:name_of_the_category/:title"
            element={
              <Item
                isValid2={isValid}
                nameOfTheUser={nameOfTheUser}
                email2={email}
              />
            }
          />

          <Route
            path="/cart"
            element={
              isValid ? (
                <UserProducts email={email} nameOfTheUser={nameOfTheUser} />
              ) : (
                <Navigate to="/sign_in" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
