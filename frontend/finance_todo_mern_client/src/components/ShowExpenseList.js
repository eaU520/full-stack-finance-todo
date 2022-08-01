import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class ShowExpenseList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expenses: []
      };
    }
  
    componentDidMount() {
      axios
        .get('http://localhost:8082/api/expenses')
        .then(res => {
          this.setState({
            expenses: res.data
          })
        })
        .catch(err =>{
          console.log('Error from ShowExpenseList');
        })
    };
  
  
    render() {
      const expenses = this.state.expenses;
      console.log("PrintExpenses: " + expenses);
      let expenseList;
  
      if(!expenses) {
        expenseList = "there is no expense record!";
      } else {
        expenseList = expenses.map((expense, k) =>
          <ExpenseCard expense={expense} key={k} />
        );
      }
  
      return (
        <div className="ShowExpenseList">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <br />
                <h2 className="display-4 text-center">Expenses List</h2>
              </div>
  
              <div className="col-md-11">
                <Link to="/create-expense" className="btn btn-outline-warning float-right">
                  + Add New Expense
                </Link>
                <br />
                <br />
                <hr />
              </div>
  
            </div>
  
            <div className="list">
                  {expenseList}
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default ShowExpenseList;