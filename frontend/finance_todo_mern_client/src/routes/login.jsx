import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const loginUser = (data) => {
    data.preventDefault();
    //TODO: validate and login
  }
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Login</h2>
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}>
          <Link to="/create_expense">Create an Expense</Link> |{" "}
          <Link to="/expenses">Expenses</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
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

      </main>
    );
  }