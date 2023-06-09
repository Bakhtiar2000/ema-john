import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import './Orders.css'
import ReviewItems from '../ReviewItems/ReviewItems';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart= useLoaderData();
    const [cart, setCart] = useState(savedCart)

    const handleRemoveFromCart= id =>{
        const remaining= cart.filter(product=> product._id !== id);
        setCart(remaining)
        removeFromDb(id)
    }
    const handleClearCart= () =>{
        setCart([])
        deleteShoppingCart();
    }

    return (
        <div className='Shop-container'>
            <div className='review-container'>
               {
                    cart.map(product => <ReviewItems
                        key={product._id}
                        product= {product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItems> )
               }
            </div>
            <div className='cart-container'>
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}
                >
                    <Link to="/checkout">
                        <button className='btn-different'>Proceed Checkout</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;