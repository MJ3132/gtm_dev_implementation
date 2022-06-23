import React, { useState, useContext, useEffect } from "react";
import "./Navbar.styles.scss";

import { withRouter } from "react-router-dom";

import { CartContext } from "../../Contexts/Cart";
import { LoginContext } from "../../Contexts/Login";
import { SearchProductsContext } from "../../Contexts/SearchProducts";
import { LoadingSpinnerContext } from "../../Contexts/LoadingSpinner";

import NavLink from "../NavLinks/NavLinks.component";
import CartSlider from "../CartSlider/CartSlider.component";
import { TransitionsModal } from "../../components/Modal/Modal.component";

import * as ReactAiIcons from "react-icons/ai";
import * as ReactGiIcons from "react-icons/gi";
import * as ReactBsIcons from "react-icons/bs";

//import { BrowserView, MobileView } from 'react-device-detect'; // uninstall
import { apiCallProducts, apiUserLogin } from "../../utility/Utility.component";
import { useCheckMobileScreen } from "../../utility/Utility.component";

import TagManager from "react-gtm-module";

const Navbar = (props) => {
  const isMobile = useCheckMobileScreen();
  const [navigationMenuToggle, setNavigationMenuToggle] = useState(false);
  const { cart } = useContext(CartContext);
  const { login, setLogin } = useContext(LoginContext);
  const { setSearchProducts } = useContext(SearchProductsContext);
  const { setLoadingSpinner } = useContext(LoadingSpinnerContext);
  const [cartSlider, setCartSlider] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setNavigationMenuToggle(false);
    }
  }, [isMobile]);

  const inputListener = (e) => {
    if (e.key === "Enter") {
      setLoadingSpinner(true);

      const searchTerm = e.target.value;
      const searchInput = document.querySelector('.search_input'); 

      if (searchInput){
        searchInput.value = '';
      }

      apiCallProducts(function (products) {
        const sortedProducts = products.filter((product) => {
          const productTitle = product.title.toLowerCase();

          if (productTitle.indexOf(searchTerm) > -1) {
            return product;
          }
          return false;
        });
        if (sortedProducts) {
          setSearchProducts(sortedProducts);

          setLoadingSpinner(false);
        }
      });

      props.history.push({
        pathname: "/search_results",
        search: `?q=${searchTerm}`,
        state: { searchKeyword: searchTerm },
      });
    }
  };

  const userLogin = () => {
    apiUserLogin((response) => {
      TagManager.dataLayer({
        dataLayer: {
          event: "login_success",
          email: "test@gmail.com",
          userId: response,
        },
      });

      setLogin(true);
    });
  };

  const userLogout = () => {
    localStorage.removeItem("userLogin");
    setLogin(false);
  };

  return (
    <div className="navbar">
      <div className="navbar_logo_container">
        <a href="/gtm_dev_implementation">
          <ReactAiIcons.AiTwotoneHome />
        </a>
      </div>
      <div className="navbar_search_bar_container">
        <input
          type="text"
          className="search_input"
          placeholder="search ex: mens, women, monitor, bracelet, shirts, jacket, gaming drive"
          onKeyDown={inputListener}
        />
      </div>
      {navigationMenuToggle ? (
        <div className="navbar_links_toggle_container">
          <ul>
            <NavLink link="/contact">Contact Us</NavLink>
            <NavLink link="/catalogue">Catalogue</NavLink>
            {!login ? (
              <>
                <br />
                <li className="login_btn">
                  <TransitionsModal login={userLogin} name="Login" />
                </li>
              </>
            ) : (
              <>
                <br />
                <li className="logout_btn" onClick={userLogout}>
                  Logout
                </li>{" "}
              </>
            )}
          </ul>
        </div>
      ) : null}
      <div className="navbar_links_container">
        <ul>
          {!isMobile ? (
            <>
              <NavLink link="/contact">Contact Us</NavLink>
              <NavLink link="/catalogue">Catalogue</NavLink>
              {!login ? (
                <button className="login_btn">
                  <TransitionsModal login={userLogin} name="Login" />
                </button>
              ) : (
                <button onClick={() => userLogout()} className="logout_btn">
                  Logout
                </button>
              )}
            </>
          ) : (
            <ReactGiIcons.GiHamburgerMenu
              onClick={() => setNavigationMenuToggle(!navigationMenuToggle)}
            />
          )}
        </ul>
      </div>
      <ReactBsIcons.BsFillCartPlusFill
        onClick={() => setCartSlider(!cartSlider)}
        onMouseEnter={() => setCartSlider(true)}
      />
      <div className="cart_quantity">
        {cart.cartInfo && cart.cartInfo.totalItems
          ? cart.cartInfo.totalItems
          : 0}
      </div>
      <CartSlider
        onMouseLeave={() => setCartSlider(false)}
        activeStatus={cartSlider}
      />
    </div>
  );
};

export default withRouter(Navbar);
