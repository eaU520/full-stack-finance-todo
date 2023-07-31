import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
//TODO: Add all links and wanted pages
const Expense = (props) =>(
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
export default function ExpenseList(){
  const [expenses, setExpenses] = useState([]);
    useEffect(() =>{
      async function getExpenses(){
        const response = await fetch(`http://localhost:5050/expense/`,{
          method: "GET"
        });
       
        if (!response.ok){
          console.log(response);
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
    await fetch(`http://localhost:5050/${id}`, {
      method: "DELETE"
    });
  
    const newExpenses = expenses.filter((el) => el._id !== id);
    setExpenses(newExpenses);
  }
  function expenseList(){
    return expenses.map((expense) => {
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
        <div className="ShowExpenseList">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <br />
                <h2 className="display-4 text-center">Expenses List</h2>
              </div>
  
            </div>
            <div>
            <nav
              style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
              }}>
              <Link to="/create_expense">Create an Expense</Link> |{" "}
              <Link to="/">Expenses</Link>{" "}
            </nav>
            </div>
            <div className="list">
                  {expenseList}
            </div>
          </div>
        </div>
      );
    }