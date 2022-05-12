import React, { useEffect, useMemo } from "react";
import "./OrderConfirmation.styles.scss";
import TagManager from "react-gtm-module";

const OrderConfirmation = ({ cart, orderId, address, city, creditCard, postalCode }) => {

    const subtotal = cart.cartInfo.totalPrice;
    const tax = useMemo(() => (cart.cartInfo.totalPrice * .13).toFixed(2), [cart.cartInfo.totalPrice]);
    const total = useMemo(() => (+subtotal + +tax).toFixed(2), [tax, subtotal]);


    useEffect(() => {
        TagManager.dataLayer({
            dataLayer: {
                event: "purchase",
                page: {
                    path: "/order_confirmation",
                    pageType: "order_confirmation"
                },
                transaction: {
                    orderInfo: {
                        orderId,
                        tax,
                        subtotal,
                        total
                    },
                    products: cart.cartProducts,
                    cartInfo: cart.cartInfo
                }
            }
        })
    },[cart]);

    return (
        <div className="orderConfirmation_container">
            <div className="orderConfirmation_content">
                <div className="orderConfirmation_products">
                    <table>
                        <tbody>
                            <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                Price
                            </th>
                            </tr>
                            {cart.cartProducts.map(product => {
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            {product.title}

                                        </td>
                                        <td>
                                            {product.quantity}
                                        </td>
                                        <td>
                                            $ {product.price}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="orderConfirmation_user_details">
                    <h2>Name: John</h2>
                    <h2>Shipping Address : {address}</h2>
                    <h2>City : {city}</h2>
                </div>
                <br />
                <div className="orderConfirmation_price_details">
                    <h2>Order Number : {orderId}</h2>
                    <h2>Subtotal : {subtotal}</h2>
                    <h2>Tax: {tax}</h2>
                    <h2>Total: {total}</h2>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmation;