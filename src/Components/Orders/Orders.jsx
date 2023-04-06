import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import './Orders.css'
import ReviewItems from '../ReviewItems/ReviewItems';
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCart= useLoaderData();
    const [cart, setCart] = useState(savedCart)

    const handleRemoveFromCart= id =>{
        const remaining= cart.filter(product=> product.id !== id);
        setCart(remaining)
        removeFromDb(id)
    }

    return (
        <div className='Shop-container'>
            <div className='review-container'>
               {
                    cart.map(product => <ReviewItems
                        key={product.id}
                        product= {product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    ></ReviewItems> )
               }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;