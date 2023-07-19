import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password:"",
    repeatPassword: ""
  })
  const handleChange = (field) => (event) =>{
    setUser({...user, [field]: event.target.value})
    }
//TODO: Email, password, etc. validation
//TODO: Show/hide password
  const validateInput = (registrationInformation)=>{
    if (registrationInformation.username === "" || registrationInformation.username === null ||
    registrationInformation.password === "" || registrationInformation === null ||
    registrationInformation.email === "" || registrationInformation.email === null) return false;
    return true;
  }
  async function registerUser(data){
    data.preventDefault();
    if (validateInput(data)){
        await fetch("http://localhost:8080/register",{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
                username: user.username
            }),
        })
        .then(res => console.log(res))
    }else{
        alert("Could not register the user");//TODO: Check already registered, repeated username, email, etc.
    }
    setUser({
        name: "",
        email: "",
        password:"",
        username: "",
        repeatPassword: ""
    })
    navigate("/login");
  }//TODO: Navigation bar component React
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
            <label>Name</label>
                <br />
                <input 
                name='name' 
                type='text' 
                onChange={handleChange('name')}
                />
                <br />
            <label>Email</label>
                <br />
                <input 
                name='email' 
                type='email' 
                onChange={handleChange('email')}
                />
                <br />
                <label>Username</label>
                <br />
                <input 
                name='username' 
                type='text' 
                onChange={handleChange('username')}
                />
                <br />
                <label>Password</label>
                <br />
                <input
                name='password' 
                type='password'
                onChange={handleChange('password')}
                />
                <br/>
                <label>Password Again</label>
                <br />
                <input
                name='repeatPassword' 
                type='password'
                onChange={handleChange('repeatPassword')}
                />
                <br/>
                <input 
                className='submitButton'
                type='submit' 
                value='Register' 
                />
            </form>
        </div>
        </div>
      </div>
      </div>
    );
}
export default Registration