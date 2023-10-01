import React from "react";
import {Route, Routes} from "react-router-dom";
import ExpenseList from "./components/ShowExpenseList.js";
import LoginUser from "./components/LoginUser";
import RegisterUser from "./components/RegisterUser";
import Create from "./components/CreateExpense.js";
import ForgotPassword from "./components/ForgotPassword.js";
//TODO: Dark, contrast, light themes
const requireAuth = (_, replace) =>{
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
      <Route path='/' element={<ExpenseList />} onEnter={requireAuth}/>
      <Route path='/expense/create_expense' element={<Create />} onEnter={requireAuth}/>
      <Route path='/user/register' element={<RegisterUser />} />
      <Route path='/user/forgot' element={<ForgotPassword />} />
     </Routes>
   </div>
 );
};
 
export default App;