import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Login = () => {
    const { signInUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location)
    const from = location.state?.from?.pathname || '/';
    // console.log(from)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showPass, setShowPass] = useState(false);

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)
        setError('')
        setSuccess('')
        signInUser(email, password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)
                setSuccess('Login successful')
                form.reset()
                navigate(from, { replace: true })
            })
            .catch(err => setError(err.message))
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="email">Email</label> <br />
                    <input type="email" name="email" id="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label> <br />
                    <input type={showPass? "text" : "password"} name="password" id="password" required />
                    <p onClick={() => setShowPass(!showPass)}><small>
                        {
                            showPass?
                            <span>Hide Password</span>:
                            <span>Show Password</span>
                        }
                    </small></p>
                </div>
                {
                    error && <p className='text-error'>{error}</p>
                }
                <button className='login-btn'>Login</button>
            </form>
            {
                success && <p className='text-success'>{success}</p>
            }
            <p><small>New to Ema-John? <Link className='link' to="/signup">Create new Account</Link></small></p>
        </div>
    );
};

export default Login;