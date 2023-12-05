import React from "react";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({Component}) =>{
    const authenticated = sessionStorage.getItem("session");
    // const tempCook = response.clearCookie("session-id");
   // req.session.user = null;
   // response.cookie = "session=false";
//    const tempSession =  window.sessionStorage.getItem("session-id");
    console.log(`Authenticated ${authenticated}`);
    //TODO: session is stored in req.session.user
    
    return authenticated ? <Component/> : <Navigate to="/users/login" />;
}
export default PrivateRoute;