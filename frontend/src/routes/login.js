import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () =>{
  let navigate = useNavigate();
  const [login, setLogin] = useState({
    username:'',
    password:''
  })
  const handleChange = (field) => (event) =>{
    setLogin({ ... login, [field]: event.target.value})
  }
  const validateInput = (loginInformation)=>{
    if (loginInformation.userName === "" || loginInformation.userName === null ||
     loginInformation.password === "" || loginInformation === null) return false;
    return true;
  }
  async function loginUser(data){
    data.preventDefault();
    //TODO: validate and login
    if (validateInput(data)){
      await fetch("http://localhost:5050/login",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: login.username,
          password: login.password
        })
      })
      setLogin({
        username: '',
        password: ''
      })
    }
  }//TODO: Navigation bar React
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
          <Link to="/create-expense">Create an Expense</Link> |{" "}
          <Link to="/expenses">Expenses</Link> |{" "}
          <Link to="/register">Register</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
          <p className="lead text-center">
                Login
            </p>
            <form onSubmit={e => {loginUser(e)}}>
        <label>Username</label>
        <br />
        <input 
          name='username' 
          type='text' 
          value={login.username}
          onChange={handleChange('username')}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          name='password' 
          type='password'
          value={login.password}
          onChange={handleChange('password')}
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
  export default Login