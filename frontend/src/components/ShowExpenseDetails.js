import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class ShowExpenseDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expense: {}
      };
    }
  
    componentDidMount() {
      // console.log("Print id: " + this.props.match.params.id);
      axios
        .get('http://localhost:8082/api/expenses/'+this.props.match.params.id)
        .then(res => {
          // console.log("Print-showBookDetails-API-response: " + res.data);
          this.setState({
            expense: res.data
          })
        })
        .catch(err => {
          console.log("Error from showExpenseDetails");
        })
    };
  
    onDeleteClick (id) {
      axios
        .delete('http://localhost:8082/api/expenses/'+id)
        .then(res => {
          this.props.history.push("/");
        })
        .catch(err => {
          console.log("Error form ShowExpenseDetails_deleteClick");
        })
    };
  
  
    render() {
  
      const expense = this.state.expense;
      let ExpenseItem = <div>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Priority</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Name</td>
              <td>{ expense.name }</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Type</td>
              <td>{ expense.type }</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Amount</td>
              <td>{ expense.amount }</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Description</td>
              <td>{ expense.description }</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Due Date</td>
              <td>{ expense.due_date }</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Urgency</td>
              <td>{ expense.urgency }</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Funded</td>
              <td>{ expense.funded }</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      return (
        <div className="ShowExpenseDetails">
          <div className="container">
            <div className="row">
              <div className="col-md-10 m-auto">
                <br /> <br />
                <Link to="/" className="btn btn-outline-warning float-left">
                    Show Expense List
                </Link>
              </div>
              <br />
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Expense's Record</h1>
                <p className="lead text-center">
                    View Expense's Info
                </p>
                <hr /> <br />
              </div>
            </div>
            <div>
              { ExpenseItem }
            </div>
  
            <div className="row">
              <div className="col-md-6">
                <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,expense._id)}>Delete Expense</button><br />
              </div>
  
              <div className="col-md-6">
                <Link to={`/edit-expense/${expense._id}`} className="btn btn-outline-info btn-lg btn-block">
                      Edit Expense
                </Link>
                <br />
              </div>
  
            </div>
               <br />
              <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Expense</button>
              <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Expense</button>
  
          </div>
        </div>
      );
    }
  }
  
  export default ShowExpenseDetails;