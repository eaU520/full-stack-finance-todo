import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {render} from "react-dom";
import './App.css';

// import CreateExpense from './components/CreateExpense.js';
// import ShowExpenseList from './components/ShowExpenseList.js';
// import ShowExpenseDetails from './components/ShowExpenseDetails.js';
// import UpdateExpenseInfo from './components/UpdateExpenseInfo.js';

import ShowExpenseList from "./routes/view_expenses";
import CreateExpense from "./routes/create_expense";

// class App extends Component {
  // render() {
// function App(){
//     return (
//         <div>
//           <Router>
//             <Switch>
//               <Route path='/' exact component={ShowExpenseList}/>
//               <Route path='/create-expense' component={CreateExpense}/>
//               <Route path='/edit-expense/:id' component={UpdateExpenseInfo} />
//               <Route path='/show-expense/:id' component={ShowExpenseDetails} />
//             </Switch>
//           </Router>
//         </div>
//     );
//     }
  // }
// }

const rootElement = document.getElementById("root");
render (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="create-expense" element={<CreateExpense />} />
      <Route path="/login" element={<LoginUser />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
export default App;