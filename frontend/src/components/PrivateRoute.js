import React from "react";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({Component}) =>{
    const authenticated = true;
    return authenticated ? <Component/> : <Navigate to="/user/login" />;
}
export default PrivateRoute;