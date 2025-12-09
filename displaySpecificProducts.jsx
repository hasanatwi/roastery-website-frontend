import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Category from "./Category";
import Header from "./Header";

function DisplaySpecificProducts({ isValid2, nameOfTheUser }) {
  const { title } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        console.log(`Fetching: ${title}`);
        const response = await fetch(
  `https://roastery-website-backend.onrender.com/api/products/${title}`
);


        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(
          `Received ${Array.isArray(data) ? data.length : "?"} products`
        );
        console.log("Sample product:", data[0]);

        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  return (
    <div>
      <Header isValid2={isValid2} nameOfTheUser={nameOfTheUser} />
      <div className="displayProducts">
        <h1 className="Products">{title}</h1>

        {loading && <p>Loading {title}...</p>}

        {error && (
          <div style={{ color: "red", padding: "20px" }}>
            <h3>Error loading {title}:</h3>
            <p>{error}</p>
            <p>
              Try: http://localhost:3000/api/products/
              {encodeURIComponent(title)}
            </p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p>No products found in {title} category</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              padding: "20px",
            }}
          >
            {products.map((product) => (
              <Category
                key={product.id}
                image={product.image}
                title={product.name_of_product}
                name_of_the_category={title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplaySpecificProducts;



