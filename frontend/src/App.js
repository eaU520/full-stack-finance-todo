import React from "react";
import {Route, Routes} from "react-router-dom";
import ExpenseList from "./components/ShowExpenseList.js";
import LoginUser from "./components/LoginUser.js";
import RegisterUser from "./components/RegisterUser.js";
import Create from "./components/CreateExpense.js";
import ForgotPassword from "./components/ForgotPassword.js";
//TODO: Dark, contrast, light themes
const requireAuth = (nextState, replace) =>{
  console.log(this.authenticated, this);
  if(!this.authenticated()){
    replace("/user/login");
  }
}

const App = () => {
 return (
   <div>
     <Routes>
      {/* TODO: Feel, Bootstrap */}
      <Route path="/user/login" element={<LoginUser />}/>
      <Route path='/' element={<ExpenseList />} onEnter={this.requireAuth}/>
      <Route path='/expense/create_expense' element={<Create />} onEnter={this.requireAuth}/>
      <Route path='/user/register' element={<RegisterUser />} />
      <Route path='/user/forgot' element={<ForgotPassword />} />
     </Routes>
   </div>
 );
};
 
export default App;