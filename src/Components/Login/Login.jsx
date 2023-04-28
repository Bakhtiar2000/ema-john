import React from 'react';
import './Login.css'
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form>
                <div className="form-control">
                    <label htmlFor="email">Email</label> <br />
                    <input type="email" name="email" id="email" required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label> <br />
                    <input type="password" name="password" id="password" required/>
                </div>
                <button className='login-btn'>Login</button>
            </form>
            <p><small>New to Ema-John? <Link className='link' to="/signup">Create new Account</Link></small></p>
        </div>
    );
};

export default Login;