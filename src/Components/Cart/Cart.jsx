import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    console.log(cart)

    let totalPrice= 0;
    let totalShipping= 0
    let quantity= 0
    for(const item of cart)
    {
        totalPrice= totalPrice + item.price * item.quantity
        totalShipping= totalShipping + item.shipping
        quantity= quantity + item.quantity
    }
    let tax= (totalPrice*7/100).toFixed(2);
    let total= totalPrice + totalShipping +tax;

    return (
        <div className='cart'>
            <h3>___Order Summary___</h3>
            <p>Selected Item: {quantity}</p>
            <p>Total price: ${totalPrice}</p>
            <p>Shipping: ${totalShipping}</p>
            <p>Tax: ${tax}</p>
            <h4>Grand Total: ${total}</h4>
        </div>
    );
};

export default Cart;