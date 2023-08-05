// import { Link } from "react-router-dom";
import React from "react";

import {Route, Routes} from "react-router-dom";
import ExpenseList from "./components/ShowExpenseList.js";
import LoginUser from "./components/LoginUser";
import RegisterUser from "./components/RegisterUser";
import Create from "./components/CreateExpense.js";
const App = () => {
 return (
   <div>
     <Routes>
      {/* TODO: Feel, Bootstrap */}
      <Route path="/user/login" element={<LoginUser />}  exact/>
      <Route path='/view_expenses' element={<ExpenseList />} exact/>
      <Route path='/create_expense' element={<Create />} exact/>
      <Route path='/user/register' element={<RegisterUser />} exact/>
     </Routes>
   </div>
 );
};
 
export default App;