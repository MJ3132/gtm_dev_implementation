import React, { useState, useContext, useEffect } from 'react';
import './product_page.styles.scss';

import { apiGetProduct, getQueryParam, addToCart } from '../../utility/Utility.component';
import { Alert } from '@material-ui/lab';
import { CartContext } from '../../Contexts/Cart';

import ReviewStars from "../../components/ReviewStars/ReviewStars.component";
import Button from '../../components/Button/Button.component';


import TagManager from "react-gtm-module";


const ProductPage = () => {

    const [product, setProduct] = useState({})
    const [successAddToCart, setSuccessAddToCart] = useState(false);
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        const pCode = getQueryParam('pCode');

        apiGetProduct(pCode, (product) => {

            TagManager.dataLayer({
                dataLayer: {
                    event: "pageview",
                    page: {
                        path: "/product?pCode=" + product.id,
                        pageType: "productPage"
                    }
                },
            })

            TagManager.dataLayer({
                dataLayer: {
                    event: "productDetailView",
                    products: [{ ...product }]
                },

            })

            setProduct({ ...product, quantity: 1 })

        })
    }, [])

    function updateProductQuantity(e) {

        let updatedProduct = { ...product, quantity: +e.target.value };

        setProduct(updatedProduct)
    }


    function nativeAddToCart() {

        let updatedProduct = { ...product };

        addToCart(cart, updatedProduct).then((updatedCart) => {

            setSuccessAddToCart(true)

            setCart({ ...updatedCart })
        })
        setTimeout(() => {

            setSuccessAddToCart(false)

        }, 3500)
    }

    return (
        <div className='page_section productPage_container'>
            <div className='productPage_container_product_container'>
                <div className='product_image_container'>
                    <img src={product.image} alt='' className='product_image' />
                    <div className='product_reviews'>
                        <h3>
                            <ReviewStars rate={product && product.rating && product.rating.rate ? product.rating.rate : null} />
                        </h3>
                        <h3>
                            Count: {product && product.rating && product.rating.count ? product.rating.count : null}
                        </h3>
                    </div>
                </div>
                <div className='product_information'>
                    <div className='product_name'>
                        <h1> {product.title} </h1>
                    </div>
                    <div className="product_description">
                        <p> {product.description}</p>
                    </div>
                    <div className='product_quantity'>
                        <div className="quantity_label">
                            <h2>QTY</h2>
                        </div>
                        <div className="quantity_container">
                            <input onChange={(e) => updateProductQuantity(e)} type='number' defaultValue='1' name='quantity' min='1' />
                        </div>
                    </div>
                    <div className='addTocartButton'>
                        <Button clickAction={() => nativeAddToCart()}>Add To Cart</Button>
                    </div>
                    <br />
                    {successAddToCart ?
                        <Alert variant="filled" severity="success">
                            Success You Have Added To Cart!
                        </Alert>
                        : null}
                </div>
            </div>
        </div>
    )
}

export default ProductPage;