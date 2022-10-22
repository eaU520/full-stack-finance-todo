import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password:""
  })
  const handleChange = event =>{
    const {name,value} = event.target.setUser({
        setUser({
            ...user, [name]:value
        })
    })
  }
  const validateInput = (registrationInformation)=>{
    if (registrationInformation.userName === "" || registrationInformation.userName === null ||
    registrationInformation.password === "" || registrationInformation === null ||
    registrationInformation.email === "" || registrationInformation.email === null) return false;
    return true;
  }
  const registerUser = (data) => {
    data.preventDefault();
    //TODO: validate and login
    if (validateInput(data)){
        axios.post("http://localhost:8080/register",data)
        .then(res => console.log(res))
    }else{
        alert("Could not register the user");//TODO: Check already registered, repeated username, email, etc.
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
                Registration
            </p>
            <form onSubmit={e => {registerUser(e)}}>
            <label>Email</label>
                <br />
                <input 
                name='email' 
                type='email' 
                />
                <br />
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
export default Registration