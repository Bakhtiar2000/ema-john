import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Cart = ({cart, handleClearCart, children}) => {

    let totalPrice= 0;
    let totalShipping= 0
    let quantity= 0
    for(const item of cart)
    {
        totalPrice= totalPrice + item.price * item.quantity
        totalShipping= totalShipping + item.shipping
        quantity= quantity + item.quantity
    }
    let tax= totalPrice*7/100;
    let total= totalPrice + totalShipping +tax;

    return (
        <div className='cart'>
            <h3>___Order Summary___</h3>
            <p>Selected Item: {quantity}</p>
            <p>Total price: ${totalPrice}</p>
            <p>Shipping: ${totalShipping}</p>
            <p>Tax: ${tax}</p>
            <h4>Grand Total: ${total}</h4>

            <button className='btn-clear-cart' onClick={handleClearCart}>
                <span>Clear Cart</span>
             <FontAwesomeIcon icon={faTrashAlt} />
             </button>

             {children}
        </div>
    );
};

export default Cart;