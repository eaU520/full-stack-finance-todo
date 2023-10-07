import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import ExpenseList from "./components/ShowExpenseList.js";
import LoginUser from "./components/LoginUser.js";
import RegisterUser from "./components/RegisterUser.js";
import Create from "./components/CreateExpense.js";
import ForgotPassword from "./components/ForgotPassword.js";
import Navigation from './components/Navigation.js';
//TODO: Dark, contrast, light themes
const requireAuth = () =>{
  const authenticated = true;
  console.log(authenticated, this);
  if(!authenticated){
    return <Navigate to="/user/login" />;
  }
}

const App = () => {
 return (
   <div>
      <Routes>
      <Navigation/>
      {/* TODO: Feel, Bootstrap */}
      <Route path="/user/login" element={<LoginUser />}/>
      <Route path='/' element={<ExpenseList />} render={requireAuth()}/>
      <Route path='/expense/create_expense' element={<Create />} render={requireAuth()}/>
      <Route path='/user/register' element={<RegisterUser />} />
      <Route path='/user/forgot' element={<ForgotPassword />} />
      </Routes>
   </div>
 );
};
 
export default App;