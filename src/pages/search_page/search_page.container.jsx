import React, { useEffect, useContext } from 'react';
import { addToCart } from "../../utility/Utility.component"
import { withRouter } from 'react-router';

import { CartContext } from '../../Contexts/Cart';
import { SearchProductsContext } from '../../Contexts/SearchProducts';
import { LoadingSpinnerContext } from '../../Contexts/LoadingSpinner';

import Spinner from "../../components/Spinner/Spinner.component";
import Product from '../../components/Product/Product.component';

import TagManager from "react-gtm-module";




const SearchPage = function (props) {


    const { searchProducts, setSearchProducts } = useContext(SearchProductsContext)
    const { cart, setCart } = useContext(CartContext);
    const { LoadingSpinner } = useContext(LoadingSpinnerContext);

    useEffect(() => {

        const { history } = props;
        const searchTerm = typeof history.location.state.searchKeyword != 'undefined' ? history.location.state.searchKeyword : false;

    if (searchTerm) {

        TagManager.dataLayer({
            dataLayer: {
                event: "pageview",
                page: {
                    path:"search_results?q=" + searchTerm,
                    pageType: "searchPage"
                },  
                products: [...searchProducts]
            }
        })    
        setSearchProducts(searchProducts)
     }
    });


    function nativeAddToCart(productId) {

        let products = [...searchProducts];

        if (products.length > 0) {
            const addedToCartProduct = products.find(product => {
                if (product.id === productId) {
                    product.quantity = 1;
                    return product
                }
                return false;
            });


            addToCart(cart, addedToCartProduct).then((updatedCart) => {

                setCart({ ...updatedCart })
            })
        }
    }


    return (

        <div className="page_section listing_page_container">
            <div className="listing_products_container">
                {searchProducts.length > 0 || LoadingSpinner ?

                    searchProducts.map((product, index) => <Product key={product.id} position={index + 1} addToCart={nativeAddToCart} {...product} />)

                    : <Spinner />}
            </div>
        </div>

    )
}

export default withRouter(SearchPage);