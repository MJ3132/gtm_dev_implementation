import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router";
import "./CartSlider.styles.scss";
import {
  removeProduct,
  updateProductQuantity,
} from "../../utility/Utility.component";

import { CartContext } from "../../Contexts/Cart";

import CartSliderProduct from "../CartSliderProduct/CartSliderProduct.component";
import Button from "../Button/Button.component";
import Link from "@mui/material/Link";
import TagManager from "react-gtm-module";

const CartSlider = ({ activeStatus, onMouseLeave, history }) => {
  const { cart, setCart } = useContext(CartContext);
  const url = window.location.href;

  useEffect(() => {
    if (activeStatus) {
      TagManager.dataLayer({
        dataLayer: {
          event: "pageview",
          page: {
            path: "/cart",
            pageType: "cartPage",
          },
          products: [...cart.cartProducts],
        },
      });
    }
  }, [activeStatus, cart.cartProducts]);

  const removeProductNative = (productId) => {
    removeProduct(productId, cart, (updatedCart) => {
      setCart({ ...updatedCart });
    });
  };

  const updateQuantityNative = (productId, action) => {
    updateProductQuantity(productId, cart, action, (updatedCart) => {
      setCart({ ...updatedCart });
    });
  };

  return (
    <div
      onMouseLeave={() => onMouseLeave()}
      className={`addToCartSlider_container addToCartSlider_container--${activeStatus}`}
    >
      <div className="addToCartSlider_content">
        {cart.cartProducts && cart.cartProducts.length > 0 ? (
          cart.cartProducts.map((product) => {
            return (
              <CartSliderProduct
                key={product.id}
                updateQuantity={updateQuantityNative}
                removeProduct={removeProductNative}
                {...product}
              />
            );
          })
        ) : (
          <h1 style={{ textAlign: "center" }}>There are no items on cart</h1>
        )}
        <div className="cart_total_amount">
          {cart.cartInfo && cart.cartInfo.totalPrice ? (
            <h1 style={{ textAlign: "center" }}>
              Total Price: ${cart.cartInfo.totalPrice}
            </h1>
          ) : null}
        </div>
        <Button
          clickAction={() => history.push("/checkout")}
          disabled={
            cart.cartProducts && cart.cartProducts.length > 0 ? false : true
          }
          link="/checkout"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default withRouter(CartSlider);
