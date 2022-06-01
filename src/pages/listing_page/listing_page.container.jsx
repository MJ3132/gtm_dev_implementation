import React, { useState, useEffect, useContext } from 'react';
import './listing_page.styles.scss';

import Product from '../../components/Product/Product.component';
import { apiCallProducts } from '../../utility/Utility.component';
import { addToCart } from '../../utility/Utility.component';
import { CartContext } from '../../Contexts/Cart';
import { LoadingSpinnerContext } from '../../Contexts/LoadingSpinner';
import { ListingProductsContext } from '../../Contexts/ListingProducts';


import Spinner from "../../components/Spinner/Spinner.component";

import TagManager from "react-gtm-module";

const ListingPage = () => {

    const { listingProducts, setListingProducts } = useContext(ListingProductsContext);
    const { cart, setCart } = useContext(CartContext);
    const { LoadingSpinner } = useContext(LoadingSpinnerContext);
    const [successAddToCart, setSuccessAddToCart] = useState(false);

    useEffect(() => {

 

        if (listingProducts && !listingProducts.length) {

            apiCallProducts((products) => {

                setListingProducts([...products])

                TagManager.dataLayer({
                    dataLayer: {
                        event: "pageview",
                        page: {
                            path:"/catalogue",
                            pageType: "listingPage"
                        },  
        
                        products: [...products]
                    }
                })
        
                sessionStorage.setItem('listingProducts', JSON.stringify(products))

            });
        }
    });

    function nativeAddToCart(productId) {

        let products = [...listingProducts];

        if (products.length > 0) {
            const addedToCartProduct = products.find(product => {
                if (product.id === productId) {
                    product.quantity = 1;
                    return product
                }
                return false;
            });

            addToCart(cart, addedToCartProduct).then((updatedCart) => {

                setSuccessAddToCart(productId)

                setCart({ ...updatedCart })

                setTimeout(() => {

                    setSuccessAddToCart(false)
        
                }, 3500)
            })
        }
    }


    return (

        <div className="page_section listing_page_container">
            <div className="listing_products_container">
                {listingProducts.length > 0 || LoadingSpinner ?

                    listingProducts.map((product, index) => <div key={product.id}> <Product position={index + 1} addToCart={nativeAddToCart} {...product} successAddToCart={successAddToCart}/></div>)

                    : <Spinner />}
            </div>
        </div>
    )
}

export default ListingPage;