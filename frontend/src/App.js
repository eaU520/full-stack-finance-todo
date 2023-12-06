import React from "react";
import {Route, Routes} from "react-router-dom";
import ExpenseList from "./components/ShowExpenseList.js";
import LoginUser from "./components/LoginUser.js";
import RegisterUser from "./components/RegisterUser.js";
import ForgotPassword from "./components/ForgotPassword.js";
import CreateExpense from "./components/CreateExpense.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Calendar from "./components/Calendar.js";
import EditExpense from "./components/EditExpense.js";
//TODO: Dark, contrast, light themes

const App = () => {
 return (
  //  <BrowserRouter>
      <Routes>
      {/* TODO: Feel, Bootstrap */}
      <Route path="/users/login" element={<LoginUser />}/>
      <Route path="/" element={<PrivateRoute Component={ExpenseList}/>} />
      <Route path='/expenses/create_expense' element={<PrivateRoute Component={CreateExpense}/>} />
      <Route path='/users/register' element={<RegisterUser />} />
      <Route path='/users/forgot' element={<ForgotPassword />} />
      <Route path='/users/calendar' element={<PrivateRoute Component={Calendar}/>} />
      <Route path='/expenses/:id' element={<PrivateRoute Component={EditExpense}/>} />
      </Routes>
  //  </BrowserRouter>
 );
};
 
export default App;