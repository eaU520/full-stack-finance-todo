import React from "react";
import {Route, Routes} from "react-router-dom";
import ExpenseList from "./components/ShowExpenseList.js";
import LoginUser from "./components/LoginUser";
import RegisterUser from "./components/RegisterUser";
import Create from "./components/CreateExpense.js";
//TODO: Dark, contrast, light themes
const App = () => {
 return (
   <div>
     <Routes>
      {/* TODO: Feel, Bootstrap */}
      <Route path="/user/login" element={<LoginUser />} />
      <Route path='/' element={<ExpenseList />} />
      <Route path='/create_expense' element={<Create />} />
      <Route path='/user/register' element={<RegisterUser />} />
     </Routes>
   </div>
 );
};
 
export default App;