import React from "react";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({Component}) =>{
    const authenticated = window.sessionStorage.getItem("session-id");
    //TODO: session is stored in req.session.user
    return authenticated ? <Component/> : <Navigate to="/user/login" />;
}
export default PrivateRoute;