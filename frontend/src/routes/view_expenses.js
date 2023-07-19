import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

//TODO: Search expenses
//TODO: Sort by date, amount, name
//TODO: Pagination of expenses
//TODO: Change to due_date for sorting
const Expense = (props) => (
  <tr>
    <td>{props.expense.name}</td>
    <td>{props.expense.amount}</td>
    <td>{props.expense.type}</td>
    <td>
      <button className="btn btn-link" 
        onClick={() => {
          props.editExpense(props.expense._id);
          }}
          >
            Edit
      </button> |

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


export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  
  // This method fetches the expenses from the database.
  useEffect(() => {

    async function getExpenses() {
      const response = await fetch(`http://localhost:5050/expenses`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const expenses = await response.json();
      setExpenses(expenses);
    }
  
    getExpenses();
  
    return;
  }, [expenses.length]);
//TODO: Extract port #
  //This function gets and existing expense and puts the data in the form
  async function editExpense(id){
    const response = await fetch(`http://localhost:5050/expenses/${id}`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const expense = await response.json();
      navigate('/create-expense',{state: {editExpenseValue:expense, edit: true},replace:true});
  }

  // This method will delete an expense
  async function deleteExpense(id) {
    await fetch(`http://localhost:5050/expenses/${id}`, {
      method: "DELETE"
    });
  
    const newExpenses = expenses.filter((el) => el._id !== id);
    setExpenses(newExpenses);
  }
  
  // This method will map out the expenses on the table
  function expenseList() {
    return expenses.map((expense) => {

      return (
        <Expense
          expense={expense}
          editExpense={() => editExpense(expense._id)}
          deleteExpense={() => deleteExpense(expense._id)}
          key={expense._id}
        />
      );
    });
  }
  
  // This following section will display the table with the expenses
  return (
    <div className='ViewExpenses'>
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
          <nav
              style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
              }}>
              <Link to="/">Homepage</Link> |{" "}
              <Link to="/create-expense">Create an Expense</Link> |{" "}
              <Link to="/expenses">Expenses</Link> |{" "}
              <Link to="/register">Register</Link> |{" "}
              <Link to="/login">Login</Link>
            </nav>
        </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">All Expenses</h1>
            <p className="lead text-center">
              Expense List
            </p>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{expenseList()}</tbody>
      </table>
      </div>
        </div>
      </div>
    </div>
  );
 }