import React from "react";
import "./Product.styles.scss";
import { Link } from "react-router-dom";

import Button from "../../components/Button/Button.component";
import ReviewStars from "../ReviewStars/ReviewStars.component";
import { Alert } from "@material-ui/lab";

import TagManager from "react-gtm-module";

const Product = ({
  id,
  image,
  title,
  category,
  price,
  addToCart,
  quantity,
  ommit,
  rating,
  position,
  rating: { rate },
  successAddToCart,
}) => {
  const eeProductClick = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: "productClick",
        product: { id, image, title, category, price, rating, position },
      },
    });
  };

  return (
    <div
      productid={id}
      onClick={() => eeProductClick()}
      className="product_container"
    >
      <div className="product_content">
        <div className="product_image">
          <Link to={`/product?pCode=${id}`}>
            <img src={image} alt="product" />
          </Link>
        </div>
        <h2 className="product_title">{title}</h2>
        <div className="product_price">
          {ommit !== "addToCart"
            ? "$ " + price
            : "$" + price + " X " + quantity}
        </div>
        <div className="product_rating">
          <ReviewStars rate={rate} />
        </div>
      </div>
      {ommit !== "addToCart" ? (
        <Button clickAction={() => addToCart(id)}> Add To Cart</Button>
      ) : null}

      {successAddToCart && id === successAddToCart ? (
        <>
          <br />
          <Alert variant="filled" severity="success">
            Success You Have Added To Cart!
          </Alert>
        </>
      ) : null}
    </div>
  );
};

export default Product;
