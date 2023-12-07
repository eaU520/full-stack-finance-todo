import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import { useNavigate } from "react-router-dom";

export default function Navigation(){
  const navigate = useNavigate();

  const handleAuth = event =>{
    if (sessionStorage.getItem("session")){
      sessionStorage.removeItem("session");
    }else{
      navigate("/users/login");
    }
  }
        return (
          <div className="Navigation">
            <Link className="btn btn-link" to="/expenses/create_expense">Create an Expense</Link> |
            {sessionStorage.getItem("session") ? (<a href="" className="btn btn-link" onClick={handleAuth}>Logout</a>): (<a href="" onClick={handleAuth} className="btn btn-link" >Login </a>)} |
            <Link className="btn btn-link" to="/">View All Expenses</Link> |
            <Link className="btn btn-link" to="/users/calendar">Calendar-In progress</Link> 
            </div>
        );
    }