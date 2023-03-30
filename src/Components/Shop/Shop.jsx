import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart= []

        //Step -01: Get Id
        for (const id in storedCart) {
            // Step- 02: Get the product by using Id
            const addedProduct = products.find(product => product.id === id)

            if (addedProduct) {
                //step- 03: Get quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;

                //Step -04: Save the array with quantity
                savedCart.push(addedProduct)
            }
        }
        //Step- 05: Set the cart
        setCart(savedCart)

    }, [products])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);

    const handleAddToCart = (product) => {
        // console.log(product)
        // cart.push(product)
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='Shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        product={product}
                        key={product.id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;