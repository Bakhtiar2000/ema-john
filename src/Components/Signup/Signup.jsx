import React, { useContext, useState } from 'react';
import './Signup.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Signup = () => {
    const {createUser}= useContext(AuthContext)
    const [error, setError] = useState('')
    const [validation, setValidation] = useState('')
    const [success, setSuccess] = useState('')

    const handleSignUp= event=>{
        event.preventDefault()
        const form =event.target
        const email= form.email.value
        const password= form.password.value
        const confirm= form.confirm.value
        console.log(email, password, confirm)
        setError('')
        setValidation('')
        setSuccess('')

        if(password.length< 6){
            setError('Password must be at least six characters long')
            return
        }
        else if(!/(?=.*[A-Z]).*[0-9]/.test(password)){
            setError('Please use at least one uppercase letter and a number')
            return
        }
        else if(password != confirm){
            setValidation('Password did not match')
            return
        }

        createUser(email, password)
        .then(result=>{
            const loggedUser= result.user
            console.log(loggedUser)
            setSuccess('Sign up successful')
        })
        .catch(err=> setError(err.message))
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign up</h2>
            <form  onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label> <br />
                    <input type="email" name="email" id="email" required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label> <br />
                    <input type="password" name="password" id="password" required/>
                </div>
                {
                    error && <p className='text-error'>{error}</p>
                }
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label> <br />
                    <input type="password" name="confirm" id="confirm" required/>
                </div>
                {
                    validation && <p className='text-error'>{validation}</p>
                }
                <button className='login-btn'>Sign up</button>
            </form>
            <p><small>Already have an account? <Link className='link' to="/login">Login</Link></small></p>
            {
                success && <p className='text-success'>{success}</p>
            }
        </div>
    );
};

export default Signup;