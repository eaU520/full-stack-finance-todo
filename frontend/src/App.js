// import { Link } from "react-router-dom";
import React from "react";

import {Route, Routes} from "react-router-dom";
// import Navbar from "./components/navbar";
import ExpenseList from "./components/ShowExpenseList.js";
import Create from "./components/CreateExpense.js";
const App = () => {
 return (
   <div>
     {/* <Navbar /> */}
     <Routes>
      <Route path="/" element={<ExpenseList />} />
       <Route path="/view_expenses" element={<ExpenseList />} />
       <Route path="create_expense" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;