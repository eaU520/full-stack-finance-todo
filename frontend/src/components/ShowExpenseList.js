import React from "react";
import {  useEffect, useState } from 'react';
import '../App.css';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';

//TODO: Session showing only that User's Expenses
/*
// Save data to sessionStorage
sessionStorage.setItem("key", "value");

// Get saved data from sessionStorage
let data = sessionStorage.getItem("key");

// Remove saved data from sessionStorage
sessionStorage.removeItem("key");

// Remove all saved data from sessionStorage
sessionStorage.clear();
*/
const Expense = (props) => (
  <tr>
    <td>{props.expense.name}</td>
    <td>{props.expense.description}</td>
    <td>{props.expense.urgency}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.expense._id}`}>Edit</Link> |
      <button className="btn btn-link"
          onClick={() => {
            props.deleteExpense(props.expense._id);
          }}
        >
        Delete
      </button>
    </td>
  </tr>
);
const ExpenseList = () => {
  
  const [expenses, setExpenses] = useState(0);
    useEffect(() =>{
      async function getExpenses(){
        const response = await fetch(`http://localhost:5050/expenses/`,{
          method: "GET",
          body:  {session: window.sessionStorage.getItem("session-id")}
        });
       
        if (!response.ok){
          window.alert(`Error from displaying expenses:${response.statusText}`);
          return;
        }
        const expensesList = await response.json();
        setExpenses(expensesList);
    }
    getExpenses();
    return;
  },[expenses.length]);
    
  async function deleteExpense(id) {
    await fetch(`http://localhost:5050/expenses/${id}`, {
      method: "DELETE"
    });
  
    const newExpenses = expenses.filter((el) => el._id !== id);
    setExpenses(newExpenses);
  }
  function expenseList(){
    return Array.from(expenses).map((expense) => {
      return (
        <Expense
          expense={expense}
          deleteExpense={() => deleteExpense(expense._id)}
          key={expense._id}
        />
      );
    });
  }
      return (
        
        <div>
          <Navigation/>
          <h3 >Expenses List</h3>
          <table className="table table-striped" style={{ marginTop:20}}>
            <thead>
              <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Urgency</th>
              </tr>
            </thead>
            <form>
              <input>
              </input>
            </form>
            <tbody>{expenseList()}</tbody>
            </table>
            </div>
      );
    }
  export default ExpenseList;