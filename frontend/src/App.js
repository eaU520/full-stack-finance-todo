// import { Link } from "react-router-dom";
import React from "react";

import {Route, Routes} from "react-router-dom";
// import Navbar from "./components/navbar";
import ExpenseList from "./components/ShowExpenseList";
// import Edit from "./components/edit";
import Create from "./components/CreateExpense";
 
const App = () => {
 return (
   <div>
     {/* <Navbar /> */}
     <Routes>
       <Route exact path="/" element={<ExpenseList />} />
       {/* <Route path="/edit/:id" element={<Edit />} /> */}
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;
// export default function App() {
//   return (
//     <div>
//       <h1>Financial Todo</h1>
//       <nav
//         style={{
//           borderBottom: "solid 1px",
//           paddingBottom: "1rem",
//         }}>
//         <Link to="/">Homepage</Link> |{" "}  
//         <Link to="/create-expense">Create an Expense</Link> |{" "}
//         <Link to="/expenses">Expenses</Link> |{" "}
//         <Link to="/register">Register</Link> |{" "}
//         <Link to="/login">Login</Link>
//       </nav>
//     </div>
//   );
// }//TODO: Extra nav to separate Navbar component