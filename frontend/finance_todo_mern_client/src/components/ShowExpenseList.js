import {React,  Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import ExpenseCard from './ExpenseCard';
import {withRouter} from 'react-router';

class ShowExpenseList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expenses: []
      };
    }
    componentDidMount() {
      axios
        .get('http://localhost:8082/')
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
      let expenseList;
  
      if(expenses.length == 0 ||  !(Array.isArray(expenses))) {
        expenseList = "there are no expense records!";
      } else {
            const expenseList = expenses.map((expense, k) =>
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
  export default withRouter(ShowExpenseList);