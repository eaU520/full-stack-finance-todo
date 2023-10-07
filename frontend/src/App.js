import React from "react";
import {Route, Routes} from "react-router-dom";
import ExpenseList from "./components/ShowExpenseList.js";
import LoginUser from "./components/LoginUser.js";
import RegisterUser from "./components/RegisterUser.js";
import ForgotPassword from "./components/ForgotPassword.js";
import CreateExpense from "./components/CreateExpense.js";
import PrivateRoute from "./components/PrivateRoute.js";
//TODO: Dark, contrast, light themes

const App = () => {
 return (
  //  <BrowserRouter>
      <Routes>
      {/* TODO: Feel, Bootstrap */}
      <Route path="/user/login" element={<LoginUser />}/>
      <Route path="/" element={<PrivateRoute Component={ExpenseList}/>} />
      <Route path='/expense/create_expense' element={<PrivateRoute Component={CreateExpense}/>} />
      <Route path='/user/register' element={<RegisterUser />} />
      <Route path='/user/forgot' element={<ForgotPassword />} />
      </Routes>
  //  </BrowserRouter>
 );
};
 
export default App;