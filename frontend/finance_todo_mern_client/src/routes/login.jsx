import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const loginUser = (data) => {
    data.preventDefault();
    //TODO: validate and login
  }
    return (
      <div className="Login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
          <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}>
          <Link to="/">Homepage</Link> |{" "}
          <Link to="/create_expense">Create an Expense</Link> |{" "}
          <Link to="/expenses">Expenses</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
          <p className="lead text-center">
                Login
            </p>
            <form onSubmit={e => {loginUser(e)}}>
        <label>Username</label>
        <br />
        <input 
          name='userName' 
          type='text' 
        />
        <br />
        <label>Password</label>
        <br />
        <input
          name='password' 
          type='password'
        />
        <br/>
        <input 
          className='submitButton'
          type='submit' 
          value='Log In' 
        />
      </form>
        </div>
        </div>
      </div>
      </div>
    );
  }