import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

function Item({ isValid2, nameOfTheUser, email2 }) {
  const { name_of_the_category, title } = useParams();
  const [product, setProduct] = useState(null);
  const [weight, setWeight] = useState(0);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [dynamicPrice, setDynamicPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function updateTotals(newWeight = weight, newQuantity = quantity) {
    const dynamicPrice2 = Number((newWeight * price).toFixed(2));
    setDynamicPrice(dynamicPrice2);
    const totalWeight = Number((newWeight * newQuantity).toFixed(2));
    setTotalWeight(totalWeight);
    setQuantity(newQuantity);
    const newTotalPrice = Number((newQuantity * dynamicPrice2).toFixed(2));
    setTotalPrice(newTotalPrice);
  }

  useEffect(() => {
    fetch(
      `/api/item/${name_of_the_category}/${title}?name=${nameOfTheUser}&email=${email2}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [name_of_the_category, title]);
  useEffect(() => {
    if (product) {
      setPrice(product.price_per_kg);
      setDynamicPrice(product.price_per_kg);
    }
  }, [product]);
  if (!product) {
    return <h2>Loading product...</h2>;
  }

  return (
    <div className="item3">
      <Header isValid2={isValid2} nameOfTheUser={nameOfTheUser} />
      <div className="item">
        <div className="bigImageInsideItem">
          {product.image ? (
            <img
              className="itemSizeOfImage"
              src={product.image}
              alt={title}
              style={{ width: "400px", height: "auto" }}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div>
          <h1>{title}</h1>
          <p className="price">{dynamicPrice} $</p>
          <div>
            <div className="packedIn">
              <button
                className={active1 ? "clicked" : ""}
                onClick={() => {
                  setActive1(true);
                  setActive2(false);
                  setActive3(false);
                  setWeight(0.2);
                  updateTotals(0.2, quantity);
                }}
              >
                200g
              </button>

              <button
                className={active2 ? "clicked" : ""}
                onClick={() => {
                  setWeight(0.5);
                  setActive2(true);
                  setActive3(false);
                  setActive1(false);
                  updateTotals(0.5, quantity);
                }}
              >
                500g
              </button>
              <button
                className={active3 ? "clicked" : ""}
                onClick={() => {
                  setWeight(1);
                  setActive1(false);
                  setActive2(false);
                  setActive3(true);
                  updateTotals(1, quantity);
                }}
              >
                1000g
              </button>
            </div>
          </div>
          <p>Quantity:</p>
          <input
            type="text"
            size="4"
            onChange={(e) => {
              const q = Number(e.target.value);
              setQuantity(q);
              updateTotals(weight, q);
            }}
          ></input>
          <br />
          <br />
          <button
            className="addToCartButton"
            onClick={async () => {
              if (!isValid2) {
                window.location.href = "/sign_in";
                return;
              }
              if (weight === 0 && quantity === 0) {
                alert("Choose certain quantity and weight");
                return;
              } else if (weight === 0) {
                alert("Choose a certain weight");
                return;
              }
              if (quantity === 0) {
                alert("Choose a certain quantity");
                return;
              }
              fetch(
                `/api/someEndpoint?title=${encodeURIComponent(
                  title
                )}&totalWeight=${totalWeight}&totalPrice=${totalPrice}&email2=${encodeURIComponent(
                  email2
                )}&nameOfTheUser=${encodeURIComponent(nameOfTheUser)}`
              )
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.error(err));
              alert("The product was added to your cart.");
            }}
          >
            ADD TO CART
          </button>

          <hr />
          <p>
            <b>Categories: </b>
            {product.categories}
          </p>
          <p>
            <b>Description: </b>
            {product.description}
          </p>
          <p>
            {totalWeight} kg of {title}.. Price: {totalPrice} $
          </p>
        </div>
      </div>
    </div>
  );
}
export default Item;
