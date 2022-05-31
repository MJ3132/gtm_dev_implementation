import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { CartContext } from './Contexts/Cart';
import { ListingProductsContext } from "./Contexts/ListingProducts";
import { SearchProductsContext } from "./Contexts/SearchProducts";
import { LoginContext } from "./Contexts/Login"
import { LoadingSpinnerContext } from "./Contexts/LoadingSpinner"

import Homepage from './pages/home_page/home_page.container';
import Searchpage from './pages/search_page/search_page.container';
import Listingpage from './pages/listing_page/listing_page.container';
import Productpage from './pages/product_page/product_page.container';
import Contactpage from './pages/contact_page/contact_page.container';
import Checkoutpage from './pages/checkout_page/checkout_page.container';


import NavBar from './components/NavBar/Navbar.component';
import Footer from "./components/Footer/Footer.component";
import { getCartInfo } from './utility/Utility.component';

import TagManager from 'react-gtm-module';


import './App.scss';


const TagManagerArgs = {
  gtmId: "GTM-KTCJSPR"
}

TagManager.initialize(TagManagerArgs)


function App() {
  



  const [cart, setCart] = useState({});
  const [listingProducts, setListingProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [login, setLogin] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);


  useEffect(() => {

    let cartInfo = getCartInfo();

    setCart(cartInfo)

  }, []);

  return (
    <div className="App">
      <LoadingSpinnerContext.Provider value={{loadingSpinner, setLoadingSpinner}}>
      <LoginContext.Provider value={{ login, setLogin }}>
        <SearchProductsContext.Provider value={{ searchProducts, setSearchProducts }}>
          <ListingProductsContext.Provider value={{ listingProducts, setListingProducts }}>
            <CartContext.Provider value={{ cart, setCart }}>
              <NavBar />
              <Switch>
                <Route path='/search_results' component={Searchpage} />
                <Route path='/catalogue' component={Listingpage} />
                <Route path='/contact' component={Contactpage} />
                <Route path='/product' component={Productpage} />
                <Route path='/checkout' component={Checkoutpage} />
                <Route path='/' component={Homepage} />
              </Switch>
              <Footer/>
            </CartContext.Provider>
          </ListingProductsContext.Provider>
        </SearchProductsContext.Provider>
      </LoginContext.Provider>
      </LoadingSpinnerContext.Provider>
    </div>
  );
}
export default withRouter(App);
