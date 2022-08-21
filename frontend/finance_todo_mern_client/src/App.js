import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import './App.css';

import CreateExpense from './components/CreateExpense';
import ShowExpenseList from './components/ShowExpenseList';
import ShowExpenseDetails from './components/ShowExpenseDetails';
import UpdateExpenseInfo from './components/UpdateExpenseInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={withRouter(ShowExpenseList)} />
          <Route exact path='/create-expense' component={withRouter(CreateExpense)} />
          <Route path='/edit-expense/:id' component={UpdateExpenseInfo} />
          <Route path='/show-expense/:id' component={ShowExpenseDetails} />
        </Switch>
      </Router>
    );
  }
}

export default App;