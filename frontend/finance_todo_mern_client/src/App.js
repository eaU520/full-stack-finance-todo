import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import CreateExpense from './components/CreateExpense';
import ShowExpenseList from './components/ShowExpenseList';
import ShowExpenseDetails from './components/ShowExpenseDetails';
import UpdateExpenseInfo from './components/UpdateExpenseInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={<ShowExpenseList/>} />
          <Route path='/create-expense' element={<CreateExpense/>} />
          <Route path='/edit-expense/:id' element={<UpdateExpenseInfo/>} />
          <Route path='/show-expense/:id' element={<ShowExpenseDetails/>} />
        </Routes>
      </Router>
    );
  }
}


export default App;