import React, { useContext } from 'react';
import "./Header.css"
import logo from "../../images/Logo.svg"
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Header = () => {
    const { user, logOutUser } = useContext(AuthContext)
    const handleSignOut = () => {
        logOutUser()
            .then(() => {
            })
            .catch(err => console.log(err.message))
    }

    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Order</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                {user ?
                    <span className='user'>Welcome, {user.email} <button className='sign-out-btn' onClick={handleSignOut}>Signout</button></span> :
                    <Link to="/signup">Sign up</Link>
                }
            </div>

        </nav>
    );
};

export default Header;