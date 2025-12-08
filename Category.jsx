import React from "react";
import { Link } from "react-router-dom";
import Item from "./Item";

function Category(props) {
  const matchesCategory =
    props.title.startsWith("Roasted") ||
    props.title.startsWith("Raw") ||
    props.title.startsWith("Dates") ||
    props.title.startsWith("Candies") ||
    props.title.startsWith("Chocolate") ||
    props.title.startsWith("Chinese") ||
    props.title.startsWith("Seeds") ||
    props.title.startsWith("Dried");
  return (
    <div
      className="Category"
      onClick={props.onClick}
      style={{
        cursor: "pointer",
      }}
    >
      {!matchesCategory && props.title === "" && (
        <Link to={`/`}>
          <img
            src={props.image}
            alt={props.title}
            style={{
              width: "270px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </Link>
      )}
      {matchesCategory && props.title !== "" && (
        <Link to={`/displaySpecificProducts/${props.title}`}>
          <img
            src={props.image}
            alt={props.title}
            style={{
              width: "270px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </Link>
      )}
      {!matchesCategory && props.title !== "" && (
        <Link
          to={`/item/${props.name_of_the_category}/${props.title}`}
        >
          <img
            src={props.image}
            alt={props.title}
            style={{
              width: "270px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </Link>
      )}
      {!matchesCategory && props.title === "coffee" && (
        <Link
          to={`/item/${props.name_of_the_category}/${props.title}`}
        >
          <img
            src={props.image}
            alt={props.title}
            style={{
              width: "270px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </Link>
      )}
      <p>{props.title}</p>
    </div>
  );
}

export default Category;
