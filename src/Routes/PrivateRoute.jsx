import React, { useContext } from 'react';
import { AuthContext } from '../Components/Providers/AuthProviders';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading}= useContext(AuthContext)
    const location= useLocation()

    if(loading) return <div>Loading...</div>
    
    //If user is logged in then user gets access to the private routes, else the route asks for login
    if(user) return children
    else return <Navigate to="/login" state={{from: location}} replace>login</Navigate>
};

export default PrivateRoute;