import React from "react";
import {  useEffect, useState } from 'react';
import '../App.css';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
// import session from "express-session";

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
      <Link className="btn btn-link" to={`/expenses/${props.expense._id}`}>Edit</Link> |
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
  
  const [expenses, setExpenses] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const expensesPerPage = 3;//FIXME: Increase, low for testing
  // const [totalPage, setTotalPages] = useState(0);
  const [form, setForm] = useState({ searchTerm: ''});
    useEffect(() =>{
      async function getExpenses(){
        const response = await fetch(`http://localhost:5050/expenses/`,{
          method: "GET",
          headers:{
            "session": sessionStorage.getItem("session")
          }
        });
        if (!response.ok){
          window.alert(`Error from displaying expenses:${response.statusText}`);
          return;
        }
        const expensesList = await response.json();
        setExpenses(expensesList);
        // setTotalPages(Math.ceil(response.data.length/expensesPerPage));
    }
    getExpenses();
    return;
    // const startIndex = currentPage*expensesPerPage;
    // const endIndex = startIndex + expensesPerPage;
    // const subset = expenses.slice(startIndex,endIndex);
    // setExpenses(subset);

    // const handlePageChange = (selectedPage) =>{
    //   setCurrentPage(selectedPage.selected);
    // }
  }, [expenses.length]);
    
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
  function updateForm(value){
    return setForm((prev)=> {
      return {...prev, ...value};
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const urlSearch = "http://localhost:5050/expense/search?term="+form.searchTerm;
    console.log(form.searchTerm);
    await fetch(urlSearch,{//FIXME: create separate string first?
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .catch(error => {
        window.alert(error);
        return;
      });
        setForm({
          term: ''
        });
        // navigate('/', {replace: true});//Adds to database
      }

      return (
        
        <div>
          <Navigation/>
          <h3 >Expenses List</h3>
          <form onSubmit={onSubmit}>
              <input  
                type="text"
                placeholder="Search expenses"
                value={form.name}
                onChange={(e) => updateForm({ search: e.target.value})}>
              </input>
              <input
                        type="submit"
                        className="btn btn-block mt-1"
                    />
            </form>
          <table className="table table-striped" style={{ marginTop:20}}>
            <thead>
              <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Urgency</th>
              </tr>
            </thead>
            
            <tbody>{expenseList()}</tbody>
            </table>
            
            </div>
      );//TODO: Pagination
    }
  export default ExpenseList;