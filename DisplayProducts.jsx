import React from "react";
import Category from "./Category";
import Products from "./products";
import Header from "./Header";

function createProduct(Product) {
  return (
    <Category key={Product.id} image={Product.image} title={Product.title} />
  );
}

function DisplayProducts({ isValid2, nameOfTheUser }) {
  return (
    <div>
      <Header isValid2={isValid2} nameOfTheUser={nameOfTheUser} />
      <div className="displayProducts">
        <h1 className="Products">Products</h1>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {Products.map(createProduct)}
        </div>
      </div>
    </div>
  );
}

export default DisplayProducts;
