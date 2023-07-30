// import { Link } from "react-router-dom";
import React from "react";

import {Route, Routes} from "react-router-dom";
// import Navbar from "./components/navbar";
import ExpenseList from "./components/ShowExpenseList.js";
import Create from "./components/CreateExpense.js";

const App = () => {
 return (
   <div>
     <Routes>
      <Route path='/' element={<ExpenseList />}  exact/>
       <Route path='/view_expenses' element={<ExpenseList />} excat/>
       <Route path='/create_expense' element={<Create />} exact/>
     </Routes>
   </div>
 );
};
 
export default App;