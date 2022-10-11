import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
// import axios from 'axios';
// import ExpenseCard from '../components/ExpenseCard';

export default function ViewExpenses(props) {
  return (
    <div className="ShowExpenseList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Expenses List</h2>
          </div>

          <div className="col-md-11">
            <Link to="/create_expense" className="btn btn-outline-warning float-right">
              + Add New Expense
            </Link>
            <br />
            <br />
            <hr />
          </div>

        </div>
        <div>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}>
          <Link to="/create_expense">Create an Expense </Link> |{" "}
          <Link to="/expenses">Expenses</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
        </div>
        <div className="list">
              {props.expenseList}
        </div>
      </div>
    </div>
  );
  }