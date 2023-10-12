import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';
export default function Navigation(){
        return (
          <div className="Navigation">
            <Link className="btn btn-link" to="/expenses/create_expense">Create an Expense</Link> |
            <Link className="btn btn-link" to="/users/login">Login</Link> |
            <Link className="btn btn-link" to="/">View All Expenses</Link> |
            <Link className="btn btn-link" to="/users/calendar">Calendar-In progress</Link> 
                  {/* <br /> */}
                  {/* <Link to="/" className="btn btn-outline-warning float-left">
                      Homepage
                  </Link> */}

            </div>
        );
    }