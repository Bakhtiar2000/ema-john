import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [cart, setCart] = useState([]);
    const { totalProducts } = useLoaderData()
    const totalPages = Math.ceil(totalProducts / itemsPerPage)

    // const pageNumbers = [];
    // for (let i = 0; i <= totalPages; i++) {
    //     pageNumbers.push(i)
    // }
    const pageNumbers = [...Array(totalPages).keys()]

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart)

        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(products => {
                const savedCart = []
                //Step -01: Get Id
                for (const id in storedCart) {
                    // Step- 02: Get the product by using Id
                    const addedProduct = products.find(product => product._id === id)

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
            })

    }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            const data = await response.json()
            setProducts(data)
        }
        fetchData()
    }, [currentPage, itemsPerPage]);

    const handleAddToCart = (product) => {

        // if(product.quantity=== 0){
        //     product.quantity ===1
        // }
        let newCart = [];

        const existing = cart.find(p => p._id === product._id);
        if (!existing) {
            product.quantity = 1
            newCart = [...cart, product];
        }
        else {
            existing.quantity = existing.quantity + 1;
            const remaining = cart.filter(p => p._id !== product._id)
            newCart = [...remaining, existing];
        }
        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart();
    }

    const options = [5, 10, 20]
    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }

    return (
        <>
            <div className='Shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            product={product}
                            key={product._id}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link to="/orders">
                            <button className='btn-different'>Review order</button>
                        </Link>
                    </Cart>
                </div>
            </div>
            {/* Pagination */}
            <div className='pagination'>
                <p><small>Current page: {currentPage} <br /> items per page: {itemsPerPage}</small></p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number+ 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;