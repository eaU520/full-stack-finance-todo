import React from "react";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({Component}) =>{
    const authenticated = sessionStorage.getItem("session");
    
    return authenticated ? <Component/> : <Navigate to="/users/login" />;
}
export default PrivateRoute;