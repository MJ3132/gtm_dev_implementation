import TagManager from "react-gtm-module";
import { useState, useEffect } from "react";

//*******global variables*******//

let cart =
  typeof sessionStorage.cart != "undefined"
    ? JSON.parse(sessionStorage.getItem("cart"))
    : { cartProducts: [], cartInfo: { totalItems: 0, totalPrice: 0 } };
let cachedProducts = sessionStorage.getItem("cachedProducts")
  ? JSON.parse(sessionStorage.getItem("cachedProducts"))
  : [];

//*****end global variables*****//

export const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width <= 1200;
};

export const apiCallProducts = (call) => {
  if (cachedProducts.length === 0) {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => {
        sessionStorage.setItem("cachedProducts", JSON.stringify(products));
        call(products);
      });
  } else {
    call(cachedProducts);
  }
};

export const apiGetProduct = (pCode, call) => {
  if (cachedProducts.length === 0) {
    fetch(`https://fakestoreapi.com/products/${pCode}`)
      .then((res) => res.json())
      .then((product) => call(product));
  } else {
    const cachedProduct = cachedProducts.find((product) => product.id == pCode);
    call(cachedProduct);
  }
};

export const apiUserLogin = (call) => {
  fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: "johnd",
      password: "m38rmF$",
    }),

    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      sessionStorage.setItem(
        "userLogin",
        JSON.stringify({
          name: "John",
          username: "johnd",
          userId: json.token,
        })
      );
      call(json);
    });
};

export const getQueryParam = (paramName) => {
  const params = new URLSearchParams(window.location.search);
  const paramValue = params.get(paramName);

  if (!!paramValue) {
    return paramValue;
  }
};

export const addToCart = (cart, product) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let isProductInCart = null;

        TagManager.dataLayer({
          dataLayer: {
            event: "addToCart",
            // page: {
            //     path: "/product?pCode=" + product.id,
            //     pageType: "productPage"
            // },

            products: [{ ...product }],
          },
        });

        if (cart && cart.cartProducts && cart.cartProducts.length > 0) {
          isProductInCart = cart.cartProducts.find((cartProduct) => {
            if (cartProduct.id === product.id) {
              cartProduct.quantity = +cartProduct.quantity + +product.quantity;

              return cartProduct;
            } else {
              return false;
            }
          });
        }

        if (!isProductInCart) {
          cart.cartProducts.push(product);
        }

        let cartQuantity = calculateCart(cart, "total quantity");
        let cartTotalPrice = calculateCart(cart, "total price");

        updateCart({
          cartProducts: cart.cartProducts,
          cartInfo: { totalItems: cartQuantity, totalPrice: cartTotalPrice },
        });
        resolve({
          cartProducts: cart.cartProducts,
          cartInfo: { totalItems: cartQuantity, totalPrice: cartTotalPrice },
        });
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

export const getCartInfo = () => {
  if (cart && cart.cartProducts && cart.cartProducts.length > 0) {
    return JSON.parse(sessionStorage.cart);
  } else {
    return cart;
  }
};

export const updateCart = (cart) => {
  sessionStorage.setItem("cart", JSON.stringify(cart));
};

export const calculateCart = (cart, info) => {
  if (cart && cart.cartProducts && cart.cartProducts.length > 0) {
    if (info === "total quantity") {
      const cartQuantity = cart.cartProducts.reduce((acc, product) => {
        return acc + +product.quantity;
      }, 0);

      return cartQuantity;
    }

    if (info === "total price") {
      const cartTotalPrice = cart.cartProducts.reduce((acc, product) => {
        return acc + +product.quantity * +product.price;
      }, 0);
      return cartTotalPrice.toFixed(2);
    }
  }
};

export const removeProduct = (id, cart, call) => {
  let filteredCart = cart.cartProducts.filter((product) => {
    if (product.id === id) {
      TagManager.dataLayer({
        dataLayer: {
          event: "removeProduct",
          // page: {
          //     path: "/product?pCode=" + product.id,
          //     pageType: "productPage"
          // },

          products: [{ ...product }],
        },
      });
    }
    return product.id !== id;
  });
  let cartQuantity = calculateCart(
    { cartProducts: filteredCart },
    "total quantity"
  );
  let cartTotalPrice = calculateCart(
    { cartProducts: filteredCart },
    "total price"
  );
  cart = {
    cartProducts: filteredCart,
    cartInfo: { totalItems: cartQuantity, totalPrice: cartTotalPrice },
  };

  updateCart(cart);
  call(cart);
};

export const updateProductQuantity = (id, cart, action, call) => {
  let filteredCart = cart.cartProducts.reduce((result, product) => {
    if (product.id === id && product.quantity && action === "increase") {
      result.push({
        ...product,
        quantity: +product.quantity + 1,
      });
    } else if (
      product.id === id &&
      product.quantity === 1 &&
      action === "decrease"
    ) {
      TagManager.dataLayer({
        dataLayer: {
          event: "removeProduct",
          // page: {
          //     path: "/product?pCode=" + product.id,
          //     pageType: "productPage"
          // },

          products: [{ ...product }],
        },
      });
    } else if (
      product.id === id &&
      product.quantity >= 1 &&
      action === "decrease"
    ) {
      result.push({
        ...product,
        quantity: +product.quantity - 1,
      });
    } else result.push(product);

    return result;
  }, []);

  let cartQuantity = calculateCart(
    { cartProducts: filteredCart },
    "total quantity"
  );
  let cartTotalPrice = calculateCart(
    { cartProducts: filteredCart },
    "total price"
  );

  cart = {
    cartProducts: filteredCart,
    cartInfo: { totalItems: cartQuantity, totalPrice: cartTotalPrice },
  };

  updateCart(cart);
  call(cart);
};

export const generateRandomOrderNumber = () => {
  let array = [];

  for (let i = 0; i < 9; i++) {
    let randomNumber = Math.floor(Math.random() * (10 - 1)) + 1;
    array.push(randomNumber);
  }

  return array.join("");
};
